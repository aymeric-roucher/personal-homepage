import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  D,
  DK,
  H,
  L,
  LAYERS,
  LOGITS,
  LOOP_COLOR,
  NEXT_TOKEN,
  PALETTE,
  T,
  TOKENS,
  VOCAB_ROWS,
  VOCAB_SIZE,
  X0,
  X_EMBED,
  X_FINAL,
  softmaxTemp,
} from "./data";
import Matrix from "./Matrix";
import MatProduct, { PlusBubble } from "./MatProduct";
import Note from "./Note";
import TeX, { MathText } from "./TeX";
import FlowUp from "./FlowUp";
import StreamArrow from "./StreamArrow";
import { AttentionIsAllYouNeed, IlyaSutskeverInterview } from "./links";
import NextTokenDemo from "./NextTokenDemo";
import PaperBox from "./PaperBox";
import PosEncNote from "./PosEncNote";
import LayerBlock from "./LayerBlock";

// The classic picture of embedding space, with the parallelogram spelled out.
const EmbeddingScatter = () => {
  const P: { w: string; x: number; y: number; dx?: number; dy?: number }[] = [
    { w: "man", x: 80, y: 150 },
    { w: "woman", x: 92, y: 78 },
    { w: "king", x: 196, y: 138 },
    { w: "queen", x: 208, y: 66 },
    { w: "cat", x: 252, y: 168, dx: -8, dy: 14 },
    { w: "dog", x: 282, y: 154 },
    { w: "kitten", x: 246, y: 130 },
  ];
  const at = (w: string) => P.find((p) => p.w === w)!;
  const arrow = (a: string, b: string, color: string) => {
    const p1 = at(a);
    const p2 = at(b);
    const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    const ex = p2.x - 8 * Math.cos(ang);
    const ey = p2.y - 8 * Math.sin(ang);
    return (
      <g key={`${a}-${b}`}>
        <line x1={p1.x} y1={p1.y} x2={ex} y2={ey} stroke={color} strokeWidth="1.6" strokeDasharray="4 3" />
        <path
          d={`M ${ex} ${ey} L ${ex - 7 * Math.cos(ang - 0.42)} ${ey - 7 * Math.sin(ang - 0.42)} L ${ex - 7 * Math.cos(ang + 0.42)} ${ey - 7 * Math.sin(ang + 0.42)} Z`}
          fill={color}
        />
      </g>
    );
  };
  return (
    <svg width="320" height="210" className="bg-muted/50 rounded-md" role="img" aria-label="2-dimensional projection of embedding space">
      {arrow("man", "king", PALETTE[4])}
      {arrow("woman", "queen", PALETTE[4])}
      {arrow("man", "woman", PALETTE[1])}
      {arrow("king", "queen", PALETTE[1])}
      <text x="128" y="118" fontSize="11" fontStyle="italic" fill={PALETTE[4]}>
        + royalty
      </text>
      <text x="52" y="112" fontSize="11" fontStyle="italic" fill={PALETTE[1]}>
        + feminine
      </text>
      {P.map((p) => (
        <g key={p.w} fontFamily="ui-monospace, monospace" fontSize="11">
          <circle cx={p.x} cy={p.y} r="3.5" fill="hsl(var(--foreground))" />
          <text x={p.x + (p.dx ?? 6)} y={p.y + (p.dy ?? -6)} fill="hsl(var(--foreground))">
            {p.w}
          </text>
        </g>
      ))}
      <text x="14" y="22" fontFamily="Georgia, serif" fontStyle="italic" fontSize="12.5" fill="hsl(var(--muted-foreground))">
        king − man + woman ≈ queen
      </text>
    </svg>
  );
};

