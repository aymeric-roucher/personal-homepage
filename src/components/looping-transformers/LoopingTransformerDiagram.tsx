import { MouseEvent as ReactMouseEvent, useLayoutEffect, useRef, useState } from "react";
import PaperBox from "@/components/transformers-viz-claude/PaperBox";
import { LOOP_COLOR, RESIDUAL_COLOR } from "@/components/transformers-viz-claude/data";

// The low-detail version of the interactive Transformer schema: each column is
// one full forward pass over one token. The prompt is read in parallel; once
// generation starts, the sampled token is the only thing that travels serially
// to the next pass. Numbers are for a dense ~27B model (Qwen3.6-27B class):
// width 5 120, 64 layers, grouped-query attention with 8 key-value heads of
// dimension 128, ~152 000-token vocabulary, bfloat16.

const STREAM_WIDTH = 5120;
const LAYER_COUNT = 64;
const KEY_VALUE_HEADS = 8;
const HEAD_DIMENSION = 128;
const VOCABULARY_SIZE = 151936;
const STREAM_BITS = STREAM_WIDTH * 16; // 81,920 per layer hop
const TOKEN_BITS = Math.log2(VOCABULARY_SIZE); // ≈ 17.2
const ATTENTION_BITS_PER_LAYER = 2 * KEY_VALUE_HEADS * HEAD_DIMENSION * 16; // 32,768
const ATTENTION_BITS_TOTAL = ATTENTION_BITS_PER_LAYER * LAYER_COUNT; // 2,097,152
const ATTENTION_COLOR = "#d29a58"; // border color of the attention PaperBox

// One forward pass per column. The prompt "17 × 24" is read first (three
// passes), and its last token triggers the model's own reasoning, which begins
// "Let's split ...": a chain-of-thought a bare multiplication calls for.
interface Pass {
  input: string;
  output: string;
  inputFromPrompt: boolean;
  outputGenerated: boolean;
}
const PASSES: Pass[] = [
  { input: "17", output: "×", inputFromPrompt: true, outputGenerated: false },
  { input: "×", output: "24", inputFromPrompt: true, outputGenerated: false },
  { input: "24", output: "Let's", inputFromPrompt: true, outputGenerated: true },
  { input: "Let's", output: "split", inputFromPrompt: false, outputGenerated: true },
  { input: "split", output: "it", inputFromPrompt: false, outputGenerated: true },
];
const COLUMN_COUNT = PASSES.length;
const UNROLLED_LAYERS = [64, 2, 1]; // top to bottom; the folded band sits between layer 64 and layer 2
const HIDDEN_LAYER_COUNT = LAYER_COUNT - UNROLLED_LAYERS.length;

type ArrowKind = "residual" | "attention" | "serial";

const num = (v: number) => v.toLocaleString("en-US");

const HOVER_INFO: Record<ArrowKind, { title: string; body: string; color: string }> = {
  residual: {
    title: "The residual stream",
    body: `${num(STREAM_WIDTH)} numbers × 16 bits = ${num(STREAM_BITS)} bits per token, at every one of the ${LAYER_COUNT} layer hops.`,
    color: RESIDUAL_COLOR,
  },
  attention: {
    title: "Masked causal attention",
    body: `Every later token reads this token's keys and values: 2 × ${KEY_VALUE_HEADS} key-value heads × ${HEAD_DIMENSION} dimensions × 16 bits = ${num(ATTENTION_BITS_PER_LAYER)} bits per layer, so × ${LAYER_COUNT} layers = ${num(ATTENTION_BITS_TOTAL)} bits ≈ 2.1 megabits per past token. These arrows climb: a token's layer-ℓ output can only reach a later token one layer up, so reaching a later token costs a layer, exactly like a vertical hop.`,
    color: ATTENTION_COLOR,
  },
  serial: {
    title: "The serial channel",
    body: `One sampled token among ${num(VOCABULARY_SIZE)}: log₂(${num(VOCABULARY_SIZE)}) ≈ ${Math.round(TOKEN_BITS)} bits. This is all that loops from one pass to the next.`,
    color: LOOP_COLOR,
  },
};

