import { ReactNode } from "react";
import { TOKENS } from "./data";
import Matrix from "./Matrix";
import Note from "./Note";

interface StreamArrowProps {
  data: number[][]; // the D × T matrix transiting at this exact point
  title?: string; // popover title
  label?: ReactNode; // small caption hanging right of the arrow
  children?: ReactNode; // prose above the matrix in the popover
  cellRing?: (r: number, c: number) => string | null;
  height?: number;
}

// The residual stream drawn as what it is: an arrow. Hovering it opens the
// actual matrix transiting there, instead of cluttering the flow with it.
// No vertical padding: the arrow's tip and tail sit flush against the boxes
// above and below it.
const StreamArrow = ({ data, title = "Residual stream", label, children, cellRing, height = 34 }: StreamArrowProps) => (
  <div className="relative flex justify-center w-full">
    <Note
      side="right"
      title={title}
      wide
      block={
        <span className="inline-block px-4">
          <svg width="18" height={height} viewBox={`0 0 18 ${height}`} role="img" aria-label="the residual stream">
            <path d={`M9 ${height} L9 8`} stroke="hsl(var(--foreground))" strokeOpacity="0.7" strokeWidth="2.2" />
            <path d="M9 0 L4 10 L14 10 Z" fill="hsl(var(--foreground))" fillOpacity="0.7" />
          </svg>
        </span>
      }
    >
      {children ?? (
        <p>
          Between blocks there is only ever this: one D × T matrix that every block reads and adds its correction back
          into. The shape never changes from the embeddings to the logits.
        </p>
      )}
      <div className="flex justify-center py-1">
        <Matrix data={data} rowLabel="D" colLabel="T" topLabels={TOKENS} cellSize={20} cellRing={cellRing} />
      </div>
    </Note>
    {label && (
      <span
        className="absolute top-1/2 -translate-y-1/2 font-serif italic text-xs text-muted-foreground max-w-[42%]"
        style={{ left: "calc(50% + 26px)" }}
      >
        {label}
      </span>
    )}
  </div>
);

export default StreamArrow;