// Notation pills, hover for the reasoning behind each letter.
const NOTATION: { sym: ReactNode; val: string; body: ReactNode }[] = [
  {
    sym: <b>T</b>,
    val: `= ${T}`,
    body: (
      <>
        <b>Sequence length</b>: the number of tokens in the context, one column per token. T for "time": in generation,
        positions really are timesteps. <AttentionIsAllYouNeed /> writes n; every codebase writes T.
      </>
    ),
  },
  {
    sym: <b>D</b>,
    val: `= ${D}`,
    body: (
      <>
        <b>Model width</b> (d_model in <AttentionIsAllYouNeed />): the length of each token's vector everywhere in the
        residual stream.
      </>
    ),
  },
  {
    sym: (
      <b>
        H, d<sub>k</sub>
      </b>
    ),
    val: `= ${H}, ${DK}`,
    body: (
      <>
        <b>Heads</b> and <b>head width</b>: attention runs <TeX tex="H" /> times in parallel, each head in its own{" "}
        <TeX tex="d_k" />
        -wide space. <AttentionIsAllYouNeed />{" "}
        <MathText>{String.raw`picks $d_k = d_{model}/H$ ($8 \times 64 = 512$) so $H d_k = d_{model}$; here $${H} \times ${DK} = ${H * DK}$ rows get projected back to $D = ${D}$ by $W_O$. The $\sqrt{d_k}$ inside the softmax is this one.`}</MathText>
      </>
    ),
  },
  {
    sym: <b>L</b>,
    val: `= ${L}`,
    body: (
      <>
        <b>Layers</b> stacked. GPT-2 small: L = 12, D = 768, H = 12. Llama-3-70B: L = 80, D = 8192, H = 64.
      </>
    ),
  },
  {
    sym: <b>𝒱</b>,
    val: "= 50 257",
    body: (
      <>
        <b>Vocabulary size</b> (GPT-2's number): how many distinct tokens exist. The embedding table and the unembedding
        are 𝒱 × D.
      </>
    ),
  },
];

const TransformerSchema = () => {
  const schemaRef = useRef<HTMLDivElement>(null);
  const tokensRef = useRef<HTMLDivElement>(null);
  const pickRef = useRef<HTMLDivElement>(null);
  const [loop, setLoop] = useState<{ d: string; labelY: number; x: number } | null>(null);
  const [tau, setTau] = useState(1);

  const probs = softmaxTemp(LOGITS, tau);
  const tailMass = 1 - probs.reduce((a, b) => a + b, 0);

  // The sketch and the paper draw computation flowing upward: start the reader
  // at the bottom, where the text comes in.
  useEffect(() => {
    const id = window.setTimeout(() => {
      tokensRef.current?.scrollIntoView({ block: "center", behavior: "instant" as ScrollBehavior });
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  // The generation loop: the picked token rides down the right margin and
  // rejoins the input, then the whole machine runs again.
  useLayoutEffect(() => {
    const measure = () => {
      const box = schemaRef.current;
      const from = pickRef.current;
      const to = tokensRef.current;
      if (!box || !from || !to) return setLoop(null);
      const b = box.getBoundingClientRect();
      if (b.width < 760) return setLoop(null);
      const f = from.getBoundingClientRect();
      const t = to.getBoundingClientRect();
      const x = b.width - 22;
      const y1 = f.top + f.height / 2 - b.top;
      const y2 = t.top + t.height / 2 - b.top;
      const d = `M ${f.right - b.left + 10} ${y1} C ${x} ${y1}, ${x} ${y1 + 60}, ${x} ${y1 + 80}
                 L ${x} ${y2 - 60} C ${x} ${y2 + 10}, ${x - 40} ${y2}, ${t.right - b.left + 12} ${y2}`;
      setLoop({ d, labelY: y1 + 46, x });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (schemaRef.current) ro.observe(schemaRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="max-w-5xl xl:max-w-7xl mx-auto px-4 py-10 overflow-x-hidden">
      {/* -------------------------------------------------------------- header */}
      <header className="mb-8 max-w-3xl mx-auto text-center">
        <h1 className="font-serif text-3xl mb-1">The interactive Transformer</h1>
        <p className="font-serif italic text-muted-foreground text-lg mb-4">How it works, how it evolved</p>
        <div className="text-left text-[15px] text-foreground/85 space-y-3 mb-4">
          <p>
            The Transformer architecture was first introduced in the visionary 2017 paper <AttentionIsAllYouNeed />,
            which laid out both the Encoder and the Decoder variants: the first architectures to make efficient use of
            the revolutionary Attention component, the mechanism that finally made it possible to process text properly
            by dynamically focusing on certain words depending on which word is being processed. The Decoder variant is
            trained to generate text, token by token. It was so successful that it literally gave birth to the family
            of Large Language Models (LLMs), which kept scaling up, acquiring vaster intelligence along the way: today
            they help the most intelligent people on the planet, and tomorrow they will go even further.
          </p>
          <p>
            But first, how useful can predicting the next token of a sequence be? A short example before diving into the
            Decoder:
          </p>
          <NextTokenDemo />
          <p>
            A machine that can predict the next token, over any text, accurately enough is necessarily intelligent. In an
            Agatha Christie novel, when the text reads "Poirot then pointed at the assassin:", how could it predict the
            name that follows without having understood the whole plot and thought ahead? (
            <IlyaSutskeverInterview>Ilya Sutskever's example</IlyaSutskeverInterview>.)
          </p>
          <p>And now the Transformer architecture itself, in the Decoder variant.</p>
        </div>
        <button
          type="button"
          onClick={() => tokensRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
          className="mt-4 rounded-full px-5 py-2 font-serif text-sm bg-foreground text-background hover:opacity-90 transition-opacity"
        >
          Data flows upward: start reading at the bottom ↓
        </button>
      </header>

      {/* -------------------------------------------------------------- schema */}
      <div ref={schemaRef} className="relative lg:px-16 xl:px-40 flex flex-col items-center">
        {loop && (
          <>
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden>
              <defs>
                <marker id="tvc-loop-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill={LOOP_COLOR} />
                </marker>
              </defs>
              <path d={loop.d} fill="none" stroke={LOOP_COLOR} strokeWidth="2.5" strokeDasharray="8 6" markerEnd="url(#tvc-loop-arrow)" />
            </svg>
            <div
              className="absolute hidden lg:block w-36 text-[13px] leading-snug font-serif italic z-10"
              style={{ left: loop.x - 150, top: loop.labelY, color: LOOP_COLOR }}
            >
              the picked token is appended and the whole machine runs again, one lap per token of output
            </div>
          </>
        )}

        {/* --------------------------------------------- output probabilities */}
        <section className="flex flex-col items-center gap-2">
          <div className="font-serif text-xl">Output Probabilities</div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <div className="flex flex-col gap-1">
              {VOCAB_ROWS.map((r, i) => (
                <div key={r.token} className="flex items-center gap-2 text-xs font-mono">
                  <span className="w-12 text-right">{r.token}</span>
                  <div
                    className="h-3.5 rounded-sm"
                    style={{
                      width: Math.max(2, probs[i] * 200),
                      background: PALETTE[0],
                      boxShadow: i === 0 ? `0 0 0 2px ${LOOP_COLOR}` : undefined,
                      transition: "width 150ms",
                    }}
                  />
                  <span className="text-muted-foreground">{(probs[i] * 100).toFixed(1)}%</span>
                </div>
              ))}
              <div className="text-[11px] text-muted-foreground pl-14 pt-0.5">
                ⋮ the other {(VOCAB_SIZE - VOCAB_ROWS.length).toLocaleString("en-US")} tokens share {(tailMass * 100).toFixed(1)}%
              </div>
            </div>
            <Note
              title="Greedy, or a roll of the dice"
              side="bottom"
              block={
                <div ref={pickRef} className="flex items-center gap-3 rounded-xl border-2 border-foreground/60 bg-card px-4 py-2">
                  <span className="font-serif text-lg">pick one</span>
                  <span className="font-mono px-2.5 py-1 rounded-md text-white text-sm" style={{ background: LOOP_COLOR }}>
                    {NEXT_TOKEN}
                  </span>
                </div>
              }
            >
              <p>
                Take the most probable token, or sample from the distribution; that single random draw is the only
                nondeterminism in the whole machine. Top-k and top-p just trim the long tail before rolling.
              </p>
            </Note>
          </div>
        </section>

        <FlowUp />

        {/* ------------------------------------------------ softmax, with τ live */}
        <PaperBox
          kind="softmax"
          label={
            <span>
              Softmax <TeX tex="\;p_i = e^{\,l_i/\tau} / \textstyle\sum_j e^{\,l_j/\tau}" className="text-[13px]" />
            </span>
          }
        >
          <div className="flex flex-col items-center gap-1 w-64">
            <div className="w-full text-center text-sm font-serif italic">temperature τ = {tau.toFixed(2)}</div>
            <Slider value={[tau]} min={0.25} max={2} step={0.05} onValueChange={(v) => setTau(v[0])} aria-label="temperature" />
            <div className="flex justify-between w-full text-[10px] text-muted-foreground">
              <span>0.25 = confident</span>
              <span>2 = adventurous</span>
            </div>
            <p className="text-[11.5px] text-muted-foreground leading-snug text-center">
              cold (τ → 0) sharpens toward the single best token; hot (τ &gt; 1) flattens the distribution and lets
              unlikely continuations through
            </p>
          </div>
        </PaperBox>

        <FlowUp label="logits: one score per vocabulary token" />

        {/* --------------------------------------------------------- linear */}
        <PaperBox kind="linear" label={<span>Unembedding: turning the last token's vector into vocabulary logits</span>}>
          <div className="flex justify-center pt-1 overflow-x-auto max-w-full">
            <MatProduct
              left={
                <Note title="The embedding table, mirrored" block={
                  <div className="flex flex-col items-center">
                    <Matrix
                      data={VOCAB_ROWS.map((r) => r.w)}
                      name="W_U"
                      leftLabels={VOCAB_ROWS.map((r) => r.token)}
                      rowLabel="𝒱"
                      colLabel="D"
                      cellSize={19}
                    />
                    <div className="text-[11px] text-muted-foreground pt-0.5">⋮ {(VOCAB_SIZE - VOCAB_ROWS.length).toLocaleString("en-US")} more rows</div>
                  </div>
                }>
                  <p>
                    One row per vocabulary token: the logit for "you" is the dot product of its row with the final
                    column, a similarity test between what the stack built and what "you" means.
                  </p>
                  <p>
                    <MathText>{String.raw`$W_U$ is usually the embedding table itself, reused ("weight tying"): the same $\mathcal{V} \times D$ numbers, read the other way. Many modern models untie them.`}</MathText>
                  </p>
                </Note>
              }
              top={<Matrix data={X_FINAL.map((row) => [row[T - 1]])} rowLabel="D" cellSize={19} />}
              result={
                <div className="flex flex-col items-center">
                  <Matrix data={LOGITS.map((l) => [l])} name="logits" rowLabel="𝒱" leftLabels={VOCAB_ROWS.map((r) => r.token)} cellSize={19} />
                  <div className="text-[11px] text-muted-foreground pt-0.5">⋮</div>
                </div>
              }
            />
          </div>
        </PaperBox>

        <FlowUp />

        {/* ---------------------------------------------- picking the last column */}
        <section className="py-1">
          <Note
            title="One column to rule them all"
            side="left"
            block={
              <div className="rounded-xl border-2 border-foreground/40 bg-card/60 px-5 py-3">
                <div className="font-serif text-center text-[15px] mb-2">Pick the last token's final vector</div>
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
                  <Matrix
                    data={X_FINAL}
                    name={<>the stream after layer {L}</>}
                    rowLabel="D"
                    colLabel="T"
                    topLabels={TOKENS}
                    cellSize={22}
                    cellRing={(r, c) => (c === T - 1 ? `${LOOP_COLOR}aa` : null)}
                  />
                  <span className="block text-sm text-muted-foreground max-w-[16rem]">
                    only the <span style={{ color: LOOP_COLOR }}>last column</span> h_T is needed to predict the next
                    token: thanks to the causal mask it already summarizes everything before it
                  </span>
                </div>
              </div>
            }
          >
            <p>
              During <b>training</b>, all T columns produce logits at once and every position is scored on guessing its
              own next token: one forward pass, T supervised predictions.
            </p>
            <p className="text-muted-foreground">
              At inference, keys and values of past tokens are cached (the KV cache), so each lap only computes the new
              column.
            </p>
          </Note>
        </section>

        <StreamArrow data={X_FINAL} height={36} />

        {/* -------------------------------------------------------- the stack */}
        <section className="relative w-full max-w-3xl">
          <div className="space-y-1">
            {LAYERS.slice(1)
              .reverse()
              .map((ly) => (
                <div key={ly.index} className="space-y-1">
                  <LayerBlock layer={ly} compact defaultOpen />
                  <StreamArrow data={LAYERS[ly.index - 2].out} height={28} />
                </div>
              ))}
            <LayerBlock layer={LAYERS[0]} defaultOpen />
          </div>
        </section>

        <StreamArrow data={X0} label="X₀ = embeddings + positions, entering the stack" />

        {/* -------------------------------------------------------- positional */}
        {/* the stream passes exactly through ⊕; the encoding plugs in from the right */}
        <section className="relative w-full flex justify-center py-1">
          <PlusBubble size={44} />
          <span className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2" style={{ left: "calc(50% + 24px)" }}>
            <svg width="30" height="12" aria-hidden>
              <line x1="0" y1="6" x2="30" y2="6" stroke="hsl(var(--foreground))" strokeOpacity="0.6" strokeWidth="1.8" />
            </svg>
            <Note
            side="right"
            wide
            title="Positional Encoding: where am I in the sentence?"
            block={
              <span className="flex items-center gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-foreground/70 bg-card" aria-hidden>
                  <svg width="26" height="26" viewBox="0 0 26 26">
                    <path d="M 2 13 C 6 3, 10 3, 13 13 C 16 23, 20 23, 24 13" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.8" />
                  </svg>
                </span>
                <span className="font-serif text-lg underline decoration-dashed decoration-primary/50 underline-offset-4">
                  Positional Encoding
                </span>
              </span>
            }
          >
              <PosEncNote />
            </Note>
          </span>
        </section>

        <FlowUp />

        {/* -------------------------------------------------------- embedding */}
        <PaperBox kind="embedding" label="Token Embeddings">
          <div className="flex justify-center pt-1">
            <Note
              side="right"
              wide
              title="A point in meaning space"
              block={<Matrix data={X_EMBED} name={<>one column of D numbers per token</>} rowLabel="D" colLabel="T" topLabels={TOKENS} cellSize={28} />}
            >
              <p>
                The embedding table is a learned dictionary: {VOCAB_SIZE.toLocaleString("en-US")} rows, one D-dimensional
                vector per vocabulary entry. Nothing clever happens at lookup time; the cleverness is in where training
                has <i>placed</i> these points. Related tokens sit near each other, and whole directions carry meaning:
              </p>
              <div className="flex justify-center py-1">
                <EmbeddingScatter />
              </div>
              <p className="text-muted-foreground">
                Same offset, different pair: Paris − France + Italy ≈ Rome. A real model's space has hundreds of
                dimensions; this scatter is a 2-dimensional shadow.
              </p>
            </Note>
          </div>
        </PaperBox>

        <FlowUp label="each token id looks up its row in the 𝒱 × D embedding table" />

        {/* ----------------------------------------------------------- tokens */}
        <section className="flex flex-col items-center gap-1.5 pb-2">
          <div ref={tokensRef}>
            <Note
              title="Tokens, not words"
              side="right"
              block={
                <span className="flex items-end gap-1">
                  {TOKENS.map((tok, i) => (
                    <span key={i} className="font-mono text-sm px-2.5 py-1.5 rounded-md border border-border bg-card">
                      {tok}
                    </span>
                  ))}
                </span>
              }
            >
              <p>
                A byte-pair-encoding tokenizer splits text into frequently-seen chunks: common words survive whole,
                rarer ones shatter ("happy" → "hap" + "py"). About {VOCAB_SIZE.toLocaleString("en-US")} chunks cover
                anything ever written, and each token is just an integer id in [0, 𝒱).
              </p>
            </Note>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground select-none" style={{ width: 330 }}>
            <span className="text-[10px]">|←</span>
            <span className="flex-1 border-t border-muted-foreground/40" />
            <span className="text-xs font-medium">T = {T}</span>
            <span className="flex-1 border-t border-muted-foreground/40" />
            <span className="text-[10px]">→|</span>
          </div>
          <div className="font-serif italic text-muted-foreground">"Hey, I am happy to meet…"</div>
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {NOTATION.map((n, i) => (
              <Note key={i} side="top" block={<span className="rounded-full border border-border bg-card px-3 py-1 font-serif text-sm">{n.sym} {n.val}</span>}>
                <p>{n.body}</p>
              </Note>
            ))}
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          Drawn after the figure of <AttentionIsAllYouNeed /> (decoder side), at toy scale: D = {D} instead of 512,
          T = {T}.
        </footer>
      </div>
    </div>
  );
};

export default TransformerSchema;
