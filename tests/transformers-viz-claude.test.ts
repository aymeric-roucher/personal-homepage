// Numerical invariants of the Claude transformer visualization: every matrix
// shown on the page is really computed, so the math must hold exactly.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  A_TAIL_LOGIT,
  D,
  DFF,
  DK,
  FFN_HIDDEN,
  FFN_HIDDEN_PRE,
  H,
  HEADS,
  L,
  LAYER1,
  LOGITS,
  POS_ENC,
  T,
  TOKENS,
  VOCAB_ROWS,
  VOCAB_SIZE,
  X0,
  X_EMBED,
  X_FINAL,
  matmul,
  softmaxTemp,
  transpose,
} from "../src/components/transformers-viz-claude/data";

const close = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) < eps;

// ------------------------------------------------------------------- routing
const app = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
assert.match(app, /path="\/transformers_interactive"/);

// ---------------------------------------------------------------- dimensions
// D = 6 and d_k = 4 are deliberately decoupled (the paper's convention is
// H·d_k = d_model): W_O then has an honest job, projecting 8 rows down to 6.
assert.equal(T, TOKENS.length);
assert.equal(D, 6);
assert.equal(DK, 4);
assert.equal(H, 8);
assert.deepEqual([LAYER1.concat.length, LAYER1.concat[0].length], [H * DK, T]);
assert.deepEqual([LAYER1.wo.length, LAYER1.wo[0].length], [D, H * DK]);
assert.deepEqual([LAYER1.attnProj.length, LAYER1.attnProj[0].length], [D, T]);

// The per-head view told on the page is exact: projecting each head's output
// back to D with its own column-slice of W_O and summing equals W_O · concat.
{
  const summed = LAYER1.heads.reduce(
    (acc, head, h) => {
      const slice = LAYER1.wo.map((row) => row.slice(h * DK, (h + 1) * DK)); // D × DK
      const proj = matmul(slice, head.out); // D × T
      return acc.map((row, i) => row.map((v, j) => v + proj[i][j]));
    },
    Array.from({ length: D }, () => Array(T).fill(0)) as number[][],
  );
  summed.forEach((row, i) => row.forEach((v, j) => assert.ok(close(v, LAYER1.attnProj[i][j]))));
}
assert.equal(DFF, 4 * D);
assert.ok(L >= 2);
assert.deepEqual([X_EMBED.length, X_EMBED[0].length], [D, T]); // columns are tokens
assert.deepEqual([X0.length, X0[0].length], [D, T]);
assert.deepEqual([X_FINAL.length, X_FINAL[0].length], [D, T]);

// ------------------------------------------------- positional encodings (AIAYN)
for (let i = 0; i < D; i++) {
  for (let t = 0; t < T; t++) {
    const angle = t / Math.pow(10000, (2 * Math.floor(i / 2)) / D);
    const expected = i % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
    assert.ok(close(POS_ENC[i][t], expected));
    assert.ok(close(X0[i][t], X_EMBED[i][t] + POS_ENC[i][t]));
  }
}

// ------------------------------------------------------------ attention heads
assert.equal(HEADS.length, H);
for (const head of HEADS) {
  // Q, K, V really are projections of the layer input
  assert.deepEqual([head.q.length, head.q[0].length], [DK, T]);
  const q = matmul(head.wq, X0);
  q.forEach((row, i) => row.forEach((v, j) => assert.ok(close(v, head.q[i][j]))));

  // scores = Qt K / sqrt(dk)
  const s = matmul(transpose(head.q), head.k).map((row) => row.map((v) => v / Math.sqrt(DK)));
  s.forEach((row, i) => row.forEach((v, j) => assert.ok(close(v, head.scores[i][j]))));

  // causal softmax: rows sum to 1, strictly zero above the diagonal
  assert.deepEqual([head.attn.length, head.attn[0].length], [T, T]);
  head.attn.forEach((row, t) => {
    assert.ok(close(row.reduce((x, y) => x + y, 0), 1, 1e-12));
    row.slice(t + 1).forEach((v) => assert.equal(v, 0));
    row.slice(0, t + 1).forEach((v) => assert.ok(v > 0));
  });

  // head output: column t is the attention-weighted mix of value columns 0..t
  const out = matmul(head.v, transpose(head.attn));
  assert.deepEqual([head.out.length, head.out[0].length], [DK, T]);
  out.forEach((row, i) => row.forEach((v, j) => assert.ok(close(v, head.out[i][j]))));
}

// --------------------------------------------------------- residual + LayerNorm
// x + attention output, then normalized per token column across the D axis
// (never across T: that would leak information between positions).
for (let t = 0; t < T; t++) {
  const col = LAYER1.norm1.map((row) => row[t]);
  const mean = col.reduce((a, b) => a + b, 0) / D;
  const variance = col.reduce((a, b) => a + (b - mean) ** 2, 0) / D;
  assert.ok(close(mean, 0, 1e-9));
  assert.ok(close(variance, 1, 1e-6));
  for (let i = 0; i < D; i++) {
    assert.ok(close(LAYER1.res1[i][t], X0[i][t] + LAYER1.attnProj[i][t]));
  }
}

// ------------------------------------------------------------------------ FFN
assert.deepEqual([FFN_HIDDEN.length, FFN_HIDDEN[0].length], [DFF, T]);
for (let i = 0; i < DFF; i++) {
  for (let t = 0; t < T; t++) {
    assert.ok(close(FFN_HIDDEN[i][t], Math.max(0, FFN_HIDDEN_PRE[i][t])));
  }
}
assert.ok(FFN_HIDDEN.flat().some((v) => v === 0)); // ReLU really clips

// ----------------------------------------------------------------- unembedding
// logits are true dot products of vocab rows with the last residual column
const xLast = X_FINAL.map((row) => row[T - 1]);
VOCAB_ROWS.forEach((row, i) => {
  const dot = row.w.reduce((acc, v, j) => acc + v * xLast[j], 0);
  assert.ok(close(dot, LOGITS[i]));
});
assert.equal(VOCAB_ROWS[0].token, "you"); // the story: "you" wins
assert.equal(Math.max(...LOGITS), LOGITS[0]);

// softmax with temperature: valid (sub-)distribution over the shown rows,
// with the rest of the vocabulary as a long tail at A_TAIL_LOGIT; colder is sharper
assert.ok(VOCAB_SIZE > 10000);
assert.ok(A_TAIL_LOGIT < Math.min(...LOGITS));
const p1 = softmaxTemp(LOGITS, 1);
const p05 = softmaxTemp(LOGITS, 0.5);
assert.ok(p1.every((p) => p > 0 && p < 1));
assert.ok(p1.reduce((a, b) => a + b, 0) < 1); // tail mass is accounted for
assert.ok(p05[0] > p1[0]);

console.log("transformers_viz_claude: route and all numerical invariants verified.");
