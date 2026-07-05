# /// script
# requires-python = ">=3.13"
# dependencies = ["numpy"]
# ///
"""Generate the blog-post figures as Plotly JSON files.

Run with: uv run make_figures.py
Outputs to ../../public/assets/images/math-of-harmony/

Figures:
  1. pure_tone_curves.json   - Plomp-Levelt roughness of two pure tones, at
                               several registers (no dips at simple ratios)
  2. curve_by_partials.json  - dissonance curve with a slider over the number
                               of harmonics (dips appear as harmonics are added)
  3. dissonance_curve.json   - the 8-harmonic curve, minima marked and
                               labeled with just-intonation ratios
  4. dissonance_heatmap.json - triad dissonance heatmap with detected chords
  5. dissonance_surface_3d.json - the final 3D dissonance surface
"""

import json
from fractions import Fraction
from pathlib import Path

import numpy as np

from dissonance import (
    dissonance_curve,
    dissonance_pair,
    dissonance_surface,
    harmonic_tone,
)

OUT_DIR = Path(__file__).parent / ".." / ".." / "public" / "assets" / "images" / "math-of-harmony"
REF_FREQ = 261.6256  # middle C, as in aatishb.com/dissonance

# Palette (validated defaults from the dataviz reference palette)
BLUE = "#2a78d6"
AQUA = "#1baf7a"
YELLOW = "#eda100"
GREEN = "#008300"
ORANGE = "#eb6834"
INK_MUTED = "#898781"
INK_SECONDARY = "#52514e"
GRID = "#e1e0d9"
FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif'

# Single-hue blue sequential ramp, light (low) -> dark (high)
BLUE_RAMP = ["#cde2fb", "#9ec5f4", "#6da7ec", "#3987e5", "#256abf", "#184f95", "#0d366b"]
# Positions compressed toward the low end: the consonance valleys (z ~ 0.1-0.35)
# get most of the light-to-mid range, so they stay readable against the plateau.
BLUE_POSITIONS = [0.0, 0.14, 0.28, 0.42, 0.56, 0.75, 1.0]
BLUE_COLORSCALE = [[p, c] for p, c in zip(BLUE_POSITIONS, BLUE_RAMP)]


def base_layout(**overrides) -> dict:
    layout = {
        "paper_bgcolor": "rgba(0,0,0,0)",
        "plot_bgcolor": "rgba(0,0,0,0)",
        "font": {"family": FONT, "color": INK_SECONDARY, "size": 13},
        "margin": {"l": 60, "r": 20, "t": 30, "b": 55},
        "xaxis": {
            "gridcolor": GRID,
            "zeroline": False,
            "linecolor": GRID,
            "tickfont": {"color": INK_MUTED},
            "title": {"font": {"color": INK_SECONDARY}},
        },
        "yaxis": {
            "gridcolor": GRID,
            "zeroline": False,
            "linecolor": GRID,
            "tickfont": {"color": INK_MUTED},
            "title": {"font": {"color": INK_SECONDARY}},
        },
        "hovermode": "closest",
    }
    for key, value in overrides.items():
        if isinstance(value, dict) and isinstance(layout.get(key), dict):
            layout[key].update(value)
        else:
            layout[key] = value
    return layout


def find_local_minima(ratios: np.ndarray, d: np.ndarray) -> list[int]:
    interior = np.arange(1, len(d) - 1)
    mask = (d[interior] < d[interior - 1]) & (d[interior] <= d[interior + 1])
    return list(interior[mask])


def nearest_just_ratio(x: float, max_den: int = 9) -> Fraction:
    frac = Fraction(x).limit_denominator(max_den)
    return frac


INTERVAL_NAMES = {
    (1, 1): "Unison",
    (16, 15): "Minor second",
    (9, 8): "Major second",
    (6, 5): "Minor third",
    (5, 4): "Major third",
    (4, 3): "Perfect fourth",
    (7, 5): "Tritone",
    (3, 2): "Perfect fifth",
    (8, 5): "Minor sixth",
    (5, 3): "Major sixth",
    (9, 5): "Minor seventh",
    (15, 8): "Major seventh",
    (2, 1): "Octave",
}


def involves_seven(x: float) -> bool:
    """Septimal intervals (7 in the ratio) have no equivalent on a piano, so
    figures don't mark them. Exception: 7/5, which reads as the tritone."""
    frac = nearest_just_ratio(x)
    if (frac.numerator, frac.denominator) == (7, 5):
        return False
    return frac.numerator % 7 == 0 or frac.denominator % 7 == 0


