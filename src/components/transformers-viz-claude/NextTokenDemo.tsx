import { useEffect, useMemo, useState } from "react";
import { LOOP_COLOR } from "./data";

const PROMPT = ["What", "is", "the", "capital", "of", "France", "?"];
const ANSWER = ["The", "capital", "of", "France", "is", "Paris", "."];
const PAUSE_TICKS = 5; // rest on the finished answer before looping

// A Decoder at work, before any internals are shown: it answers a question by
// predicting one token at a time, each new token appended and the model run
// again.
const NextTokenDemo = () => {
  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setTick((t) => (t + 1) % (ANSWER.length + PAUSE_TICKS)), 550);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const shown = reduceMotion ? ANSWER.length : Math.min(tick, ANSWER.length);
  const generating = shown < ANSWER.length;

  return (
    <div className="rounded-xl border border-border bg-card/60 px-4 py-3 flex flex-col items-center gap-2 my-1">
      <div className="flex flex-wrap items-center justify-center gap-1">
        {PROMPT.map((tok, i) => (
          <span key={i} className="font-mono text-sm px-2 py-1 rounded-md border border-border bg-muted/60 text-muted-foreground">
            {tok}
          </span>
        ))}
        {ANSWER.slice(0, shown).map((tok, i) => (
          <span
            key={i}
            className="font-mono text-sm px-2 py-1 rounded-md border bg-card"
            style={i === shown - 1 && generating !== false ? { borderColor: LOOP_COLOR, boxShadow: `0 0 0 1px ${LOOP_COLOR}55` } : { borderColor: "hsl(var(--border))" }}
          >
            {tok}
          </span>
        ))}
        {generating && <span className="w-2 h-5 animate-pulse rounded-sm" style={{ background: LOOP_COLOR }} aria-hidden />}
      </div>
      <div className="text-[11px] text-muted-foreground italic">
        a Decoder answering: predict the next token, append it, run again, until the answer is complete
      </div>
    </div>
  );
};

export default NextTokenDemo;
