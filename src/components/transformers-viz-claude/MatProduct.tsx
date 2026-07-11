import { ReactNode } from "react";

// The one multiplication symbol of the page: × in a circle, like the sketch.
// Drawn, not typeset, so it sits dead-center in the circle.
export const TimesBubble = ({ size = 36 }: { size?: number }) => (
  <span
    className="flex items-center justify-center rounded-full border-2 border-foreground/70 text-foreground/70 bg-card shrink-0 select-none"
    style={{ width: size, height: size }}
    aria-label="matrix product"
  >
    <svg width={size * 0.42} height={size * 0.42} viewBox="0 0 10 10" aria-hidden>
      <path d="M 1.5 1.5 L 8.5 8.5 M 8.5 1.5 L 1.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </span>
);

// Same treatment for the addition nodes: a drawn, dead-centered +.
export const PlusGlyph = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden>
    <path d="M 5 1 L 5 9 M 1 5 L 9 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const PlusBubble = ({ size = 36 }: { size?: number }) => (
  <span
    className="flex items-center justify-center rounded-full border-2 border-foreground/70 text-foreground/70 bg-card shrink-0 select-none"
    style={{ width: size, height: size }}
    aria-label="addition"
  >
    <PlusGlyph size={size * 0.42} />
  </span>
);

interface MatProductProps {
  left: ReactNode; // the left operand, to the left of the × bubble
  top: ReactNode; // the right operand, directly above the × bubble
  result: ReactNode; // after the equal sign, to the right
}

// C = A × B: A to the left of the × bubble, B directly above the bubble,
// "=" and C to the right.
const MatProduct = ({ left, top, result }: MatProductProps) => (
  <div
    className="grid items-center justify-items-center gap-x-3 gap-y-2 w-fit max-w-full"
    style={{ gridTemplateColumns: "auto auto auto auto" }}
  >
    <div aria-hidden />
    {top}
    <div aria-hidden />
    <div aria-hidden />
    {left}
    <TimesBubble />
    <span className="font-serif text-2xl text-muted-foreground select-none">=</span>
    {result}
  </div>
);

export default MatProduct;
