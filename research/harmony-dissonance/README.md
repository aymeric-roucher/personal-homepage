# The mathematics of harmony: reproducible dissonance figures

Code behind the blog post [How math defines what sounds good](https://m-ric.com/blog/math-of-harmony).

Everything here reproduces, from scratch, the sensory-dissonance model that predicts which musical intervals and chords sound consonant, including the final 3D "dissonance surface" over all possible three-note chords.

## The model

The kernel is Sethares' parameterization (1993) of the Plomp & Levelt (1965) pure-tone dissonance curve. For two pure partials at frequencies f1 <= f2 with loudnesses l1, l2:

```
d = min(l1, l2) * (exp(-3.51 * s * (f2 - f1)) - exp(-5.75 * s * (f2 - f1)))
s = 0.24 / (0.0207 * f1 + 18.96)
```

The `s` factor rescales the curve with register, following Plomp & Levelt's finding that maximal roughness sits at about 25% of the critical bandwidth. The dissonance of two complex tones is the sum of `d` over every pair of partials. Constants follow Sethares' published code (his 1993 paper has slightly different fits: a=3.5, s1=0.021, s2=19), via [endolith's Python port](https://gist.github.com/endolith/3066664) and [aatishb/dissonance](https://github.com/aatishb/dissonance), so results are directly comparable with both.

## Files

- `dissonance.py` - the model: pairwise kernel, complex-tone dissonance, dissonance curve (two notes), dissonance surface (three notes)
- `test_dissonance.py` - tests asserting the physics: zero dissonance at unison, roughness peak location for pure tones, curve minima at the just-intonation ratios 6/5, 5/4, 4/3, 3/2, 5/3, 2/1
- `make_figures.py` - generates all the Plotly JSON figures used in the post into `public/assets/images/math-of-harmony/`
- `bach_intervals.py` - census of the 351 four-part Bach chorales in music21: narrow intervals (a major third or closer) are written between low voices 0.8% of the time when the lower note is below C3, versus 43.4% when it is at or above middle C (57x), exemplifying the critical-band register effect

## Run it

Requires [uv](https://docs.astral.sh/uv/) (dependencies are declared inline in each script):

```bash
uv run --with numpy --with pytest pytest test_dissonance.py   # tests
uv run make_figures.py                                        # regenerate all figures
uv run bach_intervals.py                                      # Bach chorale interval census
```

## Figures produced

| File | Content |
|---|---|
| `pure_tone_curves.json` | Plomp-Levelt roughness of two pure sine tones at four registers: no dips at any musical ratio |
| `curve_by_partials.json` | dissonance curve with a slider over the number of harmonics: consonant valleys appear one by one |
| `dissonance_curve.json` | the 8-harmonic curve, minima marked at just-intonation ratios, 12-tone equal temperament shown as dotted lines |
| `railsback_curve.json` | schematic Railsback curve: aural piano tunings deviate from equal temperament, bass flat and treble sharp |
| `bar_timbre_curve.json` | same computation for an idealized metal bar (bell-like overtones): Western intervals land on bumps |
| `dissonance_surface_3d.json` | the final 3D surface: dissonance of every three-note chord, consonance wells marked |
| `dissonance_heatmap.json` | the same surface seen from above (generated for completeness, not embedded in the post) |

In the post, each figure is wrapped in a small HTML widget (`chart.html`, `surface3d.html`, etc. in the same assets folder) that re-implements the Sethares model in JavaScript so every chart is click-to-hear.

## Sources

- R. Plomp & W. J. M. Levelt, [Tonal Consonance and Critical Bandwidth](https://www.mpi.nl/world/materials/publications/levelt/Plomp_Levelt_Tonal_1965.pdf), J. Acoust. Soc. Am. 38, 548-560 (1965)
- W. A. Sethares, [Local consonance and the relationship between timbre and scale](https://minds.wisconsin.edu/bitstream/handle/1793/9496/file_1.pdf), J. Acoust. Soc. Am. 94, 1218-1228 (1993); book: [Tuning, Timbre, Spectrum, Scale](https://sethares.engr.wisc.edu/ttss.html)
- Aatish Bhatia, [Dissonance: a journey through musical possibility space](https://aatishb.com/dissonance/) ([code](https://github.com/aatishb/dissonance))
- minutephysics, [The Physics Of Dissonance](https://www.youtube.com/watch?v=tCsl6ZcY9ag) (2025)
