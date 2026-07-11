import { ReactNode } from "react";
import { MASK_COLOR, fmt, fmt2, heatColor, heatInk } from "./data";

export interface MatrixProps {
  data: number[][];
  name?: ReactNode; // caption above, e.g. "Q = W_Q · X"
  rowLabel?: string; // dimension on the left, e.g. "D"
  colLabel?: string; // dimension underneath, e.g. "T"
  topLabels?: string[]; // token names above columns
  leftLabels?: string[]; // token names left of rows (T×T matrices)
  cellSize?: number;
  precision?: 1 | 2;
  heat?: boolean | ((v: number) => number); // color by magnitude; fn maps value to [0,1]
  cellBg?: (v: number, r: number, c: number) => string; // arbitrary background, e.g. diverging color
  maskFn?: (r: number, c: number) => boolean; // causally forbidden cells
  cellRing?: (r: number, c: number) => string | null;
  activeRow?: number | null; // dim every other row
  activeCol?: number | null;
  maxRows?: number; // truncate tall matrices with an ellipsis row
  gridRef?: React.Ref<HTMLDivElement>; // the cells grid, for measured arrow overlays
  onCell?: (r: number, c: number) => void;
  onLeave?: () => void;
  className?: string;
}

// A matrix exactly as you would draw it on paper: a bracketed grid of square
// cells, every cell holding its number, and both dimensions written along the
// sides as full-extent rails with perpendicular stops.
const Matrix = ({
  data,
  name,
  rowLabel,
  colLabel,
  topLabels,
  leftLabels,
  cellSize = 26,
  precision = 1,
  heat = false,
  cellBg,
  maskFn,
  cellRing,
  activeRow = null,
  activeCol = null,
  maxRows,
  gridRef,
  onCell,
  onLeave,
  className = "",
}: MatrixProps) => {
  const cols = data[0].length;
  const truncated = maxRows !== undefined && data.length > maxRows;
  const rows = truncated ? data.slice(0, maxRows) : data;
  const format = precision === 2 ? fmt2 : fmt;
  // Four to five mono characters ("-0.4", "0.31") must fit inside one cell
  const fontSize = Math.max(7, Math.min(11, Math.floor(cellSize / (precision === 2 ? 3.1 : 2.6))));
  const hasFocus = activeRow !== null || activeCol !== null;

  return (
    <div className={`inline-flex flex-col items-center gap-1 ${className}`}>
      {name && <div className="font-serif italic text-sm text-foreground/85 text-center">{name}</div>}
      {/* rows: top labels / matrix / bottom rail; columns: left rail / left labels / bracket / grid / bracket */}
      <div className="grid" style={{ gridTemplateColumns: "auto auto auto auto auto" }} onMouseLeave={onLeave}>
        <div aria-hidden />
        <div aria-hidden />
        <div aria-hidden />
        {topLabels ? (
          <div className="flex">
            {topLabels.map((tk, c) => (
              <div
                key={c}
                className="text-center text-[10px] font-mono text-muted-foreground truncate pb-0.5"
                style={{ width: cellSize, opacity: hasFocus && activeCol !== null && c !== activeCol ? 0.35 : 1 }}
              >
                {tk}
              </div>
            ))}
          </div>
        ) : (
          <div aria-hidden />
        )}
        <div aria-hidden />

        {/* the left dimension rail: full extent, perpendicular stops, like the bottom one */}
        {rowLabel ? (
          <div className="flex flex-col items-center mr-1.5 text-muted-foreground select-none">
            <span className="h-px w-2.5 bg-muted-foreground/60 shrink-0" />
            <span className="text-[10px] leading-none">↑</span>
            <span className="flex-1 w-px bg-muted-foreground/40" />
            <span className="text-xs font-medium py-0.5">{rowLabel}</span>
            <span className="flex-1 w-px bg-muted-foreground/40" />
            <span className="text-[10px] leading-none">↓</span>
            <span className="h-px w-2.5 bg-muted-foreground/60 shrink-0" />
          </div>
        ) : (
          <div aria-hidden />
        )}
        {leftLabels ? (
          <div className="flex flex-col mr-1">
            {leftLabels.map((tk, r) => (
              <div
                key={r}
                className="flex items-center justify-end pr-1 text-[10px] font-mono text-muted-foreground"
                style={{ height: cellSize, opacity: hasFocus && activeRow !== null && r !== activeRow ? 0.35 : 1 }}
              >
                {tk}
              </div>
            ))}
          </div>
        ) : (
          <div aria-hidden />
        )}
        <div className="w-2 rounded-l-sm border-l-2 border-t-2 border-b-2 border-foreground/70" />
        <div className="flex flex-col">
          <div ref={gridRef} data-matrix-grid className="grid" style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize}px)` }}>
            {rows.map((row, r) =>
              row.map((v, c) => {
                const masked = maskFn?.(r, c) ?? false;
                const ring = cellRing?.(r, c) ?? null;
                const heatVal = typeof heat === "function" ? heat(v) : v;
                const dimmed =
                  hasFocus &&
                  !((activeRow === null || r === activeRow) && (activeCol === null || c === activeCol));
                return (
                  <div
                    key={`${r}-${c}`}
                    onMouseEnter={onCell ? () => onCell(r, c) : undefined}
                    className="relative flex items-center justify-center font-mono tabular-nums border border-border/70"
                    style={{
                      width: cellSize,
                      height: cellSize,
                      fontSize,
                      opacity: dimmed ? 0.3 : 1,
                      transition: "opacity 120ms",
                      background: masked
                        ? `repeating-linear-gradient(45deg, ${MASK_COLOR}22, ${MASK_COLOR}22 3px, transparent 3px, transparent 7px)`
                        : heat
                          ? heatColor(heatVal)
                          : cellBg?.(v, r, c),
                      color: masked ? MASK_COLOR : heat ? heatInk(heatVal) : undefined,
                      boxShadow: ring ? `inset 0 0 0 2px ${ring}` : undefined,
                      cursor: onCell ? "crosshair" : undefined,
                    }}
                  >
                    {masked ? "−∞" : format(v)}
                  </div>
                );
              }),
            )}
          </div>
          {truncated && (
            <div
              className="grid text-muted-foreground text-center leading-none py-1 border-x border-border/40"
              style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, fontSize: fontSize + 1 }}
            >
              {Array.from({ length: cols }, (_, c) => (
                <span key={c}>⋮</span>
              ))}
            </div>
          )}
        </div>
        <div className="w-2 rounded-r-sm border-r-2 border-t-2 border-b-2 border-foreground/70" />

        <div aria-hidden />
        <div aria-hidden />
        <div aria-hidden />
        <div>
          {colLabel && (
            <div className="flex items-center gap-1 text-muted-foreground select-none w-full">
              <span className="text-[10px]">|←</span>
              <span className="flex-1 border-t border-muted-foreground/40" />
              <span className="text-xs font-medium">{colLabel}</span>
              <span className="flex-1 border-t border-muted-foreground/40" />
              <span className="text-[10px]">→|</span>
            </div>
          )}
          {truncated && (
            <div className="text-[10px] text-muted-foreground text-center pt-0.5">
              {maxRows} of {data.length} rows shown
            </div>
          )}
        </div>
        <div aria-hidden />
      </div>
    </div>
  );
};

export default Matrix;