// The residual stream between boxes, same visual weight as the attention
// arrows; hover (or the circuit highlight) lights up the whole family.
const ResidualArrow = ({
  height = 22,
  label,
  active,
  onHover,
  onLeave,
}: {
  height?: number;
  label?: string;
  active: boolean;
  onHover: (e: ReactMouseEvent) => void;
  onLeave: () => void;
}) => (
  <div className="relative flex justify-center w-full cursor-pointer" style={{ height }} onMouseEnter={onHover} onMouseLeave={onLeave}>
    <svg width="18" height={height} viewBox={`0 0 18 ${height}`} aria-hidden>
      <path
        d={`M9 ${height} L9 7`}
        stroke={RESIDUAL_COLOR}
        strokeOpacity={active ? 1 : 0.75}
        strokeWidth={active ? 3.2 : 2.2}
        style={{ transition: "stroke-width 120ms, stroke-opacity 120ms" }}
      />
      <path d="M9 0 L4.5 9 L13.5 9 Z" fill={RESIDUAL_COLOR} fillOpacity={active ? 1 : 0.75} />
    </svg>
    {label && (
      <span
        className="absolute top-1/2 -translate-y-1/2 z-10 w-32 text-right leading-tight font-serif italic text-[11px] text-muted-foreground pointer-events-none"
        style={{ right: "calc(50% + 18px)" }}
      >
        {label}
      </span>
    )}
  </div>
);

// A right-angle polyline through waypoints, with the corners rounded off.
const rounded = (points: [number, number][], radius = 6) => {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let k = 1; k < points.length - 1; k++) {
    const [px, py] = points[k - 1];
    const [cx, cy] = points[k];
    const [nx, ny] = points[k + 1];
    const inLen = Math.hypot(cx - px, cy - py) || 1;
    const outLen = Math.hypot(nx - cx, ny - cy) || 1;
    const rIn = Math.min(radius, inLen / 2);
    const rOut = Math.min(radius, outLen / 2);
    d += ` L ${cx + ((px - cx) / inLen) * rIn} ${cy + ((py - cy) / inLen) * rIn}`;
    d += ` Q ${cx} ${cy}, ${cx + ((nx - cx) / outLen) * rOut} ${cy + ((ny - cy) / outLen) * rOut}`;
  }
  const [lx, ly] = points[points.length - 1];
  return `${d} L ${lx} ${ly}`;
};

interface OverlayState {
  attention: string[];
  serial: string[];
  continuation: { d: string; x: number; y: number } | null;
  promptBracket: { d: string; cx: number; y: number } | null;
}

