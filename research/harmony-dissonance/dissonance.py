# /// script
# requires-python = ">=3.13"
# dependencies = ["numpy"]
# ///
"""Sensory dissonance (roughness) model.

Implements Sethares' parameterization (1993, "Local consonance and the
relationship between timbre and scale", JASA 94; book: "Tuning, Timbre,
Spectrum, Scale") of the Plomp & Levelt (1965) pure-tone dissonance curve,
extended to complex tones by summing the roughness of every pair of partials.

For two pure partials at frequencies f1 <= f2 with loudnesses l1, l2:

    d = min(l1, l2) * (exp(-B1 * s * (f2 - f1)) - exp(-B2 * s * (f2 - f1)))

where s = DSTAR / (S1 * f1 + S2) rescales the curve so that maximal roughness
always sits at the same fraction of the critical bandwidth, whatever the
register (Plomp & Levelt's key observation).

Constants and loudness conversion follow endolith's Python port
(https://gist.github.com/endolith/3066664) and aatishb's interactive essay
(https://github.com/aatishb/dissonance), so figures are directly comparable.
"""

import numpy as np

DSTAR = 0.24  # scaled interval of maximal dissonance
S1 = 0.0207
S2 = 18.96
B1 = 3.51
B2 = 5.75


def amp_to_loudness(amp: np.ndarray) -> np.ndarray:
    """Convert waveform amplitude to perceived loudness (sones-like scale):
    dB = 20*log10(amp), loudness = 2**(dB/10) / 16."""
    db = 20.0 * np.log10(amp)
    return 2.0 ** (db / 10.0) / 16.0


def dissonance_pair(f1: float, f2: float, l1: float, l2: float) -> float:
    """Roughness contributed by a single pair of pure partials."""
    f_low, f_high = (f1, f2) if f1 <= f2 else (f2, f1)
    s = DSTAR / (S1 * f_low + S2)
    diff = f_high - f_low
    return min(l1, l2) * (np.exp(-B1 * s * diff) - np.exp(-B2 * s * diff))


def dissonance_total(freqs: np.ndarray, louds: np.ndarray) -> float:
    """Total roughness of a set of partials: sum over all unordered pairs."""
    f = np.asarray(freqs, dtype=float)
    l = np.asarray(louds, dtype=float)
    order = np.argsort(f)
    f, l = f[order], l[order]
    fi, fj = np.meshgrid(f, f, indexing="ij")
    li, lj = np.meshgrid(l, l, indexing="ij")
    upper = np.triu_indices(len(f), k=1)
    f_low, f_high = fi[upper], fj[upper]
    s = DSTAR / (S1 * f_low + S2)
    diff = f_high - f_low
    d = np.minimum(li[upper], lj[upper]) * (
        np.exp(-B1 * s * diff) - np.exp(-B2 * s * diff)
    )
    return float(d.sum())


def harmonic_tone(f0: float, n_partials: int = 6) -> tuple[np.ndarray, np.ndarray]:
    """Partials of an idealized harmonic tone: f0, 2*f0, ..., n*f0 with
    amplitudes 1, 1/2, ..., 1/n (sawtooth-like rolloff, as in aatishb's essay).
    Returns (frequencies, loudnesses)."""
    k = np.arange(1, n_partials + 1, dtype=float)
    freqs = f0 * k
    louds = amp_to_loudness(1.0 / k)
    return freqs, louds


def dissonance_curve(
    f0: float,
    n_partials: int = 6,
    r_min: float = 1.0,
    r_max: float = 2.3,
    n_points: int = 1000,
    partials: tuple[np.ndarray, np.ndarray] | None = None,
) -> tuple[np.ndarray, np.ndarray]:
    """Dissonance of two complex tones (f0 and r*f0) as a function of the
    interval ratio r, including each tone's intrinsic roughness (a constant
    offset). Pass `partials=(freq_multipliers, loudnesses)` for a custom
    timbre; multipliers are relative to f0."""
    if partials is None:
        f_base, l_base = harmonic_tone(f0, n_partials)
    else:
        f_base, l_base = partials[0] * f0, partials[1]
    ratios = np.linspace(r_min, r_max, n_points)
    d = np.empty(n_points)
    for i, r in enumerate(ratios):
        freqs = np.concatenate([f_base, f_base * r])
        louds = np.concatenate([l_base, l_base])
        d[i] = dissonance_total(freqs, louds)
    return ratios, d


def dissonance_surface(
    f0: float,
    n_partials: int = 6,
    r_min: float = 1.0,
    r_max: float = 2.05,
    n_points: int = 150,
) -> tuple[np.ndarray, np.ndarray]:
    """Dissonance of a three-note chord (f0, r1*f0, r2*f0) over a grid of the
    two interval ratios. Returns (ratios, D) with D[i, j] the total dissonance
    at r1=ratios[j], r2=ratios[i] (row = second interval, plotly convention)."""
    f_base, l_base = harmonic_tone(f0, n_partials)
    ratios = np.linspace(r_min, r_max, n_points)
    surface = np.empty((n_points, n_points))
    for i, r2 in enumerate(ratios):
        for j, r1 in enumerate(ratios):
            freqs = np.concatenate([f_base, f_base * r1, f_base * r2])
            louds = np.concatenate([l_base, l_base, l_base])
            surface[i, j] = dissonance_total(freqs, louds)
    return ratios, surface
