// Shared additive synthesis for the math-of-harmony widgets.
// A "partial" is {f: frequency in Hz, a: amplitude 0..1}.

let _ctx = null;
function audioCtx() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  return _ctx;
}

// Timbres (multipliers relative to a base frequency, amplitudes 1/k)
function harmonicPartials(f0, n) {
  const out = [];
  for (let k = 1; k <= n; k++) out.push({ f: f0 * k, a: 1 / k });
  return out;
}
function stretchedPartials(f0, n, gamma) {
  const out = [];
  for (let k = 1; k <= n; k++) out.push({ f: f0 * Math.pow(k, gamma), a: 1 / k });
  return out;
}
const BAR_MULTIPLIERS = [1, 2.758, 5.406, 8.936, 13.35, 18.645, 24.82, 31.6];
function barPartials(f0, n) {
  const out = [];
  for (let k = 1; k <= Math.min(n, BAR_MULTIPLIERS.length); k++) {
    out.push({ f: f0 * BAR_MULTIPLIERS[k - 1], a: 1 / k });
  }
  return out;
}

// Play a set of partials with a short attack and exponential release.
function playPartials(partials, dur = 1.8, gainScale = 1) {
  const ctx = audioCtx();
  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.value = (0.5 * gainScale) / Math.sqrt(Math.max(4, partials.length));
  master.connect(ctx.destination);
  for (const p of partials) {
    if (p.f > 12000 || p.f < 20) continue;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = p.f;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.25 * p.a, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);
    o.connect(g);
    g.connect(master);
    o.start(now);
    o.stop(now + dur + 0.05);
  }
}

// Two notes of the same timbre at a frequency ratio apart.
function playInterval(makeTimbre, f0, ratio, dur = 1.8) {
  playPartials(makeTimbre(f0).concat(makeTimbre(f0 * ratio)), dur);
}
