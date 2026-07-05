# /// script
# requires-python = ">=3.13"
# dependencies = ["music21"]
# ///
"""How often does Bach write narrow intervals in the bass vs in the treble?

Plomp & Levelt (1965, Sec. IV) showed statistically that composers keep
simultaneous partials out of the roughness zone, which shrinks (in Hz)
relative to pitch as you go up in register: hence narrow intervals (thirds
and closer) should be rare between low voices and common between high ones.

This script measures that directly on the 371 four-part Bach chorales
shipped with music21: for every chord, take the interval between the two
LOWEST notes and the interval between the two HIGHEST notes, and count how
often each is a major third (4 semitones) or narrower.

Run with: uv run bach_intervals.py
"""

from music21 import corpus


C3 = 48  # midi numbers
C4 = 60


def main() -> None:
    low_narrow = low_total = 0
    high_narrow = high_total = 0
    deep_narrow = deep_total = 0  # adjacent pairs whose lower note is below C3
    up_narrow = up_total = 0  # adjacent pairs whose lower note is C4 or above
    n_chorales = 0

    for chorale in corpus.chorales.Iterator():
        if len(chorale.parts) != 4:
            continue
        n_chorales += 1
        for ch in chorale.chordify().recurse().getElementsByClass("Chord"):
            midis = sorted(p.midi for p in ch.pitches)
            if len(set(midis)) < 3:
                continue
            low_gap = midis[1] - midis[0]
            high_gap = midis[-1] - midis[-2]
            low_total += 1
            high_total += 1
            if 0 < low_gap <= 4:
                low_narrow += 1
            if 0 < high_gap <= 4:
                high_narrow += 1
            for lo, hi in zip(midis, midis[1:]):
                gap = hi - lo
                if gap == 0:
                    continue
                if lo < C3:
                    deep_total += 1
                    if gap <= 4:
                        deep_narrow += 1
                elif lo >= C4:
                    up_total += 1
                    if gap <= 4:
                        up_narrow += 1

    print(f"chorales analyzed: {n_chorales}")
    print(f"lowest pair  (bass side):   {low_narrow}/{low_total} = {100 * low_narrow / low_total:.1f}% narrow (<= major third)")
    print(f"highest pair (treble side): {high_narrow}/{high_total} = {100 * high_narrow / high_total:.1f}% narrow (<= major third)")
    print(f"ratio: {(high_narrow / high_total) / (low_narrow / low_total):.1f}x more narrow intervals on top")
    print()
    print(f"adjacent pairs with lower note below C3: {deep_narrow}/{deep_total} = {100 * deep_narrow / deep_total:.1f}% narrow")
    print(f"adjacent pairs with lower note at/above C4: {up_narrow}/{up_total} = {100 * up_narrow / up_total:.1f}% narrow")
    print(f"ratio: {(up_narrow / up_total) / (deep_narrow / deep_total):.1f}x")


if __name__ == "__main__":
    main()