def fig_pure_tone_curves() -> dict:
    # Three stacked panels, one register each (bass to treble), sharing the
    # ratio axis: the roughness bump visibly squeezes toward unison as the
    # register rises. Each trace carries its base frequency in `meta` so the
    # chart widget can play the clicked pair of pure tones.
    registers = [(125, BLUE, "Bass: lower tone at 125 Hz"),
                 (500, AQUA, "Middle: lower tone at 500 Hz"),
                 (1500, YELLOW, "Treble: lower tone at 1500 Hz")]
    ratios = np.linspace(1.0, 2.3, 800)
    curves = [
        np.array([dissonance_pair(f0, f0 * r, 0.0625, 0.0625) for r in ratios])
        for f0, _, _ in registers
    ]
    global_max = max(c.max() for c in curves)

    traces = []
    annotations = []
    # Panels stacked top to bottom: bass on top (yaxis), treble at the bottom (yaxis3)
    gap = 0.07
    panel = (1 - 2 * gap) / 3
    domains = [[1 - panel, 1], [panel + gap, 2 * panel + gap], [0, panel]]
    axis_style = {
        "gridcolor": GRID,
        "zeroline": False,
        "linecolor": GRID,
        "tickfont": {"color": INK_MUTED},
        "range": [0, 1.1],
        "tickvals": [0, 1],
    }
    layout = base_layout(
        xaxis={
            "title": {"text": "Frequency ratio between the two tones (upper / lower)"},
            "anchor": "y3",
        },
        yaxis={**axis_style, "domain": domains[0]},
        showlegend=False,
        margin={"t": 30, "b": 55},
    )
    for idx, ((f0, color, label), d) in enumerate(zip(registers, curves)):
        yaxis_name = "y" if idx == 0 else f"y{idx + 1}"
        if idx > 0:
            layout[f"yaxis{idx + 1}"] = {**axis_style, "domain": domains[idx]}
        traces.append(
            {
                "type": "scatter",
                "mode": "lines",
                "x": ratios.round(4).tolist(),
                "y": (d / global_max).round(4).tolist(),
                "yaxis": yaxis_name,
                "meta": f0,
                "line": {"color": color, "width": 2},
                "hovertemplate": label + ". Ratio %{x:.3f}: roughness %{y:.2f}<extra></extra>",
            }
        )
        annotations.append(
            {
                "x": 2.28,
                "y": domains[idx][1] - 0.01,
                "xref": "x",
                "yref": "paper",
                "text": label,
                "showarrow": False,
                "xanchor": "right",
                "font": {"color": color, "size": 13},
            }
        )
    layout["annotations"] = annotations
    return {"data": traces, "layout": layout}


def fig_curve_by_partials() -> dict:
    ratios_list = None
    traces = []
    steps = []
    n_values = list(range(1, 9))
    for idx, n in enumerate(n_values):
        ratios, d = dissonance_curve(REF_FREQ, n_partials=n, r_min=1.0, r_max=2.3, n_points=800)
        ratios_list = ratios
        d_norm = d / d.max() if d.max() > 0 else d
        traces.append(
            {
                "type": "scatter",
                "mode": "lines",
                "x": ratios.round(4).tolist(),
                "y": d_norm.round(4).tolist(),
                "name": f"{n} harmonic{'s' if n > 1 else ''}",
                "visible": idx == 7,  # start at 8 harmonics
                "line": {"color": BLUE, "width": 2},
                "hovertemplate": "Ratio %{x:.3f}: dissonance %{y:.2f}<extra></extra>",
            }
        )
    for idx, n in enumerate(n_values):
        steps.append(
            {
                "method": "update",
                "label": str(n),
                "args": [{"visible": [i == idx for i in range(len(n_values))]}],
            }
        )
    layout = base_layout(
        xaxis={"title": {"text": "Interval (frequency ratio)"}},
        yaxis={"title": {"text": "Dissonance (normalized)"}, "range": [0, 1.05]},
        sliders=[
            {
                "active": 7,
                "currentvalue": {"prefix": "Harmonics in each tone: ", "font": {"color": INK_SECONDARY}},
                "pad": {"t": 35},
                "steps": steps,
                "font": {"color": INK_MUTED},
            }
        ],
        margin={"b": 30},
    )
    return {"data": traces, "layout": layout}


