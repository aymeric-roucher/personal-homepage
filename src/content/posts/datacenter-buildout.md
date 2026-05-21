---
title: How AI datacenters are getting installed across the world
thumbnail: An interactive view of who is installing how much AI compute (megawatts) over time, US hyperscalers, Europe's Mistral, and China's giants and labs, and what it means geopolitically.
date: 2026-05-21
type: blog
url: datacenter-buildout
---

Compute is the new oil, and the map of who controls it is being drawn right now. Below is an interactive look at AI data-center buildout: **who is installing how much power (in megawatts), where, and when.** Every player sits on a single axis, so you can compare the US hyperscalers, Europe's Mistral, and China's giants and labs at a glance.

<iframe src="/compute/viewer.html" height="950"></iframe>

*Tip: the labs sit at tens of MW while the US players reach gigawatts, flip on **log scale** to see everyone at once.*

## How to read the chart
- **User vs Provider**, attribute each data center to the *tenant* that runs it (so Oracle/Microsoft capacity counts under **OpenAI**, Amazon under **Anthropic**) or to its *owner*.
- **Count rented capacity**, toggle between total commanded (owned + rented) and owned-only. Untick it and OpenAI collapses (it rents most of its compute) while Meta/Google barely move.
- **Date-range slider** (under the chart) sets both ends of the time window; **log scale** spreads out the small players; tick/untick any company on the right.
- **Lines** are entities with owned/installed power (solid up to today, dashed = projected/announced). **Dots** are pure-renting Chinese labs, point-in-time estimates, not interpolated.

## Method
- **Attribution toggles between USER and PROVIDER.** In *User* mode each tracked
  facility is attributed to its primary tenant from the `Users` column (e.g.
  Microsoft/Oracle/SoftBank/G42 → **OpenAI**; Amazon → **Anthropic**; Google →
  **Google DeepMind**; Colossus → **xAI**); multi-tenant facilities go to the first
  listed, blanks → "Other / undisclosed". In *Provider* mode they are attributed to
  the `Owner` (blank owners = colocation → the operator). Per facility we forward-fill
  `Power (MW)` between dated readings and sum per key. Entities with owned/installed
  power render as lines; pure-renting Chinese labs render as point-in-time dots.
- **Curated lines** (Mistral, Chinese players, labs): hand-entered dated MW points,
  sourced below. Estimates are labelled `[est.]`.
