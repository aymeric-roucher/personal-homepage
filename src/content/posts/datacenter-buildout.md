---
title: The 3 tiers of the AI compute race
thumbnail: An interactive view of who is installing how much AI compute (megawatts) over time, US hyperscalers, Europe's Mistral, and China's giants and labs, and what it means geopolitically.
date: 2026-05-21
type: blog
url: datacenter-buildout
---

Compute is the new oil, and the map of who controls it is being drawn right now. Below is an interactive look at AI data-center buildout: **who is installing how much power (in megawatts), where, and when.** Every player sits on a single axis, so you can compare the US hyperscalers, Europe's Mistral, and China's giants and labs at a glance. Hover any point for its source and how the number was derived; click a point to open that source.

<iframe src="/compute/viewer.html?v=6" height="950"></iframe>

*Tip: the labs sit at tens of MW while the US players reach gigawatts, flip on **log scale** to see everyone at once.*

## Method
- **Attribution toggles between USER and PROVIDER.** In *User* mode each tracked
  facility is attributed to its primary tenant from the `Users` column (e.g.
  Microsoft/Oracle/SoftBank/G42 → **OpenAI**; Amazon → **Anthropic**; Google →
  **Google DeepMind**; Colossus → **xAI**). In *Provider* mode it is attributed to the
  `Owner` (blank owners = colocation → the operator). Entities with owned/installed power
  render as lines; pure-renting Chinese labs render as point-in-time dots.
