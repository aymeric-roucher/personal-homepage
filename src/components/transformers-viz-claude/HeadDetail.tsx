import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  D,
  DK,
  K_COLOR,
  L,
  Layer,
  MASK_COLOR,
  Q_COLOR,
  T,
  TOKENS,
  V_COLOR,
  fmt2,
  heatColor,
  heatInk,
  isMasked,
  transpose,
} from "./data";
import Matrix from "./Matrix";
import MatMul from "./MatMul";
import { TimesBubble } from "./MatProduct";
import MixAnim from "./MixAnim";
import Note from "./Note";
import TeX from "./TeX";
import { AttentionIsAllYouNeed } from "./links";
import { useFocusStore } from "./store";

const Section = ({ n, title, children }: { n: number; title: ReactNode; children: ReactNode }) => (
  <section className="space-y-3">
    <h3 className="font-serif text-lg border-b border-border pb-1">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background text-[13px] font-sans mr-2 align-[2px]">
        {n}
      </span>
      {title}
    </h3>
    {children}
  </section>
);

// Interactive: why the √d_k divisor exists. Drag the head width and watch the
// unscaled softmax saturate into a one-hot spike whose gradient is dead.
const SqrtDkDemo = () => {
  const [exp, setExp] = useState(2); // d_k = 2^exp
  const dk = 2 ** exp;
  const base = [1.1, 0.4, -0.1, -0.5, -0.9]; // per-unit-scale score profile
  const softmax = (xs: number[]) => {
    const m = Math.max(...xs);
    const es = xs.map((x) => Math.exp(x - m));
    const z = es.reduce((a, b) => a + b, 0);
    return es.map((e) => e / z);
  };
  const unscaled = softmax(base.map((u) => u * Math.sqrt(dk)));
  const scaled = softmax(base);

  const bars = (ps: number[], label: ReactNode) => (
    <div className="flex flex-col gap-0.5 w-44">
      <div className="text-[11px] text-muted-foreground text-center">{label}</div>
      {ps.map((p, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="h-3 rounded-sm" style={{ width: Math.max(2, p * 150), background: heatColor(p), transition: "width 150ms" }} />
          <span className="font-mono text-[9px] text-muted-foreground">{(p * 100).toFixed(0)}%</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="rounded-lg border border-border bg-card/60 px-4 py-3 flex flex-col items-center gap-2">
      <div className="text-[13px]">
        A dot product sums d_k terms, so its typical size grows like <TeX tex="\sqrt{d_k}" />:
      </div>
      <div className="flex items-center gap-3 w-64">
        <TeX tex={`d_k = ${dk}`} className="text-sm w-20" />
        <Slider value={[exp]} min={0} max={6} step={1} onValueChange={(v) => setExp(v[0])} aria-label="head width" />
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {bars(unscaled, <span>softmax of raw scores (<TeX tex="\sigma \approx \sqrt{d_k}" />)</span>)}
        {bars(scaled, <span>after dividing by <TeX tex="\sqrt{d_k}" /></span>)}
      </div>
      <div className="text-[12px] text-muted-foreground max-w-md text-center">
        Unscaled, wider heads saturate the softmax into a one-hot spike: its gradient is near zero and the head stops
        learning. Divided by <TeX tex="\sqrt{d_k}" />, the distribution keeps the same healthy shape at any width.
      </div>
    </div>
  );
};

interface HeadDetailProps {
  layer: Layer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// The machine room: one attention head, every step of
// softmax(mask(QᵀK/√d_k))·V spelled out with the real numbers.
const HeadDetail = ({ layer, open, onOpenChange }: HeadDetailProps) => {
  const head = layer.heads[0];
  const input = layer.input;
  const storeT = useFocusStore((st) => st.focusT);
  const setFocus = useFocusStore((st) => st.setFocus);
  const clearFocus = useFocusStore((st) => st.clearFocus);
  const row = storeT ?? T - 1;
  const sqrtDk = Math.sqrt(DK);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[88vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif flex items-center gap-3 flex-wrap">
            Attention in detail
            <span className="flex gap-1 flex-wrap">
              {layer.heads.map((h, i) => (
                <span
                  key={i}
                  title={i === 0 ? undefined : "same mechanism, its own learned weights"}
                  className={`text-xs font-sans px-2.5 py-1 rounded-full border ${
                    i === 0 ? "bg-foreground text-background border-foreground" : "bg-card border-border opacity-50 select-none"
                  }`}
                >
                  head {i + 1}
                </span>
              ))}
            </span>
          </DialogTitle>
          <DialogDescription>
            <TeX tex="\mathrm{head}(X) = \mathrm{softmax}\!\left(\mathrm{mask}\!\left(\tfrac{Q^\top K}{\sqrt{d_k}}\right)\right)\cdot V" />{" "}
            <span className="text-xs block pt-1">
              this is <b>self</b>-attention: the name given to attention when the same input matrix is the source of the
              queries, the keys and the values
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 pt-2">
          <Section
            n={1}
            title={
              <>
                Project the input into 3 spaces → the <span style={{ color: Q_COLOR }}>Query</span>,{" "}
                <span style={{ color: K_COLOR }}>Key</span> and <span style={{ color: V_COLOR }}>Value</span> matrices
              </>
            }
          >
            <p className="text-[13.5px] text-foreground/85">
              Per token: a <b style={{ color: Q_COLOR }}>query</b> ("what am I looking for?"), a{" "}
              <b style={{ color: K_COLOR }}>key</b> ("what do I contain?") and a{" "}
              <b style={{ color: V_COLOR }}>value</b> ("what do I hand over if someone attends to me?").{" "}
              <Note title="Weights, biases, initialization" wide label="Three small learned matrices, no bias and no activation">
                <p>
                  The attention projections of <AttentionIsAllYouNeed /> are pure matrix multiplications. The softmax
                  only cares about score differences within a row, so a query bias cancels out exactly; most
                  implementations leave all three biases off. The feed-forward sublayer does use biases.
                </p>
                <p>
                  Initialization: random small numbers, scaled so signals neither blow up nor die layer after layer.
                  Xavier/Glorot draws from <TeX tex="\pm\sqrt{6/(n_{in}+n_{out})}" />; GPT-2 uses{" "}
                  <TeX tex="\mathcal{N}(0, 0.02^2)" /> and additionally shrinks the projections that write into the
                  residual stream by <TeX tex="1/\sqrt{2L}" />: with L = {L} layers, 2L sublayer writes accumulate, and
                  this keeps the stream's variance flat at depth.
                </p>
              </Note>
              : the nonlinearity comes later, from the softmax itself.
            </p>
            {/* X on the left, then three aligned rows: × bubble, weight matrix,
                equal sign, result */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
              <Matrix data={input} name="X, the input" rowLabel="D" colLabel="T" topLabels={TOKENS} cellSize={22} />
              <div className="flex flex-col gap-5">
                {(
                  [
                    { w: head.wq, r: head.q, wn: "W_Q", rn: "Q", color: Q_COLOR },
                    { w: head.wk, r: head.k, wn: "W_K", rn: "K", color: K_COLOR },
                    { w: head.wv, r: head.v, wn: "W_V", rn: "V", color: V_COLOR },
                  ] as const
                ).map(({ w, r, wn, rn, color }) => (
                  <div key={wn} className="flex items-center gap-3">
                    <TimesBubble size={24} />
                    <Matrix data={w} name={<span style={{ color }}>{wn}</span>} rowLabel="d_k" colLabel="D" cellSize={18} />
                    <span className="font-serif text-2xl text-muted-foreground select-none">=</span>
                    <Matrix data={r} name={<span style={{ color }}>{rn}</span>} rowLabel="d_k" colLabel="T" topLabels={TOKENS} cellSize={18} />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[13px] text-muted-foreground text-center">
              each head reads the full D = {D} wide token but works in its own d_k = {DK} wide space
            </p>
          </Section>

          <Section n={2} title={<>Compute the attention of each key towards each query: <TeX tex="S = Q^\top K / \sqrt{d_k}" /></>}>
            <p className="text-[13.5px] text-foreground/85">
              Cell (t, s) asks: how much does token t's <span style={{ color: Q_COLOR }}>query</span> match token s's{" "}
              <span style={{ color: K_COLOR }}>key</span>? One dot product per pair, spelled out term by term below. The
              same (t, s) you point at here stays lit in the mask, the softmax and the mixing below.
            </p>
            <MatMul
              a={transpose(head.q)}
              b={head.k}
              c={head.scores}
              aName={<TeX tex="Q^\top" />}
              bName={<TeX tex="K" />}
              cName={<TeX tex="S = Q^\top K / \sqrt{d_k}" />}
              cShort="S"
              aRowLabels={TOKENS}
              bColLabels={TOKENS}
              aDims={["T", "d_k"]}
              bDims={["d_k", "T"]}
              cDims={["T", "T"]}
              postScale={`÷ √d_k (= ${sqrtDk}) →`}
              cell={24}
              syncFocus
            />
            <SqrtDkDemo />
          </Section>

          <Section n={3} title="Mask the future">
            <p className="text-[13.5px] text-foreground/85">
              We mask for causality: each token may attend to itself and the ones before it, that's it. Everything above
              the diagonal is{" "}
              <Note title="Why −∞ and not just 0?" label="overwritten with −∞">
                <p>
                  Zero is a legitimate score (it means "average match"), so zeroing would still leak weight to the
                  future. <TeX tex="e^{-\infty} = 0" /> is the only value the softmax turns into a true hard zero.
                </p>
              </Note>{" "}
              so that, after the softmax, those weights come out exactly 0. This triangle is the entire difference
              between a decoder and an encoder: without it, each position could see its own answer, and training in
              decoder mode would just be the model cheating.
            </p>
            <div className="flex justify-center" onMouseLeave={clearFocus}>
              <Matrix
                data={head.scores}
                name="mask(S)"
                rowLabel="T"
                colLabel="T"
                leftLabels={TOKENS}
                topLabels={TOKENS}
                maskFn={isMasked}
                activeRow={row}
                onCell={(r, c) => setFocus(r, isMasked(r, c) ? null : c)}
                cellSize={26}
              />
            </div>
            <p className="text-[13px] text-muted-foreground text-center">
              row of <span className="font-mono">{TOKENS[row]}</span>: {row + 1} live score{row ? "s" : ""},{" "}
              {T - 1 - row} forbidden cell{T - 1 - row === 1 ? "" : "s"}
            </p>
          </Section>

          <Section n={4} title={<>Softmax, one row at a time: <TeX tex="A_{ts} = e^{S_{ts}} / \sum_{s' \le t} e^{S_{ts'}}" /></>}>
            <p className="text-[13.5px] text-foreground/85">
              Each row becomes a probability distribution: exponentiate, divide by the row's sum. Row <TeX tex="t" /> now
              holds the attention weights token <TeX tex="t" /> will spend on tokens <TeX tex="0 \dots t" />: positive,
              summing to exactly <TeX tex="1" />, with hard zeros after position <TeX tex="t" />.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6" onMouseLeave={clearFocus}>
              <Matrix
                data={head.attn}
                name="A = softmax(mask(S))"
                rowLabel="T"
                colLabel="T"
                leftLabels={TOKENS}
                topLabels={TOKENS}
                heat
                precision={2}
                activeRow={row}
                onCell={(r, c) => setFocus(r, c <= r ? c : null)}
                cellSize={26}
              />
              <div className="flex flex-col items-center gap-1.5">
                <div className="font-serif italic text-sm">row of {TOKENS[row]}, sums to 1</div>
                <div className="flex">
                  {head.attn[row].map((w, s) => (
                    <div
                      key={s}
                      className="flex items-center justify-center font-mono text-[10px] border border-border/70"
                      style={{
                        width: 34,
                        height: 26,
                        background: s > row ? undefined : heatColor(w),
                        color: s > row ? MASK_COLOR : heatInk(w),
                      }}
                    >
                      {s > row ? "0" : fmt2(w)}
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-muted-foreground max-w-[15rem] text-center">
                  these {row + 1} numbers are the coefficients fed to the next step
                </div>
              </div>
            </div>
          </Section>

          <Section n={5} title={<>Mix the values: output column t <TeX tex="= \sum_{s \le t} A_{ts}\, v_s" /></>}>
            <MixAnim head={head} />
          </Section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HeadDetail;
