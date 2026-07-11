import { ReactNode, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface NoteProps {
  children: ReactNode; // the explanation content
  label?: string; // inline dashed-underline text trigger
  block?: ReactNode; // arbitrary element as trigger (wraps it)
  wrapClassName?: string; // sizing for the trigger wrapper: when the annotated text sits in a wider box, the whole box should be the target
  title?: string;
  side?: "top" | "bottom" | "left" | "right";
  wide?: boolean;
}

// An explanation bubble: opens on hover on desktop, on tap on mobile.
const Note = ({ children, label, block, wrapClassName = "", title, side = "top", wide = false }: NoteProps) => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const show = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  };

  // The trigger is always the annotated element itself (or a piece of inline
  // text), never a separate badge.
  const trigger = block ? (
    <span onMouseEnter={show} onMouseLeave={hide} className={`cursor-help ${wrapClassName}`}>
      {block}
    </span>
  ) : (
    <button
      type="button"
      onMouseEnter={show}
      onMouseLeave={hide}
      className="underline decoration-dashed decoration-primary/50 underline-offset-4 hover:decoration-primary cursor-help text-left"
    >
      {label ?? title}
    </button>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        side={side}
        collisionPadding={12}
        onMouseEnter={show}
        onMouseLeave={hide}
        className={`${wide ? "w-[28rem] max-w-[94vw]" : "w-80 max-w-[90vw]"} text-[13.5px] leading-relaxed shadow-lg border-primary/25 z-50`}
      >
        {title && <div className="font-serif italic font-medium mb-1.5">{title}</div>}
        <div className="text-foreground/90 space-y-2">{children}</div>
      </PopoverContent>
    </Popover>
  );
};

export default Note;
