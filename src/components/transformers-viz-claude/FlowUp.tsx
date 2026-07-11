import { ReactNode } from "react";

// Vertical arrow between blocks; computation flows upward, like the paper.
// The arrow itself is always dead-center on the stream axis; the label hangs
// off to the right without shifting it.
const FlowUp = ({ height = 30, label }: { height?: number; label?: ReactNode }) => (
  <div className="relative flex justify-center py-1 w-full">
    <svg width="16" height={height} viewBox={`0 0 16 ${height}`} aria-hidden>
      <path d={`M8 ${height} L8 7`} stroke="hsl(var(--foreground))" strokeOpacity="0.7" strokeWidth="1.8" />
      <path d="M8 0 L3.5 9 L12.5 9 Z" fill="hsl(var(--foreground))" fillOpacity="0.7" />
    </svg>
    {label && (
      <span
        className="absolute top-1/2 -translate-y-1/2 font-serif italic text-xs text-muted-foreground max-w-[42%] text-left"
        style={{ left: "calc(50% + 18px)" }}
      >
        {label}
      </span>
    )}
  </div>
);

export default FlowUp;
