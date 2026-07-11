import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import {
  D,
  DFF,
  DK,
  H,
  K_COLOR,
  L,
  Layer,
  MASK_COLOR,
  Q_COLOR,
  RESIDUAL_COLOR,
  T,
  TOKENS,
  V_COLOR,
  heatColor,
} from "./data";
import Matrix from "./Matrix";
import Note from "./Note";
import TeX, { MathText } from "./TeX";
import FlowUp from "./FlowUp";
import { AttentionIsAllYouNeed } from "./links";
import { PlusGlyph } from "./MatProduct";
import StreamArrow from "./StreamArrow";
import PaperBox from "./PaperBox";
import ConcatProject from "./ConcatProject";
import HeadDetail from "./HeadDetail";

const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

// ------------------------------------------------------------ the head deck
// All H heads as one stack of sheets, like the sketch. Hover with intent (or
// tap) opens the machine room.
const HeadDeck = ({ layer, onOpen }: { layer: Layer; onOpen: () => void }) => {
  const timer = useRef<number | null>(null);
  const head = layer.heads[0];
  return (
    <div
      className="relative cursor-zoom-in group w-fit max-w-full"
      role="button"
      tabIndex={0}
      onMouseEnter={() => {
        if (canHover()) timer.current = window.setTimeout(onOpen, 500);
      }}
      onMouseLeave={() => {
        if (timer.current) window.clearTimeout(timer.current);
      }}
      onClick={onOpen}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
    >
      {/* the sheets behind: one per extra head */}
      <div className="absolute inset-0 translate-x-[10px] -translate-y-[10px] rounded-xl border-2 border-foreground/35 bg-card" aria-hidden />
      <div className="absolute inset-0 translate-x-[5px] -translate-y-[5px] rounded-xl border-2 border-foreground/45 bg-card" aria-hidden />
      <div className="relative rounded-xl border-2 border-foreground/70 bg-card px-4 py-3 transition-shadow group-hover:shadow-lg flex flex-col items-center gap-2">
        <div className="flex items-center justify-between w-full gap-4 flex-wrap">
          <TeX
            tex={`\\mathrm{softmax}\\!\\left(\\mathrm{mask}\\!\\left(\\frac{\\textcolor{${Q_COLOR}}{Q}^{\\top}\\textcolor{${K_COLOR}}{K}}{\\sqrt{d_k}}\\right)\\right)\\cdot\\textcolor{${V_COLOR}}{V}`}
            className="text-[14px]"
          />
          <span className="font-serif italic text-sm text-muted-foreground whitespace-nowrap">
            Attn head ×{H}
          </span>
        </div>
        <div className="flex items-end gap-3 overflow-x-auto max-w-full pb-1">
          <Matrix data={head.q} name={<span style={{ color: Q_COLOR }}>Q</span>} rowLabel="d_k" colLabel="T" cellSize={15} />
          <Matrix data={head.k} name={<span style={{ color: K_COLOR }}>K</span>} rowLabel="d_k" colLabel="T" cellSize={15} />
          <Matrix data={head.v} name={<span style={{ color: V_COLOR }}>V</span>} rowLabel="d_k" colLabel="T" cellSize={15} />
          {/* its attention pattern */}
          <div className="flex flex-col items-center gap-0.5 shrink-0">
            <span className="font-serif italic text-sm text-foreground/85">A</span>
            <div className="grid" style={{ gridTemplateColumns: `repeat(${T}, 9px)` }}>
              {head.attn.flatMap((row, r) =>
                row.map((v, c) => (
                  <div key={`${r}-${c}`} style={{ width: 9, height: 9, background: c > r ? "transparent" : heatColor(v) }} className="border border-border/40" />
                )),
              )}
            </div>
          </div>
        </div>
        <span className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">zoom into the head ⌕</span>
      </div>
    </div>
  );
};

