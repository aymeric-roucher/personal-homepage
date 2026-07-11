import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { D, POS_ENC, T, divergingColor, fmt2 } from "./data";
import Matrix from "./Matrix";
import TeX from "./TeX";

// What goes inside the "Positional Encoding" popover: the formula, an
// interactive sinusoid (drag the dimension), our real values, and the barcode.
const PosEncNote = () => {
  const [dim, setDim] = useState(0);
  const pair = Math.floor(dim / 2);
  const freq = 1 / Math.pow(10000, (2 * pair) / D);
  const isSin = dim % 2 === 0;
  const TMAX = 32;
  const W = 340;
  const Hh = 90;
  const px = (t: number) => 8 + (t / TMAX) * (W - 16);
  const py = (v: number) => Hh / 2 - v * (Hh / 2 - 10);
  const wave = Array.from({ length: 321 }, (_, i) => {
    const t = (i / 320) * TMAX;
    const v = isSin ? Math.sin(t * freq) : Math.cos(t * freq);
    return `${i === 0 ? "M" : "L"} ${px(t)} ${py(v)}`;
  }).join(" ");

  return (
    <div className="space-y-2">
      <p>
        Attention alone is order-blind: shuffle the token columns and every dot product survives. So <i>where</i> is
        injected into the vectors themselves, one fixed sinusoid per row of the matrix:
      </p>
      <div className="text-center">
        <TeX tex="PE_{(2i,\,t)} = \sin\!\big(t/10000^{2i/D}\big) \qquad PE_{(2i+1,\,t)} = \cos\!\big(t/10000^{2i/D}\big)" />
      </div>

      {/* drag the dimension, watch the frequency fall */}
      <div className="rounded-lg border border-border bg-card/60 px-3 py-2 space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-xs w-24 shrink-0">
            row i = {dim} ({isSin ? "sin" : "cos"})
          </span>
          <Slider value={[dim]} min={0} max={D - 1} step={1} onValueChange={(v) => setDim(v[0])} aria-label="encoding dimension" />
        </div>
        <svg width={W} height={Hh} className="bg-muted/40 rounded">
          <line x1="0" y1={Hh / 2} x2={W} y2={Hh / 2} stroke="hsl(var(--border))" />
          <path d={wave} fill="none" stroke={divergingColor(0.9)} strokeWidth="1.8" />
          {Array.from({ length: T }, (_, t) => (
            <circle key={t} cx={px(t)} cy={py(isSin ? Math.sin(t * freq) : Math.cos(t * freq))} r="3.5" fill={divergingColor(-0.9)} />
          ))}
        </svg>
        <div className="text-[11px] text-muted-foreground">
          dots = our T = {T} positions; row {dim} oscillates with period {fmt2((2 * Math.PI) / freq)} positions. Early
          rows spin fast, deep rows are glacial: together they make a smooth binary counter, a unique barcode per
          position.
        </div>
      </div>

      <p>
        And for any offset Δ, PE(t+Δ) is a <em>linear</em> function of PE(t) (a rotation), so "look 3 tokens back" is
        easy for attention to express. Our real values, color = sign:
      </p>
      <div className="flex justify-center">
        <Matrix data={POS_ENC} rowLabel="D" colLabel="T" cellSize={22} cellBg={(v) => divergingColor(v)} />
      </div>
      <p>
        At a realistic scale the barcode appears (position →, dimension ↓):
      </p>
      <div className="flex flex-col items-center gap-1">
        <svg width={48 * 6} height={24 * 6} style={{ border: "1px solid hsl(var(--border))" }}>
          {Array.from({ length: 24 }, (_, i) =>
            Array.from({ length: 48 }, (_, t) => {
              const f = Math.pow(10000, (-Math.floor(i / 2) * 2) / 24);
              const v = i % 2 === 0 ? Math.sin(t * f) : Math.cos(t * f);
              return <rect key={`${i}-${t}`} x={t * 6} y={i * 6} width={6} height={6} fill={divergingColor(v)} />;
            }),
          )}
        </svg>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          −1
          <span className="inline-block h-2.5 w-24 rounded-sm" style={{ background: `linear-gradient(to right, ${divergingColor(-1)}, ${divergingColor(0)}, ${divergingColor(1)})` }} />
          +1
        </div>
      </div>
      <p className="text-muted-foreground">
        GPT-2 swapped these for a learned position table; most current models rotate Q and K inside each head instead
        (RoPE), encoding relative position right where it is consumed.
      </p>
    </div>
  );
};

export default PosEncNote;
