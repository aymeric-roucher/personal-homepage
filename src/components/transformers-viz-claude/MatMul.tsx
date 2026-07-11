import { ReactNode, useEffect, useMemo, useState } from "react";
import { PALETTE, fmt2 } from "./data";
import Matrix from "./Matrix";
import MatProduct from "./MatProduct";
import { useFocusStore } from "./store";

interface MatMulProps {
  a: number[][]; // n×k, the left operand
  b: number[][]; // k×m, the right operand
  c: number[][]; // n×m, the displayed result (post-scaling allowed)
  aName: ReactNode;
  bName: ReactNode;
  cName: ReactNode;
  cShort: string; // for the equation strip, e.g. "S"
  aRowLabels?: string[];
  bColLabels?: string[];
  aDims: [string, string]; // rail letters, e.g. ["T", "d_k"]
  bDims: [string, string];
  cDims: [string, string];
  postScale?: string; // e.g. "÷ √d_k = 2"; shown between the raw sum and the result
  cell?: number;
  /** Wire the highlight into the shared focus store: C rows are t, C columns are s. */
  syncFocus?: boolean;
}

// An animated matrix product, built out of the page's Matrix component and
// laid out by MatProduct. It cycles through the result quite fast; hovering
// any cell (or a row of A, or a column of B) freezes it there, lights the same
// row and column up in all three matrices and, through the shared focus store,
// in the neighbouring animations too. The current cell's dot product is
// spelled out term by term below the matrices.
const MatMul = ({ a, b, c, aName, bName, cName, cShort, aRowLabels, bColLabels, aDims, bDims, cDims, postScale, cell = 24, syncFocus = false }: MatMulProps) => {
  const k = b.length;
  const m = b[0].length;
  const TOTAL = a.length * m;

  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  const [step, setStep] = useState(reduceMotion ? TOTAL - 1 : 0);
  const [local, setLocal] = useState<{ t: number | null; s: number | null } | null>(null);
  const storeT = useFocusStore((st) => st.focusT);
  const storeS = useFocusStore((st) => st.focusS);
  const setFocus = useFocusStore((st) => st.setFocus);
  const clearFocus = useFocusStore((st) => st.clearFocus);

  const paused = local !== null;
  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % TOTAL), 170);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, TOTAL]);

  const ci = local?.t ?? (syncFocus ? storeT : null) ?? Math.floor(step / m);
  const cj = local?.s ?? (syncFocus ? storeS : null) ?? step % m;

  const raw = useMemo(() => a[ci].reduce((acc, v, p) => acc + v * b[p][cj], 0), [a, b, ci, cj]);

  const enterA = (r: number) => {
    setLocal({ t: r, s: null });
    if (syncFocus) setFocus(r, null);
  };
  const enterB = (cc: number) => {
    setLocal({ t: null, s: cc });
    if (syncFocus) setFocus(null, cc);
  };
  const enterC = (r: number, cc: number) => {
    setLocal({ t: r, s: cc });
    if (syncFocus) setFocus(r, cc);
  };
  const leaveAll = () => {
    setLocal(null);
    if (syncFocus) clearFocus();
  };

  return (
    <div className="flex flex-col items-center gap-2" onMouseLeave={leaveAll}>
      <div className="overflow-x-auto max-w-full">
        <MatProduct
          left={
            <Matrix
              data={a}
              name={aName}
              leftLabels={aRowLabels}
              rowLabel={aDims[0]}
              colLabel={aDims[1]}
              cellSize={cell}
              activeRow={ci}
              onCell={(r) => enterA(r)}
            />
          }
          top={
            <Matrix
              data={b}
              name={bName}
              topLabels={bColLabels}
              rowLabel={bDims[0]}
              colLabel={bDims[1]}
              cellSize={cell}
              activeCol={cj}
              onCell={(_, cc) => enterB(cc)}
            />
          }
          result={
            <Matrix
              data={c}
              name={cName}
              leftLabels={aRowLabels}
              topLabels={bColLabels}
              rowLabel={cDims[0]}
              colLabel={cDims[1]}
              cellSize={cell}
              activeRow={ci}
              activeCol={cj}
              cellRing={(r, cc) => (r === ci && cc === cj ? "hsl(var(--foreground) / 0.75)" : null)}
              onCell={enterC}
            />
          }
        />
      </div>

      {/* the expanded dot product for the highlighted cell */}
      <div className="font-mono text-[11px] leading-6 text-center max-w-full overflow-x-auto px-2">
        <span className="text-muted-foreground">
          {cShort}[{ci},{cj}] ={" "}
        </span>
        {Array.from({ length: k }, (_, p) => (
          <span key={p}>
            {p > 0 && <span className="text-muted-foreground"> + </span>}
            <span className="px-1 py-0.5 rounded" style={{ background: `${PALETTE[p % PALETTE.length]}26`, boxShadow: `inset 0 0 0 1px ${PALETTE[p % PALETTE.length]}66` }}>
              {fmt2(a[ci][p])}×{fmt2(b[p][cj])}
            </span>
          </span>
        ))}
        <span className="text-muted-foreground"> = </span>
        {fmt2(raw)}
        {postScale && (
          <>
            <span className="text-muted-foreground"> {postScale} </span>
            <b>{fmt2(c[ci][cj])}</b>
          </>
        )}
      </div>
    </div>
  );
};

export default MatMul;