def fig_bar_timbre_curve() -> dict:
    """Dissonance curve for an idealized free-free metal bar (bell-like
    timbre), partial ratios from Fletcher & Rossing via Sethares (1993).
    Western intervals land on bumps; new valleys appear (e.g. near 1.49)."""
    from dissonance import amp_to_loudness

    bar_multipliers = np.array([1.0, 2.758, 5.406, 8.936, 13.35, 18.645, 24.82])
    louds = amp_to_loudness(1.0 / np.arange(1, len(bar_multipliers) + 1))
    ratios, d = dissonance_curve(
        REF_FREQ, r_min=1.0, r_max=2.3, n_points=2000,
        partials=(bar_multipliers, louds),
    )
    d_norm = d / d.max()
    western = {"Minor 3rd": 6 / 5, "Major 3rd": 5 / 4, "Fourth": 4 / 3, "Fifth": 3 / 2, "Major 6th": 5 / 3, "Octave": 2.0}
    shapes = [
        {
            "type": "line",
            "x0": r, "x1": r, "y0": 0, "y1": 1.03,
            "line": {"color": INK_MUTED, "width": 1, "dash": "dot"},
            "layer": "below",
        }
        for r in western.values()
    ]
    annotations = [
        {
            "x": r, "y": 1.05, "text": name, "showarrow": False,
            "font": {"color": INK_MUTED, "size": 11}, "textangle": -45,
        }
        for name, r in western.items()
    ]
    traces = [
        {
            "type": "scatter",
            "mode": "lines",
            "x": ratios.round(4).tolist(),
            "y": d_norm.round(4).tolist(),
            "line": {"color": BLUE, "width": 2},
            "hovertemplate": "Ratio %{x:.3f}: dissonance %{y:.2f}<extra></extra>",
        }
    ]
    layout = base_layout(
        xaxis={"title": {"text": "Interval (frequency ratio)"}},
        yaxis={"title": {"text": "Dissonance (normalized)"}, "range": [0, 1.15]},
        shapes=shapes,
        annotations=annotations,
        showlegend=False,
        margin={"t": 40},
    )
    return {"data": traces, "layout": layout}


def fig_stretched_timbre() -> dict:
    """Slider over the stretch exponent: partials at j**gamma * f0. At
    gamma != 1 the 2:1 octave turns dissonant and a pseudo-octave appears."""
    from dissonance import amp_to_loudness

    gammas = [0.90, 0.95, 1.00, 1.05, 1.10]
    j = np.arange(1, 9, dtype=float)
    louds = amp_to_loudness(1.0 / j)
    traces = []
    for idx, gamma in enumerate(gammas):
        ratios, d = dissonance_curve(
            REF_FREQ, r_min=1.0, r_max=2.3, n_points=1200,
            partials=(j**gamma, louds),
        )
        d_norm = d / d.max()
        traces.append(
            {
                "type": "scatter",
                "mode": "lines",
                "x": ratios.round(4).tolist(),
                "y": d_norm.round(4).tolist(),
                "visible": gamma == 1.00,
                "line": {"color": BLUE, "width": 2},
                "hovertemplate": "Ratio %{x:.3f}: dissonance %{y:.2f}<extra></extra>",
            }
        )
    steps = [
        {
            "method": "update",
            "label": f"{g:.2f}",
            "args": [{"visible": [i == idx for i in range(len(gammas))]}],
        }
        for idx, g in enumerate(gammas)
    ]
    shapes = [
        {
            "type": "line",
            "x0": r, "x1": r, "y0": 0, "y1": 1.03,
            "line": {"color": INK_MUTED, "width": 1, "dash": "dot"},
            "layer": "below",
        }
        for r in (1.5, 2.0)
    ]
    annotations = [
        {"x": 1.5, "y": 1.06, "text": "Fifth 3/2", "showarrow": False, "font": {"color": INK_MUTED, "size": 11}},
        {"x": 2.0, "y": 1.06, "text": "Octave 2/1", "showarrow": False, "font": {"color": INK_MUTED, "size": 11}},
    ]
    layout = base_layout(
        xaxis={"title": {"text": "Interval (frequency ratio)"}},
        yaxis={"title": {"text": "Dissonance (normalized)"}, "range": [0, 1.12]},
        shapes=shapes,
        annotations=annotations,
        showlegend=False,
        sliders=[
            {
                "active": 2,
                "currentvalue": {"prefix": "Overtone stretch exponent: ", "font": {"color": INK_SECONDARY}},
                "pad": {"t": 35},
                "steps": steps,
                "font": {"color": INK_MUTED},
            }
        ],
        margin={"b": 30, "t": 40},
    )
    return {"data": traces, "layout": layout}