- **Chip-count → MW** (for Chinese hyperscalers/labs, which don't publish fleet MW):
  `~48 MW per $1B of AI-chip spend` (≈40k GPUs/$1B × ~1.2 kW all-in), anchored to the
  hard "~230k Hopper ordered in 2024" figures. Per-GPU all-in watts: A100 ~0.7 kW,
  H100/H800 ~1.4 kW, H20 ~0.9 kW, Ascend 910B/C ~3 kW.

## What the picture shows
- **US hyperscalers dominate** measured capacity: Oracle (Stargate Abilene) leaps to
  ~8 GW around 2029; Google/Microsoft/Amazon/Meta each multi-GW.
- **Europe is an order of magnitude smaller.** Mistral, France's champion, owns
  ~44 MW today (one Essonne site) and *commands* ~90 MW incl. rented cloud; it
  *targets* 200 MW by 2027 and ~1 GW by 2029. On the same axis as the hyperscalers it
  is a thin line. Campus IA (1.4 GW) is bigger but Mistral only minority-owns it, and
  its line overlaps Mistral's (not additive).
- **China builds fast but reports in EFLOPS, not MW**, so its lines are mostly
  estimates. The hyperscaler arms (Alibaba/ByteDance/Tencent) are hundreds-of-MW to
  low-GW; the telcos publish real ~100-150 MW facilities. The pure-play **labs counting
  rented inference are lab-scale** (~Mistral-size): DeepSeek ~90 MW (the only one that
  *owns* its cluster), Zhipu ~110, Moonshot ~90, MiniMax ~80, StepFun ~55, while the two
  that pivoted (01.AI, Baichuan) collapsed to single digits.

## Capacity budgets: Alibaba vs Mistral (with sources)

### Alibaba, multi-GW
- **¥380 billion (~$53 B) over 3 years (2025-2027)** for cloud + AI infrastructure, the
  largest such commitment by a Chinese firm. At Morgan Stanley's implied **~¥100 B ≈ 1 GW**,
  that's **≈ 3.8 GW** of buildout. ([Alibaba Group](https://www.alibabagroup.com/en-US/document-1830678592242057216), [Mobile World Live](https://www.mobileworldlive.com/ai-cloud/alibaba-plots-ai-capex-hike/), [¥100B/GW ratio](https://www.itiger.com/news/1177639303))
- Reportedly **weighing a raise to ¥480 B (~$69 B)**. ([DCD](https://www.datacenterdynamics.com/en/news/alibaba-considers-increasing-ai-data-center-capex-spend-to-69bn-over-three-years-report/))
- ~$16 B of AI hardware purchased in the trailing 12 months (Nov 2025); own **Zhenwu**
  accelerators scaling toward 100k at the Shaoguan DC. ([CNBC](https://www.cnbc.com/2026/04/08/china-alibaba-data-center-ai-chips-zhenwu.html))
- **Chart figure:** chip-anchored **~3 GW by 2030** (more conservative than the ¥380B÷ratio
  ~3.8 GW; the out-years are extrapolation). All [est.], Alibaba publishes no fleet MW.

### Mistral, sub-GW today, ~1 GW goal
- **Owned:** one Essonne/Eclairion cluster, **13,800 Nvidia GB300 ≈ 44 MW**, financed by an
  **$830 M (€722 M) debt raise** (energizes ~Jun 2026). ([CNBC](https://www.cnbc.com/2026/03/30/mistral-ai-paris-data-center-cluster-debt-financing.html), [DCD](https://www.datacenterdynamics.com/en/news/mistral-ai-raises-830m-in-debt-financing-for-data-center-in-paris-france/))
- **+ Sweden** (EcoDataCenter, Borlänge): **~23 MW**, **€1.2 B**, opens 2027. ([EcoDataCenter](https://ecodatacenter.tech/press/mistral-ai-and-ecodatacenter-partner-to-build-ai-focused-data-center-in-sweden-3431886))
- **Total commanded now ≈ 90 MW** (owned + rented CoreWeave/Azure, est.); **target 200 MW
  across Europe by end-2027**; **stated goal ~1 GW by 2029**. ([200 MW](https://www.tahawultech.com/industry/mistral-ai-plans-to-build-200mw-of-data-centre-compute-capacity/), [Mistral Compute](https://mistral.ai/news/mistral-compute); 1 GW = Mensch, Assemblée Nationale hearing)
- **Campus IA** (MGX-led JV, Mistral **minority**): **1.4 GW** campus, ~€35 B, *not* Mistral's
  own capacity, though Mistral's 1 GW goal leans on offtake from it. ([Polytechnique JV PR](https://www.polytechnique.edu/en/press-room/press-releases/mgx-bpifrance-mistral-ai-and-nvidia-launch-joint-venture-build-europes-largest-ai-campus-france))

**In short:** Alibaba's *budget* implies **~3-4 GW** this decade; Mistral *owns* ~0.04 GW
today, *commands* ~0.09 GW, and *aims* at ~1 GW by 2029, roughly an order of magnitude apart.

## Mistral (Europe), the testimony, in numbers
From Arthur Mensch's Assemblée Nationale hearing, verified/expanded by web search.

| Date | Project | Capacity | Status | Source |
|---|---|---|---|---|
| 2023 | Rented (CoreWeave/Azure/EuroHPC Leonardo) | ~1,500 H100 ≈ 3 MW [est.] | live | [CoreWeave](https://www.coreweave.com/blog/mistral-ai-unlocks-2-5x-faster-training-speeds-with-nvidia-gb200-nvl72-on-coreweave) |
| Mar 2025 | Eclairion, Bruyères-le-Châtel (Essonne) | 18,000 Grace-Blackwell, 40 MW (orig. plan) | restructured | [BusinessWire](https://www.businesswire.com/news/home/20250303970989/en/) |
| Jun 2025 | Mistral Compute (IaaS) launch | tens of thousands of GPUs | live | [Mistral](https://mistral.ai/news/mistral-compute) |
| Feb 2026 | Sweden, Borlänge (EcoDataCenter) | 23 MW (Vera Rubin), €1.2B | opens 2027 | [EcoDataCenter](https://ecodatacenter.tech/press/mistral-ai-and-ecodatacenter-partner-to-build-ai-focused-data-center-in-sweden-3431886) |
| Mar 2026 | Flagship (debt-financed) Essonne | 13,800 GB300, **44 MW**, €722M | ops Q2 2026 | [CNBC](https://www.cnbc.com/2026/03/30/mistral-ai-paris-data-center-cluster-debt-financing.html) |
| end-2027 | Europe-wide target | **200 MW** | planned | [TahawulTech](https://www.tahawultech.com/industry/mistral-ai-plans-to-build-200mw-of-data-centre-compute-capacity/) |
| 2029 | Stated goal | **~1 GW** | aspiration | testimony |

Caveats: the "80 MW French cluster next year" from the testimony has no standalone
announcement (folded into the 200 MW target); Sweden is 23 not 25 MW; the LCA partner
was Carbone 4 + ADEME (not Capgemini); the 1 GW goal leans on Campus IA, which Mistral
only minority-owns.

### Campus IA (Fouju, Seine-et-Marne)
~€35B, **1.4 GW** ultimate (RTE: 240 MW by end-2027, +700 MW by end-2029), ~89 ha,
10-12 buildings. Shareholders: **MGX** (Abu Dhabi, lead), **Bpifrance**, **Mistral**
(minority), **Nvidia**. Public inquiry 30 Apr-30 May 2026; groundbreaking H2 2026.
([Polytechnique JV PR](https://www.polytechnique.edu/en/press-room/press-releases/mgx-bpifrance-mistral-ai-and-nvidia-launch-joint-venture-build-europes-largest-ai-campus-france),
[CNDP dossier](https://www.debatpublic.fr/datacenters-et-infrastructure-de-raccordement-au-reseau-electrique-campus-ia-fouju-7813),
[DCD](https://www.datacenterdynamics.com/en/news/mgx-bpifrance-nvidia-and-mistral-ai-plan-14gw-paris-data-center-campus/))

Other European builds for context: Stargate Norway (Nscale/Aker/OpenAI, 230→520 MW),
Nebius Finland (310 MW) & Lille (240 MW), EU AI Gigafactories (EuroHPC), EDF ~3 GW of
nuclear-powered sites offered.

## China, hyperscalers & telcos
China reports "intelligent computing power" in **EFLOPS** (FP16-class, blended, partly
leased), rarely MW, so most lines are estimates.

| Player | Basis | ~MW | Source |
|---|---|---|---|
| China Mobile | Hohhot ~130 MW + Harbin ~120 MW nameplates | 250 → 1,500 [est.] | [ChinaDaily](https://www.chinaservicesinfo.com/s/202408/21/WS66c83cb0498ed2d7b7eb791e/chinas-largest-ai-computing-center-to-be-launched-in-harbin.html) |
| China Telecom | Inner Mongolia ~150 MW + Wuhan ICC | 150 → 1,500 [est.] | [Tom's Hardware](https://www.tomshardware.com/null/chinas-first-natively-built-supercomputer-goes-online-the-central-intelligent-computing-center-is-liquid-cooled-and-built-for-ai) |
| China Unicom | 7×~100 MW AIDC campuses | 200 → 700 | [PRNewswire](https://www.prnewswire.com/apac/news-releases/china-unicom-free-cash-flow-up-by-nearly-30-302718590.html) |
| Alibaba | ¥380B (2025-27); chip-spend → MW | 400 → ~3,000 [est.] | [MWL](https://www.mobileworldlive.com/ai-cloud/alibaba-plots-ai-capex-hike/) |
| ByteDance | ~230k Hopper 2024 + B200; chip-spend | 300 → ~3,500 [est.] | [SCMP](https://www.scmp.com/tech/article/3352906/) |
| Tencent | ~230k Nvidia 2024; 100k-GPU HCC clusters | 250 → ~1,500 [est.] | [Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/tencent-boosts-100000-gpu-capable-hpc-clusters-with-network-optimization) |
| Huawei | Ascend 910B/C clusters, CloudMatrix384 | 300 → ~2,000 [est.] | [SemiAnalysis](https://semianalysis.com/2025/04/16/huawei-ai-cloudmatrix-384-chinas-answer-to-nvidia-gb200-nvl72/) |

National context (not plotted per-company): MIIT reports ~788 EFLOPS intelligent
compute (end-H1 2025); total DC power ~32 GW (2025) → ~40 GW (2026) [Rystad]; the
"East Data West Compute" program (8 hubs) drove >¥200B of investment.

## Chinese AI labs, total commanded (owned + rented, est.)
Lab-scale once you count their standing inference fleets (the dominant load for popular
apps), not just a single training run. **Only DeepSeek owns hardware** (Fire-Flyer); the
rest rent.

| Lab | Owns? | ~MW total | Source |
|---|---|---|---|
| DeepSeek | **owns** Fire-Flyer (~50k Hopper + 10k A100, $1.6B capex) | **~90** (~75 owned) | [SemiAnalysis](https://semianalysis.com/2025/01/31/deepseek-debates/), [arXiv:2408.14158](https://arxiv.org/abs/2408.14158) |
| Zhipu / Z.ai | rents (¥1.14B/H1-25 cloud spend); GLM-5 ran on ~100k Ascend (national, one-off) | ~110 [est.] | [ChinaTalk](https://www.chinatalk.media/p/zhipu-and-minimax-ipo), [SCMP](https://www.scmp.com/tech/tech-trends/article/3344344) |
| Moonshot (Kimi) | rents (Alibaba/Tencent); $20B val, Kimi MAU ~10-36M | ~90 [est.] | [TechCrunch](https://techcrunch.com/2026/05/07/chinas-moonshot-ai-raises-2b-at-20b-valuation-as-demand-for-open-source-ai-skyrockets/) |
| MiniMax | rents ("light-asset"); $6.5B IPO, Hailuo video (GPU-heavy) | ~80 [est.] | [ChinaTalk](https://www.chinatalk.media/p/zhipu-and-minimax-ipo) |
| StepFun | rents; $718M raise, Step-Video-T2V 300B | ~55 [est.] | [TechNode](https://technode.com/2026/01/26/shanghai-ai-unicorn-stepfun-raises-over-718-million-in-b-round/) |
| Baichuan | rents; pivoted to medical/lightweight | ~8 [est.] | [TMTPost](https://en.tmtpost.com/post/7655398) |
| 01.AI (Yi) | rents (founder: owns no GPUs); pivoted small | ~5 [est.] | [KrASIA](https://kr-asia.com/kai-fu-lee-sets-the-record-straight-on-01-ais-pivot) |

Note: Alibaba's Qwen, Tencent's Hunyuan and ByteDance's Seed publish **no** training
chip counts, their compute is the hyperscaler-cloud fleet above, not a separate lab
cluster, so they are not double-counted here.

## Biggest uncertainties
- Chinese hyperscaler MW is chip-spend-derived; the $/GPU and chip-vs-total-capex
  split can move it ±30-50%. The 2030 points are trend extrapolation.
- EFLOPS↔MW is not done (precision/generation-dependent); telco EFLOPS double-count
  leased capacity.
- Tracker future dates (to 2030) are the tracker's own under-construction/announced
  estimates, not guaranteed builds.

# Assumptions & derivations (Mistral & China numbers)

Every curated figure, with the assumption that produced it. **Hard** = published
nameplate / primary-source count. **[est.]** = modelled. Values are cumulative installed
MW at each date.

### Conversion constants used
| Quantity | Value assumed | Notes |
|---|---|---|
| GPU all-in power, A100 | ~0.7 kW | board ~0.4 kW × PUE/overhead |
| GPU all-in power, H100 / H800 | ~1.4 kW | board ~0.7 kW × overhead |
| GPU all-in power, H20 | ~0.9 kW | board ~0.4 kW × overhead |
| GPU all-in power, Huawei Ascend 910B/C | ~3 kW | cluster-level incl. cooling (CloudMatrix384 = 384 chips @ 559 kW) |
| Chip-spend → MW (Chinese hyperscalers) | **~48 MW per $1B** | ≈ 40,000 GPUs/$1B (at ~$25k/GPU) × ~1.2 kW all-in |
| ¥ → $ | ~¥7 per $1 | for capex conversions |

### Mistral, single line = TOTAL commanded (owned + rented, est.)
For reference, Mistral's *owned* infra alone is ~44 MW (one Essonne site; the "18,000
GB200/40 MW" and "13,800 GB300/44 MW" are the **same restructured site**, not two, so
owned ≈ 44 MW, not ~84).

| Date | MW | Basis |
|---|---|---|
| 2023-06 | 3 | ~1,500 H100 rented (Mensch, Apr 2024) × ~2 kW ≈ 3 MW. |
| 2024-12 | 20 | [est.] rented CoreWeave/Azure ramps (no disclosed figure). |
| 2025-07 | 40 | [est.] "tens of thousands of GPUs" (Mistral Compute), mostly rented; Essonne not yet live. |
| 2026-06 | 90 | [est.] ~44 MW owned (Essonne, energizes ~Jun 2026) + ~45 MW rented. |
| 2027-12 | 200 | stated target ("200 MW across Europe by end-2027"). |
| 2029-12 | 1,000 | stated goal "~1 GW by 2029", partly via **Campus IA offtake**. |

### China, hyperscalers ([est.], chip-count / chip-spend basis)
No Chinese hyperscaler publishes fleet MW; derived via the chip-spend constant, anchored to
the hard "~230k Hopper ordered in 2024" reports. **2030 points are trend extrapolation.**

| Player | Date → MW | Assumption |
|---|---|---|
| **Alibaba** | 2024-06 → 400 | Hyperscale cloud fleet "hundreds of MW" (no count published). |
| | 2025-12 → 900 | ¥380B (2025-27) ≈ ~$10B/yr on chips → ~480 MW/yr added. |
| | 2027-12 → 1,800 | Full ¥380B chip portion deployed. |
| | 2030-12 → 3,000 | Continued spend, extrapolated (weakest point). |
| **ByteDance** | 2024-12 → 300 | ~230k Hopper ordered 2024 × ~1.1 kW ≈ 250 MW. |
| | 2025-12 → 640 | + ~$7B chips + 36k B200 (Malaysia, **leased**). |
| | 2026-12 → 1,300 | 2026 chip spend ~$13B → ~620 MW added. |
| | 2030-12 → 3,500 | Sustained spend, extrapolated. |
| **Tencent** | 2024-12 → 250 | ~230k Nvidia ordered 2024 (analyst). |
| | 2025-12 → 500 | 100k-GPU-capable HCC clusters; partial AI loading. |
| | 2030-12 → 1,500 | Continued build, extrapolated. |
| **Huawei** | 2024-12 → 300 | ~100k Ascend 910B cards × ~3 kW ≈ 0.3 GW. |
| | 2025-08 → 480 | 160k-card cluster (CloudMatrix384). |
| | 2030-12 → 2,000 | Ascend Cloud fleet, extrapolated. |

### China, telcos (anchored on published facility nameplates)
| Player | Date → MW | Assumption |
|---|---|---|
| **China Mobile** | 2024-04 → 130 (hard) | Hohhot ICC nameplate ~130 MW. |
| | 2024-08 → 250 (hard) | + Harbin ultra-cluster ~120 MW. |
| | 2025-12 → 600 [est.] | ~61 EFLOPS / 13 nodes → ~600 MW. |
| | 2028-12 → 1,500 [est.] | Target: 100 EFLOPS / 100k-card clusters. |
| **China Telecom** | 2024-01 → 150 (hard) | Inner Mongolia DC ~150 MW. |
| | 2024-12 → 500 [est.] | ~21 EFLOPS own + pooled (Xirang). |
| | 2030-12 → 1,500 [est.] | National AIDC upgrade, extrapolated. |
| **China Unicom** | 2024-09 → 200 [est.] | 2 × 10k-card centers (Lingang, Hohhot). |
| | 2025-12 → 700 (mostly hard) | "7 × ~100 MW AIDC campuses" (FY2025). |

Excluded on purpose: Unicom's "2,650 MW total DC capacity reserve" (Q3 2024), that's
general + AI, not AI-only.

### China, pure-play AI labs ([est.], TOTAL commanded, incl. inference)
Total commanded compute = training **+ standing inference fleet** (the dominant load for
popular apps), owned + rented. Calibrated by valuation / user-scale / cloud-spend, since
none disclose chip counts. **Only DeepSeek owns hardware** (Fire-Flyer); the rest rent -
so all except DeepSeek render as dots.

| Lab | Total MW (≈2026) | Owns? | Basis |
|---|---|---|---|
| **DeepSeek** | ~90 (~75 owned) | **owns** Fire-Flyer | ~50k Hopper + 10k A100, $1.6B server capex (SemiAnalysis); ~143M-MAU app inference. |
| **Zhipu / Z.ai** | ~110 | rents | ¥1.14B/H1-25 cloud spend (~$160M); $7.1B IPO; GLM API (45M devs). |
| **Moonshot (Kimi)** | ~90 | rents | $20B val (≈Mistral+); Kimi MAU 10-36M; K2 1T MoE. |
| **MiniMax** | ~80 | rents | $6.5B IPO; "light-asset"; Hailuo video gen ~100-1000× GPU/output. |
| **StepFun** | ~55 | rents | $718M raise; multimodal/video (Step-Video-T2V 300B). |
| **Baichuan** | ~8 | rents | Pivoted to medical/lightweight (models run on 1-2 consumer GPUs). |
| **01.AI (Yi)** | ~5 | rents | Founder: owns no GPUs; teams absorbed by Alibaba (Dec-2024). |