// ------------------------------------------------------ feed-forward hourglass
// Drawn like the sketch: project up, ReLU kink, project down (bottom-up).
const FFShape = ({ layer }: { layer: Layer }) => (
  <div className="flex items-center gap-3 flex-wrap justify-center">
    <svg width="210" height="168" viewBox="0 0 210 168" role="img" aria-label="feed-forward: project up, ReLU, project down">
      {/* project down (top: executed last, flow is upward) */}
      <polygon points="75,6 135,6 195,52 15,52" fill="#e3eef8" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinejoin="round" />
      <rect x="15" y="58" width="180" height="48" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <path d="M55 96 L105 96 L150 66" fill="none" stroke={V_COLOR} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M55 96 L150 96" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3 3" />
      {/* project up (bottom: executed first) */}
      <polygon points="15,112 195,112 135,158 75,158" fill="#e3eef8" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinejoin="round" />
      <text x="105" y="36" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontFamily="Georgia,serif" fontStyle="italic">
        project down 4D→D
      </text>
      <text x="38" y="76" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontFamily="Georgia,serif" fontStyle="italic">
        ReLU
      </text>
      <text x="105" y="140" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontFamily="Georgia,serif" fontStyle="italic">
        project up D→4D
      </text>
    </svg>
    <div className="flex flex-col gap-2 max-w-[270px]">
      <div className="font-serif italic text-sm text-muted-foreground">
        D={D} → 4D={DFF} → D={D}
      </div>
      <TeX tex="\mathrm{FFN}(x) = W_2\,\mathrm{ReLU}(W_1 x + b_1) + b_2" className="text-[13px]" />
      <div className="text-xs text-muted-foreground">
        <Note label="the hidden layer, cell by cell" side="right" wide title="Inside the hidden layer">
          <p>
            The {DFF}-wide scratchpad for each token, after the ReLU. Cells ringed in red were negative and got clipped
            to exactly 0; that kink is the whole point.
          </p>
          <div className="flex justify-center py-1">
            <Matrix
              data={layer.hidden}
              rowLabel={`d_ff=${DFF}`}
              topLabels={TOKENS}
              cellSize={18}
              maxRows={8}
              colLabel="T"
              cellRing={(r, c) => (layer.hiddenPre[r][c] < 0 ? `${MASK_COLOR}99` : null)}
            />
          </div>
        </Note>
      </div>
    </div>
  </div>
);

// -------------------------------------------------------------- add & norm bar
interface ResidualHandlers {
  onResidualEnter: () => void;
  onResidualLeave: () => void;
  onResidualClick: () => void;
  active: boolean;
}

const AddNormBar = ({ onResidualEnter, onResidualLeave, onResidualClick, active }: ResidualHandlers) => (
  <div className="w-fit mx-auto">
    <div className="rounded-xl border-2 border-foreground/40 bg-card px-4 py-1.5 font-serif text-[15px]">
      <span className="flex items-center gap-2">
        <button
          type="button"
          onMouseEnter={onResidualEnter}
          onMouseLeave={onResidualLeave}
          onClick={onResidualClick}
          aria-label="highlight the residual bypass"
          className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-foreground/70 text-foreground/70 bg-card transition-shadow"
          style={{ boxShadow: active ? `0 0 0 3px ${RESIDUAL_COLOR}44` : undefined }}
        >
          <PlusGlyph size={12} />
        </button>
        <Note
          title="LayerNorm: along D, never along T"
          wide
          wrapClassName="flex-1 self-stretch flex items-center justify-center"
          block={<span>Add &amp; Norm</span>}
        >
          <p>
            <TeX tex="\mathrm{LN}(x) = \gamma \odot \frac{x - \mu}{\sqrt{\sigma^2 + \varepsilon}} + \beta" block />
          </p>
          <p>
            <MathText>{String.raw`$\mu$ and $\sigma$ are computed over the $D$ coordinates of one single token column: these are vectors in model space, and letting their scale drift layer after layer would make the geometry meaningless and training unstable.`}</MathText>
          </p>
          <p>
            It is emphatically <b>not</b> done along <TeX tex="T" />: mixing statistics across positions would leak one
            token's representation into another outside of attention, even breaking causality.
          </p>
          <p className="text-muted-foreground">
            <AttentionIsAllYouNeed /> norms after the addition (post-norm); modern models norm at each sublayer's entrance
            (pre-norm), which is more stable at depth, and often use the cheaper RMSNorm (no centering, no β).
          </p>
        </Note>
      </span>
    </div>
  </div>
);

