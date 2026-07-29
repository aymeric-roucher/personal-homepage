---
title: An introduction to the global AI semiconductor industry
thumbnail: Who makes what behind every AI chip, and where the chain would break.
date: 2026-07-14
type: blog
url: semiconductor-ecosystem
---

> **Warning: the article below is, in large part, AI-generated.** The value in it is not concision and density of ideas, but the exhaustiveness of the result, which is an aggregation of over a dozen deep researches, and the human guidance given to the aggregator agent toward concision and signal.

A single NVIDIA Blackwell GPU is one of the most complex objects humans mass-produce: its supply chain starts in an Appalachian quartz mine, crosses about a dozen countries, passes through several literal monopolies (one of them a Japanese food company), and ends as a \$3M, 120-kilowatt liquid-cooled rack. This article maps that chain end to end, layer by layer. Here is where it would break, and for how long:

<iframe src="/assets/images/semiconductor-ecosystem/map-chokepoints.html" height="450" title="World map of semiconductor chokepoints, sized by estimated months of disruption if each site stopped producing"></iframe>

The industry runs on jargon:

**Company types**

- **Fabless:** a company that designs chips but owns no factory, outsourcing production to a foundry (NVIDIA, AMD, Qualcomm).
- **Foundry:** a contract chip factory that manufactures designs for other companies rather than selling its own (TSMC, the dominant one).
- **IDM (integrated device manufacturer):** a company that both designs and fabricates its own chips in-house (Intel, Samsung, the memory makers).
- **OSAT (outsourced semiconductor assembly and test):** a contractor that packages and tests finished chips for others (Taiwan's ASE and SPIL, US-based Amkor).
- **ODM (original design manufacturer):** a contract firm that both designs and builds a product for another company to sell under its brand (Foxconn, Quanta, Wistron assembling NVIDIA's servers).
- **OEM (original equipment manufacturer):** the brand-name company that sells the finished system built from others' parts.
- **Hyperscaler:** a giant cloud operator large enough to design its own chips (Google, Amazon, Microsoft, Meta).
- **ASIC service layer / merchant silicon:** firms that turn a hyperscaler's chip idea into a manufacturable design and handle the hard back-end engineering (Broadcom, Marvell, Alchip).

**The physical object**

- **Epitaxial (epi) wafer:** a wafer with an extra ultra-clean crystal layer grown on top, required for advanced logic.
- **Die:** an individual chip cut from the finished wafer.
- **Node:** shorthand for a manufacturing generation and its transistor density (3 nm, 2 nm); smaller numbers mean denser, more advanced chips.
- **Yield:** the percentage of dies on a wafer that come out working; low yield is the main cost driver at advanced nodes.
- **Reticle / reticle limit:** the reticle is the master pattern the scanner projects; the reticle limit (~858 mm²) is the largest single chip it can print in one exposure.

**Making the wafer (front-end)**

- **Fab:** a semiconductor fabrication plant, the multibillion-dollar cleanroom factory where wafers are processed.
- **Lithography / scanner:** the step (and machine) that projects a circuit pattern onto the wafer through a mask.
- **DUV (deep ultraviolet):** the older, longer-wavelength lithography light used for mature and, via tricks, some advanced nodes (ASML, Nikon, Canon).
- **EUV (extreme ultraviolet):** the 13.5 nm-wavelength lithography needed for the finest features, made only by ASML.
- **Immersion DUV:** DUV lithography with a water layer between lens and wafer to sharpen resolution.
- **High-NA (high numerical aperture):** the newest, ~\$400M EUV scanners with wider optics that print finer features in one pass but over only half the field area.
- **FinFET:** the transistor design (a raised silicon fin) used from roughly 2011 until the recent switch to gate-all-around.
- **GAA / gate-all-around / nanosheet:** the current transistor design that wraps the gate fully around stacked silicon sheets for better control at 2 nm-class nodes.
- **Backside power / BSPDN:** routing power through the underside of the wafer to free the front for signal wiring (TSMC Super Power Rail, Intel PowerVia).
- **CVD / PVD / ALD:** the three main ways to lay down thin films: chemical vapour deposition, physical (sputtered) vapour deposition, and atomic-layer deposition (one atomic layer at a time).
- **Etch:** chemically or plasma-carving away material to cut the patterned features, including the deep holes in 3D NAND.
- **Metrology / inspection:** the measuring and defect-finding tools that guard yield after hundreds of process steps (KLA dominates); nearly absent in China.
- **EUV stochastics:** random defects caused by the small, statistically noisy number of photons in each EUV dose, worsening as features shrink.
- **Nanoimprint:** Canon's alternative that stamps patterns mechanically instead of projecting light; doubted for logic-grade precision.
- **SSMB (steady-state microbunching):** China's bet to generate EUV light from a 150-metre electron storage ring, sidestepping sanctioned lasers; still a prototype.

**Packaging and test (back-end)**

- **TSV (through-silicon via):** a vertical wire drilled through a chip to stack and connect dies, used to build HBM memory stacks.
- **Microbump:** the tiny solder balls that connect stacked dies, the incumbent method hybrid bonding aims to replace.
- **Hybrid bonding:** bonding stacked chips with direct copper-to-copper contacts and no bumps, for far higher density (delayed for HBM to ~2027).
- **CoWoS (chip-on-wafer-on-substrate):** TSMC's advanced packaging that mounts logic and memory dies on an interposer; the main bottleneck on AI-chip output (variants -S, -R, -L).
- **SoIC:** TSMC's true 3D die-stacking using copper-to-copper hybrid bonding (AMD 3D V-Cache, Apple).
- **EMIB / Foveros:** Intel's packaging alternatives: EMIB embeds a small silicon bridge in the substrate, Foveros stacks dies vertically.
- **Chiplet:** a small specialized die combined with others in one package instead of building one huge chip, forced by the reticle limit.
- **MR-MUF (mass reflow, molded underfill):** SK Hynix's HBM stacking method that gives it a yield edge; resin sourced only from Japan's Namics.
- **TC-NCF (thermo-compression, non-conductive film):** Samsung's rival HBM stacking method, lower yields, behind its NVIDIA qualification delays.
- **Wire bonding:** the old, cheap method of connecting a chip with thin metal wires, still used for 75-80% of chips by volume (power, automotive, IoT).
- **System-level test (SLT):** running real workloads on every finished part rather than quick electrical checks, now needed for AI chips.
- **UCIe:** an open standard for connecting chiplets from different makers; still commercially marginal versus proprietary links.
- **SerDes:** the high-speed serializer/deserializer circuits that move data in and out of a chip; their speed ceiling is what forces the shift to optics.

**Memory**

- **DRAM:** the fast, volatile working-memory chips (Samsung, SK Hynix, Micron); the base technology under HBM.
- **NAND:** the non-volatile flash memory used for storage, built by stacking hundreds of layers (Xtacking is YMTC's version).
- **HBM (high-bandwidth memory):** a tall stack of DRAM dies wired together with TSVs and placed beside the logic chip, the costliest and scarcest part of an AI GPU.
- **DDR5 / LPDDR5:** standard high-speed DRAM for PCs and servers (DDR5) and its low-power mobile variant (LPDDR5).
- **KV cache:** the running memory of tokens a language model has already processed, streamed from HBM on every new token and a growing bandwidth burden.
- **Memory wall:** the widening gap between how fast chips compute and how fast they can pull data from memory, now the hard speed limit on AI inference.

**Design**

- **EDA (electronic design automation):** the software used to design and verify chips, controlled by three firms (Synopsys, Cadence, Siemens EDA).
- **Tape-out:** the moment a finished design is sent to the foundry to be turned into masks and manufactured.
- **ARM:** the company and instruction set whose licensed processor designs power almost all phones and much else; charges per-chip royalties.
- **RISC-V:** a free, open instruction set (rival to ARM) gaining ground in microcontrollers, IoT, hyperscaler ASICs and China's sovereignty programs.
- **ASIC (application-specific integrated circuit):** a chip custom-built for one purpose, such as a hyperscaler's in-house AI accelerator.
- **SoC (system on chip):** a single chip integrating CPU, GPU, memory controllers and accelerators, common in phones and edge devices.
- **NPU (neural processing unit):** a dedicated AI-inference accelerator block, often inside an SoC.

**Chips and compute**

- **GPU (graphics processing unit):** the massively parallel chip that became the workhorse of AI (NVIDIA's Blackwell B200).
- **TOPS:** trillions of operations per second, the headline throughput number for edge-AI chips (often quoted as TOPS per watt).
- **FLOPS:** floating-point operations per second, the standard measure of compute performance for training and inference.
- **CUDA / TensorRT:** NVIDIA's proprietary software stack; the developer lock-in, not raw silicon, is the source of its dominance.
- **TPU:** Google's in-house tensor processing unit, its custom AI accelerator (some now made on Intel 18A).

**Policy**

- **BIS (Bureau of Industry and Security):** the US Commerce agency that writes and enforces chip export controls, on a tiny budget and ~100 agents.
- **FDPR (Foreign Direct Product Rule):** a US rule extending its export controls to foreign-made goods that used any US technology, letting Washington block chips and tools made abroad.
- **Entity List:** the US blacklist of firms (Huawei, YMTC) that American suppliers cannot sell to without a license.
- **EAR99:** the "uncontrolled" category for ordinary commercial parts, the loophole that lets cheap chips reach sanctioned drones.
- **UFLPA:** the US law barring imports linked to forced labour in Xinjiang, a constraint on Chinese-sourced polysilicon.
- **AI Diffusion Rule:** a short-lived January 2025 US framework imposing tiered global licensing on AI chips and, for the first time, closed model weights (rescinded May 2025).
- **Transshipment:** rerouting controlled goods through third countries (Singapore, Malaysia, UAE, Hong Kong) with falsified paperwork to evade export bans.
- **CHIPS Act:** the 2022 US law providing ~\$52B to subsidize domestic chip manufacturing and research (parallel programs exist in the EU, Japan, Korea, India).

## 1. One GPU, from quartz to rack

Let's follow the iconic NVIDIA's B200 throughout its production: two ~800 mm² logic dies made by TSMC on its 4NP node, eight stacks of HBM3e memory, fused together on a CoWoS-L package, sold at roughly \$30-40k and deployed 72-at-a-time in GB200 NVL72 racks.[^b200cost]

<iframe src="/assets/images/semiconductor-ecosystem/chart-supply-sankey.html" height="870" title="Sankey diagram: the cost build-up of one NVIDIA B200, from raw materials to shipped module"></iframe>

- **The memory is worth more than the logic**: the eight HBM3e stacks cost NVIDIA about \$2,900 per module, more than three times the \$850 of the two giant compute dies, and about 45% of the entire manufacturing cost (COGS).[^b200cost]
- **Packaging is a major cost center**: CoWoS-L assembly plus the substrate run about \$1,100, and the provision for packaging failures adds an estimated \$1,000 more, because a failed package destroys \$3,750 of known-good logic and memory glued inside it.
- **Almost all the value is margin**: from \$6,400 of COGS to a ~\$30-40k street price is a gross margin in the low 80s percent, which is the economic engine financing everything else in this article.[^margin]

The physical object those costs buy, exploded; every part is clickable and jumps to its production stage further down.

<iframe src="/assets/images/semiconductor-ecosystem/chart-b200-package.html" height="430" title="A B200 package with its board, substrate, interposer, two compute dies and eight HBM stacks, plus a detail view of one stack pulled apart"></iframe>

<iframe src="/assets/images/semiconductor-ecosystem/chart-fab-process.html" height="380" title="Condensed map of the eleven production stages, each box linking to its detailed description"></iframe>

The full journey, stage by stage, with who does it, where, at what price, and how long each step takes (per-batch cycle times, not order backlogs; they do not simply add up, because masks, chemicals and memory are made in parallel with the silicon chain):

1. <span id="journey-stage-1"></span>**Ultra-pure quartz**: world supply is 70-90% concentrated at two companies, Belgium's Sibelco and the Franco-Norwegian The Quartz Corp, both mining Spruce Pine, North Carolina; 4-8 weeks from mine to refiner.[^quartz]
    - Semiconductor-grade silicon is grown inside crucibles of fused quartz, which must hold ~1,400°C molten silicon without releasing a single metallic impurity, because one stray atom propagates as a defect through the entire crystal.
    - Spruce Pine is the only natural deposit pure enough at volume; no economically viable synthetic substitute exists at scale.
    - Hurricane Helene dropped over 60 cm of rain on the district in September 2024 and destroyed the CSX rail link; Sibelco restarted shipments on October 10 and the industry rode the gap on safety stocks.
    - The material costs a few dollars per finished chip; its prolonged absence would eventually stop every 300 mm wafer line on the planet.
2. <span id="journey-stage-2"></span>**Electronic-grade polysilicon**: a ~\$6.8B segment, ~80% concentrated at three companies: Wacker (Burghausen, Germany, a chemical plant), Hemlock (Michigan, US) and Tokuyama (Shunan, Japan); purifying a batch takes 2-4 weeks.
    - Quartz-refined silicon is purified by the Siemens process: trichlorosilane gas decomposed onto heated silicon rods in bell reactors, an electricity-intensive loop that captures and recycles its own corrosive gases.
    - The target is "11N" purity, 99.999999999%, one foreign atom per hundred billion.
    - Tokuyama specializes in the grades sub-7 nm nodes demand; China's producers dominate global polysilicon volume but almost entirely at solar grade, a distinct product that trades ~40% cheaper.[^poly]
3. <span id="journey-stage-3"></span>**300 mm wafers**: ~65% concentrated at three companies, Japan's Shin-Etsu and SUMCO (50-60% between them) plus Taiwan's GlobalWafers, the rest mostly Siltronic (Germany) and SK Siltron (Korea); 6-8 weeks from melt to polished wafer.
    - The polysilicon is melted in the Spruce Pine crucibles and a seed crystal is pulled slowly upward (the Czochralski method) into a single-crystal ingot weighing several hundred kilograms, then sliced by diamond wire and polished with nanometre-scale abrasives into blank 300 mm discs of atomic flatness.
    - A leading-edge megafab consumes 500k-1M wafers per month, and the epitaxial grade advanced logic requires ran 6-12 month lead times through 2023-24.[^wafers]
4. <span id="journey-stage-4"></span>**Photomasks**: EUV blanks are ~95% concentrated at two companies, Hoya and AGC (Yamagata and Yamanashi, Japan); pattern writing by Dai Nippon, Toppan, Photronics or TSMC's captive shop (Taiwan and the US); making one mask set takes 2-4 weeks.
    - A photomask (or [reticle](https://semiengineering.com/knowledge_centers/manufacturing/lithography/reticle/)) is the master stencil of one circuit layer, reused to print thousands of wafers, and a separate object from the photoresist coating on the wafer itself.
    - Because EUV light is absorbed by glass, an EUV mask does not transmit light but reflects it: the blank is an ultra-low-expansion plate coated with dozens of alternating molybdenum/silicon layers forming a Bragg mirror, polished to near-zero defectivity, then covered by a pellicle membrane that keeps dust out of focus.
    - A chip needs dozens of masks (one per layer); a 4NP-class set costs millions of dollars, and a single mask rejected for defects writes off ~\$50k.[^masks]
5. <span id="journey-stage-5"></span>**Chemicals and gases** (consumed continuously through fabrication). Each wafer's thousands of process passes burn through:
    - Photoresists: EUV grade is >80% concentrated at three companies (JSR, TOK, Shin-Etsu), up to ~100% adding Fujifilm and Sumitomo; single point of failure: Japan.
    - Rare gases: neon for the DUV excimer lasers, helium for wafer cooling (Linde ~22%, Air Liquide, Air Products, Messer).
    - Fluorinated etch and chamber-clean gases: Air Liquide, Resonac, Solvay, Kanto.
    - Ultra-pure acids and wet chemicals for the cleans between steps: BASF, Stella Chemifa, Kanto.
    - CMP slurries that re-flatten the wafer between every metal layer: Entegris, Fujifilm, Resonac.
    - Sputtering targets, ultra-pure metal ingots vaporized into the interconnect layers: JX Nippon ~19%, Tosoh ~19%, Honeywell ~20%.
    - Individually cents to dollars per wafer, together roughly \$100 per module, and several are single-sourced.
6. <span id="journey-stage-6"></span>**Front-end fabrication**: 100% concentrated at one company, TSMC (Fab 18, Tainan Science Park, Taiwan), single-site-cluster, single-island; a wafer spends 3-4 months in the line.
    - Both B200 dies are made on 4NP, a Blackwell-tuned member of the 5 nm family.
    - Each die is ~800 mm², brushing the 858 mm² reticle limit (the largest area a scanner can print in one exposure, hence the largest possible monolithic die); a 300 mm wafer offers ~70,000 mm², so it carries only ~70 candidate dies, and just ~60% of them survive, because fabrication defects fall at a roughly constant density per unit of wafer area, and the larger the die, the likelier one lands inside it and kills it. At roughly \$17,000 per processed 4NP wafer, that works out to ~\$850 of logic per module.
    - The price of a processed wafer is itself a compressed history of the industry: CSET's independent cost model puts an N5-class wafer (N5 is TSMC's name for its 5 nm process family, which 4NP belongs to) at ~\$17,000 against ~\$9,300 at 7 nm and ~\$4,000 at 16 nm.[^b200cost]
    - Over those months the wafer crosses 1,000+ process steps and hundreds of lithography exposures.
7. <span id="journey-stage-7"></span>**HBM3e memory**: 100% concentrated at three companies: SK Hynix ~60% of Blackwell's supply (Icheon and Cheongju, Korea), Micron ~20% (Taichung, Taiwan; Hiroshima, Japan), Samsung ~17% after repeated thermal-yield qualification delays; the only outsider, China's CXMT, holds ~1% of world HBM wafers, a generation behind (HBM2/3-class) and sellable only inside China. Building a stack takes 2-3 months, in parallel with the logic.
    - The module's 192 GB comes as eight stacks of 24 GB; each stack is 8-12 thinned DRAM dies drilled through with TSVs and mounted on a logic base die, electrically in series, so one bad via kills the whole stack.
    - SK Hynix took >90% of initial allocations, the reward for qualifying first.
    - Contract prices rose another ~20% for 2026 because every accelerator generation eats more stacks: six on an H200, eight on Google's TPU v7, four on Amazon's Trainium3, with per-chip capacities heading to 216-288 GB in 2026 and 384 GB on Rubin Ultra; HBM's share of all DRAM wafer input climbs from 18% (end-2025) to a projected 30% in 2027.[^hbmshare]
    - At ~\$2,900 per module, the memory is ~45% of the entire COGS.
8. <span id="journey-stage-8"></span>**Advanced packaging (CoWoS-L)**: 100% concentrated at one company, TSMC (AP fabs in Taichung and Tainan, new capacity in Chiayi), with the substrate's insulating build-up film >90% concentrated at Ajinomoto Fine-Techno (Gunma / Kawasaki, Japan); assembling a module takes ~1 month.
    - The two logic dies and eight HBM stacks are bonded side by side onto an interposer (a thin layer of ultra-fine wiring connecting them, here organic with embedded local silicon bridges carrying ~10 TB/s between dies), and the assembly sits on a *substrate*, the miniature high-density board that fans the package's thousands of microscopic connections out to the coarser pins meeting the motherboard.
    - The suffix names the interposer type: CoWoS-S ("silicon") seats the dies on one full slab of silicon, fine wiring everywhere, but the slab is itself printed like a chip, so the reticle limit caps its size too (stitching exposures stretches it to ~3.3x, at collapsing yields; the H100's package); CoWoS-L ("local silicon interconnect") embeds small silicon bridges only where dies meet, inside a cheaper organic interposer, letting the package grow to 6x the reticle today.
    - The B200 was CoWoS-L's first high-volume product and it nearly derailed: thermal-expansion mismatch across silicon dies, silicon bridges, organic interposer and substrate warped packages during solder reflow, forcing NVIDIA to redesign the bridges and the dies' top metal layers and re-spin masks (the dies were electrically fine, but changing any layer of a die requires new photomasks for it), while preparing a fallback (the GB200A, a monolithic die on mature CoWoS-S that Amkor, ASE and Samsung could also package).[^blackwell-rework]
    - TSMC's 100% is the assembly step; the substrate is a bought-in input, laminated by Ibiden, Shinko, Unimicron or AT&S, none of which holds more than ~20% of a substrate market worth \$14.2B in 2025 and heading to ~\$31B by 2030.
    - Packaging plus substrate run ~\$1,100 per module, and in 2023 CoWoS capacity, not wafer supply, became the binding constraint on world GPU output.[^abf]
9. <span id="journey-stage-9"></span>**Test and burn-in** (Taiwan; 1-2 weeks of testing per module).
    - Every micro-bump between dies and interposer is electrically verified, then burn-in stresses the package at temperature to precipitate infant-mortality failures.
    - Advantest and Teradyne build the testers; KYEC (NVIDIA's exclusive final-test house) and ASE run them.
    - The economics are dominated by the known-good-die problem: a package failing here destroys ~\$3,750 of logic and memory, so a ~\$1,000 yield-loss provision plus ~\$550 of test and small-component costs are priced into every good module, completing the ~\$6,400 COGS.[^b200cost] That provision alone is ~15% of the entire build cost: an insurance premium paid because defects are caught only after the value has been concentrated.
        - Components are tested before gluing: wafer sort marks known-good dies and HBM stacks are screened by their makers. But the screen is physically imperfect (probing a thinned die at micro-bump pitch has limited coverage, and bonding heat and stress kill marginal TSVs that passed alone), and a failed package cannot be reworked, since nothing un-reflows a warped sandwich.
        - No public data attributes package failures to their source component; the documented killers are warpage, solder voids (the spec tolerates under 10%) and marginal HBM TSVs, and the difficulty of assigning blame between suppliers is itself one reason cross-vendor chiplet mixing has stalled.
        - The companies attacking this tax: Israel's proteanTecs embeds telemetry circuits into the silicon to predict marginality before and after assembly and shrink burn-in; US analytics firms PDF Solutions and Synopsys (silicon lifecycle management) mine test data for outlier screening; Aehr Test Systems (US) sells wafer-level burn-in that moves stress testing before assembly.[^yieldtax]
10. <span id="journey-stage-10"></span>**Board and rack integration** (Mexico, Taiwan, Eastern Europe; building a rack takes 4-6 weeks): power components are ~60% concentrated at three companies (Infineon, MPS, Renesas), locked in by design qualification rather than geography.
    - Each Grace board carries one CPU and two B200s; 36 of them plus a copper NVLink spine make the GB200 NVL72, which draws ~120 kW, forcing direct-to-chip liquid cooling (CoolIT, Vertiv, Boyd cold plates and coolant-distribution units) and the industry's migration toward 800-volt DC power distribution.
    - Feeding ~1,000 amps at ~1 volt into each package is where the supplier drama happened. During the 2025 Blackwell ramp the incumbent Monolithic Power's modules overheated, and per Edgewater Research channel checks NVIDIA cut its allocation drastically, cancelling roughly half its backlog: MPS kept the 700 W B300A, Renesas took the 1,000 W B200 (its share of Hopper-class power jumping from ~15% to ~50% in two quarters), Infineon the 1,200 W GB200 with vertical power delivery.[^rack]
    - ODMs Foxconn, Quanta, Wistron and Supermicro do final assembly; a finished NVL72 lists around \$3M.
11. <span id="journey-stage-11"></span>**Logistics** (1-2 weeks in transit).
    - Climate-controlled, static-protected air freight out of Taoyuan toward the datacenter corridors of northern Virginia, Ireland and Japan.

End to end, a wafer entering Fab 18 today powers up in a datacenter roughly six months from now, and its silicon left Spruce Pine months before that. That lag is why **a shock anywhere in this chain surfaces in GPU availability about two quarters later**.

**How to watch this chain.** Most of the middle of the chain is publicly monitorable at high frequency, thanks mainly to Taiwan's monthly-revenue disclosure rule and Korea's ten-day customs data. The materials floor is nearly blind, which is exactly where the four production-stopping shocks of 2022-2026 originated:

| Stage | Leading indicator | Frequency | Lead on GPU supply | Precision | Reliability | Source |
|---|---|---|---|---|---|---|
| Quartz, gases, chemicals | none structured: weather over Spruce Pine, rail advisories, trade-press whispers | episodic | 2-3 quarters (buffered by 3-6 months of safety stocks) | very low: binary event detection, no quantities | low: catches catastrophes, silent on gradual tightening | NOAA, CSX service alerts, [gasworld](https://www.gasworld.com) |
| Wafers | silicon shipment area statistics | quarterly | ~2 quarters | medium: aggregate area, no node mix | high: industry census, but reported in arrears | [SEMI silicon shipments](https://www.semi.org/en/products-services/market-data/silicon-shipments) |
| Fabrication | TSMC monthly revenue; tester order backlog | monthly / quarterly | 1-2 quarters | medium: mixes all customers and nodes | very high: audited filings | [TSMC investor relations](https://investor.tsmc.com/english/monthly-revenue), Advantest and Teradyne earnings |
| Memory and HBM | DRAM spot and contract prices; Korean semiconductor exports | daily / every 10 days | 1-2 quarters (spot leads contract) | high for commodity DRAM, low for HBM, which trades only on contract | high on direction, noisy day to day | [DRAMeXchange](https://www.dramexchange.com), Korea Customs Service |
| Packaging and substrates | ASE and Unimicron monthly revenues; Ibiden capex; ABF price hikes in trade press | monthly (Taiwan) / quarterly (Japan) | ~1 quarter | medium: company mix blurs the AI share | filings very high; trade-press pricing medium | Taiwan [MOPS filings](https://mops.twse.com.tw), [DigiTimes](https://www.digitimes.com) |
| Test | KYEC monthly revenue, the cleanest public proxy for NVIDIA unit volumes | monthly | ~1 quarter | high: near-pure-play on NVIDIA final test | very high: the street's benchmark (its guidance cut flagged the Rubin push-out) | Taiwan [MOPS filings](https://mops.twse.com.tw) |
| Racks and ODMs | Foxconn, Quanta, Wistron monthly sales | monthly | 2-6 weeks | low to medium: conglomerate revenue, Quanta most server-weighted | high: mandatory filings | company investor pages |
| Export controls and retaliation | BIS rule publications; China customs gallium/germanium flows | as published / monthly | immediate announcement, 1-2 quarters to bite | high: rule text is exact, customs volumes precise | very high: primary sources, customs lags 1-2 months | [Federal Register, BIS](https://www.federalregister.gov/agencies/industry-and-security-bureau), China customs |
| End availability | cloud GPU rental spot prices and lead times | continuous | none: coincident confirmation, not a lead | high on price, but skewed to the retail segment | medium: thin markets, may not reflect hyperscaler reality | GPU spot markets (Vast.ai, SFCompute) |

## 2. Materials, chemicals, gases

This layer is the industry's least discussed and its most frequently broken: four production-stopping disruptions since 2022, from a war cutting off neon, a hurricane in a quartz town, an export-control decree on two minor metals, and a naval blockade on helium and naphtha. It also holds several absolute monopolies.[^materials]

| Material | Function | Market (2025/26) | Leaders | Chokepoint | Documented disruption |
|---|---|---|---|---|---|
| Ultra-pure quartz | Czochralski crucibles | ~\$1.4B | Sibelco, The Quartz Corp (70-90%) | ★★★ | Hurricane Helene, Sept 2024 |
| Electronic polysilicon | 11N feedstock | ~\$6.8B | Wacker, Hemlock, Tokuyama (~80%) | ★★ | UFLPA vs Xinjiang supply; ~40% price premium over solar grade |
| 300 mm wafers | The substrate itself | ~\$14.8B | Shin-Etsu, SUMCO, GlobalWafers, Siltronic, SK Siltron | ★★ | Epi-wafer lead times 6-12 months, 2023-24 |
| EUV photoresists | Sub-7 nm patterning | ~\$1.3B (EUV segment) | TOK, JSR, Shin-Etsu, Sumitomo, Fujifilm (97-100%) | ★★★ | Naphtha/solvent squeeze, 2026 Hormuz crisis |
| Neon | DUV excimer lasers | part of ~\$3.5B rare gases | Was ~70% Ukraine (Ingas, Cryoin) | ★★ | 2022 invasion: prices ×10 |
| Helium | Wafer cooling, leak detection | part of rare gases | Qatar ~30% of world supply | ★★★ | 2026 Hormuz blockade: ~200 cryo-containers stranded |
| Fluorinated gases (NF3, WF6) | Etch, chamber cleaning | ~\$2.2B (NF3) | SK Materials >40%, Linde, Air Products | ★ | Fluorspar feedstock under Chinese export quotas |
| Ultra-pure wet chemicals | Cleans between every step | ~\$4.5B (G5 grade) | Entegris, BASF, Avantor, Kanto | ★★ | Sub-ppb purity: one bad container ruins entire lots |
| CMP slurries and pads | Planarization | ~\$3.5B | Fujimi (25-30%), Entegris, DuPont, Resonac | ★ | Consolidation (Entegris bought CMC, 2022) |
| ALD precursors | Atomic-layer deposition | niche | Merck KGaA, Entegris, Soulbrain, DNF | ★ | Proprietary-chemistry lock-in |
| Sputtering targets | Interconnect metal | niche | JX Nippon, Tosoh, Honeywell (~60%) | ★ | >70% of copper targets from Japan |
| ABF film | Advanced substrates | ~\$1.2-1.7B | Ajinomoto Fine-Techno (~95%) | ★★★ | 2021-24 shortage capped world GPU/server shipments |
| Gallium / germanium | GaN/GaAs, SiGe, IR optics | minor-metals market | China: >80% Ga, ~68% Ge | ★★★ | 2023 licensing, Dec 2024 US export ban; Ge +190%, Ga +70% |

Five episodes:

**Neon, 2022.** Two Mariupol- and Odesa-based refiners, Ingas and Cryoin, purified about 70% of the world's semiconductor-grade neon from Russian steel-mill offgas. The invasion stopped both in a week and spot prices rose roughly tenfold.[^neon] The fix was not a new supplier but engineering: Samsung and others built neon recovery systems that capture the gas from lithography exhaust, permanently shrinking demand for the open market.

**Hurricane Helene on the quartz mines, 2024.** More than 60 cm of rain in 24 hours, the CSX rail line destroyed, and 70%+ of world ultra-pure quartz production offline. Stocks and fast repairs prevented downstream damage, but the episode showed that the base of the silicon supply chain depends on one flood-prone Appalachian district, with no economically viable synthetic substitute at volume.[^quartz]

**Gallium and germanium, 2023-2026.** China's export-licensing regime (August 2023), then outright ban on exports to the US (December 2024), sent germanium up 190% and gallium up 70%.[^gage] The countermeasure was the oldest one in trade: re-routing. Chinese customs recorded zero Ga/Ge exports to the US in 2024 while Belgian imports of Chinese germanium rose 224%, almost exactly matching the American deficit (Stimson Center analysis). The deeper problem is that Western refining capacity was dismantled years ago for lack of price competitiveness and does not come back without subsidy.
 
**Helium and naphtha, 2026.** The Strait of Hormuz crisis stranded roughly 200 cryogenic ISO containers of Qatari helium, about 30% of world supply, with a physical twist: liquid helium boils off after 35-48 days, so a rerouted shipment around the Cape can arrive empty.[^helium] Korea, which sourced ~65% of its helium from Qatar, was hit hardest; TSMC rode it out on diversified US/Russian sourcing and on-site recovery systems that recycle 80-90% of its helium. The same blockade squeezed naphtha, the petrochemical feedstock behind the PGME/PGMEA solvents in photoresists, prompting Japanese resist makers to warn Samsung and SK Hynix of rationing.[^naphtha]

**The ABF monopoly.** A finished chip does not attach directly to the motherboard; it sits on a *substrate*, a miniature high-density circuit board that fans the die's thousands of microscopic connections out to the coarser pins that meet the board. That substrate is built by stacking thin insulating layers interleaved with copper wiring, and the insulating layer is called "build-up film." Ajinomoto Build-up Film (ABF), made by the food company's materials arm, is roughly 95% of that film in every advanced CPU and GPU substrate. The moat is not patents but qualification. A substrate maker (Ibiden, Shinko) and its customer (NVIDIA) certify the entire package, the exact materials and every process step, against multi-year reliability specifications; swapping the core film would force re-qualifying every affected product through months of testing, and a field failure would mean recalling \$40,000 parts. Nobody re-certifies to save a few dollars, so a rival film cannot get designed in even when it is cheaper, which is why the incumbent holds despite no patent lock. ABF shortage capped world server shipments in 2021-24, and the serious challenge to it is not a competing film but a different package structure: glass substrates, which Intel, Samsung and SKC Absolics are racing to qualify for 2026-2028.[^abf]

The doctrinal shift after these shocks: from just-in-time to just-in-case. Fabs now hold 3-6 months of critical gases and chemicals, recycle neon, helium and even isopropyl alcohol on site, and dual-qualify suppliers they used to single-source. Resilience, not price, is now the procurement metric, and every recycling system installed is a permanent hole in some gas supplier's demand.

## 3. Memory: the supercycle and the HBM chokepoint

Memory used to be the industry's commodity segment: brutal cycles, thin margins, interchangeable bits. AI inverted that. In 2026 memory is more than half of all integrated-circuit exports from China, Korea and Taiwan combined; Korean memory exports in April were up ~262% year over year in value on shipment weight that actually declined 12%; and Taiwanese DRAM inventories have fallen for 12 consecutive months, down ~61% year over year.[^memexports] Per gram, high-end memory chips now out-price gold.

**What the memory types actually are.** Three physically different families, which is why they are not interchangeable:

- **SRAM**, static memory: six transistors per bit, holding their value as long as power is on, reachable in a single cycle. No capacitor and no refresh, but six transistors per bit costs roughly a hundred times the area per bit of DRAM. This is what on-chip cache is made of, which is why a GPU carries tens of megabytes of it and not gigabytes, and why Cerebras needs an entire wafer to hold 44 GB.
- **DRAM**, dynamic memory: one transistor and one capacitor per bit, invented at IBM by Robert Dennard in 1967 and structurally unchanged since. The capacitor leaks, so every cell must be read back and rewritten every few dozen milliseconds; "dynamic" means exactly that refresh. The reward is density, a cell roughly six times the smallest printable feature squared.
- **NAND flash**: non-volatile, charge parked on a floating gate and kept without power, but erased in large blocks, worn out by writes, and about a thousand times slower than DRAM. It scales vertically now, 232 layers and climbing, rather than by shrinking features.

**DDR5, GDDR, HBM: the same cell, packaged differently.** HBM is not a different memory technology from DRAM; it is DRAM re-packaged for proximity. The same one-transistor-one-capacitor dies as a DDR5 stick are thinned to tens of microns, drilled with TSVs, stacked eight to sixteen high on a logic base die, and placed millimeters from the GPU. What that buys is wires: a DDR5 module answers over a 64-bit channel across centimeters of motherboard, while one HBM3e stack answers over a 1,024-bit bus across millimeters of interposer, and a B200 runs eight of them at once for ~8 TB/s. Bandwidth here is a packaging achievement, not a memory-cell one.

<iframe src="/assets/images/semiconductor-ecosystem/chart-memory-types.html" height="505" title="Isometric comparison of a DDR5 module, soldered GDDR chips and a stacked HBM package"></iframe>

**The structure.** DRAM is a four-player market where value and volume have decoupled:

- **Samsung** leads revenue (38%) on standard DDR5 volume.
- **SK Hynix** (29% revenue on just 24% of bits) earns the industry's highest-ever operating margins on HBM, and in 2025 its operating profit passed Samsung's memory division for the first time (47.2 vs 43.6 trillion won).[^dramshare]
- **Micron** (22%) has sold out its HBM capacity into 2026 and is exiting consumer brands.
- **The disruptor is China's CXMT**: ~9% of world DRAM bit shipments in 2025 (heading to a modeled 12% by 2027), on ~265k wafers/month at end-2025 expanding to ~350k by end-2026, against Samsung's ~720k, SK Hynix's ~595k and Micron's ~385k; all of it on DUV multi-patterning, since its current G4 node is 1z-class and the next G5 step is 1a-class, which, like Micron's 1a, needs no EUV.[^cxmt-sa]
- **In NAND, YMTC** reached 13% with its 232-layer Xtacking parts despite the Entity List.

Chinese vendors absorbing the commodity end is, paradoxically, what kept the world's PC and phone makers supplied while the big three pivoted to HBM.[^china-mem] The supercycle math frames everything here: SemiAnalysis models DRAM undersupplied by high-single-digit percent in 2026 and low-to-mid-teens percent in 2027, with no return to balance before ~2028, and by 1Q26 the big three's DRAM operating margins had reached levels no commodity industry sustains (Samsung ~81%, Micron ~84%, SK Hynix ~73%).[^cxmt-sa]

**The cannibalization.** DRAM is made on the same 300 mm silicon wafers as logic, in the same kind of fab, just on cheaper trailing nodes (~1z/1a-class, DUV only, no EUV); memory makers and foundries compete for the same wafer supply and much of the same equipment. HBM consumes 3-4x the wafer area per stored bit of DDR5, because each stack adds a logic base die that stores nothing, and because the TSVs punched through every die force keep-out zones where no memory cell can sit. At ~23% of all DRAM wafer starts in 2026 (19% in 2025), HBM is structurally starving the commodity market: conventional DRAM contract prices rose 90%+ in Q1 2026, and PC makers openly complain of "chipflation."[^cannibal]

**Stacking yields.** The dies in a stack are wired electrically in series, so one bad via kills the whole stack, which makes stacking yield the main point of competitive difference. SK Hynix's MR-MUF process (liquid underfill, single reflow; the resin comes exclusively from Japan's Namics, a level-5 chokepoint of its own) runs an estimated 75-80% stack yield; Samsung's TC-NCF film process is stuck around 60-65%, which is the underlying cause of its repeated qualification delays at NVIDIA.[^yield] The jump to hybrid bonding was postponed: JEDEC relaxed the HBM4 package thickness spec from 720 to 775 µm, letting both incumbents keep their microbump processes another generation; hybrid bonding now looks like an HBM4E-era (2027+) requirement.[^jedec]

**Memory-foundry convergence.** HBM4's base die moves from memory processes to TSMC's 5/3 nm logic nodes, which removes the separation between memory makers and foundries and enables "custom HBM" with hyperscaler logic integrated into the memory base die. Samsung reportedly re-priced its HBM4 base dies 40-50% higher on the back of that 3 nm scarcity.[^hbm4] Taiwanese channel checks quantify what that does to chip economics: NVIDIA's HBM4 cost lands at ~\$31-32 per GB against \$17-18 for HBM3e, smaller GPU and custom-ASIC buyers pay \$35-36, and the HBM bill per accelerator roughly doubles in 2027; Fubon expects NVIDIA's Rubin GPU to price at ~\$78-80k to hold its 75-80% chip-level gross margin.[^fubon]

**The memory wall.** Accelerator FLOPS double every ~1.5-1.7 years; off-chip bandwidth doubles only every ~3.3-3.5 years.[^memwall] Since generating one token requires streaming the entire weight matrix plus KV cache out of HBM, bandwidth is the hard speed limit of inference; hence H100→B200 tripling bandwidth (3→8 TB/s) and hence a projected HBM market of ~\$54.6B in 2026 and >\$80B in 2027, in structural deficit (-5 to -8%) through at least 2027.[^hbmmarket]

**The CHIPS Act HBM mismatch.** As of mid-2026 the United States has zero domestic HBM production. The CHIPS Act funded a Micron DRAM fab (Idaho/New York) and an SK Hynix advanced-packaging plant (Indiana), but the two are technologically incompatible: the Indiana line is built for SK Hynix's proprietary MR-MUF flow on SK Hynix wafers already drilled with TSVs (through-silicon vias, the vertical copper wires that carry signals up through a stacked die), and cannot package Micron's dies. The subsidies funded the front end of one company and the back end of its competitor, so the wafers still have to be shipped to Asia for stacking.[^mismatch] SemiAnalysis flagged this in March 2025; nothing had fixed it by mid-2026. Meanwhile CXMT is building an HBM packaging fab in Shanghai targeting 30k wafers/month and already sampling HBM3 to Huawei, roughly four years behind SK Hynix and closing.

## 4. Wafer-fab equipment and its critical subsystems

Wafer-fab equipment (WFE) generated roughly \$143B in 2025, up 12% on the AI buildout, and it is the most rigidly oligopolistic layer of the whole industry.[^wfe] Five companies (ASML, Applied Materials, Lam Research, Tokyo Electron, KLA) capture most of it, but per SemiAnalysis's "Fab Whack-A-Mole" report, the real chokepoints sit one level down, in roughly 100 critical components made by hyper-specialists.[^whack]

**The tool layer.** Each step of the process has its own oligopoly, and most of them are effectively unsubstitutable:

- **Lithography: ASML alone.** A 100% monopoly in EUV and ~80% of DUV, with Nikon and Canon left the mature-node crumbs.
    - The live controversy is **High-NA EUV**. "NA" is numerical aperture, how wide a cone of light the final lens can collect: the wider the cone, the finer the detail resolved, so High-NA (0.55 versus 0.33) prints in one exposure what standard EUV needs two or three passes to produce. At ~\$400M per scanner, Intel inserted it first (its 14A node; the first commercial EXE:5200B was accepted in Oregon in 2026, printing 8 nm features in a single exposure at 175 wafers/hour), while TSMC pushed volume adoption out to ~2029 and Samsung aims for 2027.[^highna]
        - The disagreement is arithmetic. High-NA saves process steps, cycle time and yield loss, but costs about twice as much, and its wider optics halve the printable field area, so large dies must be stitched from two exposures. Whether it pays depends on how cheaply you already run multi-patterning: TSMC's EUV fleet is largely paid off and its multi-patterning yields are high, so an extra process step beats a \$400M machine and the depreciation it drags along; Intel, needing a visible generational jump with less amortized capacity in place, took the opposite bet.
    - Dylan Patel argues the binding ceiling on AI scaling is EUV throughput rather than energy: Zeiss's sub-atomic mirror polishing caps ASML at an estimated 70-100 EUV machines per year through 2030, and since each ~\$350-400M tool unlocks roughly \$15B of downstream compute, that single-supplier mechanical limit paces the whole buildout. ASML and financial-consensus forecasts disagree, expecting throughput gains and High-NA adoption to exceed 120 units by 2030.[^euvceiling]
- **Deposition (laying down films).** Applied Materials, Lam and TEL split CVD (~\$16.7B); ASM International leads the fast-growing ALD segment (~34% against TEL's ~26%) that gate-all-around transistors made indispensable; PVD is Applied's fortress.
- **Etch (~\$25B).** A Lam/TEL/Applied triopoly at ~75% share, with Lam owning the extreme aspect-ratio etch that 400-layer NAND needs.
- **Metrology and inspection (~\$15B).** KLA dominates the yield-guardian segment, where finding a killer defect after 600 process steps is the difference between profit and scrap.
- **Coat/develop tracks.** Tokyo Electron holds >90%, and they are physically bolted to every EUV scanner: the ASML-TEL tandem is effectively one machine.
- **Back end.** Disco monopolizes dicing and grinding, Besi and ASMPT lead the hybrid bonding that HBM and 3D stacking depend on, Advantest and Teradyne split test.[^toolshares]

**The component layer.** Below the toolmakers sits the bill of materials that makes export-controlling "tools" a game of whack-a-mole:[^whack]

| Subsystem | Supplier(s) | Country | If it stops |
|---|---|---|---|
| EUV projection optics | Zeiss SMT (sole source) | Germany | No EUV, anywhere |
| Light sources | Cymer (ASML), Gigaphoton | US, Japan | Scanners go dark |
| CO2 amplifier lasers | Trumpf | Germany | No tin-plasma EUV light |
| RF plasma generators | Advanced Energy (~40%), MKS, Comet | US, Switzerland | Etch and deposition plasma control collapses |
| Vacuum valves | VAT Group (~70-77%) | Switzerland | Chamber contamination, tool-down |
| Dry vacuum pumps | Edwards, Ebara, Kashiyama | UK, Japan | Corrosive gases destroy chambers |

The RF-generator line is already a live policy lever: when exports of generators above 27 MHz / 3 kW to China were restricted, Chinese etch champion AMEC had to fall back on weaker 2.1 kW domestic units, stretching process times ~25% and effectively walling its tools out of sub-14 nm work.[^rfchina]

**Service and spares as leverage.** Lam Research makes 34% of its revenue from spares, upgrades and software on the installed base. When US rules forced Western vendors to stop servicing advanced Chinese fabs like YMTC, tool availability fell: plasma chambers erode in use, and without certified parts and field engineers those fabs resorted to cannibalizing tools and gray-market refurbishers, with measurable yield loss.[^service] The corollary: a service cutoff degrades a fab faster than an embargo on new tools.

**The challengers.** China's mandate is 80% equipment self-sufficiency by 2030, enforced today by requiring ~50% domestic tooling in new mature-node expansions.[^chinaequip] The scoreboard is uneven:

- **Naura** now supplies >60% of oxidation furnaces on SMIC's 28 nm lines and is credible in deposition and etch at mature nodes.
- **AMEC** is in 14 nm etch verification and chasing 90:1 aspect ratios for YMTC.
- **Hwatsing** took ~8% of world CMP.
- **ACM Research's** megasonic cleaning cuts chemical use 75%.
- **SMEE**, the lithography hope, remains stuck around 4% share in i-line tools with no verified 28 nm DUV in mass production, and metrology is close to nonexistent domestically: China's overall deposition share went from 2% to 7% in five years, while the hardest categories stayed shut.

Canon's nanoimprint gambit, pressing patterns mechanically instead of projecting them, keeps promising 5 nm-class features; lithographers remain skeptical that a contact process can ever hit logic-grade defectivity and overlay.[^nil] And underneath it all hums a ~\$9B secondhand market (SurplusGLOBAL alone trades 1,500+ tools a year from a 59,500 m² warehouse cluster in Yongin), the circulatory system that keeps mature nodes and embargoed fabs alive.[^used]

## 5. The frontier: the 2 nm race and the physics wall

*[Node-race status as of mid-2026; yields are leaks and analyst estimates, flagged accordingly.]*

| Foundry | Node | Status (mid-2026) | Reported yield (source quality) | Wafer price (est.) | Known customers |
|---|---|---|---|---|---|
| TSMC | N3 family (FinFET) | High-volume, mature | >70-80% (solid: shipping volumes) | ~\$19,500 | Apple, NVIDIA, AMD, Qualcomm, MediaTek, Intel products |
| TSMC | N2 (nanosheet GAA) | Volume ramp | ~70-80% logic, >90% SRAM (solid leaks) | ~\$30,000 | Apple (A20), NVIDIA, AMD (Venice, MI450), Qualcomm, MediaTek |
| TSMC | A16 (GAA + Super Power Rail) | Qualification | n/a | n/a | HPC/AI adopters, target Q4 2026 |
| Samsung | SF2 (GAA) | Test production | ~30% initial → 40-50% early 2026 (moderate: Korean press leaks) | undisclosed | Exynos 2600, Tesla (AI5/AI6), Preferred Networks |
| Intel | 18A (RibbonFET + PowerVia) | Ramping | ~55-65% (moderate: competitive analyses) | undisclosed | Panther Lake, Clearwater Forest, Google TPUs (2028), US government |
| Intel | 14A (first High-NA) | R&D, tools installed | n/a | n/a | risk production 2027 |
| Rapidus | 2 nm (GAA) | Pilot line, Hokkaido | n/a | ~\$21,000 (offered) | Tenstorrent, Esperanto, Fujitsu partnerships |
| SMIC | 7 nm-class N+2 (DUV) | Volume under sanctions | ~40-60% (solid: TechInsights teardowns confirm shipping) | state-subsidized | Huawei Kirin 9000S-9020, Ascend 910B |
| SMIC | 5 nm-class N+3 (DUV SAQP) | Early ramp | ~33% (moderate: bank-analyst estimates) | ~+40-50% cost vs TSMC N5 | Huawei Kirin 9030, Ascend 910C |

**The leader.** TSMC holds ~70% of all foundry revenue and >90% of leading-edge production. N2, its first gate-all-around node, is ramping with unusually healthy yields and is fully booked into Q2 2027, with Apple hoarding over half the initial capacity.[^n2] The catch is the price: ~\$30,000 per wafer against ~\$19,500 for N3E and ~\$18,500 for N5.[^wafprice] A16 follows in late 2026 with Super Power Rail, TSMC's backside-power design that contacts transistor source/drain directly from below, freeing the front side entirely for signals.[^a16]

**The chasers.**

- **Samsung** shipped GAA first (2022) and has been paying for it since: SF2 yields stuck around 30-50% keep the big fabless names away, leaving Tesla and Japan's Preferred Networks as the marquee wins.
- **Intel** lived a near-death experience: a \$16.6B quarterly loss in late 2024, 18A yields around 10%, Gelsinger forced out that December; then Lip-Bu Tan's shock therapy (22% of staff cut, German and Polish fabs suspended, 51% of Altera sold) and an extraordinary rescue: the US government took a 9.9% equity stake for \$8.9B, formalizing the SemiAnalysis-popularized argument that Intel is the only US-owned entity doing leading-edge process R&D. By mid-2026 the bet is partially paying: 18A yields in the 55-65% range, Panther Lake shipping, and an external anchor customer in Google, which ordered ~3 million TPUs on 18A for 2028, a \$4-7B deal that breaks TSMC's monopoly on Google silicon.[^intel]
- **Japan's Rapidus**, backed by ~\$16B (¥2.35 trillion) of state money, has its Hokkaido pilot line running IBM-licensed 2 nm GAA and is undercutting TSMC ~30% on price (~\$21k/wafer); analysts doubt price alone buys trust in a first-time foundry.[^rapidus]
- **SMIC** keeps proving that sanctions raise costs rather than walls: its DUV-only "5 nm-class" N+3 process (self-aligned quadruple patterning) ships in Huawei's Kirin 9030 and Ascend 910C at an estimated 33% yield and a 40-50% cost premium over TSMC, across an advanced-node capacity of maybe 45-60k wafers/month. Two teardown caveats deflate the headline, though: TechInsights and SemiAnalysis measurements put N+3 at a 32.5 nm minimum metal pitch and ~113 MTr/mm², a densified 7 nm-class process rather than a true 5 nm (Intel 18A measures ~184 MTr/mm² on the same metric), and analyzed Ascend 910C units still carried TSMC-made compute dies from Huawei's pre-sanction bank of ~2.9 million dies. That is strategic resilience, not commercial competitiveness: enough for ~800k Ascend accelerators in 2025, nowhere near enough to matter outside China, and the real Chinese bottleneck has moved to HBM supply anyway.[^smic]

**The physics wall.** Three hard problems now dominate the roadmap conversations:[^physics]

- **EUV stochastics.** A 13.5 nm photon carries ~92 eV, so a given dose contains few photons, and their shot noise randomly breaks or bridges nanometer lines. The fix, higher dose, directly destroys scanner throughput (a \$200-400M machine's wafers-per-hour falls as dose rises).
- **The copper wall.** Below ~30 nm linewidth, copper's resistivity explodes (electron mean free path ~39 nm exceeds the wire) and its barrier layers eat the conductor's cross-section. The industry's answers are ruthenium interconnects and air-gap dielectrics, both expensive in different ways: ruthenium traded above \$1,700/oz in March 2026 (up from ~\$500 a year earlier), several thousand times copper's price, on a world supply under ~35 tonnes a year that is almost entirely a byproduct of South African platinum mining, with a 2026 deficit already forecast; air gaps cost process steps rather than material, since each air-gapped metal layer needs its own exclusion mask plus recess, liner and polish steps, which is why Intel shipped them on only two of its 14 nm process's ~11 metal layers and left them out of 10 nm on cost.[^ru-airgap]
- **High-NA's half-field.** The anamorphic optics halve the exposure field to 26×16.5 mm, so reticle-limit AI dies must be stitched from two exposures, a yield hazard exactly for the chips driving demand.

Behind them queue the architectural transitions: CFET (stacking nMOS on pMOS for ~50% footprint gain, imec target A7/~2034, widely expected to slip on thermal grounds) and 2D-material channels like MoS2 (contact resistance still unsolved; imec puts volume use in the late 2030s). imec's roadmap has the nanosheet era ending around A10/~2030, when contacted gate pitch physically floors at ~42 nm.[^roadmap]

**The economics broke first.** The historical engine of the industry, cost per transistor falling every node, has inverted: N3E→N2 raises wafer cost ~54% for ~15% more density. Per transistor, 2 nm is more expensive than 3 nm. Only AI-margin products can justify migrating for performance-per-watt; everyone else is stranded on 4/3 nm, which is precisely why TSMC can charge \$30k a wafer to the few who must have it.[^cpt]



## 6. Advanced packaging, assembly and test

Packaging was historically a low-margin back-end step. Since 2023 it has gated AI-silicon shipments: TSMC 3 nm wafer starts are of no use without a matching advanced-packaging slot, and CoWoS lead times still run 52-78 weeks. The clearest evidence that packaging and memory, not logic fabrication, are the binding constraints: in 2025 the top four AI-chip designers (NVIDIA, Google, AMD, Amazon) consumed roughly 90% of world CoWoS and HBM output but only about 12% of advanced-logic wafer production. A GPU consumes all three in lockstep, but the pies differ: advanced-logic capacity also serves phones and PCs, so AI's 12% leaves a large pool that could be bid away, while taking 90% of packaging leaves nothing; the resource with no slack is the one that binds. Doug O'Laughlin calls CoWoS the industry's "golden screw," the single point of failure the whole AI supply chain hangs on.[^goldenscrew] Whether packaging is the single tightest constraint in 2026 is contested: Silicon Analysts rank it as the most severe of the three scarcities (wafers, HBM, packaging), memory analysts argue the HBM deficit binds through 2027, Dylan Patel has argued the binding constraint has shifted from CoWoS toward EUV capacity and memory, and at the system level datacenter power binds before any of them. What is not disputed is that the packaging booking window has not loosened despite a tenfold capacity increase.[^cowoscap]

**The technology ladder.** TSMC's CoWoS family defines the market:

- **CoWoS-S** (a full silicon interposer, the H100's package) is hitting the lithography reticle limit (~858 mm², stretched to 3.3x at collapsing yields).
- **CoWoS-R** substitutes a cheaper organic redistribution interposer (NVIDIA's Vera CPU, ~5.75M units expected in 2026).
- **CoWoS-L**, the current chokepoint, embeds small dense silicon bridges only where dies meet, inside an organic interposer, enabling packages up to 6x reticle today and a roadmap of 14x reticle with 24 HBM stacks by 2029.[^cowostech]
- **SoIC.** True 3D stacking is TSMC's SoIC (copper-copper hybrid bonding, no microbumps): AMD pioneered it (3D V-Cache, then the MI300/MI350 line combining SoIC with CoWoS into "3.5D" at >5 TB/s), Apple brings it to Macs in late 2026, and generation three raises density 1.85x on the way to a 4.5 µm bond pitch in 2029.[^soic]
- **Intel's EMIB/Foveros** pair is the industry's "plan B", flexible, cheaper, and for Western buyers a potentially non-Asian supply chain.
- **Samsung's I-Cube/X-Cube** offer overflow capacity but at 26-39 week lead times.
- **In mobile**, the InFO fan-out that has packaged every iPhone chip since 2016 gives way to multi-chip modules (Apple's A20), while fan-out migrates from round wafers to large rectangular panels (TSMC's AP8 fab in Tainan) to cut unit costs.[^cowostech]

**Capacity vs demand.**

- **TSMC's CoWoS capacity** grew from 13-16k wafers/month at the end of 2023 to 35-40k (end-2024), 65-80k (end-2025) and a 120-130k target for 2026, roughly 10x in four years.
- **Demand stayed ahead throughout**: 370k wafers (2024), 670k (2025), ~1M (2026), which is why the booking window did not loosen.[^cowoscap]
- **Allocation is concentrated**: NVIDIA, Broadcom and AMD take over 85%. NVIDIA books ~780k wafers in 2026 (~56-60% of the total, having pre-empted more than half of all 2026-27 expansion), but its share falls toward ~45% in 2027 as AMD grows from 130k to ~530k wafers (+300%, partly routed around TSMC through ASE/SPIL and Amkor), Broadcom to ~484k, and MediaTek by 350% on cloud ASIC work.[^cowosalloc]
- **A July 2026 revision by Fubon Research** sketches the next leg and trims some of those numbers: TSMC at 180k wafers/month by end-2027 and ~220k by end-2028, with SoIC expansion deliberately slowed (the 4Q28 target cut from 90k to 70k) to feed CoWoS, and ASE's FoCoS line raised to 50k for CPU and networking work; NVIDIA keeps more than half the TSMC pool (an estimated 1.03M wafers in 2027 against 629k in 2026), AMD's increase lands mostly at ASE (~300k total in this reading), and MediaTek's growing allocation signals custom-ASIC share gains.
- **The same checks carry a warning for the NVIDIA chain**: the four-die Rubin Ultra and the 576-die Kyber rack were cancelled or pushed out over mid-plane bandwidth and thermal issues, Rubin's 2026 volume was cut to ~1M units, and test house KYEC lowered its full-year growth guidance from 40% to the high 30s.[^fubon]
- **On Intel's plan-B packaging**, the pull is now concrete: Google's target of 12-15M TPUs deployed in 2028 (the four-die v9 generation doubles its wafer consumption) is unreachable on TSMC capacity alone, making Intel's EMIB line load-bearing; its capacity of 10-12k wafers/month at end-2026 is planned to double to 24-25k by end-2027, with substrate partner Ibiden's capex following.[^fubon]

**The substrate supercycle.** Under every one of those packages sits an ABF substrate, and the substrate industry has flipped from its 2023-24 glut back into structural shortage:

- **AI processors** need 11+11 and soon 13+13 build-up layers versus 3+3 for ordinary chips, and a Blackwell substrate consumes 123% more ABF material than its Hopper predecessor.
- **Ajinomoto**, at ~95% of the dielectric film market, pushed through a 30% price increase for Q3 2026, its second consecutive hike, after Resonac and Mitsubishi Gas Chemical raised copper-clad laminate materials 30% in April.
- **Nittobo's T-glass**, the woven-glass stiffener that keeps giant substrates flat, is in critical shortage.

The industry pays without negotiating, because supply security now beats cost.[^abf2] The manufacturers riding the cycle:

- **Ibiden**: ~30% of flip-chip BGA, Intel's and NVIDIA's premium partner.
- **Shinko**.
- **Unimicron**: volume leader, margins recovering to 20-25%.
- **AT&S**.
- **Kinsus**.
- **Nan Ya PCB**.

**The OSAT split.** The outsourced assembly-and-test market (\$46.8B in 2025, heading to ~\$88B by 2034) is dividing along the tech war.

- **China**, cut off from leading-edge packaging tools, is mass-building the commodity end: wire-bonder imports rose 93% year over year through April 2026, adding capacity for the wire-bonded interconnects that still carry 75-80% of global chip volume (power, automotive, IoT), and pushing prices down.
- **ASE** (~28% share, with SPIL) and Amkor (~15-18%, the largest US-based OSAT) responded by exiting low-margin wire bonding for 2.5D and photonics integration, where margins are higher.
- **Test economics changed too**: because one bad die scraps a \$30k package (the known-good-die problem), the industry moved to system-level test that runs real workloads on every part, with sockets now dissipating 2-4 kW per device.
- **KYEC**, NVIDIA's exclusive final-test supplier, is investing \$1.4B in a US facility on that demand.[^osat][^slt]

**Interconnect standards.**

- **UCIe**, the open chiplet-interconnect standard, remains commercially marginal in 2026: cross-foundry chiplet mixing runs into thermal incompatibilities, yield attribution disputes and unclear failure liability, so the proprietary NVLink and Infinity Fabric carry the AI traffic.[^ucie]
- **Co-packaged optics** is moving onto the package because electrical SerDes above 212 Gbps make pluggable optical modules thermally untenable (Broadcom's Tomahawk 6 leads); its main engineering problem is aligning optical fibers to photonic dies at sub-micron tolerance during high-speed assembly, next to an ASIC dissipating over 1,000 W.

**Geography.** More than 90% of leading AI-accelerator packaging happens in Taiwan, in the symbiosis between TSMC's front-end and its AP mega-fabs. The diversification attempts are real but slow:

- **Amkor's** \$2B Peoria, Arizona plant (cleanroom 2026-27, volume from 2028, next to TSMC's fabs).
- **Japan's** play on materials mastery (TSMC's 3DIC R&D center in Tsukuba since 2021, and the Kumamoto Fab 2 upgrade from a planned 6 nm to 3 nm, explicitly to anchor future packaging on Japanese soil).
- **Malaysia** consolidating as the test hub.
- **India** bidding for the wire-bond work leaving China.[^pkg-geo]

The engineering pain points behind all of it:

- Warpage (the thermal-expansion mismatch across silicon, bridges, organic interposer and substrate, which caused the Blackwell delay and mask re-spin).
- Delivering ~1,000 amps at ~1 volt through the package without hot spots (solder voids must stay under 10%).
- The reticle limit itself, which forced the whole chiplet paradigm into existence.[^cowostech]

## 7. The design layer: EDA, cores, and design costs

Before any wafer moves, a chip exists as software, inside tools sold by exactly three companies. The electronic design automation (EDA) market (>\$20B in 2026, heading past \$30B by 2031) is ~74% controlled by Synopsys (~31%), Cadence (~30%) and Siemens EDA (~13%), and the three are complementary rather than interchangeable:

- **Synopsys** owns synthesis, verification and licensed design blocks.
- **Cadence** owns physical place-and-route and analog.
- **Siemens' Calibre** is the de facto sign-off monopoly, because foundries will not guarantee fabrication of a chip that Calibre has not checked.[^eda]

The lock-in is structural: foundries certify their process design kits only for these flows, licenses run millions per year on 2-3 year subscriptions, and retraining a thousand engineers erases any challenger's price advantage. The lock-in also shows in how the tools are experienced: Tcl-scripted flows and interfaces carrying thirty years of accumulated layers, licenses metered per seat and per feature, and only ~30% of EDA workloads in the cloud as of 2025 (defense contracts and process-secret paranoia keep the rest on-premise). Practitioners routinely name these tools, Cadence's included, as the software they would most like to see disrupted (a recurring theme in our industry conversations); the difficulty of doing so is the moat just described, which is why the challengers below attack with AI agents rather than with a cheaper clone of the flow.[^eda] Synopsys deepened the moat in July 2025 by closing its ~\$35B acquisition of Ansys, betting that 3D-stacked chips make multiphysics (heat, electromagnetics, mechanical stress) inseparable from logic design; regulators extracted only modest divestitures to Keysight.[^ansys]

**EDA as an export-control lever.** The US first restricted EDA in August 2022 (rules targeting software for gate-all-around designs), then in May 2025 required licenses for essentially all advanced EDA exports to China. Synopsys, Cadence and Siemens cut access, support and patches immediately, halting Chinese design programs. China responded asymmetrically by slowing rare-earth export licenses, which constrained US defense, auto and energy supply chains within weeks. On July 2, 2025 the EDA restriction was rescinded and rare-earth shipments normalized. The episode showed export controls being used as reversible trade leverage rather than fixed national-security rules.[^edactl] China's domestic EDA (Empyrean, Primarius, X-Epic) is a set of point tools: capable in analog, memory tooling and verification, but, by Empyrean's own IPO prospectus, without a complete end-to-end digital flow below 7 nm.[^chinaeda]

**Licensed cores: ARM and RISC-V.**

- **ARM** has shifted from per-product licenses to portfolio-wide annual subscriptions (Total Access) and raised v9 royalty rates. Its Chinese subsidiary was outside its control for two years: the ousted ARM China CEO physically kept the company seal ("chop"), which under PRC law confers operational control, from 2020 to 2022, blocking the audit ARM needed for its IPO; SoftBank resolved it by moving ~48% of the entity into a vehicle (Acetone Limited), leaving ARM plc a ~4.8% non-voting stake, with litigation continuing in Chinese courts in 2026.[^arm]
- **RISC-V** has taken real share where license fees matter and software compatibility does not: microcontrollers, IoT, and control cores inside hyperscaler ASICs (Meta's MTIA), plus China's sovereignty programs (the Academy of Sciences' XiangShan, Alibaba's XuanTie). It does not yet threaten ARM in phones or general-purpose servers, where the installed base of Android/iOS/Windows software compiled for ARM is the binding constraint.[^riscv]
- **The licensed-core route is also Europe's sovereignty play**: SiPearl's Rhea1 (80 ARM Neoverse V1 cores on TSMC 6 nm, taped out mid-2025 after slipping from a 2024 target, general availability end-2026) will power the CPU cluster of Germany's JUPITER exascale supercomputer, financed by a ~\$140M (€130M) Series A, the largest ever for a European fabless company, with Arm itself and the European Investment Bank among the investors.[^sipearl]

**What a chip costs before it exists.** IBS's from-scratch design-cost ladder: ~\$40M at 28 nm, ~\$106M at 16 nm, ~\$249M at 7 nm, ~\$449M at 5 nm, ~\$581-590M at 3 nm, ~\$725M at 2 nm, with a 2 nm mask set alone above \$20M. The counter-intuitive anatomy of that \$725M: software (compilers, drivers, AI stacks) is the biggest line at \$314M (43%), verification second at \$154M (21%), and verification consumes 60-70% of project time, with 70% of hardware projects late anyway. The important caveat: a focused AI-accelerator startup licensing standard blocks pays nothing like the headline; SemiAnalysis-style adjusted estimates run \$15-20M for a 3 nm-class design, which is why chip startups still exist at all.[^designcost]

**The custom-silicon wave.** Every hyperscaler now designs in-house (Google TPU, Amazon Trainium/Inferentia/Graviton, Meta MTIA, Microsoft Maia/Cobalt, OpenAI's Broadcom program), but none has back-end physical-design muscle, so the value pools with the ASIC service layer:

- **Broadcom** (~35% of high-end custom silicon, ~76% share of 50G+ SerDes interconnect blocks, \$15-20B of 2024 AI revenue).
- **Marvell** (~12%, >\$2B custom).
- **Alchip** (AWS, Tesla Dojo).
- **TSMC-backed Global Unichip** (Microsoft Maia; client wafer demand +329%).
- **MediaTek** (a Google TPU variant).
- **Socionext**.[^asicwave]

The value they capture is high-speed SerDes and packaging design, which requires decades of accumulated analog know-how that AI tools do not yet shortcut.

**AI in chip design.**

- **What ships in production** is reinforcement-learning design-space exploration (Synopsys DSO.ai, Cadence Cerebrus) and, since February 2026, LLM agents for verification (Cadence's ChipStack, claiming ~40% less verification effort).
- **The most-cited failure** is Google's AlphaChip (Nature, 2021, claiming "superhuman" macro placement used for TPU design): Igor Markov's meta-analysis and a UCSD reproduction found simulated annealing and commercial placers produced shorter wire length in a fraction of the runtime, and Nature added an editorial warning and retracted the accompanying commentary. Reviewers found unsupported claims and withheld code rather than fraud.[^aichip] Startups continue to pursue full automation: Architect Labs ([\$24M seed, June 2026](https://www.businesswire.com/news/home/20260618895194/en/Architect-Labs-Raises-%2424M-Seed-to-Democratize-Custom-Chip-Design), backers include Jeff Dean) has a model design and formally verify custom ASICs end to end, aiming to compress the two-to-five-year, tens-of-millions-of-dollars silicon cycle toward weeks and pointing at a "designless" chip industry; Fractile (\$220M Series B), Majestic Labs and Unconventional AI pursue related theses. The current limit: generation and bug-finding work, but a 0.1% error rate is unacceptable where one logic bug costs a \$20M mask re-spin, so a human architect stays in the loop.[^aistartups]

**Open-source and access friction.** Open-source hardware works at mature nodes: the Google/SkyWater open 130 nm process design kit plus multi-project wafers (a \$50k mask shared across ~40 university projects) put fabrication within reach of small teams. At advanced nodes, process design kits contain the foundry's most sensitive process secrets, so access requires security audits, NDAs that take 3-6 months to negotiate, and proof of tape-out-scale funding. This creates a catch-22: startups need the kit to produce the performance numbers that would raise the funding, but cannot get the kit without already having the funding.[^designcost]

## 8. Edge AI silicon

Our [drones piece](/european-drone-landscape) mapped the chips on attritable airframes: NVIDIA Jetson for Western autonomy, the Chinese Rockchip RK3588 and NXP i.MX 8M Plus on cheap strike drones, Hailo and Axelera as efficiency challengers. The same silicon serves robotics, security cameras and cars; this section covers the full edge-inference market underneath.[^edge-landscape]

**The landscape beyond the drone table.** NVIDIA's moat at the top is CUDA/TensorRT maturity, not efficiency (Jetson runs ~3-5 TOPS/W; the flagship AGX Orin does 275 TOPS at 15-50 W). Qualcomm is the main Western alternative, leaning on mobile heritage: its robotics platforms (RB5 at 15 TOPS, RB6 at 70-200 TOPS, the \$499 RB3 Gen 2 kit) bundle multi-camera image processors and native 5G, which matter for swarms. Below them sit the reliability-first incumbents: Texas Instruments (TDA4VM, 8 TOPS, safety-certified, and a \$7 AM62A), Renesas (RZ/V2H, 80 sparse TOPS at a claimed 10 TOPS/W, fanless), and Ambarella (CVflow, 8K video plus inference under 2 W). Then the architectural avant-garde chasing NVIDIA on efficiency: Europe's Axelera (Metis, 214 TOPS at ~14 W via digital in-memory computing, ~\$0.70/TOPS on \$149 M.2 cards), Israel's Hailo (dataflow, >10 TOPS/W), Sima.ai, Blaize, Kneron (which runs small Transformer models at the edge), and at the microwatt "always-on" floor Syntiant and STMicro's STM32N6, the first mainstream microcontroller with a real neural accelerator built in. Google's Coral is effectively dead (no compiler updates since 2022). And the Chinese hyper-competitive tier: Rockchip and Allwinner (a \$6, 1 TOPS SoC) at the bottom, Horizon Robotics (Journey 6, up to 560 TOPS, design wins at BYD and Li Auto) and Black Sesame in automotive, all still fabricated at TSMC 7/5 nm, which leaves them exposed to the same export-control risk as everyone else.[^edgechips] One tier above the edge entirely, France's Vsora plays the same efficiency card against datacenter GPUs: its Jotunn8 inference chip (3,200+ TFLOPS with 288 GB of HBM3e, claimed at under half the energy of leading GPUs) taped out on TSMC 5 nm with CoWoS packaging in October 2025 on a \$46M April 2025 round, with volume availability targeted for 2026 and ex-Altera CEO Sandra Rivera chairing its board since January 2026.[^vsora]

**Why dataflow beats GPUs, and the software tax that keeps GPUs winning.** The 3x efficiency gap is thermodynamic: in a Von Neumann chip, moving weights and activations between memory and the arithmetic unit burns 10-100x the energy of the math itself. Dataflow (Hailo, Blaize) and in-memory computing (Axelera's digital, EnCharge's analog) collapse that data movement. But the hardware win comes with a brutal software tax, the single biggest adoption blocker: alternative NPU toolchains routinely fail to compile a model that uses a recent activation or attention layer, forcing a "CPU fallback" that shatters the pipeline; and INT8 quantization frequently drops detection accuracy enough to drift bounding boxes and multiply false positives. NVIDIA's edge dominance is a CUDA-lock-in story, not a silicon-superiority one.[^edgearch]

**Sanctions leakage.** The drones piece noted Russian munitions run Western and Chinese chips through intermediaries; the teardown record (Conflict Armament Research, RUSI, Ukraine's NAKO, KSE) names the pipes. Russia's Orlan-10 sources STMicro microcontrollers, TI regulators, Altera FPGAs and Swiss NVS GNSS receivers through the shell company SMT-iLogic and Hong Kong brokers (Asia Pacific Links, Jinmingsheng); the Lancet-3 flies a 2017 Jetson TX2 plus a Xilinx FPGA off the gray market; the Shahed-136 is stuffed with TI and STMicro commodity parts. The evasion works because these are EAR99 commercial components, which customs algorithms hunting datacenter A100s never flag. Ukraine's countermove is to lean into cheap uncontrolled Chinese SoCs and to sell "no US export-controlled content" as a feature.[^leakage]

**The engineering reality of a chip in a sealed airframe.** Four constraints the drones piece named: thermal throttling is the worst (a sealed IP67 body cannot use fans, so a 10-30 W NPU cooks itself; engineers document ~30% CPU-clock drops after 45 minutes of flight, at which point the vision loop slows and the drone loses its terminal lock); vibration forces LPDDR and flash to be soldered and underfilled, never socketed, to survive 40G shocks; conformal coating against salt, mud and humidity is non-negotiable; and the rad-hard space niche keeps FPGAs relevant for their error-correction pedigree.[^defeng]

**Unit economics.** The war made the target-value-to-compute-cost ratio explicit: a ~\$500 attritable FPV tolerates \$10-15 of compute (1-3 TOPS, the \$5 Allwinner or the \$15-45 NXP), a ~\$50k loitering munition doing GPS-denied visual navigation over tens of kilometers tolerates a few hundred dollars (10-30 TOPS, the RK3588 or Hailo-8), and a \$1,000+ ISR platform or civil robot needs 100+ TOPS (Jetson AGX Orin, or clustered Axelera).[^edgeecon]

**The robotics demand wave.** Humanoid and end-to-end robots are replacing specialized CNNs with Vision Transformers and multimodal language models that map a scene directly to motor control, raising compute requirements from 10-30 TOPS to hundreds or thousands, with correspondingly higher memory-bandwidth needs. NVIDIA's Jetson Thor (Blackwell-based) targets ~2,000 TOPS at hundreds of watts, which pushes liquid cooling into robots; Qualcomm's Snapdragon Ride Elite targets ~700 TOPS at lower power; Horizon's Journey 6 is moving from cars into general robotics. These SoCs converge on unified memory (CPU, GPU and NPU sharing one LPDDR pool, avoiding the PCIe transfer penalty), a pattern already present in the STM32N6.[^robotics]

## 9. Photonics and alternatives to CMOS

Alternatives to digital CMOS split cleanly into one category that ships today (optics for moving data) and several that do not (optics, analog, and other substrates for doing the math). The maturity gap between them is the main finding.
**Photonics for interconnect (shipping).** Above ~224 Gbps per lane, copper traces lose ~20 dB over a few centimeters and need power-hungry retiming DSPs. Co-packaged optics (CPO) puts the electrical-to-optical conversion on the package, cutting the electrical path to millimeters, dropping loss to ~4 dB, and removing the DSP, at a target of 1-2 pJ/bit against 10-15 pJ/bit for copper-plus-DSP.[^cpo] Shipping hardware exists: Broadcom's Bailly (51.2 Tbps, tested by Meta, ~5.4 W per 800G, ~65% network energy saving), NVIDIA's Quantum-X and Spectrum-X photonic switches (shipping to partners like Lambda from mid-2026, claimed 3.5x network energy efficiency), and TSMC's COUPE platform (pluggable qualification 2025, CoWoS-integrated CPO 2026). Separately, optical circuit switching steers whole light beams with MEMS mirrors instead of packet-switching: Google's Apollo, deployed in production, cut network capex ~30% and network energy ~41%.[^cpo] The incumbents are buying into the layer: NVIDIA invested over \$6.5B in early 2026 into photonics-communication startups, and AMD acquired Enosemi (photonic chiplets and co-packaged optics) in May 2025.[^photinvest] Startups: Ayar Labs (>\$345M raised, integrated into NVIDIA's NVLink Fusion), Lightmatter (Passage wafer-scale optical interconnect, \$4.4B valuation), Celestial AI (Photonic Fabric, \$589M raised, acquired by Marvell in 2025 for \$3.25B rising to \$5.5B on targets), and France's Scintil Photonics (integrated lasers on silicon, ~\$58M (€50M) Series B in September 2025 with NVIDIA participating). Optical I/O is the one alternative technology with confirmed commercial pull.

**Photonic computing (blocked).** Doing matrix multiplication with light (encoding values as light amplitudes through a mesh of interferometers) is passive and near-instant in principle, and the optical compute is analog, not digital. Demonstrated results are modest: Lightelligence's PACE reaches 3 ns matrix-multiply latency and 97.8% on CIFAR-10 with ResNet-18, but at ~7.6-bit average precision; Q.ANT (Germany, \$80M Series A in 2025) uses thin-film lithium niobate to avoid thermal crosstalk; Microsoft's Analog Iterative Machine solves 7-bit optimization problems.[^photcompute] Three physical blockers keep it out of production: the analog-to-digital conversion penalty (the peripheral ADCs/DACs erase 80-90% of the optical arithmetic's energy saving), the absence of optical nonlinearity (activation functions still require converting back to electronics), and calibration drift (a few degrees of temperature change shifts the waveguide index and corrupts the result). Two European entrants, France's Arago and Q.ANT, both market a "30x efficiency" figure, and the repetition of the same round number across competitors is a reason for caution rather than confidence; Arago's published patents are thin.[^photeuro] Lightmatter, the highest-profile entrant, abandoned photonic compute for the interconnect business above, and France's LightOn pivoted away from photonics entirely. A separate branch, photonic quantum computing (France's Quandela, founded 2017), uses single photons as qubits and belongs with the quantum discussion below rather than with analog optical compute.[^photeuro]

Selected photonics companies and their principals:

| Company | HQ | Approach | Funding | Notable people |
|---|---|---|---|---|
| Lightmatter | US (2017) | Wafer-scale optical interconnect | \$400M (2024), \$4.4B valuation | [Nicholas Harris](https://www.linkedin.com/in/nicholas-harris-7114b233/) (CEO) |
| Celestial AI | US | Optical memory fabric | \$589M, acquired by Marvell | (acquired 2025) |
| Ayar Labs | US | In-package optical I/O | >\$345M | integrated into NVLink Fusion |
| Scintil Photonics | Grenoble (2018) | Lasers integrated on silicon | ~\$58M (€50M) Series B (2025) | [Sylvie Menezo](https://www.linkedin.com/in/sylvie-menezo-77b38b31/) (CTO), [Matt Crowley](https://www.linkedin.com/in/matthewcrowley/) (CEO, ex-Qualcomm), [Torrey Thiessen](https://scholar.google.com/citations?user=zwJA69AAAAAJ&hl=en) |
| Q.ANT | Germany | Analog optical compute (lithium niobate) | \$80M Series A (2025) | [Michael Förtsch](https://youtu.be/HX50Jf79XWI?si=byFK5uUFIGS4_DnJ&t=515) (founder) |
| Arago | France (2024) | Analog optical compute | \$26M seed (2025) | [Nicolas Muller](https://www.linkedin.com/posts/nicolas-muller-_gtc-share-7307855366720028672-iqCq/) (CEO), [Eliott Sarrey](https://www.usine-digitale.fr/editorial/le-jeune-francais-eliott-sarrey-prime-a-la-google-science-fair.N351883) (CTO), Ambroise Müller (CRO) |
| Neurophos | Austin | Metamaterial optical inference | \$110M (2026) | |
| Quandela | France (2017) | Photonic quantum computing | | Pascale Senellart, Niccolò Somaschi, Valérian Giesz |

**Analog and in-memory computing.** Analog in-memory computing performs the multiply-accumulate inside the memory array via Ohm's and Kirchhoff's laws, avoiding data movement. Mythic built an 8-bit NOR-flash processor (35 TOPS at 4 W) but nearly went bankrupt: the per-layer ADCs/DACs cost too much energy and area, and writing precise analog states is slow and drift-prone.[^aimc] EnCharge moved to a capacitive (charge-domain) design for better linearity and thermal stability (\$100M+ Series B, early 2025). IBM's research is the strongest result: a 14 nm chip with 35 million phase-change-memory devices ran ResNet-9 at 92.81% on CIFAR-10 and the ALBERT Transformer within 1.8% of its floating-point equivalent on GLUE, managing conductance drift (~5% accuracy loss over 30 days) down to under 1% with drift compensation.[^aimc] Digital CMOS keeps winning on algorithmic flexibility: analog parts need hardware-aware retraining per model, while a GPU runs any FP8/FP4 weight deterministically regardless of ambient temperature. The addressable market stays at ultra-low-power edge devices until the deployment pipeline is as transparent as PyTorch-to-CUDA.

**Neuromorphic.** Event-driven chips compute only on spikes. Intel's Hala Point (1,152 Loihi 2 chips, 1.15 billion neurons) exceeds 15 TOPS/W on sparse workloads (~2,500x a CPU on keyword spotting) but runs at roughly 0.1x a consumer GPU on dense ImageNet inference; Intel positions it as a research platform, not a deep-learning replacement.[^neuro] IBM's NorthPole is a fully digital variant that eliminates off-chip memory, bounded by on-chip SRAM. Commercial traction is thin: BrainChip (ASX-listed, ~\$260M (A\$405M) market cap) reported ~\$75,574 of revenue over twelve months, because the Akida IP requires customers to design and fabricate a full SoC around it. The real market is always-on IoT sensing (SynSense, Innatera claiming 500x lower energy than a conventional processor) paired with event cameras (Prophesee) that emit only pixel changes, a win impossible on a clocked Von Neumann architecture.[^neuro]

**Exotic approaches.** Superconducting logic (Josephson junctions, single-flux-quantum) switches above 100 GHz with no resistance, but the cryogenic cooling to ~4 K consumes more than the chip saves, and dense cryogenic RAM is unsolved. Thermodynamic and probabilistic computing (Extropic, Normal Computing) use physical noise for probabilistic sampling but sit at TRL 2-3, demonstrated only on small stochastic differential equations, with no software ecosystem. Quantum computing as an AI substrate is bottlenecked on loading terabytes of classical data into quantum states, and fault-tolerant logical qubits at useful scale are not expected before the late 2030s.[^exotic]

**Unconventional CMOS (the incumbent's answer).** Rather than replace the transistor, wafer-scale integration keeps the whole wafer uncut: Cerebras's WSE-3 keeps SRAM adjacent to compute cores for an estimated 7,000x the memory bandwidth of an H100, and has demonstrated it in production, over 1,800 tokens/second on Llama 3.1 8B and 969 tokens/second on Llama 3.1 405B (independently measured by Artificial Analysis).[^cerebras] The structural reason plain CMOS keeps beating exotic substrates: the multi-trillion-dollar sunk cost in the TSMC/ASML/EDA supply chain, plus a digital software stack that guarantees exact reproducibility without the thermal drift of analog or photonic hardware. Changing the packaging of CMOS is cheaper than rebuilding a computing paradigm and its software.

<iframe src="/assets/images/semiconductor-ecosystem/chart-alt-computing.html" height="630" title="Startup funding versus technology readiness for alternatives to CMOS computing"></iframe>

## 10. Export controls, smuggling, and retaliation

The US export-control regime is the single most consequential piece of policy in this whole map, and it is losing effectiveness at the margin even as it works in aggregate.

**The rule timeline.** The regime moved from a hardware-speed ban to a revenue-sharing arrangement in four years:

| Date | Rule | Mechanism and effect |
|---|---|---|
| Oct 2022 | Initial BIS controls | Compute and bandwidth thresholds; FDPR on advanced chips, targeting A100/H100 |
| Oct 2023 | Update | Closed the A800/H800 workaround; added a notification "gray zone" |
| Dec 2024 | HBM and tool rule | Controlled HBM above 2 GB/s/mm²; FDPR extended to foreign tools with "any" US content |
| Jan 2025 | AI Diffusion Rule | Three-tier global licensing; first-ever control on closed model weights |
| Apr 2025 | H20/MI308 ban | Blocked chips that met the 2023 thresholds; \$4.5B NVIDIA inventory writedown |
| May 2025 | Diffusion Rule rescinded | Global framework dropped; Huawei-chip due-diligence obligations kept |
| Jul 2025 | H20 sales resume | Licenses granted in exchange for remitting 15% of China revenue to the US Treasury |
| Jan 2026 | H200 codified | Allowed with a 50%-of-US-sales volume cap and a 25% levy on Taiwan-routed sales; China responded with an unofficial boycott |

The net commercial result: NVIDIA's China datacenter share fell from ~95% before the controls to roughly zero by mid-2026.[^ruletimeline]

**The interconnect loophole.** Compute-only thresholds are gameable because LLM training is memory- and network-bound: many slow chips with fast interconnect equal one fast cluster. The H20 was the proof, its compute throttled to comply but its NVLink bandwidth left nearly intact, so Chinese buyers aggregated H20s into competitive clusters. SemiAnalysis's March 2025 proposal to close this caps two more axes per chip: memory bandwidth at 4 TB/s and total interconnect at 9 Tbps bidirectional (scale-up plus scale-out plus PCIe), so any chip exceeding compute, memory, or interconnect is controlled.[^interconnect]

**Tool controls and the 2026 import collapse.** The December 2024 FDPR extension (foreign tools with "any amount" of US integrated circuits) plus stricter servicing bans finally bit. Chinese lithography-equipment imports fell ~60% year over year to \$142M in April 2026, the lowest since 2019, after a 2023-24 stockpiling surge. Enforcement now reaches foreign firms: Bosch paid a \$36.18M penalty in June 2026 for shipping MEMS sensors and software to Huawei without a license, despite manufacturing outside the US. The proposed MATCH Act would replace entity-by-entity rules with a national ban on critical tools and let Commerce act unilaterally if allies do not align within 150 days.[^toolctl]

**Enforcement reality.** BIS runs the global technology-trade regime on roughly \$330M and about 100 enforcement agents, less than the revenue of a single smuggling operation. Transshipment routes through Singapore, Malaysia, the UAE and Hong Kong rely on falsified end-user documents and shell companies. The March 2026 Singapore case charged three individuals over a \$390-519M server fraud (via Aperia Group and A-Speed Infotech, NVIDIA-equipped Dell and Super Micro servers rerouted through Malaysia, publicly linked to DeepSeek); customs data showed Chinese memory-IC exports to Hong Kong up 338% year over year to \$9.14B in a single month (April 2026), a transshipment signal. Smuggled-volume estimates diverge by method: CNAS/RAND model a median ~140,000 GPUs for 2024 (1-40% of China's new training capacity), CSIS counts by cluster (DeepSeek ~50,000 GPUs), and SemiAnalysis found Huawei diverted ~2.9 million TSMC dies through the Cayman-registered shell Sophgo. The compute-rental loophole lets Chinese entities rent offshore clusters instead of importing (ByteDance planned \$7B of non-China compute); BIS extended controls to cover this in June 2026. Proposed hardware fixes: location verification (NVIDIA introduced GPU telemetry and network-latency geolocation in December 2025), on-chip cryptographic attestation, and delegated licensing that disables chips remotely.[^enforcement]

**China's retaliation.** Beijing answered asymmetrically through critical-minerals dominance. After restricting gallium, germanium, antimony and graphite, MOFCOM issued rare-earth rules in October 2025 that mirror US tactics: an extraterritorial 0.1%-content rule (licenses required for foreign-made products containing controlled rare earths like dysprosium or terbium) and a 50%-affiliate rule (presumptive denial for firms half-owned by a blacklisted entity). The rare-earth threat to US defense supply chains forced a truce suspending the extraterritorial rule to November 2026. China separately banned Micron memory from critical infrastructure and opened an antitrust probe into NVIDIA over its Mellanox acquisition.[^retaliation]

**Did it work?** Both readings have empirical support. Containment: the US holds roughly a 10x total AI-compute lead, only 2 of 22 notable Chinese models in 2025 trained on domestic silicon, SMIC is stuck at 7 nm with low yields and a 2-4x compute-cost penalty. Indigenization: DeepSeek R1 reached near-GPT-4 reasoning on a fraction of the compute (partly via distillation from Western models), Huawei's Ascend 910B/C is heading past 1 million units in 2026 and over 50% of China's AI-server market, the controls forced Chinese developers off CUDA onto Huawei's CANN stack, and NVIDIA lost \$12-15B of annual China revenue that funded its R&D. The controls slowed brute-force scaling and simultaneously subsidized a captive Huawei market and Chinese software independence.[^effectiveness]

## 11. China's indigenous stack

Under the export controls, what can China actually build itself? The organizing thesis: denied EUV and advanced packaging, China substitutes rack-scale engineering and cheap power for die-level efficiency, "good-enough compute." Huawei's CloudMatrix 384 interconnects 384 Ascend 910C accelerators to beat NVIDIA's NVL72 on aggregate FLOPS, but draws ~560 kW per rack against the NVL72's ~145 kW, 3.9x the power for comparable output. China's datacenter electricity use, ~150 TWh in 2023, is projected past 400 TWh by 2030, and the inefficiency is the point: abundant subsidized power compensates for the lithography gap.[^china-thesis]

**Money and the Huawei shadow network.** The "Big Fund" is the spine: Phase 1 (2014, ~\$22B (RMB 138.7B), ~70% into fabs like SMIC), Phase 2 (2019, ~\$29B (RMB 204B), pivoting to equipment and materials), a 2022 corruption purge that jailed fund chief Ding Wenwu, then Phase 3 (May 2024, ~\$47B (RMB 344B), larger than the first two combined, aimed surgically at lithography, EDA, HBM and materials). A late-2025 national venture fund adds up to ~\$140B (RMB 1 trillion) of 15-to-20-year "patient capital."[^bigfund] Because SMIC is export-control-exposed, Huawei runs a parallel, subsidized supply chain under the state-owned Shenzhen Major Industry Investment Group: at least 11 fabs behind shell entities (PengXinWei and Pengjin for logic, SwaySure for DRAM, SiEn), targeting 70% self-sufficiency by 2028 so HiSilicon can drop foreign foundries entirely.[^shadow]

**Logic: 5 nm without EUV, at a price.** SMIC validated volume production of its N+3 process (5 nm-class density) in late 2025, confirmed by TechInsights' teardown of the Kirin 9030 in Huawei's Mate 80 Pro Max. DUV single-exposure resolution tops out near 38 nm, so reaching 5 nm needs self-aligned quadruple patterning: more etch and deposition passes, exploding cycle time and defect opportunities. N+3 yield is estimated persistently below 30%, making SMIC 5 nm roughly 50% more expensive than TSMC's, commercially unviable but strategically sufficient. Advanced-node capacity is capped at ~30,000-50,000 wafers/month, limited less by lithography than by the inability to import the metrology and inspection tools needed to expand the lines.[^smic-china] Blocked from expanding leading-edge lines, China floods mature nodes instead: SMIC plus Hua Hong approached 1.6 million eight-inch-equivalent wafers/month by early 2026 (Hua Hong ran at 109.5% utilization in Q3 2025), which is the source of the pricing pressure Western analog and power makers (TI, NXP, STMicro, Infineon, onsemi) publicly cite, hitting microcontrollers, power-management, display drivers and analog first.[^maturenode]

**Memory: the clearest commercial wins.** CXMT reached ~7.67% of world DRAM revenue by end-2025 (fourth globally) and is preparing a ~\$4.1B (RMB 29.5B) Shanghai STAR IPO; YMTC holds ~13% of NAND with 232+ layer Xtacking parts despite the blacklist. The customs anomaly at Hefei (CXMT's hub), export value up 776% year over year in April 2026 on only 39% unit growth, signals a mix shift from commodity DDR4 to high-value LPDDR5 and early HBM. HBM is the tightest chokepoint in China's AI stack: before the 2025 tightening, China imported ~13 million HBM stacks, mostly from Samsung, and that stockpile is what currently keeps Ascend production alive; CXMT plans 2 million HBM stacks (HBM2/3-class) in 2026, enough for only 250,000-300,000 Ascend 910C accelerators. State-backed equity funding lets CXMT and YMTC expand through the cycle regardless of price, which is what breaks the traditional memory cycle for the incumbents.[^china-memory]

**CXMT up close.** SemiAnalysis's July 2026 anatomy of the company shows how a state-built memory champion is actually assembled.[^cxmt-sa]

- **The technology is inherited, then scaled.** CXMT licensed ~2.8 TB of technical documentation from Qimonda, the bankrupt German DRAM maker, via Polaris Innovations (which had bought ~7,000 Qimonda patents from Infineon in 2015 for ~\$33M (€30M)), and scaled Qimonda's buried-wordline 6F² cell from 46 nm-class down to today's 10 nm-class nodes. Qimonda veterans staffed the climb: 24-year Siemens/Infineon/Qimonda VP Karl-Heinz Kuesters as technical consultant, plus the 400-500 engineers of Qimonda's dispersed Xi'an R&D center. Korean prosecutors have charged former Samsung employees over technology leaks, with dozens of ex-Samsung staff reported at CXMT, and Taiwanese engineers are poached with premium packages.
- **The capital is patient and municipal.** Hefei's state-venture vehicles put up ~80% of Phase 1 funding (~\$2B (RMB 14.4B) of RMB 18B), state funds hold >30% post-IPO, and a decade of losses, an accumulated deficit of ~\$5.1B (RMB 36.65B), was absorbed without commercial-return pressure. The governance is a formal oddity: the company declares "no controlling shareholder and no actual controller" while acting-in-concert agreements give ~73-75% of the votes to holders of ~31% of the economics.
- **The supply chain is being cloned on site.** Hefei hosts a localization cluster around the fab: packaging-test houses Peyton and Xinfeng (the latter earning >99% of its revenue from CXMT), an on-site bulk-gas plant, a wafer-reclaim operation and a state-controlled chip-molding-equipment maker, a miniature of the vertical ecosystem the incumbents assembled over decades.
- **The inflection is recent and violent.** Revenue went ~\$1.2B (2023) → ~\$3.3B (2024) → ~\$8.6B (2025, first \$1B profit), then \$7.3B in 1Q26 alone (+700% year over year) at ~70% operating margin, riding the supercycle: bit shipments up only 11% but prices up 57%. CXMT still sells at a 5-10% discount to the big three, and its DDR5 cost per bit runs >30% above theirs, with G4 yields suspected below the industry's 85-90% mature standard: the margin explosion is the cycle's doing, not cost parity.
- **HBM is the unfinished part.** Only ~5k of its ~265k wafers/month were HBM at end-2025, modeled to ramp to ~30k (2026), ~55k (2027) and ~100k (2028), which would be ~12% of world HBM wafer input. It is struggling to stabilize HBM3 8-high, with overall yield modeled around 25% (~35% front-end × ~70% back-end), and may skip HBM3 entirely for HBM3E; its only HBM customers are Huawei, Cambricon and small Chinese AI-chip startups, with Alibaba Cloud as anchor DRAM customer and 4% shareholder.
- **The IPO reads as a fab financing, not an HBM one.** Of the ~\$4.1B proceeds, 69.5% goes to wafer production and 30.5% to R&D, with no disclosed HBM project; the implied valuation floor of ~\$27B (~1.8x annualized 1H26 parent earnings) is one SemiAnalysis calls too cheap. A quirk worth knowing: of FY2025's ~\$1B consolidated net income, 74% flowed to minority shareholders in the fab subsidiaries rather than to the listed parent.

**Accelerators: NVIDIA displaced.** NVIDIA's China datacenter share fell from ~95% to ~50% by early 2026, on the H20 boycott plus Beijing's buy-local guidance. Huawei shipped ~805,000 Ascend 910-series units in 2025 (653,000 of them 910C), each ~60% of an H100's inference performance with 128 GB HBM on SMIC's N+2; a large share of early shipments drew on a pre-sanction bank of 2.9 million TSMC-made dies, exhausted by early 2026. Behind Huawei, state-backed challengers surged: Cambricon's valuation hit ~\$120B (RMB 860B) on 40x revenue growth from ByteDance orders; Biren spent 144% of its 2025 revenue on R&D; MetaX went from ~\$60k (RMB 426k) of revenue in 2022 to ~\$220M (RMB 1.6B) in 2025. The decisive lever is software: DeepSeek ships models optimized day-one for Ascend and Cambricon via Huawei's CANN stack, a hardware-software stack decoupled from CUDA.[^accelerators]

**Equipment, EDA, and the SSMB EUV bet.** SMEE delivered its first 28 nm immersion DUV scanners to SMIC in 2025, validating the multi-patterning path. For EUV, China skipped ASML's laser-produced-plasma approach (which needs sanctioned TRUMPF CO2 lasers) for Steady-State Microbunching: a 150-meter electron storage ring generating continuous EUV light, a functional Shenzhen prototype shown in early 2025, though it has produced no commercial chips. The idea turns the lithography machine into a centralized "photon factory" feeding dozens of scanners, and the particle-accelerator parts are not export-controlled.[^ssmb] On other fronts indigenization is nearly done at mature nodes: AMEC's plasma etch reached 3 nm-process validation, Naura leads deposition, and Huawei-linked SiCarrier unveiled a 30-plus-tool "Mountain" portfolio plus an EDA arm (Qiyunfang) with 20,000+ engineer users, attacking Synopsys and Cadence. New Chinese lines now demand 50%+ domestic tooling.[^china-equip]

**Materials: the persistent weakness.** Localization stalls where metallurgy and chemistry are hardest: 8-inch silicon wafers reached 55% local content, but 12-inch (needed for advanced nodes) sits at 10-15%. Photoresists are worse: G/I-line 68% local, KrF 35%, ArF under 2%, EUV experimental, leaving advanced production dependent on a Japanese chemical near-monopoly (JSR, Shin-Etsu). Ultra-high-purity specialty gases run under 5% local for the top grades.[^china-materials]

Capability by layer, and the people running each entity:

| Layer | Best Chinese capability | World frontier | Gap | Trajectory |
|---|---|---|---|---|
| Logic fab | 5 nm-class (SMIC N+3, DUV SAQP) | 2 nm (TSMC N2) | 4-5 yr | Capped by DUV physics |
| DRAM | LPDDR5, early HBM2/3 (CXMT) | HBM3E/4 (SK Hynix) | 3-4 yr | Accelerating |
| NAND | 232+ layer (YMTC) | 300+ layer | 1-2 yr | Converging |
| AI accelerators | Ascend 910C | Blackwell B200 | 2-3 yr | Accelerating |
| DUV litho | 28 nm immersion (SMEE) | NXT:2100i (ASML) | 5-7 yr | Converging |
| EUV litho | SSMB prototype | High-NA 0.55 (ASML) | 8-10 yr | Unproven |
| Etch/deposition | 3 nm etch validation (AMEC) | Angstrom (Lam/Applied) | 1-2 yr | Converging |
| EDA | analog/PCB point tools (Qiyunfang) | full 2 nm flow (Synopsys) | 4-5 yr | Accelerating |
| Materials/resists | KrF resist, 12-inch wafers 10-15% | defect-free EUV resist | 5+ yr | Stagnant |

| Company | Layer | Notable people |
|---|---|---|
| SMIC | Logic foundry | [Zhao Haijun](https://www.linkedin.com/search/results/people/?keywords=Zhao+Haijun+SMIC) (co-CEO) |
| Hua Hong | Mature foundry | [Peng Bai](https://www.linkedin.com/search/results/people/?keywords=Peng+Bai+Hua+Hong) (president) |
| CXMT | DRAM, HBM | [Zhu Yiming](https://www.linkedin.com/search/results/people/?keywords=Zhu+Yiming+CXMT) (founder/CEO) |
| YMTC | 3D NAND | [Chen Nanxiang](https://www.linkedin.com/search/results/people/?keywords=Chen+Nanxiang+YMTC) (chair) |
| HiSilicon | Chip design | [He Tingbo](https://www.linkedin.com/search/results/people/?keywords=He+Tingbo+Huawei) (president) |
| AMEC | Etch | [Zhiyao Yin](https://www.linkedin.com/search/results/people/?keywords=Zhiyao+Yin+AMEC) (founder) |
| SiCarrier | Equipment, EDA | [Du Lijun](https://www.linkedin.com/search/results/people/?keywords=Du+Lijun+SiCarrier) (chair) |

China's own bottlenecks, which are the West's leverage points: HBM advanced-packaging capacity (no hybrid bonding at scale, capping accelerator volume); industrializing SSMB EUV from a lab ring to a defect-free 24/7 line; the Japanese resist monopoly on ArF and EUV chemistry; SAQP economics at 5 nm; and 12-inch crystal growth stuck at 10-15% local. Internal complaints: foundries refuse to risk experimental domestic tools on live lines (slowing the learning loop); the CUDA-to-CANN software migration burden; SMIC's imported DUV scanners idle for want of peripheral metrology; and a shortage estimated at 300,000+ engineers driving wage inflation.[^china-bottlenecks]

## 12. Building and running fabs: economics, subsidies, resources

A leading-edge logic fab (3 nm or below, ~50,000 wafers/month) now costs \$20-30B. Tools are 60-80% of that; construction (cleanrooms, vibration isolation, air and water handling) has risen to 25-40% and is where the geographic cost gap concentrates; utilities take the remaining ~15%. EUV drives the tool inflation: ~\$350M per standard scanner, ~\$400M for High-NA, up to 20% of a fab's budget. In operation, depreciation dominates (40-50% of operating cost) and materials are 35-40%, while direct labor is only 10-15% of operating cost and under 2% of the cost of processing a wafer. Equipment, not labor, is the economic engine, which is why fabs run above 90% utilization 24/7 to service the depreciation.[^fabcost]

**The Arizona premium.** TSMC's CFO put Arizona building-and-facility construction at 4-5x the cost of an equivalent Taiwan fab (union labor, OSHA, learning curve, scarce cleanroom subcontractors). But the finished-wafer cost gap is only ~10%, because tools and materials (the bulk of per-wafer cost) are globally priced identically (TechInsights). TSMC still charges a 5-20% "geographic flexibility" premium for US-made chips, and separately raised its 2 nm wafer to ~\$30,000.[^arizona]

**Time and permits.** A CSET study of hundreds of projects found a global average of 682 days from construction start to first production, 584 in Japan, 620 in Korea, 736 in the US. TSMC's Kumamoto fab (JASM), built 24/7 with Kajima, went from April 2022 groundbreaking to end-2024 mass production; Arizona repeatedly slipped. The US-specific drag was NEPA environmental review, which the October 2024 Building Chips in America Act removed for CHIPS-funded projects (exempting those started before end-2024 or where federal aid is under 10%). The next delay is grid connection: an advanced fab draws 400-600 MW continuously, and by late 2025 over 8,200 US projects sat in interconnection queues with a median wait above five years, competing directly with AI datacenters for high-voltage transformers on 3-year-plus lead times.[^time]

**The subsidy scoreboard.** Against China's estimated \$15B/year of direct subsidies:

| Region | Instrument | Flagship | Notable term |
|---|---|---|---|
| US | CHIPS Act (\$52B) | Intel | 2025 pivot: \$8.9B of grants converted to a 9.9% federal equity stake at \$20.47/share, plus warrants for 5% more |
| Japan | METI direct grants | Micron Hiroshima | ~\$3.3B (¥536B), ~35% of a \$9.3B project for 1-gamma DRAM and HBM4E |
| EU | EU Chips Act | ESMC Dresden | ~\$5.4B (€5B), ~50% of capex, funded almost entirely by German national aid |
| Korea | K-Chips Act (tax credits) | Yongin mega-cluster | 15-25% investment tax credits; Samsung pulled its first fab to 2029 |
| India | India Semiconductor Mission | Tata/PSMC Dholera | 50% pari-passu; ~50% built, trial production end-2026 |
| China | local government funds | SMIC / CXMT | >\$15B/year direct (the global reference point) |

The US case turned into state capitalism: after Intel's stock fell ~60% in 2025, Commerce took the equity stake and reclaimed \$7.4B of NSTC research money from independent operator Natcast to administer directly, now demanding equity or royalties for R&D grants. The EU case is the Draghi critique made concrete: only ~\$3.6B (€3.3B) of common EU money against ~\$110B (€100B) of fragmented national aid, which favors Germany and left Intel's flagship Magdeburg project cancelled. Saudi Arabia's \$100B Alat fund abandoned chip-fab ambitions in 2026 and fired its CEO, redirecting to basic assembly, because money cannot buy a supplier ecosystem or a water supply that does not exist.[^subsidies]

**Talent.** A CHIPS Act/McKinsey study projects a 157,000-worker US shortfall by 2030, threatening \$390B of planned investment, and restrictive visa policy blocks importing Taiwanese and Korean expertise to train locals. The structural problem is that Western semiconductor work demands Asian-style on-call intensity at wages that cannot compete with software: a US semiconductor engineer earns ~\$115-150k while Silicon Valley software pays more, draining talent to software; Taiwan's ~\$58k base is topped by large performance bonuses and social prestige; Japan compensates with stability and the 51-college Kosen technical-school pipeline. TSMC Arizona had to import ~50% of its initial workforce from Taiwan, drawing union protests and culture clashes over 12-16 hour on-call shifts.[^talent]

**Water and power.** An advanced 300 mm fab consumes 10-20 million gallons of ultra-pure water per day. Taiwan's 2021 drought dropped the Baoshan reservoir serving Hsinchu to 7% and forced the government to ration agricultural irrigation for the fabs; TSMC's response, 88.1% water recycling by 2024, is what lets it build Fab 21 in the Arizona desert (Samsung and SK Hynix lag at 40-47%). Power is the harder constraint: EUV tools are thermally inefficient, a fab needs 400-600 MW of stable supply, and a millisecond voltage dip scraps entire wafer lots. Taiwan's fossil-free-poor grid, dependent on imported LNG with a blackout history, is the physical vulnerability under the whole concentration, and it is why fabs cluster within driving distance of gas, chemical and tool-service suppliers rather than dispersing, the same ecosystem density the Gulf's capital could not manufacture.[^resources]

## 13. Sixty years of industrial policy

The industry runs on learning-by-doing: variable cost falls 20-28% each time cumulative output doubles, which is the textbook justification for startup subsidies. Whether state intervention works, though, has turned on conditioning variables, and six decades of natural experiments show which ones.[^histintro]

**United States, 1950s-60s: guaranteed demand, then forced patent sharing.**

- Defense and Apollo procurement acted as a guaranteed first customer paying a premium for reliability, walking firms down the learning curve years before any civilian market existed.
- The catalytic policy was not a subsidy but an antitrust remedy. The [1956 AT&T consent decree](https://en.wikipedia.org/wiki/Bell_Labs#Antitrust) settled a monopoly suit by forcing Bell Labs to license its 7,820 transistor patents royalty-free to any American company. Scholars later valued the follow-on innovation at ~\$5.7B. It removed the entry barrier in one stroke and produced the Fairchild-and-spinoff culture that became Silicon Valley.[^ushist]

**United States, 1987: SEMATECH, the contested consortium.** SEMATECH (SEmiconductor MAnufacturing TECHnology) was a government-industry research consortium in Austin, half-funded by the Pentagon's research arm, created to stop Japan taking the industry.

- The best econometric evaluation, by Irwin and Klenow, found it did *not* increase members' total research spending: it let them cut roughly \$300M a year of duplicated work. On the "commitment" theory of consortia, that is a failure.
- On the "sharing" theory it worked, and in an unexpected place. The money it redirected toward American equipment makers preserved the domestic tool base, a benefit that reached even non-members. Standardizing equipment returned more public value than subsidizing chip design would have.[^sematech]

**Japan, 1976-80: the consortium that worked, and the trade deal that backfired.**

- The [VLSI project](https://en.wikipedia.org/wiki/VLSI_Project), run by MITI (the ministry that steered Japanese industrial policy), pooled five fierce rivals (Fujitsu, NEC, Hitachi, Mitsubishi, Toshiba) on *upstream* research while leaving them to compete downstream on DRAM. Backed by the patient capital of the keiretsu, the bank-centred industrial groups, Japan took the memory market on manufacturing quality alone.
- The [1986 US-Japan Semiconductor Trade Agreement](https://en.wikipedia.org/wiki/United_States%E2%80%93Japan_Semiconductor_Trade_Agreement), designed to rescue American memory makers, set floor prices and created a "price umbrella" underneath which entry became lucrative. It subsidized the entrants who then displaced Japan: Samsung and the Taiwanese.
- The [1985 Plaza Accord](https://en.wikipedia.org/wiki/Plaza_Accord) roughly doubled the yen against the dollar, gutting export margins.
- Rigid vertical integration did the rest: Japanese firms owned every layer and so missed both the fabless shift and the move from mainframe-grade to cheaper PC-grade memory. The decline ended with the 2012 bankruptcy of Elpida, the merged remnant of the country's DRAM industry.[^japanhist]

**South Korea, 1980s onward: directed credit plus counter-cyclical nerve.**

- The state supplied the credit; Samsung supplied the strategy, investing *through* DRAM downturns so that it emerged from each recovery holding the most advanced capacity while rivals were still rebuilding.
- The cost was truncated upgrading. Dominance by the chaebol (the family-controlled conglomerates) crowded out small design houses, which is why a country that owns memory still has little to show in logic design or foundry services.[^koreahist]

**Taiwan, 1973 onward: the best-executed case.**

- [ITRI](https://en.wikipedia.org/wiki/Industrial_Technology_Research_Institute), a state research institute, licensed RCA's process technology in 1976 and sent engineers to learn it in person, then spun the result out as UMC (1980) and TSMC (1987).
- Morris Chang's pure-play foundry model was the decisive institutional invention: a factory that competes with none of its customers removed the conflict of interest that had kept chip design locked inside the companies that owned fabs, and thereby created the entire fabless industry.
- Engineer repatriation fused Silicon Valley design culture with local manufacturing discipline.
- Hsinchu Science Park concentrated it all in one place for the agglomeration benefits, which is also its single greatest vulnerability: earthquakes, and the 2021 drought that had the government trucking water to fabs.[^taiwanhist]

**Europe, 1980s-2010s: strategic retreat.** From ~15% of world production in the 1990s to under 10% in the 2010s.

- The big collaborative programmes, [ESPRIT](https://en.wikipedia.org/wiki/European_Strategic_Programme_on_Research_in_Information_Technology) (research funding from 1983), the Mega-project (Siemens and Philips on memory) and [JESSI](https://en.wikipedia.org/wiki/JESSI) (its late-1980s successor), repeatedly arranged what amounted to shotgun marriages between rivals on political rather than commercial logic.
- The clearest example is Crolles, near Grenoble: STMicroelectronics, Philips and Motorola jointly developed advanced manufacturing there, and the alliance dissolved in 2007 once Philips's and Motorola's spun-off chip arms, NXP and Freescale, walked away, leaving ST to carry a leading-edge programme alone.
- The national champions (STMicroelectronics, Infineon, NXP) then retreated to the specialty markets where they were profitable: automotive, power, sensors. The 2013 target of "20% of world production by 2030" failed because it set a supply goal with no matching European demand.
- The exception proves the pattern. ASML, a 1984 Philips spin-off, beat Nikon and Canon precisely by being modular and open: it bought optics from Zeiss and light sources from Cymer rather than making everything, and shared the financial risk of EUV with its own customers, Intel, TSMC and Samsung. The closed, vertically integrated Japanese model lost.[^eurohist]

**China, 2014 onward: the first phase as cautionary tale.**

- Phase 1 of the Big Fund pushed capital at the problem without targeting it, and produced [HSMC in Wuhan](https://en.wikipedia.org/wiki/Wuhan_Hongxin_Semiconductor_Manufacturing), which raised roughly \$19B, hired away a former TSMC executive, bought a single lithography machine that it promptly mortgaged, and never made a chip.
- The conglomerate Tsinghua Unigroup, once the vehicle for buying a national champion, defaulted and was restructured; corruption convictions followed, including of the fund's own leadership.
- Later phases changed method rather than ambition, targeting specific chokepoints such as equipment and chemicals, and mature nodes where sanctions do not bite.[^chinahist]

**Five smaller experiments, each isolating one variable.**

- **The Gulf: capital alone is not enough.** Mubadala bought GlobalFoundries and ran a \$1.12B loss by 2011, then abandoned the 7 nm node entirely in 2018. Buying a foreign fab transfers equipment, not an ecosystem.
- **Israel: design niches pay.** Intel's Haifa team pushed through the power-efficient Banias design that became Centrino, against the company's own megahertz doctrine, and set the direction of mobile computing.
- **Malaysia: assembly is a floor, not a ladder.** Free-trade zones from 1971 built Penang into ~13% of world outsourced assembly and test, but climbing from there into advanced packaging has proved much harder than getting in.
- **India: continuity matters more than founding.** The Mohali semiconductor laboratory was only about two years behind Intel in 1984; a 1989 fire and decades of underfunding stranded it there.
- **Russia: autarky has a ceiling.** Angstrem-T borrowed ~\$1B (€815M) to buy AMD's obsolete equipment and went bankrupt; Mikron remains stuck at nodes the rest of the world left in the 2000s.[^smallhist]

**The four recurring failure modes**, each with its cases:

- Subsidizing capacity without demand or the capacity to absorb the technology (HSMC, Angstrem-T).
- Building monolithic national champions without domestic competition (the Japanese keiretsu, the Korean chaebol).
- Dispersing public capital across regions for political equity instead of concentrating it for agglomeration (Europe, 1990s-2010s).
- Transferring capital without an endogenous talent base (the Gulf and GlobalFoundries).[^histfailure]

## 14. Frontier for innovation

Y Combinator's Summer 2026 Requests for Startups made an unusually hard-tech turn, and four of its fifteen entries target the bottlenecks this article maps. Each is a public statement of where a well-known investor sees an unbuilt company.

- **Supply Chain 2.0 for Semiconductors** ([Diana Hu, YC](https://www.ycombinator.com/rfs)). A single advanced chip runs ~1,400 process steps across a dozen countries over five months, still coordinated with spreadsheets, SAP and phone calls. The 2021 shortage let a \$300 chip hold up a \$50,000 car and blocked \$210B of vehicle production, because firms had no visibility past their first-tier suppliers. The argument for a startup rather than an SAP feature: pricing real-time wafer-allocation, packaging-constraint and export-compliance tracking requires understanding the CoWoS-packaging and HBM bottlenecks at a level SAP does not.

- **Inference Chips for Agent Workflows** ([Diana Hu, YC](https://www.ycombinator.com/rfs)). Agentic workloads are bursty, bouncing between memory-bound model calls, I/O-bound tool use and CPU-bound orchestration, so GPUs hit only 30-40% of peak utilization on them. The thesis is purpose-built silicon for fast model context-switching, native speculative decoding, and memory built for KV caches that persist across an execution graph; the RFS cites NVIDIA's reported \$20B acquisition of Groq as the market signal. It is the custom-accelerator wave pointed at one specific workload.

- **Electronics in Space** ([Philip Johnston, YC](https://www.ycombinator.com/rfs)). Reusable rockets (SpaceX, Stoke Space) cut launch cost enough to make orbital inference a market, needing chips optimized for mass, thermal and radiation. It scales the radiation-hardened ("rad-hard") chip niche into a company thesis, and it wants chip designers from SpaceX or NVIDIA specifically.

Two adjacent 2026 RFS entries touch this map without being about chips: Counter-Swarm Defense (Tyler Bosmeny), which drives edge-inference chip demand, and Industrial Capabilities in Space (Adi Oltean), on lunar-regolith manufacturing.

## 15. What the analysts flag

The most-followed independent analysts (Dylan Patel's SemiAnalysis, Taipei-based Dan Nystedt, and a second circle of Doug O'Laughlin, Ian Cutress, Ben Thompson, Asianometry, TechInsights and TrendForce) converge on a few claims that both validate and extend this article's bottleneck map.

**The bottleneck keeps rotating.** SemiAnalysis's through-line across 2025-2026 is that the binding constraint moves: logic dies, then CoWoS, then HBM, and by 2026 the power grid and datacenter financing. The freshest constraint is electricity. Patel's models put AI critical IT power at ~150 GW by 2030, and with US interconnection queues over five years, he projects 40 GW-plus of "behind-the-meter" datacenters bypassing the grid on dedicated gas turbines by 2028, which relocates the bottleneck to gas turbines and step-up transformers on 3-4 year lead times. This is the systemic constraint the rest of this article keeps pointing at, now quantified.[^powerwall]

**The debates worth knowing.**

- **Did TSMC brake the AI boom?** Ben Thompson argues its financial conservatism artificially capped the buildout, costing hyperscalers hundreds of billions in potential revenue ([Stratechery, "TSMC Risk"](https://stratechery.com/2026/tsmc-risk/)). Asianometry's rebuttal: cleanroom construction, EUV calibration and yield learning are physically inelastic, so the shortage is structural rather than a failure of belief, and TSMC's \$52-56B of 2026 capex cannot relieve supply before 2028 ([Asianometry](https://asianometry.passport.online/member/episode/silicon-valley-thinks-tsmc-is-braking-the-ai-boom)).
- **Is inference a memory problem, not a compute one?** Doug O'Laughlin's case: the physical KV cache is bounded by finite DRAM, so multi-agent workflows force cache evictions every few minutes, destroying the theoretical token-reuse economics ([WEKA's writeup of the argument](https://www.weka.io/article/why-gpu-memory-scarcity-and-kv-cache-eviction-are-undermining-agentic-ai-economics-in-2026)).
- **Is Intel Foundry a going concern?** Ian Cutress reads the retroactive \$7B foundry operating loss as an existential bet on 18A ([More Than Moore](https://muckrack.com/ian-cutress/articles)).
- **Is the AMD-OpenAI deal the real threat to NVIDIA?** Cutress rates the 90 GW/6 GW agreement the most structured challenge yet, because it ties hardware to equity rather than being a hardware sale ([the deal terms](https://gamesbeat.com/amd-and-openai-partner-to-deploy-6-gigawatts-of-amd-gpus/)).

**The forensic check on China.** TechInsights' [Ascend 910C teardown, published early October 2025](https://www.digitimes.com/news/a20251005PD200/huawei-ascend-tsmc-techinsights-samsung.html), found TSMC 7 nm dies (routed through the intermediary Sophgo, since cut off; TSMC has not supplied Huawei directly since September 2020) and stockpiled Samsung and SK Hynix HBM2E inside it, physical proof that China's sovereign accelerator capacity still leans on pre-sanction foreign silicon. The same analysis put the remaining TSMC die stockpile at roughly nine months of production. Dan Nystedt supplies the Taiwan-side ground truth: TSMC's fifth consecutive record-profit quarter (Q2 2026 net income \$19.65B, revenue +36% year over year), CoWoS heading to 120-140k wafers/month by end-2026 (narrowing the supply gap from 20% to 10%), and the legal "silicon shield," Taiwanese law barring TSMC from moving its most advanced node abroad before it is industrialized on the island.[^forensic]

Ranked by how consequential this community treats them, the top ten subjects, each mapping to a bottleneck documented above:

1. **The ASML EUV throughput ceiling.** Zeiss mirror polishing caps output at an estimated 70-100 scanners a year, and each one unlocks roughly \$15B of downstream compute ([Patel's model, summarized](https://www.useluminix.com/reports/industry-analysis/understanding-dylan-patel-of-semianalyis-deep-dive-on-ai-compute-scaling-bottlenecks)).
2. **CoWoS and HBM, not logic, as the true constraint.** The top four AI-chip designers take ~90% of world packaging and memory output but only ~12% of advanced-logic wafers ([Epoch AI](https://epoch.ai/data-insights/ai-chip-supply-chain-constraints), [Silicon Analysts](https://siliconanalysts.com/analysis/foundry-allocation-status-q1-2026)).
3. **Behind-the-meter power.** With grid interconnection queues over five years, SemiAnalysis projects 40 GW-plus of datacenters bypassing the grid on dedicated generation by 2028 ([the forecast](https://aiweekly.co/alerts/semianalysis-40gw-of-behind-the-meter-us-datacenters-by-2028)).
4. **The memory supercycle.** The claim is that this is not the usual boom-bust: HBM's 3-4x wafer-area penalty per bit diverts capacity away from commodity DRAM faster than new fabs arrive, so DRAM stays undersupplied by high-single-digit percent in 2026 and low-to-mid-teens in 2027, with no balance before ~2028. The evidence that it is structural rather than cyclical: 1Q26 DRAM operating margins of ~81% (Samsung), ~84% (Micron) and ~73% (SK Hynix), levels no commodity industry sustains, alongside 90%+ contract-price rises on conventional DRAM ([SemiAnalysis's model](https://newsletter.semianalysis.com/p/chinas-cxmt-is-set-to-challenge-dram), [2026 market forecast](https://www.ampheo.com/blog/memory-chip-market-forecast-2026-dram-nand-hbm-and-nor-flash)).
5. **NVIDIA's debt-backstopped "Project Trinity" financing.** The "trinity" is capital, offtake contracts and datacenter shells. NVIDIA uses its AA credit rating to guarantee the GPU lease revenue of neocloud operators for up to six years, promising to buy the compute itself at a preset price if demand disappoints, which lets banks lend against the hardware and expands GPU access beyond the hyperscalers. SemiAnalysis models this pushing AI-linked debt past \$7 trillion by 2029, the second-largest asset-backed debt market after US residential mortgages, and calls NVIDIA the sector's de facto central bank; the bear case is that neocloud defaults follow if application revenue does not cover depreciation ([the analysis](https://newsletter.semianalysis.com/p/nvidia-gpu-debt-backstop-unleashes)).
6. **The TSMC-brake-versus-physics debate**, above.
7. **China's stockpile-dependent sovereignty**, per the teardown above.
8. **The H20 cluster-aggregation loophole**: export thresholds set per chip, evaded by aggregating many compliant chips ([IFP](https://ifp.org/the-h20-problem/)).
9. **Intel Foundry's survival on 18A** ([Cutress](https://www.reddit.com/r/hardware/comments/1buemry/more_than_moore_dr_ian_cutress_intel_foundry/)).
10. **Merchant-silicon and ASIC challenges to NVIDIA**, of which the AMD-OpenAI deal is the sharpest ([terms](https://gamesbeat.com/amd-and-openai-partner-to-deploy-6-gigawatts-of-amd-gpus/)).

## Appendix: the people behind the companies

For each pillar company in this article, the one or two people who run it or built the thing it is known for, with profile links. The photonics startups and China's players have their people listed in their own tables above.

| Company | Layer | Key people |
|---|---|---|
| TSMC | Leading-edge foundry | [C.C. Wei](https://en.wikipedia.org/wiki/Che-Chia_Wei) (chairman and CEO), [Y.J. Mii](https://www.linkedin.com/search/results/people/?keywords=Y.J.+Mii+TSMC) (co-COO, the R&D chief behind 16 nm to 3 nm) |
| Samsung Device Solutions | Foundry and memory | [Jun Young-hyun](https://www.linkedin.com/search/results/people/?keywords=Jun+Young-hyun+Samsung) (vice chairman, head of Device Solutions) |
| Intel | Logic and foundry | [Lip-Bu Tan](https://www.linkedin.com/in/lip-bu-tan-284a7846/) (CEO), [Naga Chandrasekaran](https://www.linkedin.com/in/nagachandrasekaran/) (chief technology and operations officer, Intel Foundry) |
| SMIC | China's leading foundry | [Liang Mong-song](https://en.wikipedia.org/wiki/Liang_Mong_Song) (co-CEO, the ex-TSMC and ex-Samsung engineer behind SMIC's 7 nm breakthrough) |
| Rapidus | 2 nm challenger foundry | [Atsuyoshi Koike](https://www.linkedin.com/search/results/people/?keywords=Atsuyoshi+Koike+Rapidus) (president and CEO), [Tetsuro Higashi](https://www.linkedin.com/search/results/people/?keywords=Tetsuro+Higashi+Rapidus) (chairman, former Tokyo Electron CEO) |
| SK Hynix | HBM and DRAM leader | [Kwak Noh-jung](https://www.linkedin.com/search/results/people/?keywords=Kwak+Noh-jung+SK+Hynix) (president and CEO), [Kangwook Lee](https://www.linkedin.com/in/kangwook-lee-25814136) (head of package development, pioneer of MR-MUF HBM packaging) |
| Micron | DRAM and HBM | [Sanjay Mehrotra](https://www.linkedin.com/in/sanjay-mehrotra/) (chairman, president and CEO) |
| ASML | Lithography monopoly | [Christophe Fouquet](https://nl.linkedin.com/in/christophe-fouquet-asml) (president and CEO), [Martin van den Brink](https://www.linkedin.com/search/results/people/?keywords=Martin+van+den+Brink+ASML) (retired president and CTO, drove EUV for 40 years) |
| Applied Materials | Deposition, etch, implant | [Gary Dickerson](https://www.linkedin.com/in/gary-dickerson/) (president and CEO) |
| Lam Research | Etch and deposition | [Tim Archer](https://www.linkedin.com/in/tim-archer-b7a9aa3/) (president and CEO) |
| KLA | Metrology and inspection | [Rick Wallace](https://www.linkedin.com/in/rickpwallace/) (president and CEO) |
| Tokyo Electron | Coat/develop, etch, deposition | [Toshiki Kawai](https://de.wikipedia.org/wiki/Toshiki_Kawai) (president and CEO) |
| Carl Zeiss SMT | EUV optics monopoly | [Frank Rohmund](https://de.linkedin.com/in/frank-rohmund-a3707b65) (president and CEO) |
| Besi | Hybrid bonding | [Richard Blickman](https://nl.linkedin.com/in/richard-blickman-50407b9) (president and CEO since 1995) |
| Advantest | Test equipment | [Douglas Lefever](https://www.linkedin.com/in/doug-lefever-7aa2528/) (group CEO, first American to lead the company) |
| NVIDIA | GPUs and AI systems | [Jensen Huang](https://www.linkedin.com/in/jenhsunhuang/) (founder and CEO), [Bill Dally](https://www.linkedin.com/in/billdally/) (chief scientist) |
| Broadcom | Custom ASICs and networking | [Hock Tan](https://www.linkedin.com/in/hock-tan/) (president and CEO) |
| Qualcomm | Mobile and edge SoCs | [Cristiano Amon](https://www.linkedin.com/in/cristiano-r-amon/) (president and CEO) |
| Arm | CPU cores and instruction set | [Rene Haas](https://www.linkedin.com/in/rene-haas-91a8691/) (CEO) |
| Cadence | EDA duopolist | [Anirudh Devgan](https://www.linkedin.com/in/devgan) (president and CEO) |
| Synopsys | EDA duopolist | [Sassine Ghazi](https://www.linkedin.com/in/sassine-ghazi/) (president and CEO), [Aart de Geus](https://www.linkedin.com/in/aart-de-geus/) (founder and executive chair) |
| Cerebras | Wafer-scale compute | [Andrew Feldman](https://www.linkedin.com/in/andrewdfeldman/) (co-founder and CEO) |
| Groq | LPU inference | [Jonathan Ross](https://www.linkedin.com/in/ross-jonathan/) (founder; now NVIDIA's chief software architect after the reported \$20B December 2025 licensing deal, Simon Edwards leading the remaining Groq) |
| Tenstorrent | RISC-V AI accelerators | [Jim Keller](https://www.linkedin.com/in/jimbkeller/) (CEO, architect of AMD Zen, Apple A4/A5, Tesla Autopilot silicon) |
| Axelera AI | Edge inference, digital in-memory compute | [Fabrizio Del Maffeo](https://www.linkedin.com/in/delmaffeo) (co-founder and CEO), [Evangelos Eleftheriou](https://www.linkedin.com/in/evangelos-eleftheriou) (co-founder and CTO, ex-IBM Fellow) |
| Hailo | Edge inference, dataflow | [Orr Danon](https://www.linkedin.com/in/orr-danon-329944106/) (co-founder and CEO) |
| EnCharge AI | Analog in-memory compute | [Naveen Verma](https://www.linkedin.com/in/naveen-verma-8a2b6112/) (co-founder and CEO, Princeton professor) |

## Further (paywalled) reading

Everything above was built from public sources, free previews and secondary coverage. A handful of paid sources go one level deeper than anything publicly available, and they map directly onto this article's sections; if you have access, these are the ones worth pulling:

- **SemiAnalysis, [Memory Model](https://semianalysis.com/memory-model/)**: the full quarterly memory dataset, per-fab DRAM capacity and utilization by node for all eight producers (CXMT and JHICC included), bits per wafer, and multi-generation HBM pricing.
- **SemiAnalysis, ["China's CXMT Is Set to Challenge DRAM Incumbents"](https://newsletter.semianalysis.com/p/chinas-cxmt-is-set-to-challenge-dram) (July 2026), paid section**: the tool-by-tool map of CXMT's equipment base under export controls and the domestication curve for Chinese wafer-fab equipment; the free portion is integrated above.
- **SemiAnalysis, "Huawei Ascend Production Ramp"** (September 2025): the complete SMIC advanced-capacity and Ascend-output model, including the HBM-stockpile accounting.
- **SemiAnalysis, SMIC N+3 teardown** (June 2026): the full pitch-by-pitch measurements behind the "densified 7 nm, not real 5 nm" verdict.
- **SemiAnalysis, GB200 component and supply chain model** (~\$10k for non-subscribers): per-SKU pricing, quantities and OEM/ODM mapping for every part of the GB200 rack.
- **TechInsights and Yole, ALD-precursor market reports** (2025-26): the per-node supplier shares (Merck, Entegris, Soulbrain) that could not be verified from free sources.
- **IBS (International Business Strategies), 300 mm wafer supply-demand model to 2030**: whether wafer capacity expansion can match datacenter GPU volumes, a forward-looking question this piece could not close from free sources.

[^b200cost]: COGS build-up (~\$850 logic at ~60% yield on a ~\$17k 4NP wafer, ~\$2,900 HBM3e, ~\$1,100 CoWoS-L + substrate, ~\$1,000 yield-loss provision, ~\$550 test and auxiliaries, total ~\$6,400) per [Epoch AI's B200 cost breakdown](https://epoch.ai/data-insights/b200-cost-breakdown) and [Silicon Analysts](https://siliconanalysts.com/analysis/nvidia-b200-blackwell-cost-breakdown); these are teardown-and-modeling estimates, not audited figures. The per-node wafer-cost ladder (~\$17.0k N5-class, ~\$9.3k 7 nm, ~\$6.0k 10 nm, ~\$4.0k 16/12 nm) corroborated by [CSET's foundry cost model](https://cset.georgetown.edu/publication/ai-chips-what-they-are-and-why-they-matter/).

[^margin]: Gross margin ~82-84% per NVIDIA reporting and [Silicon Analysts](https://siliconanalysts.com/data/ai-chip-costs); GB200 NVL72 rack pricing ~\$3M per the same analyses.

[^quartz]: Spruce Pine's role, the Sibelco/The Quartz Corp 70-90% duopoly, and the Hurricane Helene timeline via [Z2Data](https://www.z2data.com/insights/quartz-mine-disruption-in-spruce-pine-nc-threatens-semiconductor-manufacturing/) and [Sibelco's restart announcement](https://www.sibelco.com/en/news/sibelco-restarts-production-and-customer-shipments-at-spruce-pine-following-hurricane-helene) (Oct 10, 2024).

[^poly]: Electronic-grade polysilicon segment ~\$6.8B (2025), ~80% top-three share, ~40% price premium over solar grade under UFLPA sourcing constraints, via [Dataintelo](https://dataintelo.com/report/global-semiconductor-grade-polysilicon-market) and [Virtue Market Research](https://virtuemarketresearch.com/report/electronic-grade-polysilicon-market).

[^wafers]: 300 mm wafer market ~\$14.8B (2025) and shares via [Dataintelo](https://dataintelo.com/report/global-300mm-silicon-wafers-market) and [Backplane's bottleneck profile](https://www.backplane.gg/bottlenecks/silicon-wafers), which also documents epitaxial lead times and per-megafab consumption.

[^masks]: Hoya/AGC EUV mask-blank duopoly (~95-100%) via [EEWorld's survey of Japanese monopolies](https://en.eeworld.com.cn/mp/XSY/a412880.jspx) and [Strategic Market Research](https://www.strategicmarketresearch.com/market-report/euv-mask-blanks-market).

[^hbmshare]: Blackwell HBM allocation (SK Hynix ~60%+, initial allocations >90%; Micron ~20%; Samsung late qualification) and the +20% 2026 contract-price increase via [Introl](https://introl.com/blog/ai-memory-supercycle-hbm-2026), [Silicon Analysts](https://siliconanalysts.com/market/hbm3e-contract-prices-rise-20-as-ai-memory-demand-outstrips-supply-2026-06-27) and [Seeking Alpha](https://seekingalpha.com/news/4535511-samsung-sk-hynix-increase-hbm3e-prices-by-20-percent-for-2026-orders-report); per-accelerator stack counts, the 216-288 GB / 384 GB capacity trajectory, and HBM's DRAM-wafer-input share (18% → 22% → 30%, 2025-27) per TrendForce coverage (December 2025 and June 2026 releases).

[^abf]: Ajinomoto Fine-Techno ~95% share of build-up film, the 2021-24 shortage, ABF margins >50% and the Gifu plant slated for 2032 via [TrendForce](https://www.trendforce.com/news/2026/05/08/news-ajinomoto-ramps-chip-packaging-push-with-%C2%A51-2b-land-buy-for-new-plant-in-2032-abf-margins-top-50-on-ai-boom/) and [Ajinomoto's announcement](https://www.ajinomoto.com/cms_wp_ajnmt_global/wp-content/uploads/pdf/2026_05_07_02E.pdf).

[^rack]: 800 VDC architecture via [NVIDIA's developer blog](https://developer.nvidia.com/blog/nvidia-800-v-hvdc-architecture-will-power-the-next-generation-of-ai-factories/); the PMIC overheating episode and emergency qualification of Infineon/Renesas via [EEWorld](https://en.eeworld.com.cn/news/dygl/eic723928.html); the per-SKU power-module reallocation (MPS backlog cut ~half, B300A/B200/GB200 split across MPS/Renesas/Infineon, Renesas's ~15%→~50% Hopper-class share) per Edgewater Research channel checks as relayed by financial press; treat these as analyst estimates.

[^blackwell-rework]: The CoWoS-L warpage episode, the bridge and top-metal redesign, and the GB200A fallback per SemiAnalysis's "Nvidia's Blackwell Reworked" (August 2024, free portion), [3D InCites' analysis of Blackwell's CoWoS-L issues](https://www.3dincites.com/2024/10/iftle-607-why-nvidias-blackwell-is-having-issues-with-tsmc-cowos-l-technology/) and [Tom's Hardware on the yield fix](https://www.tomshardware.com/pc-components/gpus/nvidia-adresses-significant-blackwell-yield-issues-production-ramp-in-q4).

[^materials]: The materials master table synthesizes a dedicated research track; market sizes from Persistence, Dataintelo, Fact.MR, Fortune Business Insights, Spherical Insights and Mordor Intelligence reports (2024-2026 editions); chokepoint grades are the track's own 1-5 rating (5 = single point of failure without substitute).

[^neon]: Ingas/Cryoin ~70% share of semiconductor-grade neon and the 2022 price spike via [SpecGas](https://specgasinc.com/feeds/blog/neon-suppliers); post-crisis on-site neon recovery per industry reporting.

[^gage]: China Ga/Ge export controls timeline and price moves via [CRU Group](https://www.crugroup.com/en/communities/thought-leadership/2024/long-term-outlook-of-gallium-remains-uncertain/); the Belgium re-routing analysis via the [Stimson Center](https://www.thinkchina.sg/economy/chinas-critical-minerals-export-ban-falls-short) (as covered by ThinkChina).

[^helium]: The 2026 Hormuz helium crisis (~200 stranded ISO containers, ~30% of world supply, 35-48 day boil-off, Korea's ~65% Qatar dependence, TSMC's 80-90% recovery rate, spot prices +40-100%) via [J2 Sourcing](https://j2sourcing.com/blog/helium-crisis-semiconductor-manufacturing-electronic-components-2026/), [Edison](https://www.edisongroup.com/thematic/edison-explains-the-iran-war-may-have-triggered-the-next-global-supply-shock/BM-3352/) and [Value Chain Asia](https://valuechainasia.com/articles/technology/tsmc-helium-shortage-semiconductor-supply-chain-2026); the US Federal Helium Reserve was sold to Messer in 2024, removing the traditional stabilizer.

[^naphtha]: Naphtha-to-photoresist solvent squeeze and warnings to Samsung/SK Hynix via [TechNews Taiwan](https://technews.tw/2026/04/24/asia-chipmakers-naphtha-photoresist-supply/), citing SemiAnalysis's May 2026 chart book.

[^memexports]: Korean April 2026 memory exports +262% YoY in value on -11.9% volume via [TrendForce](https://www.trendforce.com/news/2026/06/11/news-south-korea-chip-export-volume-falls-yet-revenue-surges-may-dram-370-nand-207/) and [BigGo Finance](https://finance.biggo.com/news/246f11f6-8b77-4868-9ac2-655efabf1cd2); Taiwan DRAM inventory drawdown via [Taiwan News](https://www.taiwannews.com.tw/news/6356715); memory >50% of combined China/Korea/Taiwan IC exports per the SemiAnalysis ChipBook (May 2026 edition).

[^dramshare]: Q1 2026 DRAM shares (Samsung 38%/41% revenue/bits, SK Hynix 29%/24%, Micron 22%/23%, CXMT 8%/10%) via [Counterpoint Research](https://counterpointresearch.com/en/insights/global-dram-and-hbm-market-share); the SK Hynix vs Samsung operating-profit crossover via [SoftwareSeni's synthesis](https://www.softwareseni.com/samsung-vs-sk-hynix-the-hbm-duopoly-under-strain/).

[^china-mem]: CXMT node/capacity (16 nm G4 mass production, 15 nm sampling, 230-280k wpm) via [Grokipedia's CXMT profile](https://grokipedia.com/page/ChangXin_Memory_Technologies); YMTC 13% NAND share via [Counterpoint](https://counterpointresearch.com/en/insights/global-nand-memory-market-share); treat precise Chinese capacity figures as estimates.

[^cannibal]: HBM wafer cannibalization ratio (3-4x per bit; ~23% of DRAM wafer starts in 2026 vs 19% in 2025) per SemiAnalysis's Memory Model as relayed by [Luminix](https://www.useluminix.com/reports/industry-analysis/understanding-dylan-patel-of-semianalyis-deep-dive-on-ai-compute-scaling-bottlenecks); DDR5 contract prices +90%+ in Q1 2026 via TrendForce.

[^yield]: MR-MUF vs TC-NCF processes, the Namics single-source underfill, and stack-yield estimates (75-80% vs 60-65%) via [SoftwareSeni](https://www.softwareseni.com/samsung-vs-sk-hynix-the-hbm-duopoly-under-strain/) and [ForcedAlpha](https://forcedalpha.com/research/korea-hbm-supply-chain-dependency/); yields are analyst estimates, not company disclosures.

[^jedec]: JEDEC HBM4 thickness relaxation (720→775 µm) postponing hybrid bonding to HBM4E-era via [TrendForce](https://www.trendforce.com/news/2026/07/07/news-samsung-sk-hynix-reportedly-reconsider-hybrid-bonding-timeline-16-high-hbm4e-may-be-earliest-adoption/).

[^hbm4]: HBM4 base die on TSMC 5/3 nm logic and Samsung's 40-50% base-die repricing via [TrendForce](https://www.trendforce.com/news/2026/04/15/news-hbm4-strategies-diverge-samsung-reportedly-chases-80-1c-dram-yield-while-sk-hynix-trims-shipments-by-30/).

[^memwall]: FLOPS doubling every 1.44-1.69 years vs off-chip bandwidth every 3.32-3.53 years per [an arXiv analysis of NVIDIA datacenter GPU progress](https://arxiv.org/html/2601.20115v2).

[^hbmmarket]: HBM market ~\$35B (2025) → ~\$54.6B (2026) → >\$80B (2027) with a structural -2.5% to -8% supply deficit, synthesized from Goldman Sachs, TrendForce and Bank of America forecasts as relayed by [ForcedAlpha](https://forcedalpha.com/research/korea-hbm-supply-chain-dependency/) and [KuCoin's coverage of the Goldman note](https://www.kucoin.com/news/flash/goldman-sachs-report-memory-shortage-to-last-until-2028-buys-maintained).

[^mismatch]: The Micron-Idaho / SK Hynix-Indiana incompatibility per [SemiAnalysis's March 2025 RFI response](https://files.nitrd.gov/90-fr-9088/SemiAnalysis-AI-RFI-2025.pdf) (public document), pp. 4-5.

[^wfe]: WFE ~\$143B in 2025, +12% YoY, via [Counterpoint Research](https://counterpointresearch.com/en/insights/WFE-Revenue-Up-12-percentage-YoY-in-2025-Driven-by-Increased-Memory-Advanced-Node-Foundry-Investments).

[^whack]: The "closer to 100 critical components than tools" framing per SemiAnalysis's "Fab Whack-A-Mole" (October 2024, paywalled) as summarized in their [public RFI response](https://files.nitrd.gov/90-fr-9088/SemiAnalysis-AI-RFI-2025.pdf); subsystem shares via [SEMI's critical-subsystems ranking](https://www.semi.org/en/blogs/business-markets/top-10-critical-subsystems-suppliers-2020), [VAT Group filings](https://www.vatgroup.com/news/vat-medienmitteilung-zum-jahresabschluss-2024) (~70-77% of semiconductor vacuum valves) and [Dataintelo's RF plasma generator report](https://dataintelo.com/report/global-rf-plasma-generators-market) (Advanced Energy ~40%).

[^highna]: High-NA insertion split (Intel 14A first, TSMC delaying to ~A14/2028-29, Samsung ~2027, ~\$400M per EXE:5200-class scanner, 80→90% availability trajectory) via [TrendForce](https://www.trendforce.com/news/2026/05/20/news-asml-expects-first-high-na-euv-memory-logic-products-within-months-amid-tsmcs-cost-driven-delay/) and [Tom's Hardware on Intel's EXE:5200B acceptance](https://www.tomshardware.com/tech-industry/semiconductors/intel-installs-industrys-first-commercial-high-na-euv-lithography-tool-asml-twinscan-exe-5200b-sets-the-stage-for-14a).

[^toolshares]: Segment sizes and shares via [Mordor Intelligence (CVD](https://www.mordorintelligence.com/industry-reports/semiconductor-cvd-equipment-market), [etch](https://www.mordorintelligence.com/industry-reports/semiconductor-etch-equipment-market), [cleaning)](https://www.mordorintelligence.com/industry-reports/wafer-cleaning-equipment-market), [Dataintelo (ALD)](https://dataintelo.com/report/atomic-layer-deposition-equipment-market), [Fortune Business Insights (metrology)](https://www.fortunebusinessinsights.com/semiconductor-metrology-and-inspection-equipment-market-113987) and [Mordor's front-end equipment report](https://www.mordorintelligence.com/industry-reports/global-semiconductor-front-end-equipment-market) for TEL's >90% EUV-coupled track share.

[^rfchina]: The 27 MHz / 3 kW RF-generator restriction and its ~25% process-time penalty on Chinese etch tools via [Mordor Intelligence's etch-equipment analysis](https://www.mordorintelligence.com/industry-reports/semiconductor-etch-equipment-market).

[^service]: Lam's 34% service revenue via the same etch-market analysis; the YMTC service-cutoff consequences (tool cannibalism, third-party parts, yield degradation) via [ASPI](https://www.aspistrategist.org.au/seismic-shifts-underway-in-global-semiconductor-market-as-us-accelerates-decoupling-from-china/).

[^chinaequip]: China's 80%-by-2030 target and ~50% domestic-tooling mandate via [NineScrolls](https://ninescrolls.com/news/china-targets-80-chip-self-sufficiency-by-2030-with-all-domestic-etch-and-deposi); Naura/AMEC/SMEE/Hwatsing capability assessments via [CSET's "Inside Beijing's Chipmaking Offensive"](https://cset.georgetown.edu/article/inside-beijings-chipmaking-offensive/); SiCarrier and alternative EUV paths via [TrendForce](https://www.trendforce.com/news/2025/11/10/news-decoding-chinas-lithography-push-to-challenge-asml-from-sicarrier-to-alternative-euv-paths/).

[^nil]: Canon nanoimprint claims and the defectivity/overlay skepticism via [freeCodeCamp's lithography handbook](https://www.freecodecamp.org/news/the-lithography-handbook-machines-markets-and-the-next-wave-of-semiconductor-startups/) and industry commentary.

[^used]: Secondhand equipment market ~\$9B (2023) via [Semiconductor Insight](https://semiconductorinsight.com/report/second-hand-semiconductor-equipment-market/); SurplusGLOBAL's ~20% share and Yongin cluster via [company disclosures](https://www.surplusglobal.com/).

[^n2]: N2 specs (+15% density vs N3E, >300 MTr/mm², 10-15% perf or 25-30% power gain), yield leaks (~70-80% logic, >90% on 256 Mb SRAM), capacity booked to Q2 2027 and the Apple-led customer queue via [TSMC's 2025 annual report](https://investor.tsmc.com/sites/ir/annual-report/2025/2025%20Annual%20Report_E.pdf), [a mid-2026 node comparison](https://cyberraiden.wordpress.com/2026/03/11/comparing-the-leading-2nm-nodes-in-2026-tsmc-n2-intel-18a-and-samsung-sf2-density-performance-yields-and-ecosystem/) and supply-chain leak coverage; yields are leaks, not disclosures.

[^wafprice]: Wafer-price ladder (N7 ~\$9.5k, N5 ~\$18.5k, N3E ~\$19.5k, N2 ~\$30k) per a Morgan Stanley note circulated via [industry coverage](https://www.reddit.com/r/hardware/comments/1m17bxt/the_current_wafer_pricing_rumor_for_tsmc_up_to_n2/) and [Silicon Analysts' pricing data](https://siliconanalysts.com/data/wafer-pricing); treat as informed estimates.

[^a16]: A16 / Super Power Rail (direct backside source-drain contact, +8-10% density, Q4 2026 production) via [SemiWiki's VLSI 2026 coverage](https://semiwiki.com/semiconductor-manufacturers/tsmc/370949-tsmc-a16-backside-power-at-vlsi-2026/) and [TSMC](https://www.tsmc.com/english/dedicatedFoundry/technology/logic/l_A16).

[^intel]: Intel's crisis and turnaround: Gelsinger's exit and the ~10% late-2024 yields via [retrospective analyses](https://digidai.github.io/2025/11/23/pat-gelsinger-intel-ceo-idm-2-foundry-crisis-deep-analysis/); Tan's cuts and the Altera sale via [36kr](https://eu.36kr.com/en/p/3848663270505096); the 9.9% US equity stake (\$8.9B at \$20.47/share, passive) via [the agreement's coverage](https://news.asbis.lv/suppliers/intel-reached-a-historic-agreement-to-accelerate-american-technology-and-manufacturing-leadership/) and [CSIS's "Too Good to Lose"](https://www.csis.org/analysis/too-good-lose-americas-stake-intel); 18A yields 55-65% via competitive analyses (moderate confidence); the ~3M-unit Google TPU order for 2028 via [RCRTech](https://rcrtech.com/semiconductor-news/google-3-million-ai-chips-from-intel/).

[^rapidus]: Rapidus state support (~\$16B, ¥2.35T total), IIM-1 pilot line status, IBM/imec-licensed GAA, the ~\$21k wafer offer ~30% under TSMC, and analyst skepticism via [BigGo Finance](https://finance.biggo.com/news/ce97bdbc-ab07-4e48-b441-be806f6a67ae).

[^smic]: SMIC N+2/N+3 confirmed by TechInsights teardowns of Kirin 9000S-9030 and Ascend 910B/910C (free blog summaries, December 2025); the pitch and density measurements (32.5 nm minimum metal pitch, 57 nm contacted gate pitch, ~113.4 MTr/mm²) per SemiAnalysis's June 2026 teardown preview; ~33% N+3 yield and +40-50% cost premium per Kiwoom Securities models relayed by Chosun Biz (April 2025) and [TrendForce's synthesis](https://www.trendforce.com/news/2025/11/10/news-decoding-chinas-lithography-push-to-challenge-asml-from-sicarrier-to-alternative-euv-paths/); capacity ramp (45k wafers/month end-2025 → 60k in 2026 → 80k in 2027), the ~2.9M TSMC-made die bank, and HBM as the binding constraint per SemiAnalysis's "Huawei Ascend Production Ramp" (September 2025, free portion); Ascend 910C at ~60% of H100 inference performance per the same coverage. All are estimates with moderate confidence.

[^physics]: EUV stochastics (92 eV photons, shot noise, the resolution/roughness/sensitivity triangle, dose-throughput economics) per lithography literature; copper mean free path ~39 nm and the ruthenium/air-gap responses, and BSPDN rationale, via [SemiWiki](https://semiwiki.com/semiconductor-manufacturers/tsmc/370949-tsmc-a16-backside-power-at-vlsi-2026/) and imec publications; High-NA half-field stitching per [ASML's system specifications](https://www.asml.com/en/products/euv-lithography-systems).

[^ru-airgap]: Ruthenium above \$1,700/oz in March 2026, sub-35-tonne world supply and the forecast 2026 deficit via [Procurement Resource](https://www.procurementresource.com/resource-center/ruthenium-price-trends) and [Strategic Metals Invest](https://strategicmetalsinvest.com/ruthenium-prices/); the air-gap mask-and-step overhead via [Semiconductor Engineering](https://semiengineering.com/knowledge_centers/manufacturing/process/air-gap/); Intel's two-layer 14 nm air gaps and the cost-driven 10 nm omission via [WikiChip Fuse](https://fuse.wikichip.org/news/525/iedm-2017-isscc-2018-intels-10nm-switching-to-cobalt-interconnects/7/).

[^roadmap]: imec roadmap (nanosheet limit ~A10/2030 at ~42 nm contacted poly pitch; CFET from A7/~2034; 2D channels at A2/2043-46, with expected slips) per imec's published roadmaps and coverage.

[^cowoscap]: CoWoS capacity history (13-16k → 35-40k → 65-80k → 120-130k wafers/month, 2023-2026), demand trajectory (370k → 670k → ~1M annual wafers) and 52-78 week lead times via [Silicon Analysts' foundry-allocation analysis](https://siliconanalysts.com/analysis/foundry-allocation-status-q1-2026) and [capacity dataset](https://siliconanalysts.com/market-data/cowos-capacity), with [SemiWiki](https://semiwiki.com/forum/threads/cowos-capacity-set-to-skyrocket-by-2026-massive-growth-in-advanced-packaging.21773/) corroborating; analyst confidence is high through 2024, medium for 2025-26 figures.

[^cowostech]: CoWoS variant architectures, reticle-limit math (~858 mm², 3.3x → 6x → 14x roadmap with 24 HBM stacks by 2029), Vera CPU volumes, and the Blackwell warpage/mask-respin episode via [EEWorld](https://en.eeworld.com.cn/mp/ICVIS/a409612.jspx), [NextPCB's CoWoS explainer](https://www.nextpcb.com/blog/cowos-packaging-h100-b200) and [3D InCites on Blackwell's CoWoS-L issues](https://www.3dincites.com/2024/10/iftle-607-why-nvidias-blackwell-is-having-issues-with-tsmc-cowos-l-technology/).

[^soic]: SoIC generations, AMD's 3.5D MI-series usage, Apple's late-2026 Mac adoption and the 4.5 µm pitch target via [EEWorld's advanced-packaging survey](https://en.eeworld.com.cn/mp/ICVIS/a409612.jspx).

[^cowosalloc]: 2026-27 CoWoS allocation by customer (NVIDIA ~780k wafers/~56-60% in 2026 diluting to ~45% in 2027; AMD 130k→530k; Broadcom 300k→484k; MediaTek 40k→180k; top-3 >85%) per a Morgan Stanley supply-chain model relayed by [36Kr](https://eu.36kr.com/en/p/3892020701149697); treat as analyst modeling, not disclosures.

[^abf2]: ABF substrate cycle: layer-count escalation and the +123% Blackwell-vs-Hopper ABF consumption per [Daiwa Capital Markets' 82-page ABF initiation (Feb 2025, available via Scribd)](https://www.scribd.com/document/834501374/ABF-substrate-initiation-Daiwa-82-pages); Ajinomoto's 30% Q3 2026 hike at ~95% share, the Resonac/MGC laminate hikes and the Nittobo T-glass shortage via [BigGo Finance](https://finance.biggo.com/news/ZU2KJZ4BpwxG186NIOsE) and [DigiTimes](https://www.digitimes.com/news/a20260513PD230/ic-substrate-abf-substrate-demand-substrate-2026.html); substrate market \$14.8B (2025) → ~\$30B (2034) via [Dataintelo](https://dataintelo.com/report/global-ic-substrate-market).

[^osat]: OSAT market \$46.8B (2025) → \$88B+ (2034) and shares (ASE ~28%, Amkor ~15-18%, JCET ~10-12%, Powertech ~7-9%) via [Dataintelo](https://dataintelo.com/report/outsourced-semiconductor-assembly-and-test-osat-market) and [Credence Research](https://www.credenceresearch.com/report/outsourced-semiconductor-assembly-and-test-osat-market); Chinese wire-bonder import surge via [CEIC customs data](https://www.ceicdata.com/en/china/electronic-import/cn-import-equipment-for-assembling-or-ic-wire-bonder-facility); wire bonding at 75-80% of global interconnect volume via [HDIN Research](https://www.hdinresearch.com/reports/159642).

[^slt]: System-level test economics and 2-4 kW thermal sockets via [Teradyne](https://www.teradyne.com/2024/09/16/hi-drives-innovation/) and [GlobalSpec](https://electronics360.globalspec.com/article/23099/chip-complexity-drives-surge-in-system-level-testing); KYEC's exclusive NVIDIA final-test role and \$1.4B US investment via [KLSE Screener](https://www.klsescreener.com/v2/news/view/1753317/Nvidia_supplier_King_Yuan_Electronics_to_invest_up_to_US_1_4bil_in_US_facility).

[^ucie]: UCIe's marginal real adoption vs proprietary NVLink/Infinity Fabric per [Tom's Hardware's AMD interview](https://www.tomshardware.com/pc-components/cpus/amd-says-the-ucie-universal-chiplet-interface-will-create-a-whole-ecosystem-custom-multi-chiplet-designs-are-the-future) and industry assessments; the glass-substrate wave (Intel licensing its 600+ patent portfolio, Absolics 2026 shipments, Samsung 2028, costs 2-3x organic, yields 75-85%, 20-30% penetration by 2036) via [Future Markets](https://www.futuremarketsinc.com/the-global-market-for-glass-substrates-for-semiconductors-2026-20/) and [The Semiconductor Newsletter](https://thesemiconductornewsletter.substack.com/p/glass-substrates-as-surprising-new).

[^pkg-geo]: Amkor Peoria timeline via [Amkor's fact sheet](https://amkor.com/amkor-technology-arizona/); TSMC Tsukuba 3DIC center and the Kumamoto Fab 2 upgrade to 3 nm via [DigiTimes](https://www.digitimes.com/news/a20260209PD204/tsmc-packaging-plant-chairman-kumamoto.html) and [TrendForce](https://www.trendforce.com/news/2026/02/05/news-tsmc-reportedly-to-upgrade-kumamoto-2nd-plant-from-67nm-to-3nm-boosting-japans-chip-capabilities/).

[^eda]: EDA market size and triopoly shares (~74% overall, ~81% of AI-agent-era leading edge; Synopsys ~31%, Cadence ~30%, Siemens ~13%) via [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/electronic-design-automation-eda-tools-market), IDC's 2025 EDA share report and [Mobility Foresights](https://mobilityforesights.com/product/agentic-ai-in-eda-market); Calibre's sign-off role is industry common knowledge, formalized in foundry certification lists.

[^ansys]: Synopsys-Ansys: announced January 2024 at ~\$35B, closed July 17, 2025 after Chinese approval, with the Optical Solutions Group and PowerArtist divested to Keysight (October 2025), per [Synopsys investor releases](https://investor.synopsys.com/news/news-details/2025/Synopsys-Receives-All-Necessary-Approvals-for-Proposed-Acquisition-of-Ansys/default.aspx) and the [UK CMA case file](https://www.gov.uk/cma-cases/synopsys-slash-ansys-merger-inquiry).

[^edactl]: The August 2022 gate-all-around EDA rules per the [Federal Register](https://www.federalregister.gov/documents/2022/10/13/2022-21658/implementation-of-additional-export-controls-certain-advanced-computing-and-semiconductor); the May-July 2025 ban-and-rescind cycle and the rare-earth retaliation via [Caixin](https://www.caixinglobal.com/2025-07-03/us-lifts-export-ban-on-chip-design-software-to-china-amid-trade-thaw-102337708.html), [Trivium China](https://triviumchina.com/2025/07/03/us-lifts-eda-ban/) and [IISS's "From national security to strategic leverage"](https://www.iiss.org/online-analysis/online-analysis/2025/07/from-national-security-to-strategic-leverage/).

[^chinaeda]: Chinese EDA capability assessment (Empyrean's IPO-prospectus admission, Primarius's memory focus, X-Epic's verification niche, the point-tool fragmentation) via [EEWorld's survey of 33 domestic EDA firms](https://en.eeworld.com.cn/mp/XSY/a400119.jspx) and the [Interface China Semiconductor Observatory](https://www.interface-eu.org/publications/downloadPdf/china-semiconductor-observatory-baseline-report).

[^arm]: ARM's Total Access model and v9 royalty escalation via [Creative Strategies](https://creativestrategies.com/research/arms-latest-earnings-things-learned-and-whats-significant/); the ARM China chop saga and Acetone restructuring (SoftBank ~48%, ARM plc ~4.8% non-voting) per [ARM's own SEC filings](https://www.sec.gov/Archives/edgar/data/1973239/000119312523216983/d393891df1.htm) and [Radio Free Mobile](https://www.radiofreemobile.com/arm-china-turning-point/).

[^riscv]: RISC-V commercial and Chinese landscape (SiFive, Andes, Tenstorrent; XiangShan, XuanTie; MTIA's RISC-V control cores) per the design-layer research synthesis drawing on IDC and industry reporting; the software-inertia argument is the consensus view of ARM's defensibility.

[^designcost]: IBS design-cost ladder (\$40M at 28 nm to \$725M at 2 nm; \$314M software, \$154M verification) via [Tom's Hardware](https://www.tomshardware.com/news/firm-estimates-a-2nm-chip-now-costs-dollar725-million-to-design) and [Silicon Analysts' NRE dataset](https://siliconanalysts.com/market-data/nre-design-cost); verification at 60-70% of project time and 70% of projects late per the [Wilson Research Group study](https://www.innofour.com/static/default/files/documents/pdf/fpga-trend-report_2022-wilson-research-verification-study_hfoster.pdf); the \$15-20M startup-adjusted figure per SemiAnalysis-derived estimates (paywalled original); process-design-kit access friction per practitioner accounts compiled in the same research track.

[^asicwave]: ASIC service-layer shares and revenues (Broadcom ~35% and 76% of 50G+ SerDes, \$15-20B AI revenue 2024; Marvell ~12%, >\$2B; GUC +329% wafer demand) via [Granite Firm's ASIC analysis](https://www.granitefirm.com/blog/us/2024/07/02/asic-getting-bigger/), [fiisual's Taiwan ASIC ecosystem piece](https://fiisual.com/blog/post/2025/taiwan-industry-asic) and [36Kr's CoWoS competitor analysis](https://eu.36kr.com/en/p/3892020701149697).

[^aichip]: The AlphaChip affair: original claims and their collapse per [Wikipedia's synthesis](https://en.wikipedia.org/wiki/AlphaChip_(controversy)), [Markov's "The False Dawn"](https://arxiv.org/html/2306.09633v10) and Google's rebuttal ["That Chip Has Sailed"](https://arxiv.org/html/2411.10053v1); UCSD timing comparison (0.05-1.97h for commercial tools vs 32-81h for AlphaChip) from the former; Cadence ChipStack's February 2026 launch and claims via [Mobility Foresights](https://mobilityforesights.com/product/agentic-ai-in-eda-market).

[^aistartups]: Architect Labs' \$24M seed (Kindred Ventures; Jeff Dean, OpenAI and NVIDIA angels) via [BusinessWire](https://www.businesswire.com/news/home/20260618895194/en/Architect-Labs-Raises-%2424M-Seed-to-Democratize-Custom-Chip-Design) and [SiliconANGLE](https://siliconangle.com/2026/06/18/architect-labs-nabs-24m-speed-chip-design-projects-ai/); the cohort (Fractile \$220M, Majestic Labs \$11M, Unconventional AI \$10M) via [New Market Pitch's funding survey](https://newmarketpitch.com/blogs/news/semiconductor-funding-analysis).

[^edge-landscape]: This section extends the embedded-compute section of the [drones article](/european-drone-landscape) using a dedicated edge-inference research track; chip specs are drawn from vendor datasheets and teardown reporting cited below.

[^edgechips]: Edge-inference chip specs, prices, fabs and design wins (NVIDIA Jetson, Qualcomm RB-series, TI TDA4/AM62A, Renesas RZ/V2H, Ambarella CVflow, Axelera Metis, Hailo, Sima.ai, Blaize, Kneron, Syntiant, STM32N6, Rockchip, Allwinner, Horizon Journey 6, Black Sesame) via vendor documentation and [EDN's edge-AI-chip survey](https://www.edn.com/top-10-edge-ai-chips-2/), [e-con Systems' Jetson comparison](https://www.e-consystems.com/blog/camera/technology/nvidia-jetson-orin-vs-other-nvidia-jetson-modules-a-detailed-look/), [Axelera](https://axelera.ai/ai-accelerators/aipu/metis) and [Renesas via DigiKey](https://www.digikey.com/en/product-highlight/r/renesas/rvv2h-quad-core-vision-ai-mpu); Coral's end-of-life via [community reporting](https://www.reddit.com/r/frigate_nvr/comments/1o7z7hb/coral_tpu_is_officially_dead/).

[^edgearch]: The 10-100x data-movement energy cost, the dataflow/in-memory response, and the toolchain/quantization adoption barriers per [Mobility Engineering Tech on in-memory computing](https://www.mobilityengineeringtech.com/component/content/article/54818-in-memory-computing-chip-is-a-processing-breakthrough-for-on-device-ai-applications) and the edge-inference research track's synthesis of practitioner reports.

[^leakage]: Teardown-sourced sanctions-leakage detail (Orlan-10 components and the SMT-iLogic / Hong Kong broker network, Lancet-3's Jetson TX2 + Xilinx FPGA, Shahed-136 parts) via the [KSE "Foreign Components in Russian Military Drones" report](https://sanctions.kse.ua/wp-content/uploads/2024/01/230828-Drones.pdf), [US Treasury sanctions actions](https://home.treasury.gov/news/press-releases/jy2318) and [Espreso](https://global.espreso.tv/russia-supplies-most-parts-for-orlan-drones-abroad-despite-sanctions); the EAR99 classification gap is the recurring finding across these sources.

[^defeng]: Sealed-airframe engineering constraints (fanless IP67 thermal throttling with ~30% clock drop after 45 minutes, soldered/underfilled memory for 40G shock, conformal coating, rad-hard FPGA niche) via [RoboticsBiz](https://roboticsbiz.com/how-ai-robots-depend-on-reliable-hardware-more-than-ever/) and [InTechHouse's edge-AI hardware guide](https://intechhouse.com/blog/edge-ai-hardware-for-in-vehicle-vision-power-cooling-mtbf-integration).

[^edgeecon]: The tiered compute-budget economics (\$10-15 on a ~\$500 FPV, hundreds of dollars on a ~\$50k loitering munition, 100+ TOPS on a \$1,000+ platform) synthesized in the edge-inference research track from the chip prices cited above and drone-cost data in the [drones article](/european-drone-landscape).

[^robotics]: Robotics compute trajectory (Jetson Thor ~2,000 TOPS, Snapdragon Ride Elite ~700 TOPS, Horizon Journey 6, unified-memory convergence) via the edge-inference research track and vendor announcements; treat forward TOPS figures as vendor targets.

[^cpo]: CPO energy targets and loss figures via [NVIDIA's CPO technical blog](https://developer.nvidia.com/blog/scaling-ai-factories-with-co-packaged-optics-for-better-power-efficiency/); Broadcom Bailly specs via [Broadcom](https://investors.broadcom.com/news-releases/news-release-details/broadcom-delivers-industrys-first-512-tbps-co-packaged-optics); TSMC COUPE roadmap via [TrendForce](https://www.trendforce.com/news/2026/04/01/news-silicon-photonics-race-intensifies-as-tsmc-targets-2026-coupe-production-samsung-eyes-2029-cpo-turnkey/); Google Apollo OCS results (30% capex, 41% energy) from Google's SIGCOMM 2022 paper as relayed by [EEWorld's OCS analysis](https://en.eeworld.com.cn/mp/ICVIS/a410494.jspx); startup funding and the Marvell/Celestial acquisition via [Crunchbase](https://news.crunchbase.com/semiconductors-and-5g/chip-startup-celestial-ai-venture-funding-fidelity/) and [Marvell](https://investor.marvell.com/news-events/press-releases/detail/1000/marvell-to-acquire-celestial-ai-accelerating-scale-up-connectivity-for-next-generation-data-centers).

[^photcompute]: PACE, Q.ANT and the ADC/DAC, nonlinearity and drift blockers via [a review of integrated photonic computing in National Science Review](https://academic.oup.com/nsr/advance-article/doi/10.1093/nsr/nwag315/8696154) and [Q.ANT](https://qant.com/photonic-computing/); Microsoft AIM via [Microsoft Research](https://www.microsoft.com/en-us/research/wp-content/uploads/2023/05/Analog-Iterative-Machine-AIM-using-light-to-solve-quadratic-optimization-problems-with-mixed-variables.pdf).

[^photinvest]: NVIDIA's >\$6.5B early-2026 photonics investment via [CNBC](https://www.cnbc.com/2026/05/29/nvidia-photonics-investment-ai.html); AMD's Enosemi acquisition (May 2025) and NVIDIA's Quantum-X/Spectrum-X timeline via [L'Usine Digitale](https://www.usine-digitale.fr/article/soutenue-par-nvidia-la-deeptech-francaise-scintil-photonics-leve-50-millions-d-euros.N2237441).

[^photeuro]: Arago's \$26M seed via [Vestbee](https://www.vestbee.com/insights/articles/arago-raises-26-m); Q.ANT's Series A and the founder's boson/fermion framing via [its launch materials](https://qant.com/wp-content/uploads/2025/11/20251118_Q.ANT_LAUNCH_NPU2.pdf); the shared "30x" marketing claim and the thin Arago patents are the user's own diligence (patents searchable on [Lens.org](https://www.lens.org/)); Scintil's ~\$58M (€50M) round via [L'Usine Digitale](https://www.usine-digitale.fr/article/soutenue-par-nvidia-la-deeptech-francaise-scintil-photonics-leve-50-millions-d-euros.N2237441); Quandela's 2017 single-photon-source work via [Nature Nanotechnology](https://www.nature.com/articles/nnano.2017.218); LightOn's pivot noted by [BPI](https://bigmedia.bpifrance.fr/nos-actualites/intelligence-artificielle-lidee-lumineuse-de-la-start-arago).

[^aimc]: Mythic's flash-processor specs and the ADC/DAC failure via [Semiconductor Engineering](https://semiengineering.com/is-in-memory-compute-still-alive/); IBM's 14 nm PCM chip results (CIFAR-10 ResNet-9, ALBERT within 1.8% of FP, drift compensation) via [IBM Research](https://research.ibm.com/publications/demonstration-of-transformer-based-albert-model-on-a-14nm-analog-ai-inference-chip) and [the peer-reviewed demonstration](https://pmc.ncbi.nlm.nih.gov/articles/PMC12485056/); EnCharge Series B via industry reporting.

[^neuro]: Intel Hala Point / Loihi 2 (1.15B neurons, 15 TOPS/W sparse, ~0.1x GPU dense) via [Intel](https://www.intc.com/news-events/press-releases/detail/1691/intel-builds-worlds-largest-neuromorphic-system-to); BrainChip's revenue vs market cap via its [ASX half-yearly report](https://investor.brainchip.com/wp-content/uploads/2025/09/Half-Yearly-Report-June-2025.pdf); the always-on IoT niche (SynSense, Innatera, Prophesee) via the photonics/alternatives research track.

[^exotic]: Superconducting, thermodynamic/probabilistic and quantum-as-AI-substrate assessments (TRL levels, cryogenic-cooling and I/O bottlenecks, late-2030s fault-tolerant timeline) synthesized in the photonics/alternatives research track.

[^cerebras]: Cerebras WSE-3 bandwidth claim and independently measured inference speeds (1,800 tok/s on Llama 3.1 8B, 969 tok/s on 405B) via [Cerebras](https://www.cerebras.ai/press-release/cerebras-inference-llama-405b) and [Artificial Analysis](https://artificialanalysis.ai/providers/cerebras).

[^ruletimeline]: Rule chronology via [Covington's Dec 2024 controls summary](https://www.cov.com/en/news-and-insights/insights/2024/12/us-department-of-commerce-strengthens-export-controls-on-advanced-computing-and-semiconductor-manufacturing-items), the [USSC on the AI Diffusion Rule and its rescission](https://www.ussc.edu.au/the-us-ai-diffusion-rule), the [15% revenue-share arrangement](https://www.centraleyes.com/nvidia-and-amd-agree-to-revenue-share/), the [H200 codification and China boycott](https://modeldiplomat.com/story/us-chip-export-curbs-impact-nvidia-in-china), and [Jensen Huang's 95%-to-zero statement](https://www.reddit.com/r/technology/comments/1o9xz3d/jensen_says_nvidias_china_ai_gpu_market_share_has/).

[^interconnect]: The cluster-level control logic (4 TB/s memory, 9 Tbps interconnect caps) and the H20 interconnect loophole per [SemiAnalysis's March 2025 RFI response](https://files.nitrd.gov/90-fr-9088/SemiAnalysis-AI-RFI-2025.pdf) (public), pp. 9-11.

[^toolctl]: China lithography-import collapse (-60% YoY to \$142M, April 2026) via [BofA data relayed by Investing.com](https://www.investing.com/news/stock-market-news/bofa-china-semiconductor-equipment-imports-fall-3-in-april-93CH-4704711); the Bosch \$36.18M penalty via [BIS](https://www.bis.gov/press-release/robert-bosch-gmbh-bosch-pay-36-million-penalty-bis-violations-pertaining-shipments-huawei); the MATCH Act via [Senator Ricketts' office](https://www.ricketts.senate.gov/news/press-releases/ricketts-kim-to-introduce-match-act-level-the-global-playing-field-for-u-s-tech/).

[^enforcement]: BIS budget/headcount and smuggling-volume estimates via [CNAS](https://www.cnas.org/publications/reports/countering-ai-chip-smuggling-has-become-a-national-security-priority) and [CSIS](https://www.csis.org/analysis/securing-agi-laurel-export-controls-compute-gap-and-chinas-counterstrategy); the Singapore server-fraud case via [Lux Analysis](https://www.luxanalysis.com/blog/2025/10/6/singapore-charges-three-in-390-million-server-fraud-case) and [AsiaOne](https://www.asiaone.com/singapore/singapore-prosecutors-say-us-server-fraud-case-involves-519m-transactions); the Sophgo/TSMC 2.9M-die diversion via [teardown reporting](https://www.indexbox.io/blog/huaweis-ascend-ai-processors-rely-on-foreign-components-teardown-shows/); Hong Kong transshipment signal via [OEC trade data](https://oec.world/en/profile/bilateral-product/memory-integrated-circuits/reporter/chn); hardware-enforcement proposals via [CNAS](https://www.cnas.org/publications/reports/countering-ai-chip-smuggling-has-become-a-national-security-priority).

[^retaliation]: China's rare-earth extraterritorial 0.1% and 50%-affiliate rules via [White & Case](https://www.whitecase.com/insight-alert/china-imposes-extraterritorial-jurisdiction-and-50-rule-export-controls-rare-earth) and [Mayer Brown](https://www.mayerbrown.com/en/insights/publications/2025/10/prc-announces-new-export-controls-on-rare-earth-and-battery-materials-and-technology); the truce to November 2026 via [the European Parliament research service](https://epthinktank.eu/2025/11/24/chinas-rare-earth-export-restrictions/); the NVIDIA antitrust probe via [Asia Times](https://asiatimes.com/2024/12/whats-behind-chinas-nvidia-monopoly-investigation/).

[^effectiveness]: The containment case (10x compute lead, 2 of 22 models on domestic silicon, SMIC 7 nm penalty) and the indigenization case (DeepSeek efficiency, Huawei Ascend ramp, CUDA-to-CANN migration, NVIDIA revenue loss) via [CSIS's DeepSeek/Huawei analysis](https://www.csis.org/analysis/deepseek-huawei-export-controls-and-future-us-china-ai-race) and [WireScreen's compute-intelligence briefing](https://wirescreen.ai/briefings/gpu-ai-compute-intelligence).

[^cpt]: Cost-per-transistor inversion: density ladder (N7 ~90-95, N5 ~137-171, N3E ~292, N2 ~313-335 MTr/mm²) against the wafer-price ladder above; the arithmetic (+~54% wafer cost for +15% density N3E→N2) makes per-transistor cost rise on GAA nodes. Density figures are practical logic densities per [Silicon Analysts](https://siliconanalysts.com/data/wafer-pricing) and node comparisons, not vendor peak claims.

[^euvceiling]: Patel's EUV-throughput ceiling (~70-100 machines/year, ~\$15B downstream per tool) via the [Dwarkesh Podcast summary](https://www.useluminix.com/reports/industry-analysis/understanding-dylan-patel-of-semianalyis-deep-dive-on-ai-compute-scaling-bottlenecks); ASML/consensus counter-view (>120 units by 2030) from the same source.

[^goldenscrew]: The 90%-of-CoWoS/HBM vs 12%-of-logic-wafers split via [Epoch AI](https://epoch.ai/data-insights/ai-chip-supply-chain-constraints) (citing Counterpoint); O'Laughlin's "golden screw" framing via [Fabricated Knowledge](https://www.fabricatedknowledge.com/p/iedm-dtco-and-more-than-moore).

[^china-thesis]: The "good-enough compute" thesis, CloudMatrix 384 power figures (~560 kW vs NVL72's ~145 kW), and China datacenter power (150 TWh in 2023 to 400 TWh+ by 2030) via [SemiconductorX's Huawei/HiSilicon spotlight](https://semiconductorx.com/spotlight-huawei-hisilicon.html) and SemiAnalysis's CloudMatrix analysis (April 2025).

[^bigfund]: Big Fund phases and the 2022 purge via [Grokipedia's Big Fund page](https://grokipedia.com/page/china_integrated_circuit_industry_investment_fund) and [ThinkChina](https://www.thinkchina.sg/technology/five-things-know-about-chinas-scandal-struck-chip-industry-big-fund); Phase 3 targeting and the ~\$140B (RMB 1T) venture fund via [American Affairs](https://americanaffairsjournal.org/2026/02/innovation-under-pressure-chinas-semiconductor-industry-at-a-crossroads/).

[^shadow]: Huawei's shadow-fab network (SZMII, PengXinWei, SwaySure, SiEn; 11 fabs; 70%-by-2028 target) via [DSET's "Uncovering Huawei's Shadow Network"](https://dset.tw/en/research/uncovering-huaweis-shadow-network/) and [DigiTimes](https://www.digitimes.com/news/a20250515PD215/huawei-dram-dongguan-government-shenzhen.html).

[^smic-china]: SMIC N+3 (5 nm-class, SAQP, sub-30% yield, ~50% cost premium, 30-50k wpm advanced capacity) via [TechPowerUp's teardown coverage](https://www.techpowerup.com/344000/chinese-smic-achieves-5-nm-production-on-n-3-node-without-euv-tools) and SemiAnalysis's "Is SMIC N+3's Metal Pitch Smaller than Intel 18A's?" (June 2026, paywalled) as relayed by [Luminix](https://www.useluminix.com/reports/industry-analysis/understanding-dylan-patel-of-semianalyis-deep-dive-on-ai-compute-scaling-bottlenecks). All are estimates.

[^maturenode]: China mature-node capacity (~1.6M eight-inch-equivalent wpm, Hua Hong 109.5% utilization) and the Western pricing-pressure complaints via [Futunn](https://news.futunn.com/en/post/67359471/collective-price-hikes-in-8-inch-wafer-foundry-services-with) and [Yole's power-electronics analysis](https://www.yolegroup.com/press-release/power-electronics-at-a-turning-point/).

[^china-memory]: CXMT ~7.67% DRAM share and ~\$4.1B (RMB 29.5B) IPO via [IndexBox](https://www.indexbox.io/blog/cxmt-launches-landmark-295-billion-yuan-ipo-in-shanghai/) and [Caixin](https://www.caixinglobal.com/2026-06-30/in-profile-the-man-behind-chinas-leading-memory-chipmaker-102459337.html); YMTC ~13% NAND via [Wikipedia](https://en.wikipedia.org/wiki/Yangtze_Memory_Technologies); the Hefei customs anomaly and HBM stockpile/capacity math via [SemiconductorX](https://semiconductorx.com/spotlight-huawei-hisilicon.html).

[^accelerators]: NVIDIA China share 95%→50%, Ascend 910 volumes (805k units, 653k of them 910C) and the 2.9M-die bank via [Oplexa](https://oplexa.com/us-china-chip-war-2026-semiconductor/) and [SemiconductorX](https://semiconductorx.com/spotlight-huawei-hisilicon.html); Cambricon/Biren/MetaX figures via [36Kr](https://eu.36kr.com/en/p/3891948317408131) and a [Reddit-compiled map of Chinese AI-chip firms](https://www.reddit.com/r/LocalLLaMA/comments/1udkxde/7_chinese_companies_are_already_shipping/); DeepSeek-on-CANN via SemiconductorX.

[^ssmb]: SMEE 28 nm DUV delivery and the Steady-State Microbunching EUV prototype via [Grokipedia (SiCarrier)](https://grokipedia.com/page/sicarrier), CSET's [China equipment report](https://cset.georgetown.edu/wp-content/uploads/CSET-Chinas-Progress-in-Semiconductor-Manufacturing-Equipment.pdf), and the Spanish MoD's [analysis of China's lithography breakthrough](https://www.defensa.gob.es/documents/2073105/3095923/IEEE-2026-china-semiconductors-opinion27.pdf/fa233a49-823d-db0a-5551-4fb50660e5a1?t=1772018437241).

[^china-equip]: AMEC 3 nm etch validation and Naura deposition via [CSET](https://cset.georgetown.edu/wp-content/uploads/CSET-Chinas-Progress-in-Semiconductor-Manufacturing-Equipment.pdf); SiCarrier's "Mountain" tools and the Qiyunfang EDA arm via [Grokipedia](https://grokipedia.com/page/sicarrier) and [DigiTimes](https://www.digitimes.com/news/a20251015PD229/sicarrier-eda-software-subsidiary-2025.html); the 50% local-tooling mandate via [American Affairs](https://americanaffairsjournal.org/2026/02/innovation-under-pressure-chinas-semiconductor-industry-at-a-crossroads/).

[^china-materials]: Localization rates (8-inch wafers 55%, 12-inch 10-15%; ArF resist <2%, EUV experimental; specialty gases <5%) via the China-ecosystem research track synthesizing [a supply-chain overview](https://note.com/clever_dill727/n/n1c7fdfaba495?hl=en).

[^china-bottlenecks]: The China bottleneck and internal-complaint lists synthesize the China-ecosystem research track; the 300,000-engineer shortage and idle-DUV-scanner complaints via [American Affairs](https://americanaffairsjournal.org/2026/02/innovation-under-pressure-chinas-semiconductor-industry-at-a-crossroads/) and [EE Times](https://www.eetimes.com/china-invests-billions-to-close-critical-chokepoints/).

[^fabcost]: Fab capex anatomy (\$20-30B, tools 60-80%, construction 25-40%, EUV up to 20%), opex structure (depreciation 40-50%, materials 35-40%, labor 10-15% / under 2% per wafer) via [SemiconductorX fab-ops overview](https://semiconductorx.com/semiconductor-fab-operations-overview.html) and a [Berkeley foundry cost study](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2021/Archive/EECS-2021-205.pdf).

[^arizona]: The 4-5x construction premium (TSMC CFO) vs ~10% finished-wafer gap (TechInsights) via [Noema](https://www.noemamag.com/the-cost-of-deglobalization/) and [SemiWiki's relay of the TechInsights model](https://semiwiki.com/forum/threads/techinsights-tsmcs-true-cost-arizona-versus-taiwan.22410/); the 5-20% geographic premium and \$30k 2 nm wafer via [TechPowerUp](https://www.techpowerup.com/321701/tsmc-to-introduce-location-premium-for-overseas-chip-production) and [SemiWiki](https://semiwiki.com/forum/threads/tsmc-price-hikes-end-the-era-of-cheap-transistors.23731/).

[^time]: Construction-to-production timelines (682 global / 584 Japan / 620 Korea / 736 US) via [CSET's "No Permits, No Fabs"](https://cset.georgetown.edu/wp-content/uploads/CSET-No-Permits-No-Fabs.pdf); the Building Chips in America Act via the [World Economic Forum](https://www.weforum.org/stories/2024/10/building-chips-in-america-act-semiconductor-industry/); the >8,200-project, five-year interconnection queue via [Lawrence Berkeley National Lab](https://emp.lbl.gov/queues).

[^subsidies]: The subsidy scoreboard: Intel equity stake via [Intel's 8-K](https://www.intc.com/filings-reports/all-sec-filings/content/0000050863-25-000129/0000050863-25-000129.pdf) and [CSIS](https://www.csis.org/analysis/too-good-lose-americas-stake-intel); NSTC/Natcast reclamation via [DLA Piper](https://www.dlapiper.com/insights/publications/2026/04/chips-r-and-d-office-reshapes-pathways-for-semiconductor-r-and-d-and-investment); Micron Hiroshima via [TrendForce](https://www.trendforce.com/news/2025/09/19/news-japan-pledged-jpy-536-billion-to-micron-escalating-global-semiconductor-subsidy-race/); ESMC via the [European Commission](https://ec.europa.eu/commission/presscorner/detail/en/ip_24_4287); India Dholera via [India Briefing](https://www.india-briefing.com/news/setting-up-a-semiconductor-fabrication-plant-in-india-what-foreign-investors-should-know-22009.html/); the Saudi Alat reversal via [Middle East Online](https://middle-east-online.com/en/saudi-arabia%E2%80%99s-100-billion-electronics-fund-removes-ceo).

[^talent]: The 157,000-worker US shortfall via [a McKinsey/CHIPS study relay](https://finance.biggo.com/news/01e8036d-7aa4-4d70-a7c9-6ada62768206); wage comparisons via [SalaryExpert](https://www.salaryexpert.com/salary/job/semiconductor-engineer/taiwan) and [The Storm Media on the Kosen system](https://world.storm.mg/articles/1136437); the TSMC Arizona 50%-imported-workforce friction via [TrendForce](https://www.trendforce.com/news/2025/03/04/news-tsmcs-100b-u-s-bet-six-big-questions-behind-the-largest-foreign-investment-in-u-s-history/).

[^resources]: Fab water use (10-20M gallons/day), Taiwan's 2021 drought (Baoshan at 7%), and TSMC's 88.1% recycling vs Samsung/SK Hynix 40-47% via [SemiconductorX](https://semiconductorx.com/fab-water.html) and [BigGo](https://finance.biggo.com/news/aeb3cb8a-2786-496d-8057-abb5f7fe2d81); fab power (400-600 MW) and grid fragility via [SemiconductorX fab-power](https://semiconductorx.com/fab-power.html) and [GridReadiness](https://www.gridreadiness.com/blog/semiconductor-fabs-power-infrastructure-europe.html).

[^histintro]: The learning-by-doing cost-decline range (20-28% per doubling) and the conditioning-variables framing via the NBER/PIIE literature: [Goldberg et al.](https://www.nber.org/papers/w32651) and [PIIE Working Paper 24-3](https://www.piie.com/sites/default/files/2024-08/wp24-3.pdf).

[^ushist]: Defense/Apollo procurement and the 1956 AT&T consent decree (7,820 patents, ~\$5.7B follow-on value) via [Yale's antitrust-and-innovation study](https://economics.yale.edu/sites/default/files/how_antitrust_enforcement.pdf) and the [National Academies history](https://www.ncbi.nlm.nih.gov/books/NBK208682/).

[^japanhist]: The VLSI consortium, the 1986 Semiconductor Trade Agreement "price umbrella," and Japan's decline via [Baldwin-Krugman and Dick's models as summarized](https://www.nber.org/system/files/chapters/c8703/c8703.pdf) and a [DRAM-war retrospective](https://en.eeworld.com.cn/mp/Icbank/a41413.jspx).

[^koreahist]: The chaebol counter-cyclical model and "truncated upgrading" via [a study of Korea's chaebol-centered strategy](https://www.researchgate.net/publication/391755361_The_Limitations_of_South_Korea's_Government-Led_Chaebol-Centered_Development_Strategy) and [DRUID Working Paper 98-16](https://research-api.cbs.dk/ws/portalfiles/portal/59036057/DRUID_Working_Paper_No._98_16.pdf).

[^taiwanhist]: ITRI, the RCA transfer, the pure-play foundry model and Hsinchu agglomeration via [ECIPE's "What Europe Can Learn from Taiwan"](https://ecipe.org/publications/what-europe-can-learn-from-taiwans-industrial-strategy/) and [Taiwan's R&D-consortia study](https://www.researchgate.net/publication/228393203_Accelerated_Technology_Diffusion_Through_Collaboration_The_Case_of_Taiwan's_RD_Consortia).

[^eurohist]: Europe's decline, the forced-collaboration critique, the Crolles collapse, the 2013 target failure, and ASML's modular exception via [the Luiss "Silicon Dream" working paper](https://sog.luiss.it/sites/sog.luiss.it/files/zaccagnini%20Semiconductors_Digital_Geopolitcs%20Project_170424_Draft_AC_IZ_AC.pdf) and [Works in Progress on ASML](https://worksinprogress.co/issue/the-worlds-most-complex-machine/).

[^sematech]: Irwin and Klenow's Sematech evaluation (commitment vs sharing hypotheses, ~\$300M/year R&D reduction) via [their JIE paper](http://klenow.com/JIESematech.pdf) and [PNAS "Sematech: Purpose and Performance"](https://www.pnas.org/doi/10.1073/pnas.93.23.12739).

[^chinahist]: The HSMC Wuhan (~\$19B) fraud and Tsinghua Unigroup collapse via [a Stanford EE292P summary](https://medium.com/@hnvr/week-1-ee-292p-atoms-bits-and-the-national-interest-the-technology-environment-330251972069).

[^smallhist]: GlobalFoundries/Mubadala via [Wikipedia](https://en.wikipedia.org/wiki/GlobalFoundries) and [Wharton](https://knowledge.wharton.upenn.edu/article/silicon-wafers-and-semiconductors-a-new-black-gold-for-abu-dhabi/); Israel's Banias/Centrino turn via a [PhD thesis on the "right turn"](http://www.fedoa.unina.it/13259/1/PhDThesisPipicelliFinal.pdf); Penang OSAT via the [Penang Institute](https://penanginstitute.org/publications/issues/penang-economic-outlook-2026-2/); India's Mohali fire via [Organiser](https://organiser.org/2025/08/16/308483/bharat/how-the-1989-mohali-fire-and-decades-of-political-neglect-crushed-semiconductor-dreams-of-bharat/); Russia's Angstrem-T bankruptcy via [Grokipedia](https://grokipedia.com/page/Angstrem_(company)).

[^histfailure]: The recurring-failure-mode synthesis and the strongest evaluations (Irwin-Klenow 1996, Baldwin-Krugman 1988, Dick 1991, Chang 1992, Bown 2020) are gathered in the industrial-policy research track; anchor surveys are [the NBER global-semiconductor-policy paper](https://www.nber.org/papers/w32651) and [PIIE WP 24-3](https://www.piie.com/sites/default/files/2024-08/wp24-3.pdf).

[^powerwall]: The 150 GW-by-2030 and 40 GW-behind-the-meter-by-2028 projections via SemiAnalysis (partly paywalled) as relayed by [AI Weekly](https://aiweekly.co/alerts/semianalysis-40gw-of-behind-the-meter-us-datacenters-by-2028) and [the Dwarkesh Podcast summary](https://www.useluminix.com/reports/industry-analysis/understanding-dylan-patel-of-semianalyis-deep-dive-on-ai-compute-scaling-bottlenecks).

[^forensic]: The Ascend 910C teardown (2020 TSMC dies, stockpiled HBM2E) via [TechInsights, relayed by SemiWiki](https://semiwiki.com/forum/threads/techinsights-teardown-huawei-ascend-910c-still-contains-cpu-dies-from-tsmc-from-2020.23737/); Nystedt's TSMC figures via [AsiaOne/Reuters](https://www.asiaone.com/asia/tsmc-seen-riding-ai-boom-fifth-straight-quarter-record-profit) and the CoWoS gap-narrowing via [TrendForce](https://www.trendforce.com/news/2026/06/15/news-tsmc-cowos-supply-demand-gap-reportedly-seen-narrowing-from-20-to-10-by-end-2026-as-capacity-expands/); the legal "silicon shield" via [Tom's Hardware](https://www.tomshardware.com/tech-industry/taiwan-ready-to-discuss-2nm-transfer-to-u-s-following-trumps-comments).

[^yieldtax]: The pre-assembly screening limits and the no-rework constraint are industry consensus, per the packaging research track; the attackers via [proteanTecs](https://www.proteantecs.com/) (on-die telemetry), [PDF Solutions](https://www.pdf.com/) and [Synopsys silicon lifecycle management](https://www.synopsys.com/solutions/silicon-lifecycle-management.html) (test analytics), and [Aehr Test Systems](https://www.aehr.com/) (wafer-level burn-in).

[^cxmt-sa]: All CXMT-anatomy figures (Qimonda lineage and patents, capacity and HBM ramp models, yield and cost-per-bit estimates, IPO structure and valuation floor, 1Q26 financials, the big three's 1Q26 DRAM operating margins, and the 2026-2028 undersupply model) via the free portion of [SemiAnalysis, "China's CXMT Is Set to Challenge DRAM Incumbents", July 2026](https://newsletter.semianalysis.com/p/chinas-cxmt-is-set-to-challenge-dram).

[^fubon]: Fubon Research, "2027 semiconductor outlook" sector snapshot (Sherman Shang and Daniel Yang, July 28, 2026): the CoWoS capacity and allocation revisions, HBM4 per-GB pricing and Rubin price estimate, the Kyber/Rubin Ultra cancellation and NPO/CPO rack candidates, KYEC's guidance cut, and the Google TPU / Intel EMIB capacity checks. Private sell-side note, no public link.

[^sipearl]: SiPearl Rhea1 specs and tape-out via [The Register](https://www.theregister.com/2025/07/09/sipearl_rhea1_tape_out/) and [Tom's Hardware](https://www.tomshardware.com/pc-components/cpus/sipearls-long-awaited-rhea-cpu-finally-gets-in-the-lab-opening-the-door-for-europes-first-sovereign-hpc-cpu-availability-of-rhea1-is-scheduled-for-end-of-2026-sipearl-vp-says-following-long-development-process); the ~\$140M (€130M) Series A and JUPITER role via [DataCenterDynamics](https://www.datacenterdynamics.com/en/news/sipearl-closes-130m-series-a-financing-round-announces-tape-out-of-rhea1-processor/).

[^vsora]: Vsora's \$46M round via [GlobeNewswire](https://www.globenewswire.com/news-release/2025/04/29/3070480/0/en/VSORA-Raises-46-Million-to-Bring-World-s-Most-Powerful-AI-Inference-Chip-to-Market.html); Jotunn8 tape-out on TSMC 5 nm with GUC design support via [EE Times](https://www.eetimes.com/vsora-tapes-out-ai-inference-chip-for-data-centers/) and [Vsora](https://vsora.com/vsora-announces-tape-out-of-game-changing-inference-chip-putting-europe-at-the-forefront-of-data-center-ai/); Sandra Rivera as board chair via [EE Times](https://www.eetimes.com/former-altera-ceo-rivera-joins-french-ai-chip-startup-vsora/).
