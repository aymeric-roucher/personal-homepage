import { ReactNode } from "react";

// The pastel boxes of the Attention Is All You Need figure, so the page keeps
// the silhouette of the original schema.
export const PAPER = {
  softmax: { bg: "#d5ead7", border: "#7fae85" },
  linear: { bg: "#dcdff2", border: "#8f96c9" },
  addnorm: { bg: "#f7f0c8", border: "#c2b268" },
  attention: { bg: "#fadfc0", border: "#d29a58" },
  ff: { bg: "#cfe4f5", border: "#7ba7cc" },
  embedding: { bg: "#f8d8da", border: "#cc8a8f" },
} as const;

export type PaperKind = keyof typeof PAPER;

interface PaperBoxProps {
  kind: PaperKind;
  label: ReactNode; // the box title, as in the figure
  children?: ReactNode; // detail content below the title
  className?: string;
  slim?: boolean; // a label-only bar, like "Add & Norm" in the figure
}

const PaperBox = ({ kind, label, children, className = "", slim = false }: PaperBoxProps) => {
  const c = PAPER[kind];
  return (
    <div
      className={`rounded-xl border-2 ${slim ? "px-4 py-1.5" : "px-4 py-3"} ${className}`}
      style={{ background: c.bg, borderColor: c.border }}
    >
      <div className="font-serif text-center text-[15px] text-[#2b2b28]">{label}</div>
      {children && <div className="pt-2">{children}</div>}
    </div>
  );
};

export default PaperBox;
