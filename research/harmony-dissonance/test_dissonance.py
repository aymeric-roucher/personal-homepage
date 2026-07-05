# /// script
# requires-python = ">=3.13"
# dependencies = ["numpy", "pytest"]
# ///
"""Tests for the Sethares sensory-dissonance model.

Run with: uv run pytest test_dissonance.py
"""

import numpy as np
import pytest

from dissonance import (
    dissonance_pair,
    dissonance_total,
    dissonance_curve,
    harmonic_tone,
)


def test_identical_pure_tones_have_zero_dissonance():
    assert dissonance_pair(440.0, 440.0, 1.0, 1.0) == pytest.approx(0.0, abs=1e-12)


def test_unison_is_local_minimum_of_complex_curve():
    ratios, d = dissonance_curve(261.63, n_partials=8, r_min=1.0, r_max=1.1, n_points=500)
    assert d[0] == d.min()


def test_pure_tone_pair_peak_location():
    # Plomp-Levelt: maximal roughness for two pure tones sits at a fraction
    # of the critical band, i.e. a few percent to ~10% above f1 in this register.
    f1 = 400.0
    ratios = np.linspace(1.0001, 1.5, 2000)
    d = np.array([dissonance_pair(f1, f1 * r, 1.0, 1.0) for r in ratios])
    peak_ratio = ratios[np.argmax(d)]
    assert 1.02 < peak_ratio < 1.12


def test_pure_tones_far_apart_are_smooth():
    # An octave of pure tones is nearly roughness-free.
    d_octave = dissonance_pair(400.0, 800.0, 1.0, 1.0)
    d_peak = dissonance_pair(400.0, 400.0 * 1.06, 1.0, 1.0)
    assert d_octave < 0.02 * d_peak


def test_complex_tone_curve_has_minima_at_simple_ratios():
    # With 8 harmonics, the dissonance curve must dip at the classic
    # consonances: octave 2/1, fifth 3/2, fourth 4/3, major third 5/4,
    # major sixth 5/3.
    ratios, d = dissonance_curve(261.63, n_partials=8, r_min=1.02, r_max=2.15, n_points=4000)
    interior = np.arange(1, len(d) - 1)
    is_local_min = (d[interior] < d[interior - 1]) & (d[interior] <= d[interior + 1])
    min_ratios = ratios[interior[is_local_min]]
    for target in [2 / 1, 3 / 2, 4 / 3, 5 / 4, 5 / 3]:
        nearest = min_ratios[np.argmin(np.abs(min_ratios - target))]
        assert abs(nearest / target - 1) < 0.01, f"no local minimum near {target}"


def test_octave_is_deepest_minimum_after_unison():
    ratios, d = dissonance_curve(261.63, n_partials=8, r_min=1.1, r_max=2.05, n_points=4000)
    octave = d[(ratios > 1.98) & (ratios < 2.02)].min()
    fifth = d[(ratios > 1.48) & (ratios < 1.52)].min()
    assert octave < fifth


def test_dissonance_symmetric_in_frequencies():
    assert dissonance_pair(300.0, 420.0, 0.7, 0.9) == pytest.approx(
        dissonance_pair(420.0, 300.0, 0.9, 0.7)
    )
