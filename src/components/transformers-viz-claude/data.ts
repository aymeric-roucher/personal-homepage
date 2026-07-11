// The whole decoder stack, really computed. Embeddings and weights are seeded
// pseudo-random; everything downstream (positional encodings, Q/K/V, scores,
// causal softmax, weighted values, residuals, LayerNorm, the feed-forward
// network, all L layers, the logits) is true matrix arithmetic on them.
//
// Notation, chosen deliberately:
//   T  = time axis: number of tokens in the sequence (columns).
//   D  = model width, the paper's d_model (rows). The sketch used N, but N is
//        the most overloaded letter in the field (batch, layers, vocabulary);
//        d_model is the paper's own name, so D it is.
//   H  = number of attention heads,  DK = per-head width (d_k = d_v).
//   DFF = feed-forward hidden width (4·D, as in the paper).
//   L  = number of layers.
// A token lives in a COLUMN: X is D×T, exactly like the paper sketch.
//
// D and DK are deliberately decoupled here (the convention of Attention Is
// All You Need is d_k = d_model/H, i.e. 8 heads × 64 = 512): with D = 6 and
// H·d_k = 32, the output projection W_O visibly earns its keep, squeezing 32
// rows back down to 6.

export const TOKENS = ["Hey", "I", "am", "hap", "py", "to", "meet"];
export const NEXT_TOKEN = "you";
export const T = TOKENS.length;
export const D = 6;
export const H = 8; // as in Attention Is All You Need
export const DK = 4;
export const DFF = 4 * D;
export const L = 6;
export const VOCAB_SIZE = 50257;

// ------------------------------------------------------------------- colors
// Validated categorical palette (see dataviz reference); slots in fixed order.
export const PALETTE = ["#2a78d6", "#1baf7a", "#eda100", "#008300", "#4a3aa7", "#e34948", "#e87ba4", "#eb6834"];
export const Q_COLOR = PALETTE[0]; // queries
export const K_COLOR = PALETTE[1]; // keys
export const V_COLOR = PALETTE[2]; // values
export const RESIDUAL_COLOR = "#8078d2"; // the residual stream highway, pastel violet-blue
export const LOOP_COLOR = PALETTE[7]; // the sampled-token loop
export const MASK_COLOR = "#d03b3b"; // status "critical": forbidden by causality

// ---------------------------------------------------------------- utilities

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randMat(rows: number, cols: number, scale: number, seed: number): number[][] {
  const rnd = mulberry32(seed);
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => (rnd() * 2 - 1) * scale));
}

function randVec(n: number, scale: number, seed: number): number[] {
  return randMat(1, n, scale, seed)[0];
}

export function matmul(a: number[][], b: number[][]): number[][] {
  const n = a.length;
  const k = b.length;
  const m = b[0].length;
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: m }, (_, j) => {
      let s = 0;
      for (let p = 0; p < k; p++) s += a[i][p] * b[p][j];
      return s;
    }),
  );
}

export function addMat(a: number[][], b: number[][]): number[][] {
  return a.map((row, i) => row.map((v, j) => v + b[i][j]));
}

export function transpose(a: number[][]): number[][] {
  return a[0].map((_, j) => a.map((row) => row[j]));
}

function addColBias(a: number[][], bias: number[]): number[][] {
  return a.map((row, i) => row.map((v) => v + bias[i]));
}

// LayerNorm across the D axis, one token column at a time (γ=1, β=0 here).
// Never across T: that would mix information between positions.
export function layerNormCols(x: number[][]): number[][] {
  const rows = x.length;
  const cols = x[0].length;
  const out = x.map((row) => row.slice());
  for (let t = 0; t < cols; t++) {
    let mean = 0;
    for (let i = 0; i < rows; i++) mean += x[i][t];
    mean /= rows;
    let variance = 0;
    for (let i = 0; i < rows; i++) variance += (x[i][t] - mean) ** 2;
    variance /= rows;
    const inv = 1 / Math.sqrt(variance);
    for (let i = 0; i < rows; i++) out[i][t] = (x[i][t] - mean) * inv;
  }
  return out;
}