def fig_dissonance_curve() -> dict:
    ratios, d = dissonance_curve(REF_FREQ, n_partials=8, r_min=1.0, r_max=2.05, n_points=2000)
    d_norm = d / d.max()
    minima_idx = find_local_minima(ratios, d_norm)
    minima_idx = [i for i in minima_idx if not involves_seven(float(ratios[i]))]

    annotations = []
    marker_x, marker_y, marker_text = [], [], []
    for i in minima_idx:
        frac = nearest_just_ratio(float(ratios[i]))
        key = (frac.numerator, frac.denominator)
        name = INTERVAL_NAMES.get(key, "")
        label = f"{frac.numerator}/{frac.denominator}"
        marker_x.append(round(float(ratios[i]), 4))
        marker_y.append(round(float(d_norm[i]), 4))
        marker_text.append(f"{label} ({name})" if name else label)
        annotations.append(
            {
                "x": float(ratios[i]),
                "y": float(d_norm[i]),
                "text": label,
                "showarrow": False,
                "yshift": -14,
                "font": {"color": INK_SECONDARY, "size": 12},
            }
        )

    # Hairline markers at the 12 equal-temperament semitones for comparison
    semitone_lines = [
        {
            "type": "line",
            "x0": 2 ** (k / 12), "x1": 2 ** (k / 12),
            "y0": 0, "y1": 1.03,
            "line": {"color": GRID, "width": 1, "dash": "dot"},
            "layer": "below",
        }
        for k in range(0, 13)
    ]

    traces = [
        {
            "type": "scatter",
            "mode": "lines",
            "x": ratios.round(4).tolist(),
            "y": d_norm.round(4).tolist(),
            "name": "dissonance",
            "line": {"color": BLUE, "width": 2},
            "hovertemplate": "Ratio %{x:.3f}: dissonance %{y:.2f}<extra></extra>",
        },
        {
            "type": "scatter",
            "mode": "markers",
            "x": marker_x,
            "y": marker_y,
            "name": "consonant intervals",
            "text": marker_text,
            "marker": {"color": ORANGE, "size": 9},
            "hovertemplate": "%{text}<br>ratio %{x:.3f}<extra></extra>",
        },
    ]
    layout = base_layout(
        xaxis={"title": {"text": "Interval (frequency ratio)"}},
        yaxis={"title": {"text": "Dissonance (normalized)"}, "range": [0, 1.08]},
        shapes=semitone_lines,
        annotations=annotations,
        showlegend=False,
    )
    return {"data": traces, "layout": layout}


def detect_surface_minima(ratios: np.ndarray, z: np.ndarray, radius: int) -> list[tuple[int, int]]:
    """Strict local minima within a square neighborhood, lower triangle only
    (r2 < r1 mirrors r1 < r2)."""
    n = len(ratios)
    minima = []
    for i in range(n):
        for j in range(i, n):  # upper triangle in (row=r2, col=r1): r1 >= r2
            lo_i, hi_i = max(0, i - radius), min(n, i + radius + 1)
            lo_j, hi_j = max(0, j - radius), min(n, j + radius + 1)
            patch = z[lo_i:hi_i, lo_j:hi_j]
            if z[i, j] == patch.min() and (patch == z[i, j]).sum() == 1:
                minima.append((i, j))
    return minima


def name_ratio(x: float) -> str:
    frac = nearest_just_ratio(x)
    name = INTERVAL_NAMES.get((frac.numerator, frac.denominator))
    label = f"{frac.numerator}/{frac.denominator}"
    return f"{label} ({name})" if name else label