- **Source tagging.** Every point carries a source: the US/tracker lines come from the
  [Epoch AI](https://epoch.ai/data/data-centers) frontier-data-center tracker; curated
  points are tagged 🟢 *official* (a published figure) or 🟠 *own estimate* (modelled), with
  the derivation in the tooltip.
- **Chip-count → MW** (for Chinese players, which don't publish fleet MW):
  `~48 MW per $1B of AI-chip spend` (~40k GPUs/$1B × ~1.2 kW all-in), anchored to the
  hard "~230k Hopper ordered in 2024" figures. Per-GPU all-in power:

  | Accelerator | All-in power | Notes |
  |---|---|---|
  | A100 / A800 | ~0.7 kW | board ~0.4 kW × PUE/overhead |
  | H100 / H800 | ~1.4 kW | board ~0.7 kW × overhead |
  | H20 | ~0.9 kW | board ~0.4 kW × overhead |
  | Huawei Ascend 910B/C | ~3 kW | cluster-level incl. cooling (CloudMatrix384 = 384 chips @ 559 kW) |
  | ¥ → $ | ~¥7 per $1 | for capex conversions |

## The three tiers : US champions, Chinese giants, Contenders

## Mistral (Europe), the testimony in numbers
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

**How the plotted "Mistral" line (total commanded) is derived.** Mistral's *owned* infra
alone is ~44 MW (the "18,000 GB200/40 MW" and "13,800 GB300/44 MW" are the **same
restructured site**, not two, so owned ≈ 44 MW, not ~84). The line adds rented cloud on top:

| Date | MW | Basis |
|---|---|---|
| 2023-06 | 3 | ~1,500 H100 rented (Mensch, Apr 2024) × ~2 kW. |
| 2025-07 | 40 | [est.] "tens of thousands of GPUs" (Mistral Compute), mostly rented; Essonne not yet live. |
| 2026-06 | 90 | ~44 MW owned (Essonne, energizes ~Jun 2026) + ~46 MW rented [est.]. |
| 2027-12 | 200 | stated target: 200 MW across Europe by end-2027. |
| 2029-12 | 1,000 | stated goal ~1 GW by 2029, partly via Campus IA offtake. |

Caveats: the "80 MW French cluster next year" from the testimony has no standalone
announcement (folded into the 200 MW target); Sweden is 23 not 25 MW; the 1 GW goal leans
on Campus IA, which Mistral only minority-owns and which is *not* added to Mistral's line.

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
leased), rarely MW, so most lines are estimates. National context: MIIT reports ~788 EFLOPS
intelligent compute (end-H1 2025); total DC power ~32 GW (2025) → ~40 GW (2026) [Rystad];
the "East Data West Compute" program (8 hubs) drove >¥200B of investment.

**Hyperscaler arms (Alibaba/ByteDance/Tencent/Huawei), chip-spend basis.** None publish
fleet MW; each point is derived from chip orders / capex at the constants above. **2030
points are trend extrapolation.**

| Player | Date → MW | Basis | Source |
|---|---|---|---|
| **Alibaba** | 2024 → 400; 2027 → 1,800; 2030 → 3,000 | ¥380B (2025-27) plan ÷ ~¥100B/GW; ~$10B/yr chips → ~480 MW/yr | [Alibaba](https://www.alibabagroup.com/en-US/document-1830678592242057216), [ratio](https://www.itiger.com/news/1177639303) |
| **ByteDance** | 2024 → 300; 2026 → 1,300; 2030 → 3,500 | ~230k Hopper ordered 2024 × ~1.1 kW; + 36k B200 (Malaysia, leased); 2026 chip spend ~$13B | [tbreak](https://tbreak.com/bytedance-ai-spending-30-billion-2026/) |
| **Tencent** | 2024 → 250; 2030 → 1,500 | ~230k Nvidia ordered 2024 (analyst); 100k-GPU-capable HCC clusters | [Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/tencent-boosts-100000-gpu-capable-hpc-clusters-with-network-optimization) |
| **Huawei** | 2024 → 300; 2025 → 480; 2030 → 2,000 | ~100k Ascend 910B × ~3 kW; 160k-card CloudMatrix384 cluster | [SemiAnalysis](https://semianalysis.com/2025/04/16/huawei-ai-cloudmatrix-384-chinas-answer-to-nvidia-gb200-nvl72/) |

**Telcos, anchored on published facility nameplates** (the only hard MW figures in China):

| Player | Date → MW | Basis | Source |
|---|---|---|---|
| **China Mobile** | 2024 → 130/250 (hard); 2028 → 1,500 [est.] | Hohhot ~130 MW + Harbin ~120 MW nameplates; then ~61 EFLOPS / target 100 EFLOPS | [ChinaDaily](https://www.chinaservicesinfo.com/s/202408/21/WS66c83cb0498ed2d7b7eb791e/chinas-largest-ai-computing-center-to-be-launched-in-harbin.html) |
| **China Telecom** | 2024 → 150 (hard); 2030 → 1,500 [est.] | Inner Mongolia DC ~150 MW; + Wuhan ICC + pooled (Xirang) | [Tom's Hardware](https://www.tomshardware.com/null/chinas-first-natively-built-supercomputer-goes-online-the-central-intelligent-computing-center-is-liquid-cooled-and-built-for-ai) |
| **China Unicom** | 2024 → 200 [est.]; 2025 → 700 (mostly hard) | 7 × ~100 MW AIDC campuses (FY2025). Excludes Unicom's 2,650 MW *total* DC reserve (general+AI) | [PRNewswire](https://www.prnewswire.com/apac/news-releases/china-unicom-free-cash-flow-up-by-nearly-30-302718590.html) |

## Chinese AI labs, total commanded (owned + rented, est.)
Lab-scale once you count their standing **inference** fleets (the dominant load for popular
apps), not just a single training run, calibrated by valuation / user-scale / cloud-spend
since none disclose chip counts. **Only DeepSeek owns hardware** (Fire-Flyer); the rest rent,
so all except DeepSeek render as dots.

| Lab | Owns? | ~MW total | Basis | Source |
|---|---|---|---|---|
| **DeepSeek** | **owns** Fire-Flyer | **~90** (~75 owned) | ~50k Hopper + 10k A100, $1.6B server capex; ~143M-MAU app inference | [SemiAnalysis](https://semianalysis.com/2025/01/31/deepseek-debates/), [arXiv](https://arxiv.org/abs/2408.14158) |
| **Zhipu / Z.ai** | rents | ~110 | ¥1.14B/H1-25 cloud spend (~$160M); $7.1B IPO; GLM API (45M devs) | [ChinaTalk](https://www.chinatalk.media/p/zhipu-and-minimax-ipo) |
| **Moonshot (Kimi)** | rents | ~90 | $20B val (≈Mistral+); Kimi MAU 10-36M; K2 1T MoE | [TechCrunch](https://techcrunch.com/2026/05/07/chinas-moonshot-ai-raises-2b-at-20b-valuation-as-demand-for-open-source-ai-skyrockets/) |
| **MiniMax** | rents | ~80 | $6.5B IPO; "light-asset"; Hailuo video gen ~100-1000× GPU/output | [ChinaTalk](https://www.chinatalk.media/p/zhipu-and-minimax-ipo) |
| **StepFun** | rents | ~55 | $718M raise; multimodal/video (Step-Video-T2V 300B) | [TechNode](https://technode.com/2026/01/26/shanghai-ai-unicorn-stepfun-raises-over-718-million-in-b-round/) |
| **Baichuan** | rents | ~8 | Pivoted to medical/lightweight (models run on 1-2 consumer GPUs) | [TMTPost](https://en.tmtpost.com/post/7655398) |
| **01.AI (Yi)** | rents | ~5 | Founder: owns no GPUs; teams absorbed by Alibaba (Dec-2024) | [KrASIA](https://kr-asia.com/kai-fu-lee-sets-the-record-straight-on-01-ais-pivot) |

Note: Alibaba's Qwen, Tencent's Hunyuan and ByteDance's Seed publish **no** training chip
counts, their compute is the hyperscaler-cloud fleet above, not double-counted here.

## Biggest uncertainties
- Chinese hyperscaler MW is chip-spend-derived; the $/GPU and chip-vs-total-capex split can
  move it ±30-50%. The 2030 points are trend extrapolation.
- EFLOPS↔MW is not done (precision/generation-dependent); telco EFLOPS double-count leased
  capacity.
- Tracker future dates (to 2030) are the tracker's own under-construction/announced
  estimates, not guaranteed builds.
