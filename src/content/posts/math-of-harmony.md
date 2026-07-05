---
title: How math defines what sounds good
thumbnail: Why do some notes sound sweet together and others clash? Starting from two sine waves, we derive the physics of dissonance, rebuild musical scales from scratch, and end on a 3D map of every possible chord.
date: 2026-07-05
type: blog
url: math-of-harmony
---

Play a C and a G together and something feels right. Shift the G by a quarter of a tone and the same instrument now sounds broken. What changed? Nothing about the instrument, nothing about you: just two numbers, the frequencies of the notes.

It turns out there is a mathematical model, resting on one psychoacoustics experiment from 1965, that predicts which combinations of notes sound "in tune". It explains why Western music picked the intervals it did, why a piano tuner deliberately tunes your piano "wrong", why Indonesian gamelan orchestras use scales that sound alien to Western ears (and why both cultures are right), and it can even design new scales for instruments that don't exist. At the end of this post, we'll condense all of it into a single 3D landscape containing every possible three-note chord, where the valleys are the chords humans actually use.

This post is a synthesis of two excellent sources: [Aatish Bhatia's interactive essay](https://aatishb.com/dissonance/) and minutephysics' video [The Physics of Dissonance](https://www.youtube.com/watch?v=tCsl6ZcY9ag), plus the original papers behind them. Every figure below is computed from scratch; the code lives in [this repository's research folder](https://github.com/aymeric-roucher/personal-homepage/tree/main/research/harmony-dissonance) so you can reproduce everything.

One caveat before we start: "sounding good" obviously depends on the person, their culture, and their musical history. But before sound ever reaches psychology, it is a pressure wave hitting a physical organ. This post is about that physical and physiological layer, what researchers call **sensory dissonance**. It won't explain why a chord progression gives you chills. It explains something more basic: why some pairs of notes physically grind.

## A note is a stack of frequencies

Press a single piano key and you don't get a single frequency. You get the **fundamental** (the pitch you perceive, say 261.6 Hz for middle C) plus a whole ladder of quieter **overtones** above it. For a vibrating string or an air column in a pipe, physics forces these overtones to sit at exact integer multiples of the fundamental: $2f$, $3f$, $4f$, and so on. A string of length $L$ can only vibrate in shapes that pin down both ends, giving frequencies $f_n = n \cdot v / 2L$. Overtones that follow this integer pattern are called **harmonics**.

This works because sound superposes: pressure waves add up linearly, so any instrument's sound can be decomposed into a sum of pure sine waves (this is Fourier analysis; [3Blue1Brown's videos](https://www.youtube.com/watch?v=spUNpyF58BY) are the best introduction). A violin and a piano playing the same middle C have the same fundamental but different loudness ratios between their overtones. That recipe of relative loudnesses is what we call **timbre**: it is why you can tell the two instruments apart.

The claim of this whole post, and it is a strong one, is that overtones do much more than color the sound. **The overtones determine which scales and which chords a sound belongs to.** To see why, we first need to understand what happens when two pure sine waves meet.

## Two pure tones: beats, roughness, and the ear's blurry vision

Take one sine wave at 220 Hz and another at 224 Hz. Each alone is a perfectly smooth tone. Together, they drift in and out of sync: sometimes their peaks align and reinforce, sometimes they cancel. The result is a single tone whose volume pulses, at exactly the difference of the two frequencies (here 4 times per second). These pulses are called **beats**. Try it, and drag the slider while it plays:

<iframe src="/assets/images/math-of-harmony/beats.html" height="330"></iframe>

As you increase the detuning, the beats speed up. Around 20 to 30 beats per second, something changes: your ear can no longer follow individual pulses, and the sound takes on a grinding, unpleasant quality that psychoacousticians call **roughness**. Push further and the roughness fades: the two tones finally separate into two distinct, peaceful pitches.

Why does the ear fuse close frequencies at all? Because its frequency resolution is limited. The cochlea, the spiral organ of the inner ear, works like a mechanical frequency analyzer: each frequency makes a specific region of its membrane vibrate. But each region has some width. A single frequency stimulates nerve fibers of neighboring frequencies too, so two tones that fall within the same region, the so-called **critical band**, cannot be cleanly resolved as two sounds. They are heard as one blurred, rough tone. Our ears need glasses. (A neat proof that this happens inside the ear and not in the air: play one tone in each ear through headphones and the roughness largely disappears, since each cochlea only receives one clean frequency.)

In 1965, Reinier Plomp and Willem Levelt [measured this precisely](https://www.mpi.nl/world/materials/publications/levelt/Plomp_Levelt_Tonal_1965.pdf). They played pairs of pure sine tones to subjects who rated them on a 7-point consonance scale. A clever detail: they parameterized the pairs by mean frequency and frequency *difference* rather than by frequency ratio, precisely so that musically trained ears couldn't recognize familiar intervals and rate them by habit. The result is one of the most consequential curves in psychoacoustics: dissonance is zero at unison, spikes to a maximum for small separations, then decays smoothly as the tones move apart. And the width of that "zone of discomfort" is not a fixed number of Hertz: it scales with the critical bandwidth of the register you are in. Their rule of thumb: **maximal dissonance at about 25% of the critical bandwidth, back to consonance at about 100% of it**.

Since the critical band is wide at low frequencies and narrow (relative to pitch) at high ones, the same musical interval can be rough in the bass and smooth in the treble. Here is the Plomp-Levelt curve computed at four different registers:

<div class="plotly-chart" data-src="/assets/images/math-of-harmony/pure_tone_curves.json"></div>

This is why composers have always avoided close intervals like thirds in the deep bass: down there, even a major third leaves partials rubbing inside one critical band. Plomp and Levelt actually verified this statistically, by analyzing the chords in a Bach organ trio sonata and a Dvořák string quartet: composers keep simultaneous partials right in the zone between maximal roughness and full consonance.

Now look at that curve again, because something important is *missing* from it. There is no dip at the octave. No dip at the fifth. Nothing special happens at any musical ratio: two pure sine tones either want to be identical or want personal space, and that's all. **For pure tones, simple frequency ratios are not special.** So where does music come from?

(One fine-print caveat: careful listeners can hear faint "secondary beats" when two pure tones sit slightly off a simple ratio like 2:1, so the pure-tone curve may deserve tiny corrections there. Nobody considers this musically decisive, and we'll ignore it, as everyone does.)

## Harmony comes from overtones

The idea that unlocks everything dates back to Hermann Helmholtz's 1863 book *On the Sensations of Tone*: dissonance comes from beats, and real notes carry overtones. So when two notes sound together, roughness can arise between *any* partial of one and *any* partial of the other: fundamental against fundamental, fundamental against overtone, overtone against overtone. (Helmholtz thought maximal roughness sat at a fixed 30 to 40 Hz separation regardless of register; Plomp and Levelt's critical-band scaling is the modern correction to this single error, and his hand-drawn 1875 dissonance curves look remarkably close to the computed ones below.)

Plomp and Levelt turned that idea into arithmetic with one assumption: **the total dissonance of two complex tones is just the sum of the pairwise dissonances of all their partials.** In the 1990s, William Sethares [fitted a clean formula](https://sethares.engr.wisc.edu/consemi.html) to their experimental curve, giving the model we compute with today.

<div class="technical-block" data-title="The Sethares dissonance formula">

For two pure partials at frequencies $f_1 \le f_2$ with loudnesses $l_1, l_2$, the perceived roughness is:

$$d(f_1, f_2, l_1, l_2) = \min(l_1, l_2)\left[e^{-b_1 s (f_2 - f_1)} - e^{-b_2 s (f_2 - f_1)}\right]$$

with $b_1 = 3.51$, $b_2 = 5.75$, and a register-dependent scale factor

$$s = \frac{d^*}{s_1 f_1 + s_2}, \qquad d^* = 0.24,\; s_1 = 0.0207,\; s_2 = 18.96$$

The $s$ factor stretches the curve with the critical bandwidth, so the roughness peak always sits at the same *fraction* of the critical band, per Plomp and Levelt's finding. The $\min(l_1, l_2)$ says a pair can only be as rough as its quieter member. The dissonance of two complex tones is then the sum of $d$ over every pair of partials. Constants are from Sethares' published code (the 1993 paper fits slightly different values); amplitudes are converted to loudness before summing. That is the entire model: about ten lines of code, [reproduced here](https://github.com/aymeric-roucher/personal-homepage/blob/main/research/harmony-dissonance/dissonance.py).

</div>

Now watch what happens. Give each of the two notes a realistic harmonic timbre (partials at $1f, 2f, 3f...$ with decreasing loudness, like a string), fix one note, sweep the other from unison to past the octave, and sum the pairwise roughness at every step. Move the slider to change how many harmonics each note carries:

<div class="plotly-chart" data-src="/assets/images/math-of-harmony/curve_by_partials.json"></div>

With 1 harmonic (a pure sine) you get the featureless Plomp-Levelt hump: no interval is special. Add the second harmonic and a deep valley appears at ratio 2.0, **the octave is born**. The third harmonic carves a valley at 3/2, the fifth. Then 4/3 (the fourth), then 5/4 and 5/3 (major third and major sixth), then 6/5 (minor third). The consonant intervals of Western music emerge one by one, in roughly their order of historical importance, as you stack up overtones.

The logic is beautifully simple. A valley appears wherever many partials of the two notes *coincide*: at a 3:2 interval, the third harmonic of the low note lands exactly on the second harmonic of the high note, so instead of two nearby partials grinding inside a critical band, they fuse into one. Between the valleys, partials fall close-but-not-equal and roughness spikes. In physics terms the curve reads like a potential energy landscape: like two hydrogen atoms settling at the separation that minimizes their energy to form a molecule, two notes "want" to roll downhill into the nearest valley. That pull is what musicians feel as an interval wanting to resolve.

Here is the full curve for two 6-harmonic tones, with the valleys marked. This reproduces the famous Figure 11 of Plomp and Levelt's paper, and the central figure of both source essays:

<div class="plotly-chart" data-src="/assets/images/math-of-harmony/dissonance_curve.json"></div>

The valleys sit exactly at the small-integer frequency ratios: 6/5, 5/4, 4/3, 3/2, 5/3, 2/1. These ratios are the **just intonation** scale. This is worth stating carefully, because it inverts the usual mysticism about integer ratios going back to Pythagoras: the model never looked for pretty fractions. It only summed the roughness of sine pairs. Simple ratios win *because notes with harmonic overtones align their partials there*, and nowhere else. As Aatish Bhatia puts it: just intonation is the scale that minimizes dissonance for a harmonic sound.

Two more things to read off this figure:

- **Sharper valleys for simpler ratios.** The octave and fifth are narrow slits: mistune them slightly and dissonance shoots up. The thirds sit in shallow bowls: they tolerate mistuning. Sethares proved this pattern in general (a timbre with $n$ partials has at most $2n(n-1)$ local minima, the steep ones exactly where partials coincide). This asymmetry is why equal temperament is livable: the dotted vertical lines show the 12 notes of **equal temperament**, the modern compromise tuning where every semitone is an identical ratio of $2^{1/12}$. Its fifth (1.4983) lands imperceptibly close to 3/2, but its major third (1.2599) visibly misses the 5/4 valley and sits partway up a dissonance slope. Tempered thirds really are slightly sour, and the model shows why we accept them: their valley is shallow, so the penalty is mild. Mistuned octaves would be unbearable, and indeed equal temperament keeps octaves exact.
- **The relative depths of the valleys** reproduce the classical ranking of consonances that music theorists established by ear centuries ago (octave, fifth, fourth, sixths, thirds), which Malmberg had measured empirically in 1918.

Don't take my word for any of this: here is a live version of the model. Click anywhere on the curve to hear that interval, played with the exact timbre the curve is computed from. Try the presets: hear how the "detuned fifth" wobbles while 3/2 locks, and how the tempered third buzzes very slightly against 5/4. Then reduce the overtones to 1 and try the same comparisons: the difference nearly vanishes.

<iframe src="/assets/images/math-of-harmony/interval-explorer.html" height="580"></iframe>

That last experiment is the crucial one, so let me spell out what it demonstrates. An A and an E don't sound in tune because their fundamentals are at a 3:2 ratio: those two sine waves alone are far outside each other's critical band and sound fine at almost any spacing. In the minutephysics video there's a wicked demonstration of this: the narrator plays a "reference" tone noticeably out of tune with pure sines, and nobody notices; the wobble only becomes audible once overtones are added, one by one, until the mistuned fifth suddenly grinds. **Tuning comes from overtones, not from numerology on fundamentals.** A fifth is only "well defined" once the notes carry two or three overtones; the fourth needs one more still.

## Change the sound, change the scale

Here is where the theory earns its keep. If consonance were about integer ratios of fundamentals, it would be universal: the same scale for every instrument on Earth. But if consonance is about *aligning overtones*, then a sound with different overtones should prefer **different intervals**. This is a falsifiable prediction, and it turns out to be the strongest evidence for the whole framework.

**Real pianos.** Piano strings are stiff, so they don't behave as ideal strings: their overtones land slightly sharp of integer multiples (this is called inharmonicity, worse for the short strings of small pianos). A piano tuned to mathematically exact octaves sounds out of tune *with itself*, because each note's stretched overtones beat against the note an octave up. So tuners stretch the tuning: treble notes sharp, bass notes flat, following the measured **Railsback curve**. Piano tuning is applied dissonance theory, and it has quietly ignored "correct" frequency ratios for two centuries.

**Synthetically stretched timbres.** Go further and build an artificial tone whose overtones sit at $1f, 2^{0.95}f, 3^{0.95}f...$ instead of $1f, 2f, 3f...$ Every valley of the dissonance curve migrates. Drag the slider below: at a stretch exponent of 0.95, the sacred 2:1 octave sits on a dissonance *bump* while a flat pseudo-octave near 1.93 becomes the consonant one; the fifth slides from 1.50 toward 1.47. With such sounds, played through such sounds, a perfectly tuned Western chord genuinely sounds wrong and the "wrong" one sounds right. This is the trick behind the opening of the minutephysics video, where a slight tweak to the overtones turns every fundamental Western chord into a dissonant mess:

<div class="plotly-chart" data-src="/assets/images/math-of-harmony/stretched_timbre.json"></div>

**Bells and bars.** No need for synthesizers: any instrument that isn't a string or an air column already has non-harmonic overtones. A struck metal bar (think xylophone, glockenspiel, or roughly a bell) has partials at $1f, 2.76f, 5.40f, 8.94f...$, dictated by the physics of bending waves. Compute its dissonance curve and the Western intervals land on hills; new valleys open at unfamiliar ratios like 1.65 and 2.09, and the octave at 2.0 is a bump flanked by valleys at 1.96 and 2.09:

<div class="plotly-chart" data-src="/assets/images/math-of-harmony/bar_timbre_curve.json"></div>

On a bell-like sound, a "fifth" around 1.47 can beat the exact 3/2, which now sounds slightly off. This is a decent piece of why bells and drums feel unmelodic in Western harmony: their overtones simply don't vote for Western intervals. (You can hear this in the interval explorer above by switching the timbre to "metal bar".)

**Other musical cultures.** The most striking confirmation: Indonesian **gamelan** orchestras, built on shaped bronze kettles, gongs and bars, use two scales (five-note **slendro**, close to 5-tone equal temperament, and the uneven seven-note **pelog**) that fit no Western tuning. Compute the dissonance curve between a voice-like harmonic sound and a gamelan-kettle timbre and the valleys land almost exactly on the slendro notes; voice against bar-like instruments decently matches pelog. Thai classical music, likewise built around tuned bars, uses a seven-note near-equal temperament that matches the voice-plus-bar dissonance valleys. Sethares proposed this test in his 1993 paper and worked it out in his book [Tuning, Timbre, Spectrum, Scale](https://sethares.engr.wisc.edu/ttss.html): each musical culture's scale is near-optimal *for the spectra of its own instruments*. Nobody is out of tune; they are minimizing different dissonance curves.

**Invented scales.** The logic runs forward too. Want a scale nobody has heard? Put overtones at prime multiples ($1, 2, 3, 5, 7, 11...$) and the model hands you consonant intervals at prime fractions. Sethares even ran the inverse problem, using optimization to *design a timbre* whose dissonance valleys land on an arbitrary target scale, like 10-tone equal temperament, which no natural instrument supports. Instrument and scale are two halves of one system, and you can engineer either half.

## From intervals to chords: the map of all harmony

Everything so far concerned two notes. Music mostly happens in chords, so take three: fix a root at middle C, and let the second and third notes float freely at ratios $r_1$ and $r_2$ above it. Sum the pairwise dissonance over *all* partial pairs of all three notes and you get, instead of a curve, a **dissonance surface** over the plane of all possible triads. Since pitch is continuous, every three-note chord that can exist, in any tuning system, from any culture, is one point on this map.

First look at it from above, as a heatmap. The structure is stunning: a weave of light valley-lines crossing the plane.

<div class="plotly-chart" data-src="/assets/images/math-of-harmony/dissonance_heatmap.json"></div>

Reading the grid:

- **Vertical lines**: note 2 forms a consonant interval with the root (each line is a valley of the 2D curve we built earlier).
- **Horizontal lines**: note 3 is consonant with the root.
- **Diagonal lines**: notes 2 and 3 are consonant *with each other*.
- The dark ridge along the main diagonal is where notes 2 and 3 nearly coincide and grind (pure Plomp-Levelt roughness), and the dark blob near the origin is all three notes crowded within a critical band: the most dissonant chords of all, on any instrument, though for a boring reason.

The truly consonant chords are the **triple intersections**, where all three pairs are simultaneously in tune. Check the coordinates of the marked points: (1.5, 1.25) is root, major third, fifth: the **major chord**. (1.5, 1.2) is the **minor chord**. (1.6, 1.2) is a first-inversion major (think E-G-C), (1.67, 1.33) a second-inversion major (C-F-A), (1.5, 1.33) a suspended fourth, (2.0, 1.5) the open fifth-plus-octave power chord of every rock guitarist. Nobody put them there: Western harmony's basic vocabulary just condenses out of one 1965 experiment on sine waves.

Two more things the map teaches. First, away from the lines, most of chord space is a plateau of roughly uniform dissonance: almost every possible triad is mediocre in the same way, which is exactly why stumbling into a deep well feels so dramatic, and why those rare islands became the foundation of harmony. Second, the "most dissonant interesting chord" (the tallest peak away from the trivial crowded-notes region) sits wedged between a minor chord, a first-inversion major, and a suspended second: it sounds like all of them played badly out of tune at once, which is precisely what it is.

And here it is in three dimensions, the figure this whole post was building toward. **Drag to rotate, and click anywhere to hear the chord you're pointing at.** The wells are the chords musicians have always known; the peaks are everything else:

<iframe src="/assets/images/math-of-harmony/surface3d.html" height="600"></iframe>

Remember, this landscape belongs to *harmonic* timbres. Recompute it for a drum, a bell, or prime-number overtones, and the whole geography rearranges: different wells, different chords, a different music theory. There is not one map of harmony; there is one map per sound.

## What this model doesn't explain

Honesty section. This is a model of one perceptual mechanism, and it has known gaps:

- **The tritone problem.** The curve gives the tritone (ratio around 1.4) a modest valley, roughly on par with a minor sixth. Yet Western theory treats the tritone as the tensest of intervals ("the devil in music"). Sensory roughness clearly isn't the whole story of musical tension.
- **Whole steps and half steps** are only marginal consonances here. The model does give them valleys, but weak ones: a dip at 9/8 (the major second) only appears once the tones carry about nine harmonics, and it sits several times higher on the dissonance scale than the thirds (you can see this in the chord map, where the suspended-second well at (1.5, 1.125) exists because the second is a consonant fourth away from the fifth, not because it agrees with the root). A half step like 16/15 never gets a usable valley at all. So the model explains why seconds work *inside* chords and scales while still sounding tense as bare intervals, but the size of melodic steps themselves probably owes more to *differences* between strong consonances (a half step is the gap between a third and a fourth) than to any valley of their own.
- **The exact curve is soft.** The precise width and height of the pure-tone roughness zone varies across studies, ears, loudness levels, and probably musical exposure; Helmholtz's 1875 hand-fitted curve differs from Sethares' fit. Small changes in the kernel move the fine details (though not the qualitative picture). Choices like whether to count each note's internal roughness, and the assumption that roughness from different partial pairs adds *linearly*, are convenient assumptions, not derived facts.
- **Real instruments are messier than their idealization.** A violin is not a pure string: its wooden body resonates like a drum and its cavity like a pipe, at fixed frequencies that don't move with the note. Real spectra are blends.
- **And of course, culture, context, and expectation** shape everything built on top of this substrate. The model addresses sensory dissonance, not why a IV-V-I cadence resolves or why you like the music you like.

Even with those caveats, the punchline stands: a huge chunk of music theory, the part everyone assumed was arbitrary culture or divine integer mysticism, falls out of two exponentials fitted to a 1965 listening experiment, summed over overtones.

## Reproduce it

All figures in this post are generated by three short Python scripts in [`research/harmony-dissonance`](https://github.com/aymeric-roucher/personal-homepage/tree/main/research/harmony-dissonance): the model itself ([dissonance.py](https://github.com/aymeric-roucher/personal-homepage/blob/main/research/harmony-dissonance/dissonance.py), about 40 lines of numpy), tests asserting that the consonant valleys land where they should, and the figure generator. With [uv](https://docs.astral.sh/uv/) installed:

```
uv run --with numpy --with pytest pytest test_dissonance.py
uv run make_figures.py
```

The interactive widgets implement the same equations in JavaScript with live audio synthesis; view-source on any of them.

## Sources

- Reinier Plomp and Willem Levelt, [Tonal Consonance and Critical Bandwidth](https://www.mpi.nl/world/materials/publications/levelt/Plomp_Levelt_Tonal_1965.pdf), Journal of the Acoustical Society of America 38, 548-560 (1965). The founding experiment and the sum-over-partials idea.
- William Sethares, [Local consonance and the relationship between timbre and scale](https://minds.wisconsin.edu/bitstream/handle/1793/9496/file_1.pdf), Journal of the Acoustical Society of America 94, 1218-1228 (1993), and his book [Tuning, Timbre, Spectrum, Scale](https://sethares.engr.wisc.edu/ttss.html). The formula, the theorems, and the timbre-to-scale program.
- Aatish Bhatia, [Dissonance: a journey through musical possibility space](https://aatishb.com/dissonance/), interactive essay ([source code](https://github.com/aatishb/dissonance)). Origin of the interactive dissonance surface.
- minutephysics, [The Physics of Dissonance](https://www.youtube.com/watch?v=tCsl6ZcY9ag) (2025). The narrative arc this post follows, including the stretched-timbre twist and the chord-space tour.
- Hermann Helmholtz, *On the Sensations of Tone* (1863, English translation 1877). Where the beats theory of dissonance began.