def fig_surface_and_heatmap() -> tuple[dict, dict]:
    ratios, z = dissonance_surface(REF_FREQ, n_partials=8, r_min=1.0, r_max=2.05, n_points=211)
    z_norm = z / z.max()
    minima = detect_surface_minima(ratios, z_norm, radius=max(2, round(0.02 * 211 / 1.05)))
    # Keep only reasonably consonant, prominent valleys
    minima = [(i, j) for (i, j) in minima if z_norm[i, j] <= 0.4]
    minima = [
        (i, j) for (i, j) in minima
        if not involves_seven(float(ratios[i])) and not involves_seven(float(ratios[j]))
    ]

    # Markers mirrored into the note3 >= note2 triangle (surface is symmetric):
    # detected (i, j) has col j >= row i, so swap to put note 2 (x) below note 3 (y).
    marker_x = [round(float(ratios[i]), 4) for i, j in minima]
    marker_y = [round(float(ratios[j]), 4) for i, j in minima]
    marker_z = [round(float(z_norm[i, j]), 4) for i, j in minima]
    marker_text = [
        f"Chord 1 : {name_ratio(float(ratios[i]))} : {name_ratio(float(ratios[j]))}"
        for i, j in minima
    ]

    x_list = ratios.round(4).tolist()
    z_list = [[round(float(v), 4) for v in row] for row in z_norm]
    # The 3D surface shows only the triangle where note 3 >= note 2 (the other
    # half is its mirror image): mask cells below the diagonal.
    z_triangle = [
        [z_list[i][j] if i >= j else None for j in range(len(x_list))]
        for i in range(len(x_list))
    ]

    axis_3d = {
        "gridcolor": GRID,
        "zerolinecolor": GRID,
        "backgroundcolor": "rgba(0,0,0,0)",
        "tickfont": {"color": INK_MUTED, "size": 11},
    }
    surface = {
        "data": [
            {
                "type": "surface",
                "x": x_list,
                "y": x_list,
                "z": z_triangle,
                "colorscale": BLUE_COLORSCALE,
                "showscale": True,
                "colorbar": {
                    "title": {"text": "Dissonance", "font": {"color": INK_SECONDARY}},
                    "tickfont": {"color": INK_MUTED},
                    "thickness": 12,
                    "outlinewidth": 0,
                },
                "contours": {
                    "z": {"show": True, "usecolormap": True, "project": {"z": True}}
                },
                "hovertemplate": "Note 2: %{x:.3f}x<br>Note 3: %{y:.3f}x<br>Dissonance %{z:.2f}<extra></extra>",
            },
            {
                "type": "scatter3d",
                "mode": "markers",
                "x": marker_x,
                "y": marker_y,
                "z": marker_z,
                "text": marker_text,
                "marker": {"color": ORANGE, "size": 4},
                "hovertemplate": "%{text}<extra></extra>",
                "name": "consonant triads",
                "showlegend": False,
            },
        ],
        "layout": {
            "paper_bgcolor": "rgba(0,0,0,0)",
            "font": {"family": FONT, "color": INK_SECONDARY, "size": 12},
            "margin": {"l": 0, "r": 0, "t": 0, "b": 0},
            "scene": {
                "xaxis": {**axis_3d, "title": {"text": "Interval of Note 2 (ratio)", "font": {"color": INK_SECONDARY, "size": 12}}},
                "yaxis": {**axis_3d, "title": {"text": "Interval of Note 3 (ratio)", "font": {"color": INK_SECONDARY, "size": 12}}},
                "zaxis": {**axis_3d, "title": {"text": "Dissonance", "font": {"color": INK_SECONDARY, "size": 12}}},
                "camera": {"eye": {"x": -1.5, "y": 1.3, "z": 1.1}},
            },
        },
    }

    heatmap = {
        "data": [
            {
                "type": "heatmap",
                "x": x_list,
                "y": x_list,
                "z": z_list,
                "colorscale": BLUE_COLORSCALE,
                "colorbar": {
                    "title": {"text": "Dissonance", "font": {"color": INK_SECONDARY}},
                    "tickfont": {"color": INK_MUTED},
                    "thickness": 12,
                    "outlinewidth": 0,
                },
                "hovertemplate": "Note 2: %{x:.3f}x<br>Note 3: %{y:.3f}x<br>Dissonance %{z:.2f}<extra></extra>",
            },
            {
                "type": "scatter",
                "mode": "markers",
                "x": marker_x,
                "y": marker_y,
                "text": marker_text,
                "marker": {"color": ORANGE, "size": 7, "line": {"color": "#fcfcfb", "width": 1}},
                "hovertemplate": "%{text}<extra></extra>",
                "showlegend": False,
            },
        ],
        "layout": base_layout(
            xaxis={"title": {"text": "Interval of Note 2 (frequency ratio)"}, "constrain": "domain"},
            yaxis={"title": {"text": "Interval of Note 3 (frequency ratio)"}, "scaleanchor": "x"},
        ),
    }
    return surface, heatmap


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    figures = {
        "pure_tone_curves.json": fig_pure_tone_curves(),
        "curve_by_partials.json": fig_curve_by_partials(),
        "dissonance_curve.json": fig_dissonance_curve(),
        "bar_timbre_curve.json": fig_bar_timbre_curve(),
        "stretched_timbre.json": fig_stretched_timbre(),
    }
    surface, heatmap = fig_surface_and_heatmap()
    figures["dissonance_surface_3d.json"] = surface
    figures["dissonance_heatmap.json"] = heatmap

    for name, fig in figures.items():
        path = OUT_DIR / name
        with open(path, "w") as f:
            json.dump(fig, f)
        print(f"wrote {path.resolve()} ({path.stat().st_size / 1e6:.2f} MB)")


if __name__ == "__main__":
    main()