const LoopingTransformerDiagram = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const attentionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outputRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const inputRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [overlay, setOverlay] = useState<OverlayState>({ attention: [], serial: [], continuation: null, promptBracket: null });
  const [hover, setHover] = useState<{ kind: ArrowKind; x: number; y: number } | null>(null);
  const [circuitHover, setCircuitHover] = useState(false);
  const [circuitPin, setCircuitPin] = useState(false);
  const circuit = circuitHover || circuitPin;

  const showHover = (kind: ArrowKind) => (e: ReactMouseEvent) => {
    const b = boxRef.current?.getBoundingClientRect();
    if (!b) return;
    const x = Math.max(4, Math.min(e.clientX - b.left - 140, b.width - 300));
    setHover({ kind, x, y: e.clientY - b.top + 16 });
  };
  const clearHover = () => setHover(null);

  useLayoutEffect(() => {
    const measure = () => {
      const box = boxRef.current;
      if (!box) return;
      const b = box.getBoundingClientRect();
      const rel = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return { left: r.left - b.left, right: r.right - b.left, cx: r.left + r.width / 2 - b.left, cy: r.top + r.height / 2 - b.top, top: r.top - b.top, bottom: r.bottom - b.top };
      };
      const outputs = outputRefs.current.slice(0, COLUMN_COUNT);
      const inputs = inputRefs.current.slice(0, COLUMN_COUNT);
      const attentionCells = Array.from({ length: COLUMN_COUNT * UNROLLED_LAYERS.length }, (_, k) => attentionRefs.current[k]);
      if ([...outputs, ...inputs, ...attentionCells].some((el) => !el)) return;
      const outPills = outputs.map((el) => rel(el!));
      const inPills = inputs.map((el) => rel(el!));
      const attn = (col: number, row: number) => rel(attentionRefs.current[col * UNROLLED_LAYERS.length + row]!);

      // Masked causal attention. Layer ℓ+1 reads the keys and values a past
      // token left on its way out of layer ℓ, so an attention edge cannot run
      // sideways: reaching a later token costs at least a layer, the same as a
      // vertical hop. Each arrow leaves the top of an attention block, climbs
      // the gutter beside its column, crosses right along the gap just below
      // its target, and enters an attention block higher up in a later column.
      // Three representative climbs (rows run top to bottom):
      //   • layer 1 → layer 2, the one-layer hop between the two kept early layers
      //   • layer 2 → layer 64, across the folded band (last layer before the fold to the top)
      //   • layer 1 → layer 64, the full-height reach
      // Every ordered token pair gets all three, since a later token reads
      // every earlier token at every layer.
      const rowOf = (layer: number) => UNROLLED_LAYERS.indexOf(layer);
      const TRANSITIONS: { srcRow: number; tgtRow: number }[] = [];
      if (rowOf(1) >= 0 && rowOf(2) >= 0) TRANSITIONS.push({ srcRow: rowOf(1), tgtRow: rowOf(2) });
      if (rowOf(2) >= 0) TRANSITIONS.push({ srcRow: rowOf(2), tgtRow: 0 });
      if (rowOf(1) >= 0) TRANSITIONS.push({ srcRow: rowOf(1), tgtRow: 0 });

      const attentionPaths: string[] = [];
      TRANSITIONS.forEach((t, ti) => {
        if (t.srcRow <= t.tgtRow) return;
        let slot = 0;
        for (let i = 0; i < COLUMN_COUNT; i++) {
          for (let j = i + 1; j < COLUMN_COUNT; j++) {
            const src = attn(i, t.srcRow); // lower layer, earlier token
            const tgt = attn(j, t.tgtRow); // higher layer, later token
            const span = j - i;
            const gutterX = src.right + 8 + ti * 8 + span * 4;
            const lane = tgt.bottom + 11 + slot * 5; // just below the target layer
            const x2 = tgt.left + (tgt.right - tgt.left) * (0.5 - 0.1 * (span - 1)) + ti * 4;
            slot += 1;
            attentionPaths.push(
              rounded([
                [src.right - 5, src.top],
                [gutterX, src.top],
                [gutterX, lane],
                [x2, lane],
                [x2, tgt.bottom + 1],
              ]),
            );
          }
        }
      });

      // The serial channel: a sampled token drops from the top of one pass to
      // the bottom of the next. Only where the source pass actually generates.
      const serialPaths: string[] = [];
      for (let i = 0; i < COLUMN_COUNT - 1; i++) {
        if (!PASSES[i].outputGenerated) continue;
        const o = outPills[i];
        const n = inPills[i + 1];
        const gx = (attn(i, 0).right + attn(i + 1, 0).left) / 2;
        serialPaths.push(
          `M ${o.right + 3} ${o.cy} L ${gx - 8} ${o.cy} Q ${gx} ${o.cy}, ${gx} ${o.cy + 8}` +
            ` L ${gx} ${n.cy - 8} Q ${gx} ${n.cy}, ${gx + 8} ${n.cy} L ${n.left - 4} ${n.cy}`,
        );
      }

      const lastGen = PASSES[COLUMN_COUNT - 1].outputGenerated;
      const last = outPills[COLUMN_COUNT - 1];
      const continuation = lastGen ? { d: `M ${last.right + 3} ${last.cy} L ${last.right + 30} ${last.cy}`, x: last.right + 38, y: last.cy } : null;

      // The bracket grouping the prompt tokens fed in at the bottom.
      const promptCols = PASSES.map((p, idx) => (p.inputFromPrompt ? idx : -1)).filter((x) => x >= 0);
      const bx1 = inPills[promptCols[0]].left - 6;
      const bx2 = inPills[promptCols[promptCols.length - 1]].right + 6;
      const by = Math.max(...promptCols.map((c) => inPills[c].bottom)) + 9;
      const promptBracket = { d: `M ${bx1} ${by - 7} L ${bx1} ${by} L ${bx2} ${by} L ${bx2} ${by - 7}`, cx: (bx1 + bx2) / 2, y: by };

      setOverlay({ attention: attentionPaths, serial: serialPaths, continuation, promptBracket });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (boxRef.current) ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, []);

  const residualActive = circuit || hover?.kind === "residual";
  const serialActive = circuit || hover?.kind === "serial";
  const attentionActive = hover?.kind === "attention";
  const residualArrowProps = { active: residualActive, onHover: showHover("residual"), onLeave: clearHover };

  return (
    <figure className="not-prose my-8">
      <div className="flex flex-col items-center gap-1.5 mb-3">
        <span
          role="button"
          tabIndex={0}
          onMouseEnter={() => setCircuitHover(true)}
          onMouseLeave={() => setCircuitHover(false)}
          onClick={() => setCircuitPin((p) => !p)}
          onKeyDown={(e) => e.key === "Enter" && setCircuitPin((p) => !p)}
          className={`cursor-help select-none rounded-full border-2 px-4 py-1.5 font-serif text-sm transition-colors ${
            circuit ? "text-white" : "bg-card underline decoration-dashed decoration-primary/50 underline-offset-4 hover:border-foreground/60"
          }`}
          style={circuit ? { background: LOOP_COLOR, borderColor: LOOP_COLOR } : { borderColor: "hsl(var(--border))" }}
        >
          Show the circuit of maximum length
        </span>
        <p
          className="m-0 text-center font-serif italic text-[12.5px] text-muted-foreground max-w-md transition-opacity duration-200"
          style={{ opacity: circuit ? 1 : 0 }}
        >
          {LAYER_COUNT} layers of circuit per pass, then everything squeezes through one ≈{Math.round(TOKEN_BITS)}-bit token
          before the next pass: serial depth grows with every generated token.
        </p>
      </div>

      <div className="overflow-x-auto overflow-y-hidden pb-2">
        <div
          ref={boxRef}
          className="relative w-fit mx-auto flex items-start gap-16 pr-12 pt-2 pb-10"
          style={{ paddingLeft: 160 }}
          aria-label="information flow of a Transformer reasoning token by token"
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" aria-hidden>
            <defs>
              <marker id="looping-attention-arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill={ATTENTION_COLOR} />
              </marker>
              <marker id="looping-serial-arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill={LOOP_COLOR} />
              </marker>
            </defs>
            {overlay.attention.map((d, i) => (
              <path
                key={`a${i}`}
                d={d}
                fill="none"
                stroke={ATTENTION_COLOR}
                strokeWidth={attentionActive ? 3.2 : 2}
                strokeOpacity={attentionActive ? 1 : circuit ? 0.22 : 0.75}
                markerEnd="url(#looping-attention-arrowhead)"
                style={{ transition: "stroke-width 120ms, stroke-opacity 120ms" }}
              />
            ))}
            {overlay.serial.map((d, i) => (
              <path
                key={`s${i}`}
                d={d}
                fill="none"
                stroke={LOOP_COLOR}
                strokeWidth={serialActive ? 2.8 : 1.8}
                strokeDasharray="6 5"
                markerEnd="url(#looping-serial-arrowhead)"
                style={{ transition: "stroke-width 120ms" }}
              />
            ))}
            {overlay.continuation && (
              <path
                d={overlay.continuation.d}
                fill="none"
                stroke={LOOP_COLOR}
                strokeWidth={serialActive ? 2.8 : 1.8}
                strokeDasharray="6 5"
              />
            )}
            {overlay.promptBracket && (
              <path d={overlay.promptBracket.d} fill="none" stroke="hsl(var(--muted-foreground))" strokeOpacity="0.45" strokeWidth="1.5" />
            )}
            {/* invisible fat twins to make the thin paths hoverable */}
            {overlay.attention.map((d, i) => (
              <path
                key={`ah${i}`}
                d={d}
                fill="none"
                stroke="transparent"
                strokeWidth="12"
                style={{ pointerEvents: "stroke", cursor: "pointer" }}
                onMouseEnter={showHover("attention")}
                onMouseLeave={clearHover}
              />
            ))}
            {overlay.serial.map((d, i) => (
              <path
                key={`sh${i}`}
                d={d}
                fill="none"
                stroke="transparent"
                strokeWidth="12"
                style={{ pointerEvents: "stroke", cursor: "pointer" }}
                onMouseEnter={showHover("serial")}
                onMouseLeave={clearHover}
              />
            ))}
          </svg>

          {overlay.continuation && (
            <span
              className="absolute font-serif text-lg -translate-y-1/2 z-20"
              style={{ left: overlay.continuation.x, top: overlay.continuation.y, color: LOOP_COLOR }}
            >
              ⋯
            </span>
          )}
          {overlay.promptBracket && (
            <span
              className="absolute z-20 -translate-x-1/2 font-serif italic text-[11px] text-muted-foreground whitespace-nowrap"
              style={{ left: overlay.promptBracket.cx, top: overlay.promptBracket.y + 4 }}
            >
              the prompt, read in parallel (prefill)
            </span>
          )}

          {PASSES.map((pass, i) => (
            <div key={i} className="flex flex-col items-center w-36 shrink-0">
              <span
                ref={(el) => {
                  outputRefs.current[i] = el;
                }}
                className={`font-mono text-sm px-2.5 py-1 rounded-md ${
                  pass.outputGenerated ? "text-white" : "border border-dashed border-border bg-muted text-muted-foreground/70"
                }`}
                style={pass.outputGenerated ? { background: LOOP_COLOR } : undefined}
              >
                {pass.output}
              </span>
              <ResidualArrow
                height={26}
                label={i === 2 ? `pick 1 token ≈ ${Math.round(TOKEN_BITS)} bits` : undefined}
                {...residualArrowProps}
              />
              <PaperBox kind="softmax" slim label="Softmax" className="w-full" />
              <ResidualArrow height={18} {...residualArrowProps} />
              <PaperBox kind="linear" slim label="Unembed" className="w-full" />
              <ResidualArrow
                height={30}
                label={i === 0 ? `the stream: ${num(STREAM_WIDTH)} numbers ≈ ${num(STREAM_BITS)} bits` : undefined}
                {...residualArrowProps}
              />
              {UNROLLED_LAYERS.map((layerIndex, r) => {
                const isLast = r === UNROLLED_LAYERS.length - 1;
                const gapToNext = isLast ? 0 : layerIndex - UNROLLED_LAYERS[r + 1];
                return (
                  <div key={layerIndex} className="w-full flex flex-col items-center">
                    <div className="w-full rounded-2xl border-2 border-foreground/30 bg-muted/40 px-2 pt-1 pb-2 flex flex-col items-center">
                      <span className="font-serif italic text-[10px] text-muted-foreground pb-0.5">Layer {layerIndex}</span>
                      <PaperBox kind="ff" slim label="Feed Forward" className="w-full" />
                      <ResidualArrow height={14} {...residualArrowProps} />
                      <div
                        ref={(el) => {
                          attentionRefs.current[i * UNROLLED_LAYERS.length + r] = el;
                        }}
                        className="w-full"
                      >
                        <PaperBox kind="attention" slim label="Masked Attention" className="w-full" />
                      </div>
                    </div>
                    {/* contiguous layers host the short climbing arrows, so their
                        gap is taller; the folded band shows the ellipsis bubble */}
                    {gapToNext === 1 && <ResidualArrow height={54} {...residualArrowProps} />}
                    {gapToNext > 1 && (
                      <>
                        <ResidualArrow height={16} {...residualArrowProps} />
                        <div className="rounded-full border-2 border-foreground/40 bg-card px-3 py-1 font-serif italic text-[11px] text-muted-foreground whitespace-nowrap">
                          ⋯ {HIDDEN_LAYER_COUNT} more layers ⋯
                        </div>
                        <ResidualArrow height={16} {...residualArrowProps} />
                      </>
                    )}
                  </div>
                );
              })}
              <ResidualArrow height={22} {...residualArrowProps} />
              <PaperBox kind="embedding" slim label="Embedding" className="w-full" />
              <ResidualArrow height={18} {...residualArrowProps} />
              <span
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                className={`font-mono text-sm px-2.5 py-1 rounded-md ${
                  pass.inputFromPrompt ? "border border-border bg-card text-foreground/80" : "text-white"
                }`}
                style={pass.inputFromPrompt ? undefined : { background: LOOP_COLOR }}
              >
                {pass.input}
              </span>
              {!pass.inputFromPrompt && (
                <span className="pt-1 font-serif italic text-[11px]" style={{ color: LOOP_COLOR }}>
                  sampled, fed back
                </span>
              )}
            </div>
          ))}

          {hover && (
            <div
              className="absolute z-30 w-72 rounded-lg border-2 bg-card px-3 py-2 text-[12px] leading-snug shadow-xl pointer-events-none"
              style={{ left: hover.x, top: hover.y, borderColor: HOVER_INFO[hover.kind].color }}
            >
              <div className="font-serif italic mb-0.5" style={{ color: HOVER_INFO[hover.kind].color }}>
                {HOVER_INFO[hover.kind].title}
              </div>
              <p className="m-0">{HOVER_INFO[hover.kind].body}</p>
            </div>
          )}
        </div>
      </div>

      <figcaption className="mt-3 mx-auto max-w-2xl space-y-1 text-[12px] leading-snug text-muted-foreground">
        <div className="flex items-baseline gap-2">
          <span className="inline-block w-5 h-[3px] shrink-0" style={{ background: RESIDUAL_COLOR }} />
          <span>
            wide: inside one pass, the residual stream carries {num(STREAM_WIDTH)} numbers × 16 bits = {num(STREAM_BITS)} bits
            per token, at every one of the {LAYER_COUNT} layers.
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="inline-block w-5 h-[3px] shrink-0" style={{ background: ATTENTION_COLOR }} />
          <span>
            wide too: masked causal attention lets every later pass read the keys and values this pass left behind: 2 ×{" "}
            {KEY_VALUE_HEADS} key-value heads × {HEAD_DIMENSION} dimensions × 16 bits = {num(ATTENTION_BITS_PER_LAYER)} bits per
            layer, × {LAYER_COUNT} layers = {num(ATTENTION_BITS_TOTAL)} bits ≈ 2.1 megabits per past token.
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="inline-block w-5 border-t-2 border-dashed shrink-0" style={{ borderColor: LOOP_COLOR }} />
          <span>
            narrow: the serial channel is one sampled token, log₂({num(VOCABULARY_SIZE)}) ≈ {Math.round(TOKEN_BITS)} bits, about
            4,800× less than the stream.
          </span>
        </div>
        <div className="pt-0.5 font-serif italic">Hover any arrow to see exactly what it carries.</div>
      </figcaption>
    </figure>
  );
};

export default LoopingTransformerDiagram;
