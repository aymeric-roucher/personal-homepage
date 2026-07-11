import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Head, T, TOKENS, fmt2, heatColor, heatInk } from "./data";
import Matrix from "./Matrix";
import { PlusGlyph } from "./MatProduct";
import { useFocusStore } from "./store";

const CELL_A = 22;

interface Arrow {
  d: string;
  color: string;
  w: number;
  tip: [number, number, number]; // x, y, angle
}

// The payoff of attention, drawn as plumbing out of real Matrix components. V
// and the output are the two split-up matrices of the page: one bracketed
// vector per token, output vector s sitting directly below value vector s.
// Row t of A hands out one coefficient per value vector; the weighted vectors
// flow DOWN into a ⊕ where they fuse, and the sum flows down again into
// output vector t. Arrows are measured off the live DOM. Cycles through t on
// its own; hover an output vector (or a row of A) to focus, in sync with the
// other animations.
const MixAnim = ({ head }: { head: Head }) => {
  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  const [autoT, setAutoT] = useState(T - 1);
  const [localT, setLocalT] = useState<number | null>(null);
  const storeT = useFocusStore((st) => st.focusT);
  const setFocus = useFocusStore((st) => st.setFocus);
  const clearFocus = useFocusStore((st) => st.clearFocus);

  useEffect(() => {
    if (reduceMotion || localT !== null) return;
    const id = window.setInterval(() => setAutoT((t) => (t + 1) % T), 850);
    return () => window.clearInterval(id);
  }, [reduceMotion, localT]);

  const t = localT ?? storeT ?? autoT;
  const weights = head.attn[t];

  const enter = (tt: number) => {
    setLocalT(tt);
    setFocus(tt, null);
  };
  const leave = () => {
    setLocalT(null);
    clearFocus();
  };

  // ---------------------------------------- measured arrows over the layout
  const boxRef = useRef<HTMLDivElement>(null);
  const aGridRef = useRef<HTMLDivElement>(null);
  const plusRef = useRef<HTMLDivElement>(null);
  const vRefs = useRef<(HTMLDivElement | null)[]>([]);
  const oRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [arrows, setArrows] = useState<Arrow[]>([]);

  useLayoutEffect(() => {
    const measure = () => {
      const box = boxRef.current;
      const aGrid = aGridRef.current;
      const plus = plusRef.current;
      const oT = oRefs.current[t];
      if (!box || !aGrid || !plus || !oT) return setArrows([]);
      const b = box.getBoundingClientRect();
      const g = aGrid.getBoundingClientRect();
      const p = plus.getBoundingClientRect();
      const o = oT.getBoundingClientRect();
      const rowY = g.top - b.top + t * CELL_A + CELL_A / 2;
      const rowRight = g.right - b.left + 6;
      const pcx = p.left - b.left + p.width / 2;
      const pTop = p.top - b.top;
      const pBottom = p.bottom - b.top;
      const ocx = o.left - b.left + o.width / 2;
      const oTop = o.top - b.top;

      const next: Arrow[] = [];
      for (let s = 0; s <= t; s++) {
        const v = vRefs.current[s];
        if (!v) continue;
        const r = v.getBoundingClientRect();
        const vcx = r.left - b.left + r.width / 2;
        const vTop = r.top - b.top;
        const vBottom = r.bottom - b.top;
        const w = weights[s];
        const color = heatColor(0.25 + 0.75 * w);
        const sw = 1.4 + 3.2 * w;
        next.push({
          d: `M ${rowRight} ${rowY} C ${rowRight + 40} ${rowY}, ${vcx - 26} ${vTop - 28}, ${vcx - 2} ${vTop - 5}`,
          color,
          w: sw,
          tip: [vcx, vTop - 4, 55],
        });
        next.push({
          d: `M ${vcx} ${vBottom + 2} C ${vcx} ${vBottom + 20}, ${pcx} ${pTop - 24}, ${pcx} ${pTop - 3}`,
          color,
          w: sw,
          tip: [pcx, pTop - 2, 90],
        });
      }
      next.push({
        d: `M ${pcx} ${pBottom + 2} C ${pcx} ${pBottom + 16}, ${ocx} ${oTop - 20}, ${ocx} ${oTop - 3}`,
        color: "hsl(var(--foreground))",
        w: 1.8,
        tip: [ocx, oTop - 2, 90],
      });
      setArrows(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (boxRef.current) ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, [t, weights]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div ref={boxRef} className="relative w-fit max-w-full" onMouseLeave={leave}>
        <div className="flex items-start gap-8 flex-wrap justify-center">
          <Matrix
            data={head.attn}
            name={<>A, row {t} = the coefficients</>}
            leftLabels={TOKENS}
            rowLabel="T"
            colLabel="T"
            heat
            precision={2}
            cellSize={CELL_A}
            activeRow={t}
            gridRef={aGridRef}
            onCell={(r) => enter(r)}
          />

          <div className="flex flex-col items-center gap-5">
            {/* V, one bracketed value vector per token */}
            <div className="flex flex-col items-center gap-1">
              <div className="font-serif italic text-sm text-foreground/85">V, one value vector per token</div>
              <div className="flex gap-2.5 items-end">
                {TOKENS.map((tok, s) => {
                  const on = s <= t;
                  const w = weights[s];
                  return (
                    <div
                      key={s}
                      ref={(el) => (vRefs.current[s] = el)}
                      className="flex flex-col items-center gap-0.5 transition-opacity"
                      style={{ opacity: on ? 1 : 0.3 }}
                    >
                      <span className="text-[10px] font-mono">{tok}</span>
                      <span
                        className="text-[9px] font-mono px-1 rounded-sm border"
                        style={{
                          background: on ? heatColor(w) : undefined,
                          color: on ? heatInk(w) : "hsl(var(--muted-foreground))",
                          borderColor: on ? heatColor(w) : "hsl(var(--border))",
                        }}
                      >
                        {on ? fmt2(w) : "0"}
                      </span>
                      <Matrix data={head.v.map((row) => [row[s]])} cellSize={19} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* the ⊕ where the weighted vectors fuse */}
            <div ref={plusRef} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground/70 bg-card select-none">
              <PlusGlyph size={13} />
            </div>

            {/* the output, one bracketed vector per token, right below */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-2.5 items-start">
                {TOKENS.map((tok, s) => (
                  <div
                    key={s}
                    ref={(el) => (oRefs.current[s] = el)}
                    onMouseEnter={() => enter(s)}
                    className="flex flex-col items-center gap-0.5 transition-opacity cursor-crosshair rounded"
                    style={{ opacity: s === t ? 1 : 0.35, boxShadow: s === t ? "0 0 0 2px hsl(var(--foreground) / 0.7)" : undefined }}
                  >
                    <Matrix data={head.out.map((row) => [row[s]])} cellSize={19} />
                    <span className="text-[10px] font-mono" style={{ fontWeight: s === t ? 700 : 400 }}>
                      {tok}
                    </span>
                  </div>
                ))}
              </div>
              <div className="font-serif italic text-sm text-foreground/85">head output, one vector per token (d_k tall)</div>
            </div>
          </div>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          {arrows.map((a, i) => (
            <g key={i}>
              <path d={a.d} fill="none" stroke={a.color} strokeWidth={a.w} opacity="0.85" />
              <path d="M -6 -3.5 L -6 3.5 L 1 0 Z" fill={a.color} opacity="0.9" transform={`translate(${a.tip[0]} ${a.tip[1]}) rotate(${a.tip[2]})`} />
            </g>
          ))}
        </svg>
      </div>

      <p className="text-[13px] text-foreground/85 max-w-xl text-center">
        Each vector in the output takes in the values (that is, the meaning) of each of the previous vectors, according
        to the weights determined previously by attention.
      </p>
    </div>
  );
};

export default MixAnim;
