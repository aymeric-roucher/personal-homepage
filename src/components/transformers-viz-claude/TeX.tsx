import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

// Real typeset math for the formulas (KaTeX is already a site dependency).
const TeX = ({ tex, block = false, className = "" }: { tex: string; block?: boolean; className?: string }) => {
  const html = useMemo(
    () => katex.renderToString(tex, { throwOnError: false, displayMode: block }),
    [tex, block],
  );
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

// Prose with $...$ insets, for the explanation cards: write the text as one
// string (String.raw when it contains backslashes) and every $...$ segment is
// typeset with KaTeX.
export const MathText = ({ children }: { children: string }) => (
  <>
    {children.split(/\$(.+?)\$/g).map((part, i) => (i % 2 === 1 ? <TeX key={i} tex={part} /> : <span key={i}>{part}</span>))}
  </>
);

export default TeX;
