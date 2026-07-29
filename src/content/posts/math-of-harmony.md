---
title: The Math Behind Harmony - why a fifth sounds sweet and a piano is tuned wrong
thumbnail: Why do some notes sound sweet together and others clash? From the physics of dissonance, we derive harmony and rebuild musical scales.
date: 2026-07-05
type: blog
url: math-of-harmony
---

Why does music sound harmonious or jarring?

I have this sometimes unpopular opinion that the concepts "beautiful" or "ugly" are not just peculiar social constructs, but that they bear some universal truth, and that denying the importance of harmony can lead to [awful missteps](https://youtu.be/4u0K0xdOx_k?si=htzJs8Cnz5PGXKzd&t=85).

I've recently been very happy to stumble upon the beginning of an explanation: the sensory theory of consonance and dissonance.

It explains:
- why the intervals originally set by Pythagoreans[^pythagorean] have become the basis for all Western music
- why certain chords sound better than others
- why a piano tuner deliberately tunes your piano "wrong"
- why other cultures can very rightly NOT use the Western harmonic scale of A-B-C-D-E-F-G (or Do-Re-Mi-Fa-Sol-La-Si-Do in latin notation), depending on the instruments that they favor.

This post is 95% based on two excellent sources, Aatish Bhatia's interactive essay[^aatish] and minutephysics' video The Physics of Dissonance[^minutephysics], plus the original papers behind them. You can reproduce everything[^code].

One caveat before we start: "sounding good" obviously also depends, at second order, on the person, their culture, and their musical history. But the first order is: a pressure wave hitting your ear.

## Two pure tones: beats, roughness, and our approximative audition

Start with the simplest possible sound: a pure sine wave, a single frequency and nothing else. Take one sine wave at 220 Hz and another at 224 Hz. Each alone is a perfectly smooth tone. Together, they drift in and out of sync: sometimes their peaks align and reinforce, sometimes they cancel. The result is a single tone whose volume pulses, at exactly the difference of the two frequencies (here 4 times per second). These pulses are called **beats**. Try it, and drag the slider while it plays:

<iframe src="/assets/images/math-of-harmony/beats.html" height="360"></iframe>

As you increase the detuning, the beats speed up. Around 20 to 30 beats per second, something changes: your ear can no longer follow individual pulses, and the sound takes on a grinding quality that psychoacousticians call **roughness**. Push further and the roughness fades: the two tones finally separate into two distinct, peaceful pitches.

Why does the ear fuse close frequencies at all? Because its frequency resolution is limited. The cochlea, the spiral organ of the inner ear, works like a mechanical frequency analyzer: each frequency makes a specific region of its membrane vibrate. But each region has some width. A single frequency stimulates nerve fibers of neighboring frequencies too, so two tones that fall within the same region, the so-called **critical band**, cannot be cleanly resolved as two sounds. They are heard as one blurred, rough tone: our audition is blurry, and roughness is what the blur sounds like.

Here is proof that this happens inside the ear and not in the air: put on headphones and play the two grinding tones below, then switch from both-tones-in-both-ears to one-tone-per-ear. The roughness vanishes, because each cochlea now receives a single clean frequency with nothing to grind against, even though the two tones in the air never changed:

<iframe src="/assets/images/math-of-harmony/binaural.html" height="320"></iframe>

In 1965, Reinier Plomp and Willem Levelt measured this precisely[^plomplevelt]. They played pairs of pure sine tones to subjects who rated them on a 7-point consonance scale. Each pair of tones was described by two numbers: where the pair sits overall (the average of the two frequencies, i.e. bass register or treble register) and the *gap in Hertz* between them. Note what's absent: the frequency *ratio*, the thing every musical interval is named after. That choice was deliberate, for two reasons. First, a trained ear recognizes ratios ("that's a fifth!") and rates them by learned habit, so the gaps were chosen to fall between the familiar intervals. Second, and more deeply, the law they found really is a law about the Hz gap, not the ratio: two pure tones are rough when their absolute distance in Hertz is small compared to the critical band at that register, wherever that distance happens to fall ratio-wise. Dissonance is zero at unison, spikes to a maximum for a small gap, then decays smoothly, and the width of that "zone of discomfort" scales with the critical bandwidth: **maximal dissonance at about 25% of the critical bandwidth, back to consonance at about 100% of it**. (If ratios don't matter here, where does the 3/2 fifth get its magic? Hold that thought: ratios only enter the story in the next section, through overtones.)

Since the critical band is wide at low frequencies and narrow (relative to pitch) at high ones, the same musical interval can be rough in the bass and smooth in the treble. Here is the Plomp-Levelt curve at three registers, bass on top, treble at the bottom: the roughness bump squeezes toward unison as the register rises, because at a high pitch the same ratio is a much wider gap in Hertz, already outside the critical band, while down in the bass that identical ratio still packs both tones inside one band and grinds. Click any point to hear the two tones there:

<iframe src="/assets/images/math-of-harmony/chart.html?fig=pure_tone_curves&mode=pure" height="560"></iframe>

Note that on the curve above, there is nothing particular at well known consonant ratios, like 2:1 (octave) or 3:2 (fifth). **For pure tones, simple frequency ratios are not special.** Two pure sine tones either want to be identical or want personal space, and that's all. So where does music come from?

## Harmony comes from overtones

Real notes are actually not one, but many sines stacked together. Press a single piano key and you don't get a single frequency: you get the **fundamental** (the pitch you perceive, say 261.6 Hz for middle C) plus a whole ladder of quieter **overtones** above it. For a vibrating string or an air column in a pipe (and the human voice is exactly that: the vocal folds driving the air column of your throat and mouth), physics creates vibration nodes at regularly spaced intervals of the total length (the fundamental being the total length), which means that the overtones sit at exact integer multiples of the fundamental: $2f$, $3f$, $4f$, and so on. A string of length $L$ can only vibrate in shapes that pin down both ends, giving frequencies $f_n = n \cdot v / 2L$. Overtones that follow this integer pattern are called **harmonics**.

This stacking works because sound superposes: pressure waves add up linearly, so any instrument's sound can be decomposed into a sum of pure sine waves (this is Fourier analysis; 3Blue1Brown's videos are the best introduction[^threeblue]). A violin and a piano playing the same middle C have the same fundamental but different loudness ratios between their overtones. That recipe of relative loudnesses is what we call **timbre**: it is why you can tell the two instruments apart.