export function fmt(v: number): string {
  const s = v.toFixed(1);
  return s === "-0.0" ? "0.0" : s;
}

export function fmt2(v: number): string {
  const s = v.toFixed(2);
  return s === "-0.00" ? "0.00" : s;
}

// Attention weights in [0,1] onto the validated sequential blue ramp
// (surface #fcfcfb → step 700 #0d366b).
export function heatColor(v: number): string {
  const t = Math.max(0, Math.min(1, v));
  const from = [252, 252, 251];
  const to = [13, 54, 107];
  const c = from.map((f, i) => Math.round(f + (to[i] - f) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
export function heatInk(v: number): string {
  return v > 0.55 ? "#ffffff" : "#0b0b0b";
}

// Signed values in [-1, 1] onto the validated diverging pair: red ↔ gray ↔ blue.
export function divergingColor(v: number): string {
  const t = Math.max(-1, Math.min(1, v));
  const mid = [240, 239, 236];
  const pole = t < 0 ? [227, 73, 72] : [42, 120, 214];
  const a = Math.abs(t);
  const c = mid.map((mch, i) => Math.round(mch + (pole[i] - mch) * a));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

export const isMasked = (row: number, col: number) => col > row; // row = query t, col = source s

// ------------------------------------------------------------- the pipeline

// Token embeddings: what the (learned) embedding table returns for our tokens
export const X_EMBED = randMat(D, T, 1.1, 11);

// Sinusoidal positional encodings, the Attention Is All You Need recipe
export const POS_ENC: number[][] = Array.from({ length: D }, (_, i) =>
  Array.from({ length: T }, (_, t) => {
    const angle = t / Math.pow(10000, (2 * Math.floor(i / 2)) / D);
    return i % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
  }),
);

export const X0 = addMat(X_EMBED, POS_ENC); // enters layer 1

export interface Head {
  index: number;
  wq: number[][]; // DK × D
  wk: number[][];
  wv: number[][];
  q: number[][]; // DK × T (one query column per position)
  k: number[][];
  v: number[][];
  scores: number[][]; // T × T = QᵀK/√DK, row = query position, col = source
  attn: number[][]; // T × T, causal softmax of scores; rows sum to 1
  out: number[][]; // DK × T = V·Aᵀ, column t mixes value columns 0..t
}

export interface Layer {
  index: number;
  input: number[][]; // D × T
  heads: Head[];
  concat: number[][]; // (H·DK) × T, the heads stacked
  wo: number[][]; // D × (H·DK)
  attnProj: number[][]; // D × T
  res1: number[][]; // input + attnProj
  norm1: number[][]; // LayerNorm(res1)
  wUp: number[][]; // DFF × D
  bUp: number[];
  hiddenPre: number[][]; // DFF × T, before ReLU
  hidden: number[][]; // DFF × T, after ReLU
  wDown: number[][]; // D × DFF
  bDown: number[];
  ffnOut: number[][]; // D × T
  res2: number[][]; // norm1 + ffnOut
  out: number[][]; // LayerNorm(res2): the layer's output
}

function computeHead(x: number[][], layerIdx: number, headIdx: number): Head {
  const seed = 1000 * layerIdx + 100 * headIdx;
  const wq = randMat(DK, D, 0.55, seed + 1);
  const wk = randMat(DK, D, 0.55, seed + 2);
  const wv = randMat(DK, D, 0.55, seed + 3);
  const q = matmul(wq, x);
  const k = matmul(wk, x);
  const v = matmul(wv, x);
  // scores[t][s] = q_t · k_s / √DK, computed for every pair, then masked
  const scores = matmul(transpose(q), k).map((row) => row.map((val) => val / Math.sqrt(DK)));
  const attn: number[][] = Array.from({ length: T }, () => Array(T).fill(0));
  for (let t = 0; t < T; t++) {
    const exps: number[] = [];
    for (let s = 0; s <= t; s++) exps.push(Math.exp(scores[t][s]));
    const z = exps.reduce((a, b) => a + b, 0);
    for (let s = 0; s <= t; s++) attn[t][s] = exps[s] / z;
  }
  const out = matmul(v, transpose(attn));
  return { index: headIdx, wq, wk, wv, q, k, v, scores, attn, out };
}

function computeLayer(x: number[][], layerIdx: number): Layer {
  const heads = Array.from({ length: H }, (_, h) => computeHead(x, layerIdx, h));
  const concat = heads.flatMap((h) => h.out); // (H·DK) × T
  const wo = randMat(D, H * DK, 0.4, 1000 * layerIdx + 7); // projects the stack back to D
  const attnProj = matmul(wo, concat);
  const res1 = addMat(x, attnProj);
  const norm1 = layerNormCols(res1);
  const wUp = randMat(DFF, D, 0.5, 1000 * layerIdx + 8);
  const bUp = randVec(DFF, 0.3, 1000 * layerIdx + 9);
  const hiddenPre = addColBias(matmul(wUp, norm1), bUp);
  const hidden = hiddenPre.map((row) => row.map((v) => Math.max(0, v)));
  const wDown = randMat(D, DFF, 0.35, 1000 * layerIdx + 10);
  const bDown = randVec(D, 0.3, 1000 * layerIdx + 11);
  const ffnOut = addColBias(matmul(wDown, hidden), bDown);
  const res2 = addMat(norm1, ffnOut);
  const out = layerNormCols(res2);
  return { index: layerIdx, input: x, heads, concat, wo, attnProj, res1, norm1, wUp, bUp, hiddenPre, hidden, wDown, bDown, ffnOut, res2, out };
}

// Run the full stack. Layer 1's internals are what the page dissects; the
// residual stream really flows through all L layers to produce the logits.
export const LAYERS: Layer[] = (() => {
  const layers: Layer[] = [];
  let x = X0;
  for (let l = 1; l <= L; l++) {
    const layer = computeLayer(x, l);
    layers.push(layer);
    x = layer.out;
  }
  return layers;
})();

export const LAYER1 = LAYERS[0];
export const HEADS = LAYER1.heads;
export const FFN_HIDDEN_PRE = LAYER1.hiddenPre;
export const FFN_HIDDEN = LAYER1.hidden;
export const X_FINAL = LAYERS[L - 1].out;

// ----------------------------------------------------------------- unembedding
// A handful of the vocabulary's 50 257 rows, dotted against the last token's
// final representation. Rows are built with varying alignment to that vector
// (that is exactly what training does to the unembedding), so the logits below
// are its true dot products.
const xLast = X_FINAL.map((row) => row[T - 1]);
const xLastNorm = Math.sqrt(xLast.reduce((a, v) => a + v * v, 0));
const xLastUnit = xLast.map((v) => v / xLastNorm);

function vocabRow(token: string, alignment: number, seed: number): { token: string; w: number[] } {
  const noise = randVec(D, 0.45, seed);
  return { token, w: xLastUnit.map((u, i) => u * alignment + noise[i]) };
}

export const VOCAB_ROWS: { token: string; w: number[] }[] = [
  vocabRow("you", 2.7, 501),
  vocabRow("the", 1.6, 502),
  vocabRow("her", 1.35, 503),
  vocabRow("him", 1.2, 504),
  vocabRow("a", 1.0, 505),
  vocabRow("every", 0.7, 506),
  vocabRow("!", 0.35, 507),
  vocabRow("again", 0.15, 508),
];

export const LOGITS: number[] = VOCAB_ROWS.map((r) => r.w.reduce((acc, v, i) => acc + v * xLast[i], 0));

// The other ~50k tokens sit far down; they share one representative logit.
export const A_TAIL_LOGIT = -4;

// Softmax with temperature over the shown logits, the rest of the vocabulary
// entering the denominator as a long tail. Returns probabilities for the shown
// rows only (they sum to slightly less than 1; the tail keeps the rest).
export function softmaxTemp(logits: number[], tau: number): number[] {
  const exps = logits.map((l) => Math.exp(l / tau));
  const tail = (VOCAB_SIZE - logits.length) * Math.exp(A_TAIL_LOGIT / tau);
  const z = exps.reduce((a, b) => a + b, 0) + tail;
  return exps.map((e) => e / z);
}
