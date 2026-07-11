import { D, DK, H, Layer } from "./data";
import Matrix from "./Matrix";
import { MathText } from "./TeX";

// What happens above the heads, drawn instead of described: the H output
// blocks stack to H·d_k rows and W_O, a trapezoid, squeezes them back into the
// stream's width.
const ConcatProject = ({ layer }: { layer: Layer }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="420" height="76" viewBox="0 0 420 76" role="img" aria-label={`the ${H * DK} stacked rows are projected back down to D = ${D}`}>
        {/* the trapezoid: wide base = H·d_k rows, narrower top = D rows */}
        <polygon points="80,4 340,4 410,72 10,72" fill="#dcdff2" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinejoin="round" />
        <text x="210" y="32" textAnchor="middle" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic" fill="hsl(var(--foreground))">
          Concatenate, then project back down
        </text>
        <text x="210" y="54" textAnchor="middle" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic" fill="hsl(var(--foreground))">
          from H·d_k (sum of all head dimensions) back to D
        </text>
      </svg>
      <div className="text-[11px] text-muted-foreground italic max-w-sm text-center">
        <MathText>{String.raw`one learned matrix, $W_O$ ($D \times H d_k$), does it in a single multiplication`}</MathText>
      </div>

      <div className="flex items-center gap-4">
        {layer.heads.slice(0, 2).map((h, i) => (
          <Matrix key={i} data={h.out} name={<>head {i + 1} out</>} rowLabel="d_k" colLabel="T" cellSize={15} />
        ))}
        <span className="font-serif italic text-sm text-muted-foreground">… ×{H} heads</span>
      </div>
      <div className="text-[11px] text-muted-foreground italic">
        <MathText>{String.raw`the ${H} blocks stack to $H d_k = ${H * DK}$ rows`}</MathText>
      </div>
    </div>
  );
};

export default ConcatProject;