Experience it below: a single note, starting as a bare sine wave. Click the wave to hear it, then drag the slider while it plays: each step stacks another overtone on top of the same note. The pitch never moves, but the dull whistle thickens into something with body, close to a bowed string. Then switch the timbre while it plays: a metal bar puts its overtones at completely different multiples of the same fundamental, and the note instantly stops sounding like a string.

<iframe src="/assets/images/math-of-harmony/overtones.html" height="360"></iframe>

This idea that dissonance comes from beats, and real notes carry overtones, dats back to Hermann Helmholtz's 1863 book *On the Sensations of Tone*[^helmholtz]. So when two notes sound together, roughness can arise between *any* partial of one and *any* partial of the other: fundamental against fundamental, fundamental against overtone, overtone against overtone.

Plomp and Levelt turned that idea into arithmetic with one assumption: **the total dissonance of two complex tones is just the sum of the pairwise dissonances of all their partials.** In the 1990s, [Pr. William Sethares](https://scholar.google.com/citations?user=R_2UugQAAAAJ&hl=en), who might be the most important music theorist alive, fitted a clean formula to their experimental curve[^sethares], giving the model we compute with today.

<div class="technical-block" data-title="The Sethares dissonance formula">

For two pure partials at frequencies $f_1 \le f_2$ with loudnesses $l_1, l_2$, the perceived roughness is:

$$d(f_1, f_2, l_1, l_2) = \min(l_1, l_2)\left[e^{-b_1 s (f_2 - f_1)} - e^{-b_2 s (f_2 - f_1)}\right]$$

with $b_1 = 3.51$, $b_2 = 5.75$, and a register-dependent scale factor

$$s = \frac{d^*}{s_1 f_1 + s_2}, \qquad d^* = 0.24,\; s_1 = 0.0207,\; s_2 = 18.96$$

The $s$ factor stretches the curve with the critical bandwidth, so the roughness peak always sits at the same *fraction* of the critical band, per Plomp and Levelt's finding. The $\min(l_1, l_2)$ says a pair can only be as rough as its quieter member. The dissonance of two complex tones is then the sum of $d$ over every pair of partials. Constants are from Sethares' published code (the 1993 paper fits slightly different values); amplitudes are converted to loudness before summing. That is the entire model: the kernel fits in a dozen lines of code[^code].

</div>

Now watch what happens. Give each of the two notes a realistic harmonic timbre (partials at $1f, 2f, 3f...$ with decreasing loudness, like a string), fix one note, sweep the other from unison to past the octave, and sum the pairwise roughness at every step. Move the slider to change how many harmonics each note carries:

<iframe src="/assets/images/math-of-harmony/chart.html?fig=curve_by_partials&mode=bypartials" height="540"></iframe>

With 1 harmonic, a pure sine, you get the featureless Plomp-Levelt hump: no interval is special. Add the second harmonic and a deep valley appears at ratio 2.0, **the octave is born**. The third harmonic carves a valley at 3/2, the fifth (the interval from C to G). Then 4/3 (the fourth), then 5/4 and 5/3 (major third and major sixth), then 6/5 (minor third). The consonant intervals of Western music emerge one by one as you stack up overtones.

You can watch this happen below. Hold the slider and raise the moving note, and its whole ladder of overtones slides rightward through the fixed one. At most positions the bars pack close together and you hear the grind; at the simple ratios, orange bars land exactly on blue ones and the sound locks into tune. The bottom panel traces out the dissonance of every interval you have swept through. A valley appears wherever many partials of the two notes *coincide*: at a 3/2 interval, the third harmonic of the low note lands exactly on the second harmonic of the high note, so instead of two nearby partials grinding inside a critical band, they fuse into one.

<iframe src="/assets/images/math-of-harmony/spectrum.html" height="600"></iframe>

Here is the full curve for two 8-harmonic tones, with the valleys marked; click anywhere to hear that interval:

<iframe src="/assets/images/math-of-harmony/chart.html?fig=dissonance_curve&mode=harmonic6" height="520"></iframe>

The deep valleys sit exactly at the small-integer frequency ratios: 6/5, 5/4, 4/3, 3/2, 5/3, 2/1. These ratios are the **just intonation** scale (the 7th and 8th harmonics also carve shallower dips at septimal ratios like 7/6, 7/5 and 7/4, intervals Western music never adopted). One belief dating back to Pythagoras was that simple integer ratios were "naturally" the good-sounding intervals: our model of dissonance applied to harmonics actually shows that the real cause sits one layer deeper. Simple ratios win *because notes with harmonic overtones align their partials there*, thus minimizing dissonance.

Two more things to read off this figure:

- **Sharper valleys for simpler ratios.** The octave and fifth are narrow slits: mistune them slightly and dissonance shoots up. The thirds sit in shallow bowls: they tolerate mistuning. Sethares proved this pattern in general (a timbre with $n$ partials has at most $2n(n-1)$ local minima, the steep ones exactly where partials coincide)[^sethares]. This asymmetry is why equal temperament is livable: the dotted vertical lines show the 12 notes of **equal temperament**, the modern compromise tuning where every semitone is an identical ratio of $2^{1/12}$. Its fifth (1.4983) lands imperceptibly close to 3/2, but its major third (1.2599) visibly misses the 5/4 valley and sits partway up a dissonance slope. Tempered thirds really are slightly sour, and the model shows why we accept them: their valley is shallow, so the penalty is mild. Mistuned octaves would be unbearable, and indeed equal temperament keeps octaves exact.
- **The relative depths of the valleys** reproduce the classical ranking of consonances that music theorists established by ear centuries ago (octave, fifth, fourth, sixths, thirds), which Malmberg had measured empirically in 1918.

And why twelve notes in the first place? Because of a number-theoretic near-miracle that the Pythagoreans stumbled on while building scales by stacking fifths[^pythagorean]: after exactly twelve fifths you land almost precisely back on your starting note, seven octaves up ($(3/2)^{12} = 129.7$, versus $2^7 = 128$, an overshoot of only 1.4%, the "Pythagorean comma"). This also means that $2^{7/12}$ is within 0.1% of a perfect fifth. So dividing the octave into twelve equal steps buys you, all at once, a near-perfect fifth (1.4983 vs 3/2), a near-perfect fourth (1.3348 vs 4/3), and serviceable thirds and sixths (1.26 vs 5/4, 1.68 vs 5/3): **no other small division of the octave lands so many of the dissonance valleys with so few notes.**

Overtones also explain why composers have always avoided close intervals like thirds in the deep bass: remember that the roughness zone widens at low register, so down there even a major third (two notes at a frequency ratio of 5/4, like C and E) leaves partials rubbing inside one critical band. You can put startling numbers on it. I ran a census over the 351 four-part Bach chorales bundled with music21[^code]: when the lower note of two adjacent voices sits below C3, Bach writes them a major third or closer just **0.8%** of the time; when the lower note is at or above middle C, **43.4%** of the time. Same composer, same chords available, a **57x** difference purely driven by register: the physics of the critical band, obeyed by ear, two centuries before it was measured.

## Change the sound, change the scale

Now, we'll see where the theory earns its keep. If consonance were about integer ratios of fundamentals, it would be universal: the same scale for every instrument on Earth. But if consonance is about *aligning overtones*, then a sound with different overtones should prefer **different intervals**. So, is it the case? YES, it is!

**Real pianos.** Piano strings are stiff, so they don't behave as ideal strings: their overtones land slightly sharp of integer multiples (this is called inharmonicity, worse for the short strings of small pianos). A piano tuned to mathematically exact octaves sounds out of tune *with itself*, because each note's stretched overtones beat against the note an octave up. So tuners stretch the tuning: treble notes sharp, bass notes flat, following the measured **Railsback curve**, the deviation from mathematically exact tuning that piano tuners converge to by ear:

<div class="plotly-chart" data-src="/assets/images/math-of-harmony/railsback_curve.json"></div>

**Bells and bars.** No need for synthesizers: any instrument that isn't a string or an air column already has non-harmonic overtones. A struck metal bar (think xylophone, glockenspiel, or roughly a bell) has partials at $1f, 2.76f, 5.40f, 8.94f...$, dictated by the physics of bending waves. Compute its dissonance curve and the Western intervals land on hills; new valleys open at unfamiliar ratios like 1.65 and 2.09, and the octave at 2.0 is a bump flanked by valleys at 1.96 and 2.09:

<iframe src="/assets/images/math-of-harmony/chart.html?fig=bar_timbre_curve&mode=bar" height="520"></iframe>

On a bell-like sound, a "fifth" around 1.47 can beat the exact 3/2, which now sounds slightly off. This is a decent part of why bells and drums feel unmelodic in Western harmony: their overtones simply don't vote for Western intervals. (Hear it on the chart above, which plays with bar overtones: click the valley near 1.49, then the exact 1.5.)

Maybe the best point about this explanation of harmony is that **it holds well across musical cultures:** Indonesian **gamelan** orchestras, built on shaped bronze kettles, gongs and bars, use two scales (five-note **slendro**, close to 5-tone equal temperament, and the uneven seven-note **pelog**) that fit no Western tuning. Compute the dissonance curve between a voice-like harmonic sound and a gamelan-kettle timbre and the valleys land almost exactly on the slendro notes; voice against bar-like instruments decently matches pelog. Thai classical music, likewise built around tuned bars, uses a seven-note near-equal temperament that matches the voice-plus-bar dissonance valleys. Sethares proposed this test in his 1993 paper and worked it out in his book *Tuning, Timbre, Spectrum, Scale*[^ttss]: each musical culture's scale is near-optimal *for the spectra of its own instruments*.

**Invented scales.** The logic runs forward too. Want a scale nobody has heard? Put overtones at prime multiples ($1, 2, 3, 5, 7, 11...$) and the model hands you consonant intervals at prime fractions. Sethares even ran the inverse problem, using optimization to *design a timbre* whose dissonance valleys land on an arbitrary target scale, like 10-tone equal temperament, which no natural instrument supports.

## Three notes at once: a map of every possible chord

Everything so far concerned two notes. Music mostly happens in chords, so take three: fix a root at middle C, and let the second and third notes float freely at ratios $r_1$ and $r_2$ above it. Sum the pairwise dissonance over *all* partial pairs of all three notes and you get, instead of a curve, a **dissonance surface** over the plane of all possible triads. Since pitch is continuous, every three-note chord that can exist, in any tuning system, from any culture, is one point on this map. (Only the half where note 3 sits above note 2 is shown: the other half is the same chords with the two upper notes swapped.)

Here it is. **Drag to rotate, and click anywhere to hear the chord you're pointing at**. The wells are the chords musicians have always known; the peaks are everything else.

<iframe src="/assets/images/math-of-harmony/surface3d.html" height="780"></iframe>

Rotate it to look straight down and the structure is stunning: a weave of valley-lines crossing the plane.

- **Lines parallel to one axis**: note 2 forms a consonant interval with the root (each line is a valley of the 2D curve we built earlier).
- **Lines parallel to the other axis**: note 3 is consonant with the root.
- **Diagonal lines**: notes 2 and 3 are consonant *with each other*.
- The tall wall along the triangle's straight edge is where notes 2 and 3 nearly coincide and grind (pure Plomp-Levelt roughness), and the huge spike at the unison corner is all three notes crowded within a critical band: the most dissonant chords of all, on any instrument, though for a boring reason.

The truly consonant chords are the **triple intersections**, where all three pairs are simultaneously in tune. Check the coordinates of the marked points: (1.25, 1.5) is root, major third, fifth: the **major chord**. (1.2, 1.5) is the **minor chord**. (1.2, 1.6) is a first-inversion major (think E-G-C), (1.33, 1.67) a second-inversion major (C-F-A), (1.33, 1.5) a suspended fourth, etc.

Remember, this landscape belongs to *harmonic* timbres, so strings or piipes/voice. Recompute it for a drum, a bell, or prime-number overtones, and the whole geography rearranges: different wells, different chords, a different music theory.

## What this model doesn't explain

This model still leaves some gaps for future investigation:

- **Tritones.** The curve gives the tritone (ratio around 1.4) a modest valley, roughly on par with a minor sixth. Yet Western theory treats the tritone as the tensest of intervals ("the devil in music"). Sensory roughness clearly isn't the whole story of musical tension.
- **Real instruments are messier than their idealization.** A violin is not a pure string: its wooden body resonates like a drum and its cavity like a pipe, at fixed frequencies that don't move with the note. Real spectra are blends.
- **Harmony is dynamic, and this model is static.** It says nothing about dissonance deliberately sought to create emotion and motion. When the child in Schubert's *Erlkönig* cries "Mein Vater!" on an extremely dissonant minor ninth, the dissonance is the fear made audible, and its resolution, when the Father answers, is the comfort. On this post's map that cry is just a bad chord; in the song it is the whole point. This static model does nothing to explain why *cadences* like the widely used IV-V-I feel so good.

This does not try to explain all of music, it simply lays the ground architectural rules in which the creativity and expression will happen. It's physics constraining the ballet; but that leaves lots of room for human creativity in the choreography.

[^code]: All figures in this post are generated by four short Python scripts in [`research/harmony-dissonance`](https://github.com/aymeric-roucher/personal-homepage/tree/main/research/harmony-dissonance): the model itself ([dissonance.py](https://github.com/aymeric-roucher/personal-homepage/blob/main/research/harmony-dissonance/dissonance.py)), tests asserting that the consonant valleys land where they should, the figure generator, and the Bach chorale census ([bach_intervals.py](https://github.com/aymeric-roucher/personal-homepage/blob/main/research/harmony-dissonance/bach_intervals.py)). Run them with [uv](https://docs.astral.sh/uv/): `uv run make_figures.py`, `uv run bach_intervals.py`, tests via `uv run --with numpy --with pytest pytest test_dissonance.py`. The click-to-hear sound on every chart implements the same equations in JavaScript with live additive synthesis; view-source on any of the figures.

[^aatish]: Aatish Bhatia, [Dissonance: a journey through musical possibility space](https://aatishb.com/dissonance/), interactive essay ([source code](https://github.com/aatishb/dissonance)). Origin of the interactive dissonance surface.

[^minutephysics]: minutephysics, [The Physics of Dissonance](https://www.youtube.com/watch?v=tCsl6ZcY9ag) (2025).

[^threeblue]: 3Blue1Brown, [But what is the Fourier Transform? A visual introduction](https://www.youtube.com/watch?v=spUNpyF58BY).

[^pythagorean]: [Pythagorean tuning](https://en.wikipedia.org/wiki/Pythagorean_tuning) on Wikipedia: how stacking 3/2 fifths and folding them back into a single octave generates the twelve-note chromatic scale, and how the leftover comma haunted tuning systems for two millennia.

[^plomplevelt]: "A better hypothesis seems to be that they are related to critical bandwidth, with the rule of thumb that maximal tonal dissonance is produced by intervals subtending 25% of the critical bandwidth, and that maximal tonal consonance is reached for interval widths of 100% of the critical bandwidth." Reinier Plomp and Willem Levelt, [Tonal Consonance and Critical Bandwidth](https://www.mpi.nl/world/materials/publications/levelt/Plomp_Levelt_Tonal_1965.pdf), Journal of the Acoustical Society of America 38, 548-560 (1965). The founding experiment, the sum-over-partials idea, and (Section IV) the statistical analysis of Bach and Dvořák scores.

[^sethares]: "Using a gradient minimization of the squared error between the (averaged) data and the curve d(x) gives values of a = 3.5 and b = 5.75." William Sethares, [Local consonance and the relationship between timbre and scale](https://minds.wisconsin.edu/bitstream/handle/1793/9496/file_1.pdf), Journal of the Acoustical Society of America 94, 1218-1228 (1993). The parameterized curve, the theorems on local minima, stretched timbres, and the scale-to-timbre inverse problem.

[^ttss]: William Sethares, [Tuning, Timbre, Spectrum, Scale](https://sethares.engr.wisc.edu/ttss.html), Springer (1998, 2nd edition 2005). The book-length treatment, including the measured gamelan spectra matched against slendro and pelog.

[^helmholtz]: Hermann Helmholtz, *On the Sensations of Tone as a Physiological Basis for the Theory of Music* (1863; English translation by Alexander Ellis, 1877). Where the beats theory of dissonance began; his hand-drawn roughness curves over one octave predate the measured Plomp-Levelt curve by a century.