// ----------------------------------------------------------- residual wrapper
// Wraps a sublayer box with everything the residual story needs: the arrow
// carrying the stream in, the square-angle arrow branching off it and around
// the box, and the Add & Norm bar where the two meet again.
const AddResidual = ({
  children,
  entryData,
  outData,
  onResidualEnter,
  onResidualLeave,
  onResidualClick,
  active,
}: ResidualHandlers & { children: ReactNode; entryData: number[][]; outData: number[][] }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const entryRef = useRef<HTMLDivElement>(null);
  const [g, setG] = useState<{ d: string; tip: [number, number]; labelX: number; labelY: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const w = wrapRef.current;
      if (!w || !barRef.current || !boxRef.current || !entryRef.current) return;
      const wr = w.getBoundingClientRect();
      const rel = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return { cy: r.top + r.height / 2 - wr.top, right: r.right - wr.left, cx: r.left + r.width / 2 - wr.left };
      };
      const bar = rel(barRef.current);
      const box = rel(boxRef.current);
      const entry = rel(entryRef.current);
      // branch off the entry arrow itself, hug the widest element on the right
      const xR = Math.max(bar.right, box.right) + 20;
      // the bypass ends touching the Add & Norm bar's right edge
      setG({
        d: `M ${entry.cx} ${entry.cy} H ${xR} V ${bar.cy} H ${bar.right + 9}`,
        tip: [bar.right + 1, bar.cy],
        labelX: xR,
        labelY: (entry.cy + bar.cy) / 2,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const stroke = active ? RESIDUAL_COLOR : `${RESIDUAL_COLOR}cc`;
  const strokeW = active ? 3.4 : 2.4;
  const handlers = { onMouseEnter: onResidualEnter, onMouseLeave: onResidualLeave, onClick: onResidualClick };

  return (
    // symmetric padding: the right lane hosts the bypass, the matching left
    // padding keeps the content on the page's vertical axis
    <div ref={wrapRef} className="relative w-fit max-w-full mx-auto sm:px-12">
      <div className="flex flex-col items-center">
        <div ref={barRef}>
          <AddNormBar onResidualEnter={onResidualEnter} onResidualLeave={onResidualLeave} onResidualClick={onResidualClick} active={active} />
        </div>
        <StreamArrow data={outData} height={24} title="The sublayer's contribution">
          <p>What the box just computed, on its way to being added into the stream at ⊕:</p>
        </StreamArrow>
        <div ref={boxRef} className="max-w-full">{children}</div>
        <div ref={entryRef} className="w-full">
          <StreamArrow data={entryData} height={30} />
        </div>
      </div>
      {g && (
        <svg className="absolute inset-0 w-full h-full hidden sm:block" style={{ pointerEvents: "none" }} aria-hidden>
          <path
            d={g.d}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeW}
            style={{ transition: "stroke 150ms, stroke-width 150ms", filter: active ? `drop-shadow(0 0 4px ${RESIDUAL_COLOR}88)` : undefined }}
          />
          <path d={g.d} fill="none" stroke="transparent" strokeWidth="16" style={{ pointerEvents: "stroke", cursor: "pointer" }} {...handlers} />
          <path d={`M ${g.tip[0] + 8} ${g.tip[1] - 4.5} L ${g.tip[0] + 8} ${g.tip[1] + 4.5} L ${g.tip[0]} ${g.tip[1]} Z`} fill={stroke} />
          <text
            x={g.labelX + 11}
            y={g.labelY}
            fontSize="11"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            fill={active ? RESIDUAL_COLOR : `${RESIDUAL_COLOR}bb`}
            textAnchor="middle"
            transform={`rotate(-90 ${g.labelX + 11} ${g.labelY})`}
            style={{ pointerEvents: "all", cursor: "pointer", fontWeight: active ? 700 : 400 }}
            {...handlers}
          >
            residual x
          </text>
        </svg>
      )}
    </div>
  );
};

// ------------------------------------------------------------ one full layer
interface LayerBlockProps {
  layer: Layer;
  defaultOpen?: boolean;
  /** Layers 2..L: same skeleton, but Feed Forward and Masked Multi-Head
   * Attention are label-only boxes so the stack stays short. */
  compact?: boolean;
}

const LayerBlock = ({ layer, defaultOpen = false, compact = false }: LayerBlockProps) => {
  const [pinned, setPinned] = useState(defaultOpen);
  const [hovering, setHovering] = useState(false);
  const [everOpened, setEverOpened] = useState(defaultOpen);
  const [headOpen, setHeadOpen] = useState(false);
  const hoverTimer = useRef<number | null>(null);
  const leaveTimer = useRef<number | null>(null);
  const open = pinned || hovering;

  // residual highlight: hover glows, click pins; 1 = the bypass around
  // attention (carrying x), 2 = the one around the FFN (carrying norm1)
  const [resFocus, setResFocus] = useState<1 | 2 | null>(null);
  const [resPinned, setResPinned] = useState<1 | 2 | null>(null);
  const which = resFocus ?? resPinned;
  const resActive = which !== null;

  const enter = () => {
    if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
    hoverTimer.current = window.setTimeout(() => {
      setHovering(true);
      setEverOpened(true);
    }, 140);
  };
  const leave = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    leaveTimer.current = window.setTimeout(() => setHovering(false), 300);
  };

  const resProps = (w: 1 | 2) => ({
    onResidualEnter: () => setResFocus(w),
    onResidualLeave: () => setResFocus(null),
    onResidualClick: () => setResPinned((p) => (p === w ? null : w)),
    active: resActive,
  });

  return (
    <div
      className={`rounded-[26px] border-2 bg-muted/40 transition-colors w-full ${open ? "border-foreground/60" : "border-foreground/30 hover:border-foreground/50"}`}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <button
        type="button"
        onClick={() => {
          setPinned((p) => !p);
          setEverOpened(true);
        }}
        className="w-full flex items-baseline justify-between px-5 py-3 text-left gap-3"
      >
        <span className="font-serif text-lg">
          Layer {layer.index}
          <span className="text-muted-foreground text-sm font-sans ml-3">
            {compact ? "same wiring as layer 1, its own learned weights" : "masked multi-head attention, then feed-forward"}
          </span>
        </span>
      </button>

      <div className="grid transition-[grid-template-rows] duration-300 ease-in-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          {everOpened && (
            <div className="px-4 sm:px-8 pb-6 pt-1">
              <div className="relative">
                {/* residual explanation, lit together with the path, centered in the viewport */}
                <div
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-80 max-w-[92vw] rounded-lg border-2 bg-card px-4 py-3 text-[12.5px] leading-snug shadow-2xl transition-opacity duration-200"
                  style={{ borderColor: RESIDUAL_COLOR, opacity: resActive ? 1 : 0, pointerEvents: resActive ? "auto" : "none" }}
                  onMouseEnter={() => which && setResFocus(which)}
                  onMouseLeave={() => setResFocus(null)}
                >
                  <div className="font-serif italic mb-1" style={{ color: RESIDUAL_COLOR }}>
                    The residual bypass: a gradient highway
                  </div>
                  <p className="m-0">
                    The stream bypasses the sublayer and is <b>added</b> back at ⊕:{" "}
                    <TeX tex="\mathrm{out} = x + \mathrm{sublayer}(x)" />. The block only writes a correction, never a
                    rewrite.
                  </p>
                  <p className="m-0 mt-1">
                    During backpropagation, <TeX tex="\tfrac{\partial}{\partial x}(x + f(x)) = I + f'(x)" />: the identity
                    term lets gradients flow straight down all {L} layers, untouched, tempering vanishing and explosion.
                    Without these bypasses, deep stacks barely train.
                  </p>
                </div>

                <div>
                  {!compact && <StreamArrow data={layer.out} label="x′, ready for the next layer" />}

                  {/* feed-forward, wrapped by its residual */}
                  <AddResidual entryData={layer.norm1} outData={layer.ffnOut} {...resProps(2)}>
                    {compact ? (
                      <PaperBox kind="ff" slim label={<span className="px-10">Feed Forward</span>} />
                    ) : (
                    <PaperBox
                      kind="ff"
                      label={
                        <Note
                          title="Position-wise, 4× wide, and nonlinear on purpose"
                          wide
                          wrapClassName="block"
                          block={<span className="block w-full px-8 py-1 -my-1">Feed Forward</span>}
                        >
                          <p>
                            <MathText>{String.raw`The same two projections are applied to every token column independently: nothing crosses the $T$ axis here. Attention mixes tokens; the feed-forward net thinks about each one separately, in a space $4\times$ wider ($4D = ${DFF}$).`}</MathText>
                          </p>
                          <p>
                            This is the layer's memory bank: roughly 2/3 of a GPT's parameters live in these two
                            projections (biases included, as in <AttentionIsAllYouNeed />). It is where the "knowledge"
                            is stored.
                          </p>
                          <p>
                            <MathText>{String.raw`Two stacked linear maps multiply into a single linear map: $W_2(W_1 x + b_1) + b_2$ is just one affine projection. The ReLU kink is where the network actually computes.`}</MathText>
                          </p>
                          <p className="text-muted-foreground">
                            <MathText>{String.raw`$\mathrm{ReLU}(z) = \max(0, z)$ in`}</MathText> <AttentionIsAllYouNeed />;
                            modern models use smooth variants (GELU) or gated ones (SwiGLU).
                          </p>
                        </Note>
                      }
                    >
                      <FFShape layer={layer} />
                      <div className="flex justify-center pt-1">
                        <div className="font-serif italic text-[12.5px] text-muted-foreground max-w-md text-center">
                          without the ReLU kink, "project up then down" would collapse into one boring D×D linear map
                        </div>
                      </div>
                    </PaperBox>
                    )}
                  </AddResidual>

                  {/* masked multi-head attention, wrapped by its residual */}
                  <AddResidual entryData={layer.input} outData={layer.attnProj} {...resProps(1)}>
                    {compact ? (
                      <PaperBox kind="attention" slim label={<span className="px-4">Masked Multi-Head Attention</span>} />
                    ) : (
                    <PaperBox
                      kind="attention"
                      label={
                        <span>
                          Masked Multi-Head Attention
                          <span className="block text-xs text-muted-foreground pt-0.5">
                            why several heads?{" "}
                            <Note title="Why several heads?" label="each looks for a different kind of relation">
                            <p>
                              <MathText>{String.raw`Each head gets its own $W_Q$, $W_K$, $W_V$ and works in its own $d_k = ${DK}$ wide space: one may track syntax, another coreference, another plain copying. Their outputs are stacked to $H d_k = ${H * DK}$ rows and projected back into the stream by $W_O$, the trapezoid above.`}</MathText>
                            </p>
                            <p className="text-muted-foreground">
                              <AttentionIsAllYouNeed />{" "}
                              <MathText>{String.raw`uses $H = 8$ heads of width $64$, with $H d_k = d_{model} = 512$ exactly. All $${T}$ positions are processed at once: attention is one big parallel matrix product, which is exactly why this architecture beat recurrent networks on real hardware.`}</MathText>
                            </p>
                            </Note>
                          </span>
                        </span>
                      }
                    >
                      <div className="flex flex-col items-center gap-2 pt-1">
                        <ConcatProject layer={layer} />
                        <FlowUp height={20} />
                        <HeadDeck layer={layer} onOpen={() => setHeadOpen(true)} />
                      </div>
                    </PaperBox>
                    )}
                  </AddResidual>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <HeadDetail layer={layer} open={headOpen} onOpenChange={setHeadOpen} />
    </div>
  );
};

export default LayerBlock;
