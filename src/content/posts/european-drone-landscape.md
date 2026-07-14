---
title: War Drones, 2026: EU and worldwide landscape
thumbnail: An interactive map of Europe's 2026 drone wave, plus the technical fights that decide it: the twilight gap, GPS-denied guidance, and the AI chips small drones can carry.
date: 2026-07-11
type: blog
url: european-drone-landscape
---

> **Warning: this is AI-generated.** The value in the article below is not concision and density of ideas, but the exhaustiveness of the result, which is an aggregation of over 20 deep researches, and the human guidance given to the aggregator agent toward concision and signal.

In 2025, European defense, security and resilience startups raised a record \$8.7B in venture capital, up 55% year over year, with drones the single sector winning the most public procurement.[^dsr] That \$8.7B is a broad "defence, security and resilience" figure; on a narrower defence-tech measure Europe raised \$2.48B in 2025 against the United States' \$14.2B, part of a global total near \$50B.[^globalvc] A handful of companies that barely existed in 2021 are now worth more than the incumbents they were built to feed. This article maps that landscape.

<iframe src="/assets/images/european-drone-landscape/chart-funding.html" height="480" title="Defence-tech VC funding, US versus Europe, 2024 to 2025"></iframe>

## Part I: Who's building what in Europe

<iframe src="/assets/images/european-drone-landscape/map-europe.html" height="560" title="Interactive map of European drone startups"></iframe>

The dashed rings mark the ecosystem's physical centers, hover them: Munich (Europe's number-one hub, \$1.7B of 2025 VC), Kyiv's Brave1 battle-lab, Poland's "Aviation Valley" around Rzeszów with its Jasionka gateway into Ukraine, Toulouse's Aerospace Valley, the Paris DGA orbit, the Swiss commercial cluster around Zurich, Odense's 1,900 km² test airspace, the Baltic edge at Tallinn-Tartu, and the UK's build-out at Swindon.

I've kept the legacy primes off the map. Airbus, Thales, Leonardo, Saab, Rheinmetall, BAE, and older specialists like France's veteran [Parrot (founded 1994)](https://en.wikipedia.org/wiki/Parrot_SA) or Poland's [WB Group (1997)](https://en.wikipedia.org/wiki/WB_Group), matter enormously to this story, but probably not as innovators.
Why? 10-year V-shaped development process, and the slow ossification of decade-old dominant positions into narrow-minded despisal of innovation.
For instance, Rheinmetall's CEO Armin Papperger [said](https://dronexl.co/2026/03/31/rheinmetall-ceo-papperger-ukraine-drones-housewives-lego/) "what is Ukraine's innovation? That's playing with Legos", in March 2026 (!).

Where they show up, it's as buyers, funders and acquirers of the startups. Rheinmetall building [Kraken's boats](https://defence-blog.com/british-drone-boat-firm-raises-175m-at-1b-valuation/) and running a joint venture with [Auterion](https://www.rheinmetall.com/en/media/news-watch/news/2024/12/2024-12-09-rheinmetall-and-auterion-are-working-together-on-drone-technology) and [Destinus](https://www.aerotime.aero/articles/rheinmetall-destinus-cruise-missile-joint-venture), BAE owning [Malloy](https://www.janes.com/osint-insights/defence-news/air/bae-systems-acquires-uk-quadcopter-manufacturer-malloy-aeronautics), Thales [buying Exail](https://www.defensenews.com/global/europe/2026/07/06/thales-to-buy-french-underwater-drone-maker-exail-in-45-billion-deal/), EOS [buying MARSS](https://eos-aus.com/news/acquisition-of-marss-counter-drone-c2-system-provider/), Saab [investing in Comand AI](https://www.saab.com/newsroom/press-releases/2026/saab-invests-in-comand-ai-to-strengthen-european-defence-sector), Dassault [anchoring Harmattan](https://sifted.eu/articles/harmattan-ai-200m-series-b-unicorn).

### The neo-primes

A distinct tier has emerged that the venture people call "neo-primes": vertically integrated companies building hardware, autonomy and software together, explicitly modeled on America's Anduril, these are:

| Company | HQ, founded | Valuation | Products | Traction |
|---|---|---|---|---|
| [Helsing](https://en.wikipedia.org/wiki/Helsing_(company)) | Munich, 2021 | ~€1.37B raised; [\$1.2B round at ~\$18B](https://techcrunch.com/2026/05/11/daniel-ek-backed-defense-tech-helsing-to-raise-1-2b-at-18b-valuation/) reported, unconfirmed | Altra recce-strike software, Cirra EW, [HX-2](https://helsing.ai/hx-2) 12 kg loitering munition, SG-1 Fathom glider, CA-1 Europa jet (2027) | [€268M Bundeswehr HX-2 contract](https://dronexl.co/2026/02/25/germany-helsing-stark-kamikaze-drone-deal/); [Centaur autopilot flew a Saab Gripen E](https://www.technologyreview.com/2026/01/06/1129737/autonomous-warfare-europe-drones-defense-automated-kill-chains/) |
| Quantum Systems | Gilching (Munich), 2015 | ~\$8B after a [\$1.2B Series D](https://www.cnbc.com/2026/07/02/autonomous-defense-startup-quantum-systems.html) (Blackstone, Airbus, Advent) | Vector electric-VTOL ISR | ~€300M 2025 revenue, [reportedly profitable](https://thenextweb.com/news/quantum-systems-1-2bn-series-d-8bn-valuation); claims 19,000+ Ukraine missions in 2025 |
| Stark | Berlin, 2024 | [>€3.5B](https://thenextweb.com/news/stark-defence-500-million-sequoia-founders-fund-3-5-billion-valuation) | OWE-V Virtus loitering munition | €268M Bundeswehr contract |
| Tekever | Lisbon, 2001 | [>£1B](https://tech.eu/2025/05/06/tekever-becomes-the-latest-unicorn-in-europes-defencetech-industry/) | AR3 maritime-ISR fixed-wing | 10,000+ combat hours over Ukraine; [RAF StormShroud](https://www.raf.mod.uk/news/articles/stormshroud-arrival-marks-the-future-of-uk-air-combat-power/) (~£19M order in a £400M program) |
| Harmattan AI | Paris, 2024 | [\$1.4B after a \$200M round](https://sifted.eu/articles/harmattan-ai-200m-series-b-unicorn) anchored by Dassault | Sonora micro-drone, strike/FPV | DGA orders: [1,000 combat drones (2025)](https://www.uasvision.com/2025/07/09/france-orders-1000-ai-enabled-combat-drones/), [5,000 Sonora (2026)](https://www.defense.gouv.fr/dga/actualites/dga-commande-5-000-drones-du-combattant-delco-larmee-terre), France's largest single-type buys |

- **Helsing** (founded by Torsten Reil, Gundbert Scherf and Niklas Köhler, and bankrolled from day one by Spotify's Daniel Ek, whose Prima Materia led its biggest rounds) is the thesis that modern war is a software problem and the drone is just where you deploy the model: it began as pure battlefield AI, then integrated aggressively downward into hardware (buying [Grob Aircraft](https://helsing.ai/newsroom/helsing-acquires-grob-aircraft-to-accelerate-innovation-in-aerospace-and-defence) to own its manufacturing). That thesis took a public bruise in January 2026, when Bloomberg reported Russian electronic warfare had compromised HX-2 in Ukraine and that Germany and Ukraine had paused orders; Helsing disputed it, and the Bundeswehr signed a month later.[^helsing-ew] Even the best-funded European autonomy is being beaten by the electromagnetic reality of the front, which is why the GPS-denied navigation problem below is not academic. Beyond drones it holds a ~€580M German contract to develop the Combat Fighter System Nucleus, and its cap table is deliberately engineered to stay ~80% European-owned through the US-led ~\$18B round, sovereignty as a fundraising constraint.[^programs]
- **Quantum Systems** (founded by ex-army pilot Florian Seibel) is the same Anduril-style roll-up run from the ISR side, having [bought its autonomy layer (Spleenlab)](https://dronelife.com/2025/10/21/quantum-systems-acquires-german-ai-company-spleenlab/), its propulsion (Hacker Motor) and Nordic Unmanned's UK arm, and it is the cohort's rare case of real, profitable revenue. Helsing and Quantum together are why Munich is Europe's number-one defense-tech hub, with roughly 43% of the city's 2025 defense VC going to a single company.[^munich]
- **Stark** went from founding to unicorn-times-three in about two and a half years and is the purest expression of the "fund the factory, not the demo" logic, covered in the next section. Its founder web says a lot about the scene: co-founded by Quantum's own Florian Seibel with Johannes Schaback and Project A's Uwe Horstmann (now CEO), with [Peter Thiel holding a single-digit stake](https://en.wikipedia.org/wiki/STARK), Munich's two biggest drone firms share a parent.
- **Tekever** (led by CEO Ricardo Mendes) is the incumbent-as-partner pattern: the RAF's StormShroud electronic-attack drone is a Tekever airframe carrying a [Leonardo BriteStorm jamming payload](https://uk.leonardo.com/en/news-and-stories-detail/-/detail/raf-stormshroud-equipped-with-leonardo-britestorm-ew-payload). It [extended its Series B by \$526M at \$1.33B](https://unicorns.pt/company/tekever/timeline/2025-unicorn-status-series-b-extension-overmatch) in May 2026 (60% yearly growth, profitable) and is industrialising in place: a £400M UK "OVERMATCH" program with a Swindon factory on the historic Spitfire site, plus €100M into France.
- **Harmattan AI** is France's first defense unicorn, co-founded by [polytechnicien Mouad M'Ghari](https://www.polytechnique.edu/actualites/harmattan-ai-co-fondee-par-mouad-mghari-x20-premiere-licorne-francaise-de-defense-tech), and the Dassault anchor plugs it straight into the Rafale and future-combat-drone roadmap.

### The German strike-drone program: fund the factory, not the demo

Germany's procurement, in November 2025 it [announced loitering-munition awards](https://dronexl.co/2025/11/03/germany-awards-950m-drone-contract/) worth up to €900M, roughly €300M each, split across Stark, Helsing and Rheinmetall for on the order of 12,000 one-way attack drones. On 25 February 2026 the Bundestag's budget committee [approved base contracts of €268M (\$316M) each](https://dronexl.co/2026/02/25/germany-helsing-stark-kamikaze-drone-deal/) to Stark (for Virtus) and Helsing (for HX-2), about €540M split evenly, with a comparable Rheinmetall contract following, as the first tranche of a [strike-drone plan that could reach roughly €9B](https://turdef.com/article/germany-launches-9b-strike-drone-shift-led-by-startups) over several years.[^germany] (Within that broad figure, the specific medium-range framework was itself [trimmed from €4.3B to about €2B](https://dronexl.co/2026/02/25/germany-helsing-stark-kamikaze-drone-deal/), roughly €1B each for Helsing and Stark.) The drones are meant to give Germany's brigade permanently stationed in Lithuania organic precision strike from 2027.

Germany deliberately treated three competitors, two startups and one prime, as equals, a conscious pivot toward the startups after decades of sole-sourcing to Rheinmetall.

At live-fire trials in late 2025 (the UK-led Haraka Storm in Kenya, and the Bundeswehr's own at Munster) [Stark's €135k Virtus missed every target](https://www.defensenews.com/global/europe/2026/02/26/once-reluctant-germany-goes-big-on-one-way-attack-drones/), deviating 150 m or crashing, with its battery catching fire on impact, and Germany placed the order anyway. Weeks later the Bundeswehr's inspector general cited [>90% hit probability](https://militarnyi.com/en/news/drone-startup-stark-clarifies-reports-on-uk-and-german-army-trials/) for the same drone in tightly controlled tests at Altmark. Both can be true, it matures quickly.

Helsing's [HX-2](https://helsing.ai/hx-2) (€54k, X-wing, 100 km, onboard AI targeting) ran the same arc in reverse and in public: a leaked November 2025 Bundeswehr assessment, surfaced by Bloomberg, found only [25% of HX-2s launched successfully](https://united24media.com/latest-news/ukraine-halts-german-hx-2-drone-orders-after-battlefield-failures-bloomberg-reveals-15137) in one Ukrainian regiment's hands, with catapult defects, missing AI tools and electronic-warfare vulnerability. Helsing disputed the figure, iterated over the air, and by June 2026 the fixed HX-2 scored [15 hits in 17 launches](https://turdef.com/article/germany-launches-9b-strike-drone-shift-led-by-startups) at the [US Project Flytrap exercise in Lithuania](https://united24media.com/world/ukraine-proven-helsing-hx-2-drone-gets-us-army-trial-run-in-lithuania-hitting-target-after-target-19762) and was back [striking Russian logistics across the Sea of Azov](https://aerospaceglobalnews.com/news/ukraine-strikes-russian-vessels-sea-azov/). The German parliament, decided a hack to allow buying beta hardware: a [*Maßgabebeschluss*](https://www.grosswald.org/signal-no-2-bundestag-loitering-munition-control-by-instalment-25-february-2026/) that caps each firm's callable orders at €1B, forcing fresh parliamentary consent (and a six-month maturity report) before the framework opens further. "Fund the factory, not the demo," allowing the product to mature at the customer. (The drones equip Germany's 45th Panzer Brigade in Lithuania, 4,800 soldiers at full strength in 2027, now training with 350 drones toward up to 500 long-range strike drones by 2029.[^programs])

Germany is not the only state writing cheques:

- The **UK** published its [Defence Investment Plan](https://www.gov.uk/government/news/uk-drone-transformation-to-strengthen-armed-forces-backed-by-more-than-5-billion) in June 2026: over £5B for uncrewed systems to 2030, a target force mix of 20% manned armour / 40% ground robots / 40% attritable drones and missiles, and named programs: [ASGARD (£370M), NYX (£220M) and Corvus (£310M)](https://www.thedroneoffice.com/post/5bn-to-accelerate-autonomous-and-uncrewed-systems-in-the-uk-defence-investment-plan), respectively AI battle management that cut a corps planning cycle from 72 hours to 60 minutes, up to 24 armed autonomous drones teaming with Apaches by 2030, and the Watchkeeper replacement. The plan explicitly anticipates weapons that select targets without a human authorizing each strike, on the Ukrainian logic that a drone that must call home before each shot is a vulnerable drone.[^programs]
- The **US** dissolved Replicator at end-2025 (hardware-first, no budget line) and folded it into a Defense Autonomous Warfare Group whose budget request exploded from \$226M to ~\$54.6B for FY2027, most of it a flexible five-year "reconciliation pot" for buying software incrementally.[^programs]
- **Türkiye**, vetoed out of the EU's SAFE loans by Greece and Cyprus, answered with its own \$5B "HIT" defence-technology fund in July 2026.[^programs]
- Under it all sits the venture machinery: the **NATO Innovation Fund** (€1B, 24 nations) has become a kingmaker (lead investor in Stark's €500M round, Uforce, Uplift360), NATO's DIANA accelerator hands out up to €400k non-dilutive with access to 200+ allied test centres, and the EU's EDIP (€1.47B) and ~€800B ReArm envelope frame the demand side.[^programs]

### Critical parts of the value chain

The airframe is the commoditizing part; the defensible value is migrating to the layers above and below it.

**Autonomy software** is the highest-value layer, and **Auterion** (Zurich, 2017) is its clearest European play. Founded by Lorenz Meier, who created the open-source PX4 autopilot the whole industry runs on, it sells AuterionOS (the "Android of drones," letting one operator coordinate a mixed-vendor fleet) and Skynode (an autopilot-plus-AI-mission-computer "strike kit" that converts a manually piloted drone into an [autonomous one that resists jamming](https://breakingdefense.com/2024/06/skynode-s-auterion-autonomy-kit-lets-attack-drones-fly-through-jamming/) and tracks moving targets). The traction is real: a [\$50M Pentagon contract to put 33,000 Skynode strike kits](https://dronelife.com/2025/07/29/auterion-wins-50m-pentagon-contract-to-deliver-33000-ai%E2%80%91driven-drone-strike-kits-to-ukraine/) on Ukrainian drones, a more-than-tenfold scale-up over its prior volumes, and it is now [cash-flow positive on a ~\$100M run-rate](https://resiliencemedia.co/auterion-raises-130m-on-a-valuation-north-of-600m-to-swarm-the-drone-market/). The lesson is that whoever owns the operating system captures value across every airframe that runs it, exactly as Android did to phone makers; its Airlogix joint venture, set up to mass-produce strike systems in Germany, promptly [won a German order for thousands of them](https://auterion.com/auterion-airlogix-joint-venture-receives-first-contract-from-germany/).

**Components** are Europe's real weakness. The honest answer to "who supplies the parts" is still, overwhelmingly, China: roughly [75% of global lithium-ion battery production](https://01.co/research/americas-achilles-heel-battery-cells-drones), plus the motors, propellers and FPV cameras a first-person-view drone is made of. A European-built FPV drone can cost around €20,000 against roughly €200 for the Chinese equivalent.[^fpv] That two-orders-of-magnitude gap, more than any funding round, is what stands between Europe and drone mass.

### The Ukrainian battle-lab and the factory migration

Ukraine is simultaneously the demand, the testing ground and increasingly the supply, having gone from fewer than ten drone makers before 2022 to [more than 500](https://techukraine.org/2026/02/16/sky-high-ambitions-10-ukrainian-drone-factories-to-scale-across-europe-by-2026/) by 2026, with production climbing from ~2.2 million units in 2024 to ~4.5 million in 2025 and a 7-million target for 2026.[^ukraine] What makes it work is the procurement mechanism, not just the volume. Through the Brave1 cluster and the [DOT-Chain marketplace](https://scroll.media/en/2025/07/07/ukraine-launches-weapons-marketplace/), unit commanders buy directly: they upload strike videos to the Delta system, verified kills convert into ["e-Points,"](https://mod.gov.ua/en/news/how-the-military-can-obtain-equipment-through-dot-chain-defence-under-the-army-of-drones-bonus-program-step-by-step-guide) and those credits are spent on the drones that actually work, collapsing delivery from months to about ten days and instantly starving any maker whose product fails under jamming. It is the most Darwinian procurement loop in the world, and it is why NATO primes with 10-to-18-year cycles (Britain's Watchkeeper is the cautionary tale) are now trying to copy the "problem statement, not spec sheet" approach. The people running it are as unorthodox as the mechanism: the Unmanned Systems Forces are commanded by Robert Brovdi, callsign "Magyar," a grain trader before 2022, and Fire Point is run by production chief Iryna Terekh, an architect by training.[^ukraine] The same loop keeps spinning out specialists: [Farsight Vision](https://techukraine.org/2026/02/12/farsight-vision-secures-e7-2m-to-build-ultimate-uav-autonomy-stack-axon-and-smartcap-lead-the-charge/) (drone video into live 3D tactical maps), Buntar Aerospace (ISR software), Himera (jam-resistant radios) and Ailand Systems (autonomous mine detection).

<iframe src="/assets/images/european-drone-landscape/chart-production.html" height="470" title="Ukraine drone production per year, 2024 to 2026 target"></iframe>

The 2026 development to watch is the reverse flow: Ukrainian makers are opening factories inside the EU and merging into Western holdings, funded largely by the "Danish model," in which Denmark (then the Netherlands, Estonia, Canada) pays directly into Ukrainian makers' order books rather than donating old stock. [Skyeton](https://thedefender.media/en/2025/06/skyeton-production-in-eu/) builds its record-endurance Raybird in Slovakia; Ukrspecsystems is [opening a UK plant](https://defensemirror.com/news/40181/Ukrainian_Drone_Maker_Ukrspecsystems_to_Build___200M_Factory_in_U_K_); Fire Point is [building in Denmark](https://techukraine.org/2026/02/16/sky-high-ambitions-10-ukrainian-drone-factories-to-scale-across-europe-by-2026/); London's [Uforce](https://raising.fi/news/uforce-seed-march-2026) merged nine Ukrainian developers into one Western-facing company; and Swarmer, a swarm-AI startup, [listed on the Nasdaq](https://therecursive.com/swarmer-ipo-nasdaq-drone-ai-startup/) in March 2026 and spiked ~520% on day one to a ~\$500M cap on about \$220k of revenue, a clean little emblem of how far the narrative runs ahead of the fundamentals.

The famous traction numbers are mostly self-reported: Fire Point's claim to ~60% of Ukraine's long-range strikes is a company statement (and the firm was under a [NABU anti-corruption probe](https://www.kyivpost.com/post/75228) from late 2025, which it denies), and Ukrspecsystems' ["~80% of HIMARS guidance"](https://ukrspecsystems.com/blog/another-pd-2-is-heading-out-on-a-hunt-for-himars) is essentially unverifiable and ignores rival platforms and NATO intelligence.

The sovereignty is thinner than it looks: roughly [89% of Ukrainian drone makers still depend on Chinese components](https://www.rusi.org/explore-our-research/publications/commentary/drones-win-battles-components-win-wars), the same dependency that shadows Europe.

### The commercial survivors

Of the ~\$3.86B in global drone-specific funding in 2025, roughly 77% went to dual-use companies and only 23% to purely commercial ones.[^dii] Two commercial patterns survive.

**Delivery** has one genuine scaling story in **[Manna](https://www.businesswire.com/news/home/20260310714366/en/Manna-Air-Delivery-Raises-%2450Million-Series-B-as-It-Announces-Plans-to-Expand-in-the-United-States)** (Dublin, led by ex-CarTrawler CTO Bobby Healy), which claims per-flight profitability and 250,000+ deliveries with an operating model of one pilot per ~20 aircraft. In [June 2026](https://techcrunch.com/2026/07/08/autonomous-drone-delivery-startup-manna-plots-major-u-s-expansion/), it pulled all Irish operations not because the drones failed but because local councils refused planning permission for its launch pads after resident complaints, which is why Manna is redeploying to Texas and the UK. The middle-mile plays (Bulgaria's Dronamics with its [350 kg / 2,500 km Black Swan](https://www.dronamics.com/theblackswan), Germany's [Wingcopter on medical logistics](https://en.wikipedia.org/wiki/Wingcopter)) avoid the suburban-nuisance problem entirely by flying between depots and clinics rather than into back gardens.

**Industrial inspection and mapping** is quit emature:

- **Flyability**: [collision-tolerant caged drones](https://www.flyability.com/) for the insides of boilers and nuclear vaults
- **Wingtra**: [centimetre-accurate survey and mapping drones](https://wingtra.com/surveying-gis/drone-survey-accuracy/)
- **Verity**: [GPS-free warehouse-inventory swarms](https://www.supplychaindive.com/news/Maersk-verity-drones-warehouse-management/628296/) flying in the dark for IKEA and Maersk
- **Voliro**: [contact-inspection drones](https://voliro.com/blog/best-inspection-drones/) that press ultrasonic probes against pipelines
- **Dronehub**: [drone-in-a-box rail inspection](https://dronehub.ai/blog/top-european-drone-companies) across Deutsche Bahn's 33,000 km network

These companies are worth watching for a non-obvious reason: they solved GPS-free autonomy and precision perception for commercial reasons years before the military needed it, and that expertise (Verity's SLAM, Spleenlab's certified vision, now folded into Quantum Systems) is exactly what the defense side is now scrambling to buy.

On regulation : the one place regulation genuinely shapes a product is: EASA's SORA regime made airborne safety hardware a prerequisite for flying over people. That single rule created a real business for France's [Dronavia](https://www.dronavia.com/flight-termination-system-fts/), which sells the parachutes and flight-termination systems that let a commercial drone clear certification. The machinery keeps tightening: SORA 2.5 pushed many operations into a higher assurance class requiring EASA-assessed design verification, the Light UAS Operator Certificate lets mature operators self-authorize flights EU-wide, and the U-space traffic-management framework is pivoting from strategic to tactical deconfliction.[^programs] The traffic-management software layer itself turned out to be a terrible business: the UK flagship Altitude Angel went insolvent in October 2025 (its IP bought by Indra), leaving Unifly, Droniq and ANRA, holder of the first EASA traffic-service certificate, as the survivors.[^programs] (The one funding mechanism with teeth is the EU's [SAFE instrument's 35%-cap](https://ec.europa.eu/commission/presscorner/detail/en/ip_26_211) on non-European component content, precisely because it pushes buyers toward the European supply chain the components section is about.)

---

## Part II: The other battlefields, counter-drone, ground and sea


### The kill zone: a lethal belt kilometres deep

Artillery and air strikes alway deepened the front; what is new is a continuous, precise drone belt where almost anything that moves in daylight is seen and struck within minutes, and it keeps deepening.[^killzone]

<iframe src="/assets/images/european-drone-landscape/chart-killzone-depth.html" height="440" title="Growth of the drone kill-zone depth, 2025 to 2026"></iframe>

On top of depth, weapon systems have also been upended by drones:

<iframe src="/assets/images/european-drone-landscape/chart-casualty-shift.html" height="460" title="Share of battlefield losses by cause, before drones versus 2026"></iframe>

The huge lethality of drones has deeply changed warfare. Manned trucks and armour can no longer operate near the front; both sides push resupply and casualty evacuation onto ground robots, and soldiers rotate on foot (sometimes walking 20 km) because any vehicle or grouping is a target. With an estimated 25 to 50 reconnaissance and strike drones loitering over every 10 km of front, whatever is detected is targeted.[^killzone] Continuous trenches have given way to dispersed two-to-four-person hide positions that act as sensors and triggers rather than firing lines, since a thermal drone finds even a two-man position; Russia's mirror adaptation is the infiltration assault, two-to-three-man teams on motorcycles and quads threading the zone through fog and riverbeds, at an estimated 60-70% attrition before they even reach the first Ukrainian line.[^killzone] And much of the striking is now done by heavy "Baba Yaga" night bombers, converted agricultural octocopters (Aerorozvidka's R18, the Vampire) that drop mortar rounds and air-lay anti-tank mines onto resupply roads, and that double as motherships, carrying a Starlink terminal and directional antennas aloft to relay swarms of short-range FPVs deep into the enemy rear.[^killzone]

### Counter-drone: killing drones cheaply

Counter-drone is the fastest-emerging niche.[^cuas] The brutal arithmetic: a Patriot PAC-3 interceptor [costs \$3.7-5.2M](https://www.researchgate.net/publication/401707891_Cost-Effectiveness_Analysis_of_Counter-Unmanned_Aircraft_Systems_Technologies_A_Comparative_Study_of_Kinetic_Electronic_Warfare_and_Directed_Energy_Countermeasures_2022-2026) to kill a ~\$35k Shahed, a cost-exchange of 100-to-150-to-one *in the attacker's favour*, and Russia now [launches more than 5,000 Shaheds](https://medium.com/illumination/the-economics-of-russias-chinese-supply-chain-2b172ce28ae7) in a single month. You cannot win that trade with missiles, so the whole field has pivoted to cheap kinetic kill: interceptor drones that ram or fragment the target for a few thousand dollars. The verified results are real, not vendor hype: Ukraine's interceptor drones reached a ~68% success rate against Russian drones by late 2025 (Zelensky's figure), commander-in-chief Syrskyi said they accounted for over 70% of Shahed kills over Kyiv, elite AI-automated units around Kharkiv have [demonstrated 95%](https://united24media.com/latest-news/ukrainian-interceptor-drones-tear-through-russian-shahed-swarms-with-95-kill-rate-18022) in favourable conditions, and in May 2026 interceptors downed [more than 3,500 Russian drones](https://militarnyi.com/en/news/ukraine-drones-down-3500-russia-drone-month/) in a single month.

<iframe src="/assets/images/european-drone-landscape/chart-cost-exchange.html" height="400" title="Cost-exchange gap: cost to stop one Shahed"></iframe>

The players cluster into three roles:
- interceptors that ram or fragment the target
- passive detection that triangulates the drone *and* its pilot
- the sensor-fusion brain that ties it together.
Most are chasing the same sub-\$10k price point Ukraine's cheapest interceptors already hit.

| Company | Country | Role | Notable |
|---|---|---|---|
| [Origin Robotics](https://dronelife.com/2025/03/07/latvia-awards-rd-contract-to-origin-robotics-for-counter-drone-technology/) | Latvia | Interceptor | BLAZE, radar + AI vision, 326 km/h |
| [Alpine Eagle](https://techcrunch.com/2025/03/05/alpine-eagle-secures-funding-from-european-backers-for-counter-drone-tech-amid-rising-threats/) | Germany | Interceptor | Sentinel mothership drops interceptors |
| [Frankenburg Technologies](https://tech.eu/2026/02/24/estonian-missile-defence-startup-frankenburg-technologies-raises-eur30m/) | Estonia | Mini-missile | Sub-2 kg, ~100/day near the front |
| [Nordic Air Defence](https://defence-industry.eu/nordic-air-defence-unveils-kreuger-100-low-cost-missile-to-counter-growing-drone-threats/) | Sweden | Interceptor | Chasing the sub-\$10k point |
| Vyriy ([ZIRKA](https://euromaidanpress.com/2026/07/01/russias-shaheds-cost-10000-each-ukraine-just-unveiled-drone-that-kills-them-for-2000/)) | Ukraine | Interceptor | ~\$2,000 |
| Dark River ([APUS-1](https://thedefender.media/en/2026/07/apus-interceptor/)) | Ukraine | Interceptor | ~\$3,500 |
| [MARSS](https://eos-aus.com/news/acquisition-of-marss-counter-drone-c2-system-provider/) (NiDAR) | Monaco | Sensor-fusion C2 | Acquired by Australia's EOS |
| DroneShield | Australia | RF detection | [2025 revenue +276%](https://za.investing.com/news/company-news/droneshield-fy2025-slides-revenue-surges-276-pipeline-hits-23bn-93CH-4132962) to ~A\$217M |
| [MyDefence](https://defence-industry.eu/european-counter-drone-solutions-provider-mydefence-lands-major-contract-with-u-s-army/) | Denmark | RF detection | US Army contract |
| [Sensofusion](https://www.unmannedairspace.info/counter-uas-systems-and-policies/sensofusion-launches-upgraded-version-airfence-c-uas/) | Finland | RF detection | Radio-frequency detection + jamming |

Demand is now urgent (Belgium's €50M emergency BLAZE buy in November 2025, [France's DGA order at Eurosatory](https://eng.lsm.lv/article/society/defence/17.06.2026-france-to-buy-latvian-blaze-drone-interceptor-system.a651858/)), and the acquirers are already circling, as EOS's purchase of MARSS shows: a prime buying the software rather than building it.

Detection is also going passive and cheap beyond the radio-frequency sensors above: acoustic arrays simply listen for a Shahed's engine. Ukraine's Sky Fortress mesh runs on roughly 9,500 microphones at \$400-500 each and in one 2026 saturation raid cued the interception of 80 of 84 incoming drones; Lithuania is adopting it, and RF fingerprinting (identifying a drone by its electronics' parasitic emissions in a tenth of a second) is emerging beside it.[^acoustic] The urgency is that conventional air defence is drowning: the interception rate against Shaheds fell from 94-97% in early 2025 to 80-85% by late 2025 on saturation alone.[^cuas]

Jamming and RF detection are becoming secondary, because fibre-optic and AI-guided drones (Part III) ignore the radio spectrum entirely.

Drone destruction: At the top end, Israel's Iron Beam 100 kW laser [went operational in December 2025](https://www.autonomyglobal.co/israels-iron-beam-laser-air-defense-system-set-for-first-idf-delivery-on-december-30-2025/) at "a few dollars a shot," and the US answer is Anduril's reusable Roadrunner-M (it flies home if it doesn't engage) and [Raytheon's Coyote](https://www.twz.com/sea/coyote-roadrunner-loitering-drone-interceptors-to-arm-u-s-navy-destroyers), but lasers still [fail in fog and can only dwell on one target](https://www.jpost.com/israel-news/defense-news/article-894838) at a time ([Iron Beam is now wired into Iron Dome's battle management](https://migflug.com/jetflights/israel-iron-dome-iron-beam-integrated-test-2026/), letting commanders choose per-threat between a ~\$50k Tamir missile and the laser, and adversaries are already hardening drones with reflective and ablative coatings).[^cuas] Two whole categories sit outside the ram-or-shoot paradigm: **[high-power microwaves](https://publicationsdrdo.in/index.php/dsj/article/download/21114/8787)** (America's Epirus, China's FK-4000) that fry every drone in a cone, at the cost of a huge electromagnetic signature and ~3 km reach, and **net capture** (Fortem's DroneHunter, Germany's Argus FALCON, [ParaZero](https://www.defenseadvancement.com/company/parazero-technologies/)), the only debris-free option over cities.[^cuas] And part of why Europe's airports were so blind is a design choice: air-traffic and missile radars are tuned to ignore small slow objects so birds don't clutter the screen, exactly the regime a wave-skimming drone flies in.[^cuas]

Europe's own airspace exposed how far behind the defence is. Between late 2024 and early 2026 unidentified drones [shut Copenhagen, Oslo and Munich airports](https://en.wikipedia.org/wiki/2025_European_drone_sightings), overflew the [RAF Lakenheath and Mildenhall bases](https://www.twz.com/air/russia-highly-likely-behind-drone-incursions-over-u-s-bases-in-england-report-concludes) storing US nuclear weapons, and appeared over [France's Île Longue submarine base](https://theaviationist.com/2025/12/05/drones-spotted-french-submarine-base/); the [IISS later tied several incursions](https://www.newsday.com/news/nation/russia-drones-europe-defense-f66484) to Russia's maritime "shadow fleet" launching from international waters (ship-tracking put the merchant vessels Arctica and Boracay off Copenhagen during the overflights). In one Polish incident NATO scrambled F-35s and fired AMRAAMs, [spending over €1.2M to down foam decoys](https://www.epis-thinktank.com/publications/the-asymmetric-air-war) worth \$10k each.

### Ground robots

- Estonia's **[Milrem Robotics](https://breakingdefense.com/2023/02/emirati-conglomerate-edge-grabs-majority-stake-in-estonian-robotics-firm/)** fields the THeMIS, the most widely deployed unmanned ground vehicle in Europe (150+ in Ukraine, mostly for casualty evacuation), and is now pushing the 12-tonne, 30mm-cannon HAVOC on the back of a [60-vehicle order](https://defense-update.com/20240125_ugvs.html) from its UAE owner EDGE.
- Germany's **[ARX Robotics](https://www.eu-startups.com/2025/07/german-defensetech-arx-robotics-reinforces-europes-battlefield-edge-with-e42-million-for-tactical-ugvs/)** is the venture-backed challenger (Gereon vehicles, Mithra OS, a JV with Ukraine's Roboneers)
- while the prime Rheinmetall pushes its [Mission Master line](https://www.uncrewed-systems.com/how-intelligent-ugvs-are-being-used-to-rescue-casualties-in-dangerous-environments/)
- the US Army runs its own competitions ([Textron's Ripsaw for the RCV](https://www.defensenews.com/land/2023/09/21/army-picks-four-to-build-robotic-combat-vehicle-prototypes/), [HDT and American Rheinmetall for the S-MET](https://fw-mag.com/shownews/195/the-us-army-picks-rheinmetall-and-hdt-for-the-s-met-increment-ii-robotic-cargo-vehicle) logistics mule)
- China's Norinco fields armed tracked robots and DeepSeek-driven robot dogs.[^ground]

The theme is the same as in the air: the value is in the operating system, not the chassis.

The fastest-moving corner is unglamorous: logistics.
Because the kill zone makes a manned supply run near-suicidal, Ukraine's ground-robot market hit \$252M in 2025 (61% of it logistics platforms), the defence ministry ordered 25,000-plus unmanned ground vehicles in the first half of 2026, and UGVs flew more than 50,000 resupply and casualty-evacuation missions between January and May.[^ugv] A robot is attritable in a way a stretcher team is not: one [battlefield-medicine study](https://militaryhealth.bmj.com/content/early/2026/01/26/military-2025-003188) modelled a 53% UGV loss rate on evacuation runs but an 81% success rate at extracting the casualty when the run was attempted.

| Platform (maker) | Mobility and payload | Role |
|---|---|---|
| [Termit (Tencore)](https://odin.t2com.army.mil/WEG/Asset/85ab245d354faeb66a958ffddef4d829) | Tracked, 300 kg | Resupply, medevac, can mount a machine gun |
| [MAUL](https://www.aidrones.com.ua/en/home) | 60 km/h, 90-110 km range | Dedicated medevac with a shock-absorbing capsule |
| [Vepr](https://thedefender.media/en/2026/06/vepr-ugv/) | 350 kg, ~40 km, near-silent | Carries two casualties, also demining |
| [Bandura (BlueBird)](https://www.blue-bird.tech/en/news-en/our-company-is-upgrading-the-bandura-ugv-starlink-additional-cameras-and-improved-control-systems-have-been-integrated/) | Modular, integrated Starlink | Holds video and telemetry under heavy jamming |

### Naval and undersea autonomy

At sea the consolidation is spectacular, and the combat proof is Ukrainian. In the Black Sea, cheap uncrewed surface vessels, the military-intelligence **Magura** and the security service's **Sea Baby**, did what Ukraine's non-existent navy could not, forcing the Russian fleet out of the western Black Sea. The asymmetry peaked in May 2025 when a swarm of Magura V7s armed with Sidewinder missiles [shot down two Russian Su-30SM fighters](https://www.opex360.com/2025/05/04/un-drone-naval-ukrainien-aurait-abattu-au-moins-un-avion-de-combat-russe-su-30/) (~\$50M each) from a ~\$250k boat; the [latest Sea Baby](https://www.janes.com/defence-intelligence-insights/defence-news/sea/ukraine-unveils-new-generation-of-sea-baby-usvs) carries 2,000 kg, mounts Grad rocket tubes and a gyro-stabilised gun that downed an Mi-8 helicopter, and now harasses the shadow-fleet tankers.[^blacksea] That lesson is now being capitalized, and the primes are racing to own the tier.

| Company | Country | Focus | Notable |
|---|---|---|---|
| [Exail](https://www.defensenews.com/global/europe/2026/07/06/thales-to-buy-french-underwater-drone-maker-exail-in-45-billion-deal/) (→ Thales) | France | Underwater drones | ~€3.9B acquisition, July 2026 |
| [Kraken Technology Group](https://defence-blog.com/british-drone-boat-firm-raises-175m-at-1b-valuation/) | UK | Surface drone boats | Unicorn; series-produced by Rheinmetall |
| [Fincantieri](https://defence-industry.eu/fincantieri-to-acquire-four-companies-in-e600-million-push-to-build-international-underwater-business-and-expand-dual-use-capabilities/) | Italy | "Underwater-as-a-service" | State-owned, buying in |
| [Naval Group](https://www.naval-group.com/en/actualites/challenges-met-course-set) | France | XL autonomous submarine | Sovereign program |
| [Ocean Infinity](https://www.vard.com/articles/vard-secures-contract-for-a-series-of-six-multi-purpose-offshore-vessels-for-ocean-infinity) | UK | Crewless survey ships | Independent fleet operator |
| SubSea Craft | UK | VICTA diver-submersible | [Ten ordered by Greece](https://subseacraft.com/subsea-craft-partners-with-skaramangas-shipyards/) |
| [Copenhagen Subsea](https://copenhagensubsea.com/about/) | Denmark | Silent rim-driven thrusters | Stays independent on a unique component |

The pattern is stark: the primes are absorbing this whole tier, and about the only way a startup stays independent is to make a component no one else can, like Denmark's Copenhagen Subsea and its silent rim-driven thrusters. The acquisitions are navigation plays as much as platform plays: Thales outbid Safran for Exail (€479M revenue, €1.1B backlog) largely to fuse Exail's fibre-optic gyroscopes with its own ring-laser ones, a near-monopoly on the high-precision inertial navigation that matters in GPS-jammed seas, while [Fincantieri assembled its underwater arm](https://defence-industry.eu/fincantieri-to-acquire-four-companies-in-e600-million-push-to-build-international-underwater-business-and-expand-dual-use-capabilities/) by buying WASS's torpedoes from Leonardo plus WSense's subsea modems and Graal Tech's autonomous underwater vehicles on a ~€1B shopping budget.[^blacksea]

An **underwater glider** carries no propeller: it changes its own buoyancy and pitch to convert sinking and rising into forward glide, so it is silent and sips power, which lets it patrol for months. Helsing's **[SG-1 Fathom](https://www.janes.com/defence-intelligence-insights/defence-news/c4isr/helsing-to-produce-sg-1-fathom-underwater-glider-at-uk-resilience-factory)** (built from Blue Ocean's LOCUS glider at a £350M Plymouth factory) is exactly this: buoyancy-propelled, effectively invisible to passive sonar, and running an onboard "Lura" acoustic model, a large model trained on decades of ocean sound that classifies contacts on the edge, reportedly picking out signatures far quieter than traditional sonar. Deployed in swarms, gliders promise persistent anti-submarine surveillance at a fraction of the cost of crewed patrols.
Even more patient is pre-positioning: Greece's Delian builds a seabed-dormant suicide vessel that waits, pre-positioned, for months or even years, and Ukraine's Toloka line is the underwater-strike version.[^glider]

The domain is splitting into two families: near-silent buoyancy gliders for persistent listening, and GPS-free strike craft that scale from a torpedo to a small submarine.

| Platform (maker) | Type | Range or endurance | Payload |
|---|---|---|---|
| SG-1 Fathom (Helsing) | Buoyancy glider, ISR | 3-month patrols, to 1,000 m | Lura acoustic-AI sensor |
| [Seaexplorer 1000-M (Alseamar, FR)](https://www.edrmagazine.eu/imdex-2025-alseamar-presents-the-seaexplorer-1000-m-underwater-glider-for-civilian-and-military-use) | Buoyancy glider, ISR | 1,700 km, 110 days | 8-channel passive acoustics |
| Toloka TLK-150 (UA) | Strike / ISR | 100 km | 20-50 kg warhead |
| Toloka TLK-400 (UA) | Strike, swarm and relay | 1,200 km | Up to 500 kg |
| Toloka TLK-1000 (UA) | Strategic strike | 2,000 km | Up to 5,000 kg |
| [Interceptigon-N (Delian, GR)](https://navyleaders.com/news/interceptigon-one-way-attack-uav-and-usv-launched-by-greek-firm/) | Seabed-dormant attack USV | Dormant 5 yrs, over 40 knots | ~70 kg charge |

## Part III: The technical frontiers

### Seeing in the dark: twilight, and the all-weather race

By 2026 the fight is no longer day-versus-night but all-weather: cheap sensors everywhere have stripped away the cover darkness used to give, so the frontier has moved to degraded visual environments (fog, smoke, rain, dust) and to the one physical gap that no amount of light can fix. Twilight is that gap, and it comes down to a drone carrying one of two kinds of camera, both of which fail at dusk.

A daylight electro-optical camera works on reflected light, so as the sun drops it loses contrast and then goes useless. The obvious fix is a thermal (long-wave infrared, 8-14 µm) camera, which ignores visible light and reads emitted heat, so it works in total darkness. But thermal has its own specific blindness: **thermal crossover**. A thermal image is really a map of temperature *differences*, and for a window around dawn and dusk the ground, vegetation, vehicles and people have all been heating or cooling through the day and briefly converge on the same temperature. The contrast collapses toward zero, targets melt into the background clutter, and the camera goes effectively blind. Ukrainian frontline reporting documents exactly this: at crossover, operators on commercial electro-optical or thermal payloads couldn't pick out surface-laid mines or [camouflaged units](https://cuashub.com/en/content/the-anti-drone-invisibility-cloaks-hiding-troops-in-ukraine/). Add the fact that a drone is a tiny target (often under 100 pixels) against a noisy infrared background, and there is a real gap, roughly an hour twice a day, where the cheap daylight sensor is fading and the thermal sensor is washed out. Since the war is increasingly fought with cheap first-person-view (FPV) drones carrying only a daylight camera, whoever can still see through that window holds the initiative.

The hardware answer is a better sensor, and the choice splits on the SWaP-C budget (size, weight, power, cost):

- **Uncooled microbolometers** (vanadium-oxide or amorphous-silicon, ~30-50 mK sensitivity) are light and sip power, which is why they end up on small drones, but they are the ones that go blind at crossover.
- **Cooled mid-wave infrared detectors** carry a cryogenic cooler, resolve a fraction of a degree at kilometres, and defeat crossover outright, but the cooler is heavy and power-hungry, so it rides only on large MALE drones.

This is one of the few genuinely European strong points on the whole board: France's **Lynred** (spin-off from Sofradir in Palaiseau) is a world leader in exactly these cooled infrared detectors, alongside America's Teledyne FLIR. But the thermal core is itself a supply-chain fault line: the Western benchmarks (FLIR's Boson+ at ~20 mK, Lynred's) are export-controlled and expensive, while China's InfiRay ships a 40 mK, export-free core for a fraction of the price, which is exactly why it turns up on cheap attritable FPV kamikazes.[^lynred]

The cheaper answer, and the one the front actually runs on, is to stack sensors and fix it in software. Skydio's X10 pairs an RGB camera with a [Teledyne FLIR Boson+ thermal core](https://www.skydio.com/x10/faqs) and runs a YOLO-class vision model that fuses the two streams, aligning them for parallax and pulling a human silhouette or an engine's residual heat out of a scene where either sensor alone would fail. Ukraine, meanwhile, is closing the hole the way it closes everything, cheaply: domestic firms now mass-produce compact FPV thermal cameras (Odd Systems' Kurbas-256 has been quoted around \$150 at volume), and low-cost thermal interceptors are reported hitting ~68% night kill rates.[^twilight] Better low-light silicon fills the twilight band specifically: Sony's STARVIS 2 back-illuminated CMOS sees down to ~0.005 lux (starlight) with ~2.5x the near-infrared sensitivity of the prior generation, exactly the band thermal handles worst.[^starvis]

Beyond the visible and thermal bands, the sensor stack is widening.[^sensing] Short-wave infrared (SWIR) punches through fog, smoke and haze that blind both other cameras; event cameras report only the pixels that change, at microsecond latency, ideal for catching a fast interceptor or a laser designator; and acoustic arrays (Ukraine's Sky Fortress and Zvook) simply listen for a Shahed's engine. The democratization is the striking part: Ukraine's Odd Systems now sells a thermal FPV with an integrated terminal-guidance module (its Lupynis-10-TFL-1) for under \$1,000, putting all-hours precision on an attritable airframe. The lesson for Europe's expensive ISR platforms is uncomfortable: they tend to assume one excellent sensor, when the front rewards redundant, disposable, all-hours coverage, and on that measure the side that currently holds the night is the one making thermal cheap, not the one making it perfect.

### Control modes

In this war, the radio spectrum is heavily jammed. Russian electronic warfare jams GPS and severs the pilot's video link, and a drone that depends on either dies on approach. Helsing's HX-2 reportedly learned this the hard way.

- **Knowing where you are without GPS.** The naive methods drift. Optical flow and visual-inertial odometry track motion by watching the ground and fusing it with the inertial unit, but with no "loop closure" the error accumulates over kilometres of unfamiliar territory, and full SLAM's memory and compute blow up with distance, so neither survives a long ingress on a tiny processor. The state of the art is **absolute visual geolocalization**: align the live camera view against a satellite map pre-loaded into the drone, with a neural net trained to ignore lighting, season and even the switch to an infrared camera, and read off a position good to ~20 metres with no GPS at all. Ukraine's **Twist Robotics** (its [OSCAR module](https://www.pravda.com.ua/eng/news/2026/01/28/8018266/), refined over ~500,000 km of flights) and the US firm **Oksi** ([OMNInav](https://oksi.ai/omninav-gps-denied-navigation/)) do exactly this; Greece's **Delian Alliance** (founded by Dimitrios Kottas, an ex-Apple Special Projects engineering manager who moved home to Athens) built the same idea into a navigation module ([Osiris](https://united24media.com/war-in-ukraine/ukraine-tests-tomahawk-style-drone-navigation-module-across-3000-kilometers-of-trial-flights-19617)) it says has logged 3,000+ km over Ukraine at under 20 m error. This is also the "GPS-denied visual navigation" that made Zurich's **Daedalean** [worth CHF 180M](https://www.startupticker.ch/en/news/destinus-and-daedalean-sign-chf-180-million-acquisition-deal) to Destinus, and that Quantum Systems builds into the Vector.
- **Hitting without guidance.** AI terminal guidance locks onto the target visually, then flies the last stretch autonomously. The drone can be jammed completely in the final seconds and still connect. Reconnaissance is going the same way, Ukraine's [Saker Scout](https://www.forbes.com/sites/davidhambling/2023/10/17/ukraines-ai-drones-seek-and-attack-russian-forces-without-human-oversight/) reportedly classifies dozens of types of Russian armour on its own and feeds coordinates straight into the DELTA command system.
- Ukraine is good on the point above.
Ukraine's **[The Fourth Law](https://thefourthlaw.ai/blog/vyriy-pro-10-drones-with-terminal-guidance-system-tfl-1-now-available-on-dot-chain-by-the-defense-procurement-agency-and-brava1-market-with-e-points/)** and **Vyriy** mass-produce a machine-vision terminal-guidance module, [TFL-1](https://www.kyivpost.com/post/60152), that takes over the final 400 to 500 metres and is immune to jamming once locked. A Vyriy drone with TFL-1 costs about \$448, only ~10% more than a dumb FPV, and reporting describes strike success [jumping from ~20% to ~80%](https://thedefensepost.com/2025/11/19/ai-upgrade-ukrainian-drones/) after fitting AI vision; the same logic drives the cheap autonomous interceptors now hunting Shaheds. The neo-primes sell the premium version of the same idea, Auterion's [Skynode strike kit](https://dronelife.com/2025/07/29/auterion-wins-50m-pentagon-contract-to-deliver-33000-ai%E2%80%91driven-drone-strike-kits-to-ukraine/) tracks moving targets out to a kilometre, Helsing's HX-2 does onboard AI targeting, Stark's Virtus pairs GNSS-denied navigation with visual terminal guidance, but the lesson from the front is that the cheap version wins. Autonomy here is not a luxury; it is the counter to electronic warfare, and the cheapest adequate autonomy beats the most sophisticated.

Caveat: AI vision is still limited: front-line reports say it works beautifully on flat open terrain but struggles to discriminate targets in forests, hills and urban rubble, and analog FPV cameras lack the resolution to hold a lock past ~500 m (plus the enemy actively fights this vision, cf below).

The most robust answer to jamming isn't software at all, it's a wire: **fibre-optic FPV drones** unspool a hair-thin glass filament in flight, are physically immune to jamming, spoofing and RF detection, and deliver latency-free HD video. Ukrainian and Russian units report them [hitting 50%+ against 20-30%](https://www.twz.com/news-features/inside-ukraines-fiber-optic-drone-war) for radio FPVs in contested spectrum, and because they emit nothing they enable ground-ambush tactics (land, wait low-power up to a day, strike a passing vehicle in seconds). The price is range (typically 10-20 km, up to ~50 km on a heavier spool), fragility (the cable snags on trees and power lines), and single use (you can't rewind it), plus a slow-burn side effect: [tens of thousands of kilometres of non-biodegradable glass filament](https://uwecworkgroup.info/fiber-optic-drones-in-ukraine-military-advantage-and-emerging-environmental-risks/) now strewn across farmland and forest.

So if what's the ventilation of control modes?[^controlmode]

| Control mode | How it works | Jam-resistance | Constraints | Share, Ukraine / Russia (2026) |
|---|---|---|---|---|
| Radio FPV | Pilot flies the whole way over an RF link | Low, defeated by jamming | Range and terrain limited, often under 20 km without a relay | ~45% / ~40% |
| Fibre-optic FPV | Pilot flies over an unspooling glass filament | Immune, it emits nothing | Spool caps range (typically 10-20 km, up to ~50 km on a heavier coil that runs ~3.8 kg); the cable snags, breaks and will not take sharp turns; single-use; and the glass has become expensive | ~15% / ~30% |
| Last-mile autonomy | Radio ingress, then AI vision flies the final 400 to 2,000 m | High, jam-proof at the decisive moment | Needs a radio ingress first; analog cameras cannot hold a lock past ~500 m | ~35% / ~25% |
| Full autonomy | Onboard AI from launch to impact | Highest | Weak target discrimination in forest, hills and rubble; fooled by decoys and adversarial camouflage | ~5% / ~5% |

<iframe src="/assets/images/european-drone-landscape/chart-control-mode.html" height="460" title="Ukraine versus Russia FPV control-mode mix, 2026"></iframe>

The split is a window into each side's economics. Russia leans on fibre-optic drones (~30% of its mix) and brute-forces the cost, because the bend-insensitive G.657.A2 glass they need is the exact grade hyperscalers buy for AI data centres, and that collision sent the price up roughly 560% (from about \$5 to \$33-35 per km, so a 50 km spool runs ~\$1,750 bare and ~\$2,500 as a module). The Russian state can absorb that and even outbids Western data centres for Chinese fibre; Ukraine largely cannot, so it pivoted to software instead: cheap last-mile AI modules (\$50-100, adding 10-20% to a drone's cost) that lift strike rates from ~20% to 70-80% under jamming, now ~35% of its mix. Russia is chasing the same autonomy with Chinese dual-use vision (the [~\$8,300 Veles](https://www.pravda.com.ua/eng/news/2025/07/08/7520760/)), but is throttled by a chronic shortage of trained operators ([~14,500 recruited in 2026, a fifth of its target and ~57,500 short](https://www.kyivpost.com/post/77984), while Ukraine destroyed ~10,000 Russian operator positions in a month), which is itself a reason both sides automate: an AI "fire-and-forget" drone turns months of pilot training into a task a soldier learns in half a day. The named hardware behind each column: Russia's fibre share rides Ushkuynik's [Knyaz Vandal Novgorodsky](https://grokipedia.com/page/ushkuynik_kvn) (decisive in Kursk, ~50,000/month by late 2025) and the ring-wing Knyaz Vladimir that hauls a 3 kg warhead 50 km; Ukraine's fibre analogues are the [Khyzhak REBOFF](https://mod.gov.ua/en/news/resistant-to-enemy-ew-ukrainian-fiber-optic-controlled-drones-khyzhak-reboff) and Ukrainian Armor's UB82FO. On the autonomy column, Russia fields the [Ovod and AI-retrofitted Molniya](https://english.nv.ua/russian-war/defense-advisor-warns-russia-adding-ai-to-molniya-drones-shahed-integration-next-50622668.html), the machine-vision [Geran-4](https://euromaidanpress.com/2026/07/12/ai-against-ai-over-ukraine-russias-shahed-now-sees-its-target-and-ukraines-interceptor-sees-shahed/) Shahed, and the [V2U](https://www.pravda.com.ua/eng/news/2025/06/09/7516344/), captured with no command antennas at all, hunting on an NVIDIA Jetson. Feeding all these models is a data moat: [half a million hours of combat drone footage](https://defensescoop.com/2026/06/16/data-from-half-a-million-hours-of-ukraine-conflict-drone-footage-now-available-to-train-ai/) was released for AI training in June 2026. And full autonomy already has its landmark: [Operation Spiderweb](https://en.wikipedia.org/wiki/Operation_Spiderweb) (June 2025), in which 117 quadcopters smuggled deep into Russia navigated by dead reckoning on open-source ArduPilot, recognised bombers with AI trained partly on museum exhibits, and destroyed or damaged 40+ strategic aircraft worth over \$7B, for about \$117k of drones.

### The chip has to fit: embedded AI on a power budget

All of that autonomy has to run on a computer that fits on the airframe and inside its power budget, which on a small drone means a few hundred grams and single-digit-to-low-tens of watts, shared with everything else. Engineers call the constraint SWaP-C (size, weight, power, cost), and it bites hard: a stealthy micro-drone can't carry a noisy fan, so it cools passively through the airframe, and a chip that throttles under thermal load can slow its vision loop enough to crash the drone.

Beneath the AI chip sits a layer so commoditized it goes unmentioned: the flight controller itself, dominated by the open [Pixhawk/PX4 standard](https://holybro.com/products/pixhawk-6x), an STM32 microcontroller with triple-redundant, vibration-isolated, heated inertial units, running the control loops on nearly every Group 1-3 drone in the West.

The AI market above it splits on two chip philosophies. NVIDIA's Jetson line is **Von Neumann** (a flexible GPU running the full CUDA/TensorRT stack, effectively a mini-server that can do vision, SLAM and a small language model at once) but pays for that flexibility in power, because it shuttles data to and from external memory. The challengers are **dataflow** NPUs like Israel's Hailo, which pin the model's weights onto the compute cores and skip the memory traffic, trading software flexibility for radical efficiency (though efficiency alone pays no bills: Hailo, valued at \$1.2B, spent 2026 laying off half its staff and seeking a buyer[^chips]). Teardowns and regulatory filings let you map the actual chips to actual drones:[^chips]

| Chip | Arch | AI throughput | Power | ~Price | Maker (fab) | Named platforms |
|---|---|---|---|---|---|---|
| NXP i.MX 8M Plus | NPU SoC | 2.3 TOPS | 4-6 W | \$15-45 | NXP (TSMC) | Auterion Skynode S, Ukrainian strike FPVs |
| Rockchip RK3588 | NPU SoC | 6 TOPS | 5-12 W | \$60-100 | Rockchip (SMIC, China) | TFL-1, Vyriy, captured Russian FPVs |
| NVIDIA Jetson TX2 | GPU | 1.3 TOPS | 7.5-15 W | ~\$220 | NVIDIA (Samsung) | ZALA Lancet |
| NVIDIA Jetson Xavier NX | GPU | 21 TOPS | 10-20 W | ~\$350 | NVIDIA (Samsung) | Shield AI V-BAT, Anduril Ghost |
| NVIDIA Jetson Orin Nano | GPU | 40-67 TOPS | 7-25 W | \$249 | NVIDIA (Samsung) | Quantum Vector (dual-SoC) |
| NVIDIA Jetson Orin NX | GPU | 70-157 TOPS | 10-25 W | ~\$599 | NVIDIA (Samsung) | Anduril Fury / Bolt-M |
| Hailo-10H | Dataflow NPU | 40 TOPS | ~2.5 W | ~\$130 w/ Pi | Hailo (TSMC) | Cheap FPV + host board |
| Axelera Metis | RISC-V NPU | 214 TOPS | ~14 W | M.2 module | Axelera (TSMC N12) | Robotics, vision inference |

The cheapest win: a \$448 Vyriy-TFL-1 attritable FPV runs its vision on a \$60-100 Rockchip RK3588, the same Chinese chip [found inside captured Russian drones](https://militarnyi.com/en/news/ukrainian-military-analyze-russian-drone-equipped-with-mv-tech/), and hits a target as reliably as a [Quantum Vector](https://quantum-systems.com/vector-ai/) carrying two \$249 Jetsons. The metric that matters on a power-starved airframe is TOPS-per-watt: Hailo delivers ~16 TOPS/W against the Orin Nano's ~3-5, which is why dedicated accelerators keep appearing on the cheapest drones. [Auterion's whole business is the \$15 NXP-based Skynode S](https://www.pravda.com.ua/eng/news/2024/11/18/7485091/); Russia's Lancet still flies a [2017-era Jetson TX2 alongside a Xilinx FPGA](https://snikolaj.com/2024/09/24/lancet-military-drone-analysis/) and a flight controller not much newer than a Game Boy's, a deliberately archaic, sanctions-proof "Frankenstein" bill of materials sourced through Chinese intermediaries.

Now that's a part where Europe is not doing great on sovereignty:
- The brains of Western drone autonomy are overwhelmingly NVIDIA, an American company, and the cheap boards are frequently assembled in China.
- Europe has exactly one serious contender: **Axelera AI**, a Netherlands company spun out of imec in 2021, whose Metis processor does 214 TOPS at around 14 watts (~15 TOPS/W) and is already going into "binoculars, visors, drones and vehicles"; it took €61.6M of EuroHPC money in March 2025 and is building a bigger chiplet for 2028.[^axelera]
- But the deepest chokepoint is one level down: almost every advanced chip here, NVIDIA's (Samsung 8nm), Axelera's (TSMC N12), Hailo's, is fabricated at a handful of Asian fabs in Taiwan and Korea.

### Talking through the jam: the link is half the weapon

The clearest proof of how much the link matters came in 2026, when the whitelist engineered by digital minister Mykhailo Fedorov (the same official who built the Brave1 procurement machine) cut thousands of illicit Russian Starlink terminals and, the US Defense Intelligence Agency reported, coincided with Ukraine retaking about 400 km2, its first significant gains since 2023.[^links]

Two approaches to keeping a standing link:
- on the tactical scale: **mesh radios** (MANET, mobile ad-hoc networks) let every drone, ground station and vehicle relay for every other, so the network self-heals around jamming and terrain instead of depending on one vulnerable point-to-point channel; the Western benchmarks are America's **[Silvus StreamCaster](https://silvustechnologies.com/products/streamcaster-4400-enhanced/)** and **[Persistent Systems' MPU5 / Wave Relay](https://persistentsystems.com/mpu5/)**, which is why the hardware teardowns keep concluding that the real lethality of a modern system is its edge-compute card plus the resilience of its datalink, not its airframe.
- On the operational scale, **Starlink** has quietly become the backbone: its phased-array terminals carry the video, the commander coordination and the deep-strike control the war runs on, and in 2026 connectivity itself was weaponised, with a Ukrainian whitelist and a Russian-side blockade turning access to the constellation into a tactical advantage.[^links]
  - Why Starlink and not the old satellites? It's about latency. Geostationary dishes sit 36,000 km up and add roughly 600 ms, hopeless for flying an FPV, and only something the size of a Reaper could carry the dish; Starlink's satellites orbit 300 to 1,000 km for 20 to 40 ms, and its flat phased-array antenna (about a 1 kg panel drawing laptop-level power) steers its beam electronically in microseconds to track them, small enough to bolt onto a multirotor.

| Link type | Range | Latency | Size and power |
|---|---|---|---|
| Line-of-sight radio | Terrain-limited, often under 30 km without a relay | Very low (under 50 ms) | Low, a few hundred grams |
| Geostationary SATCOM | Global, but only very large aircraft | High (~600 ms) | Very high, heavy dish |
| Starlink (LEO + phased array) | Global, terrain-independent | Low (20 to 40 ms) | Low (~1 kg, laptop power) |

The mature systems chain these into a PACE stack (primary, alternate, contingency, emergency) that fails over automatically: if Starlink is jammed the link drops to the MANET mesh, then to 4G/5G modems, then to peer-to-peer hops, so killing one frequency no longer blinds the drone.

### Swarms: many cheap drones, one intent

The endpoint of cheap autonomy plus a resilient link is the swarm: many drones that share what they see and divide the targets among themselves.
- Kyiv's **[Swarmer](https://www.uatechjournal.com/swarmer-raises-15-million-in-series-a-led-by-u-s-investor-the-largest-defense-tech-deal-in-ukraine-since-2022/)** builds exactly this software (it raised \$15M and later moved toward a Nasdaq listing): its stack claims [82,000+ combat missions](https://www.drone-directory.com.ua/profile/swarmer/) and has demonstrated 25 drones operating under full communications denial.[^swarm]
- Auterion sells the cross-platform **Nemyx** swarm-strike engine, and Helsing's Altra offers swarm control. Nemyx flew the [world's first multi-manufacturer swarm strike](https://auterion.com/auterion-performs-worlds-first-multi-manufacturer-swarm-strike-demonstration/) (Munich, December 2025: eight FPVs plus two fixed-wings from three makers as one formation), and at a [US Marine Corps live-fire](https://auterion.com/auterion-global-first-drone-swarm-live-fire/) a single operator struck three targets simultaneously.
- The threat is symmetric: Russia's new **Izdeliye-53** loitering munition is [launched in salvos from a multi-tube pneumatic container](https://www.menadefense.net/le-nouveau-lancet-izdeliye-53-se-devoile-de-plus-en-plus/) (up to 16 on a single truck) and is designed to share targeting in flight and prioritise what it attacks with no human in the terminal loop; at the heavy end China unveiled the Jiutian SS-UAV, a 16-tonne, 7,000 km mothership built to disgorge drone swarms mid-flight.[^swarm]

### Staying on station: the endurance race

On endurance, Chemistry is one front: America's **[Lyten](https://lyten.com/technology/lithium-sulfur/)** is scaling lithium-sulfur cells (built on bankrupt Northvolt's assets) that hold more energy per kilogram with none of China's nickel, cobalt or graphite. Fuel cells are another: Ukraine's Skyeton flew what it calls the [world's first hydrogen-electric combat drone](https://united24media.com/latest-news/ukrainian-raybird-becomes-worlds-first-hydrogen-electric-drone-used-in-combat-15046), pushing its Raybird's endurance well past a battery's.

At the patient end sit wind-and-solar surface drones (America's [Saildrone](https://www.saildrone.com/media-room/press-releases/lockheed-martin-invests-usd-50m-saildrone-advance-unmanned-surface-vehicle-capabilities-us-navy)) and the buoyancy gliders for the naval warfare, trading speed for months of loiter.
At the other (fast) end: Quantum Systems is [developing a super-fast interceptor](https://euromaidanpress.com/2026/05/31/ukraines-vector-drone-supplier-quantum-systems-is-developing-super-speed-interceptor-with-porsche-subsidiary-battery-cells/) on Porsche-subsidiary battery cells to out-accelerate a Shahed.[^endurance] China is not ceding the chemistry race either: CATL unveiled a ["condensed" cell at ~500 Wh/kg](https://www.greencarreports.com/news/1139428_catl-announces-very-energy-dense-battery-for-passenger-aircraft), nearly double today's automotive cells, aimed squarely at electric aviation.

### Fooling the machine: the counter-AI fight

Visual camouflage is the newest and least mature fight. Russia now fields multispectral decoys and camouflage tuned to defeat the target-recognition model's bounding box, and analysts keep finding that the "AI drone revolution" is real but oversold, with human pilots still [beating the algorithms against well-hidden targets](https://euromaidanpress.com/2025/03/06/forbes-ukrainian-ai-drones-claim-80-hit-rate-yet-human-pilots-remain-superior/) and the vision models faltering in forests, rubble and clutter.[^counterai] The research is precise about how the fooling works: a [3D-Gaussian-splatting pipeline](https://arxiv.org/html/2507.01367v1) can render camouflage that collapses a detector's recall from every viewing angle, an adversarial patch works once it covers 10-30% of the target's bounding box (5% does nothing), and both sides run cheap physical deception, Russia baiting air defences with [plywood decoys and \$500-engine fake Shaheds](https://www.fdd.org/analysis/2023/10/27/no-solid-evidence-russia-debuted-italmas-drone/), Ukraine spoofing Lancet optics with wooden HIMARS, while Russia answers by adding [thermal cameras to Shaheds to filter "cold" decoys](https://euromaidanpress.com/2026/07/12/ai-against-ai-over-ukraine-russias-shahed-now-sees-its-target-and-ukraines-interceptor-sees-shahed/).

### The physical leash: caging a lethal AI in hardware

How do you prevent your embedded AI control to kill your own soldiers? Helsing's HX-2 runs its AI on top of an FPGA "semantic coordination" layer plus analog guard channels that physically clamp the actuator signals: a spoofed command for 100% thrust is clipped by a comparator, a GPS-spoofed dive is vetoed by a proximity limiter, both in under 100 microseconds, so the model can misbehave without crashing the drone.[^leash] The same instinct scales down to the \$500 FPV: Ukraine's Vyriy ships a "Popcorn" arming board with four independent safety stages (a mechanical break in the detonator circuit, contact-sensor arming, a two-minute delay counted down on the pilot's video overlay, and a deterministic self-destruct if the round goes unused), so an attritable munition is made fail-safe by hardware, not by trust.

One level lower, the chip itself is starting to be designed by AI: the US startup Architect Labs [raised \$24M in 2026](https://www.businesswire.com/news/home/20260618895194/en/Architect-Labs-Raises-%2424M-Seed-to-Democratize-Custom-Chip-Design) to have a model design and formally verify custom ASICs end to end, compressing the two-to-five-year, tens-of-millions-of-dollars silicon cycle toward weeks. It points at a "designless" chip industry, the logical endpoint of wanting a purpose-built neural chip on every airframe.

## Part IV: The global board: supply chains and geopolitics

### The global board

Two powers dominate the picture, and a genuine third tier fills in around them: Israel (Elbit, IAI, UVision, the sensor-maker NextVision, and an army that is itself pivoting from ~\$1,000 FPVs to 12,000 night-capable ~\$6,000 ones), Türkiye (Baykar, whose chief technology officer Selçuk Bayraktar is President Erdoğan's son-in-law, and TAI, together behind the country's ~\$6.3B in annual defence exports), the Gulf (the UAE's EDGE, which owns Milrem, sits on a [\$21.1B backlog that is 76% export](https://euro-sd.com/2025/11/major-news/47947/edge-concludes-dubai-airshow/), and just won a \$7B Indonesian deal), and an Asia-Pacific bloc that barely registers in European coverage but is arming fast.[^rowmap] The global military-drone market, ~\$47B in 2025, is projected to roughly double by 2033.[^rowmap]

<iframe src="/assets/images/european-drone-landscape/map-world.html" height="410" title="World map of drone makers and component suppliers"></iframe>

**The United States has scale.**
- [Anduril](https://www.bloomberg.com/features/2025-euro-defense-startups/), Palmer Luckey's post-Oculus act, alone, at a \$61B valuation on ~\$2.2B of 2025 revenue and a reported \$20B ten-year contract to run the US Army on its Lattice software, is worth more than every European defense-drone startup combined; its [Arsenal-1 plant in Ohio](https://insideunmannedsystems.com/anduril-begins-production-of-fury-drones-at-new-arsenal-1-factory/) (5 million sq ft) is built to turn out tens of thousands of systems a year.
- It's flanked by [Shield AI (\$12.7B)](https://techcrunch.com/2026/03/26/defense-startup-shield-ai-lands-12-7b-valuation-up-140-after-u-s-air-force-deal/), [Saronic](https://www.prnewswire.com/news-releases/saronic-closes-1-75b-series-d-at-9-25b-valuation-to-accelerate-a-new-era-of-maritime-autonomy-302729298.html) (\$9.25B, the naval-drone play at nine times Kraken's valuation), [Zipline](https://dronexl.co/2026/01/20/zipline-reaches-7-6-billion-valuation-drone/) (\$7.6B in delivery), [Skydio](https://www.tectonicdefense.com/skydio-raises-110m-at-4-4b-valuation/) (\$4.4B) and a deep bench of the merely-large like Red Cat and the wind-and-solar sea drones of Saildrone.
- Since 2019 the US has captured roughly **[85% of all NATO defense-tech venture funding](https://techfundingnews.com/avp-earlybird-e2d-500m-fund-european-defence-startups-us-vc/)**.
- But scale isn't the same as fit: AeroVironment's Switchblade 300, a decade of Pentagon R&D at [~\$53,000 a unit](https://www.thedroneoffice.com/post/ukraine-western-loitering-munition-drone-cost-gap-switchblade-bulava) (a quarter of it pure bureaucratic overhead, ITAR, audit compliance, Buy-American paperwork), proved too weak and too jammable in Ukraine and was largely abandoned for locally-made FPVs, 120 of which cost the same. Nor is American autonomy EW-proof: [Anduril's Ghost drones failed against Russian jamming and its Altius crashed twice in USAF tests](https://medium.com/@hayekesteloo/anduril-altius-drones-crash-twice-during-air-force-tests-ghost-drones-fail-against-russian-jamming-3276b6858d05), the same lesson Helsing learned in public.

**China has market share.** DJI still holds something like [70-80% of the global commercial drone market](https://www.quantumrun.com/consulting/drone-market-statistics/) and accounted for [83.5% of all drone detections](https://www.thedronegirl.com/2025/11/06/2025-drone-market-dji/) in one 2025 counter-drone dataset. Behind DJI, state primes CASC and CAIG export MALE drones like the CH-5 and Wing Loong II at [roughly half the price of a US Reaper](https://www.eurasiareview.com/24112024-chinas-increasing-global-drone-footprint-analysis/), and the export model is escalating from selling drones to exporting the factory itself: CAIG is [building a Wing Loong plant in Bangladesh](https://defencesecurityasia.com/en/china-drone-factory-bangladesh-wing-loong-india-bay-of-bengal/), locking in decades of dependency a strait from India.

### Weaponised interdependence: the China chokehold

China makes roughly 94% of the world's permanent magnets, 75% of lithium-ion cells, about 90% of basic optical and infrared sensors, and 80% of small multirotors, and it has begun using that dominance as a weapon.[^chokehold] Through 2024-2025 Beijing blocked battery cells to the US supplier Skydio, redirected Ukraine's magnet supply toward Russia, added heavy rare earths (terbium, dysprosium) to its control list, and in October 2025 asserted an extraterritorial rule requiring a licence for any foreign product with more than 0.1% Chinese rare-earth content, prompting a threatened 100% US tariff and a nervous one-year truce.[^china] This is the one place a regulation genuinely constrains products, and it is China's, not the EU's. It is also the real reason a European-built FPV can cost €20,000 against €200 for the Chinese equivalent, and every red and blue bubble on the first map is, to some degree, built on top of these amber diamonds.

The chokehold is sadly real, but ofc not uniform.[^supplychain]

<iframe src="/assets/images/european-drone-landscape/chart-supply-chain.html" height="700" title="China's share of the drone supply chain by subsystem"></iframe>

To see what those percentages mean on an actual airframe, here is the same data mapped onto the machine itself. Drag to rotate, pull the slider to explode it, and switch the control mode to watch the drone's dependencies change with its link:

<iframe src="/assets/images/european-drone-landscape/drone-exploded.html" height="740" title="Interactive exploded view of an FPV drone with sourcing per part"></iframe>

| Subsystem | Dominant source (China %) | Chokepoint | Affects | De-risking |
|---|---|---|---|---|
| Carbon-fibre airframe | Japan/EU/US lead (~50%) | Medium: PAN precursor concentrated in Toray, but multi-sourced | Aerial, loitering | Automated fibre placement; Uplift360 99%-recycled with Leonardo; near parity |
| Brushless (BLDC) motors | China ~85% (Shenzhen) | Critical: inherits the magnet dependency | Aerial-FPV, loitering, multirotor ISR | Blocked with magnets to 2028-2030 |
| Speed controllers (ESC) | China ~80% | High: Western chips, but China does the board assembly and firmware | Aerial-FPV, loitering | Unresolved |
| Propellers | China ~75% | Medium-high: carbon-fibre props are Asia-moulded | Aerial | Unaddressed |
| Flight-controller boards | Designed in West/Japan (STM32, NXP), ~75% China-assembled | Medium-high: assembly + firmware in China (backdoor risk) | All | Orqa ships NDAA-compliant boards |
| Flight software / firmware | Open-source (~30% China hardware) | Low: ExpressLRS, Ukraine-modified against jamming | All | Near parity |
| RF datalink modules | China ~60% (open ELRS protocol) | Medium | Aerial-FPV | Open-source adaptation |
| LiPo pouch cells | China >90% (Dongguan Poweramp / TDK) | Critical, acute: weaponised against Skydio; NDAA bans six makers by 2027 with no Western replacement | Aerial-FPV, loitering, small ISR | No scaled Western LiPo line yet |
| Next-gen lithium-sulfur cells | US/EU (Lyten, ex-Northvolt) | Opportunity: no nickel, cobalt or graphite, 40-75% lighter | All aerial, long-endurance | Lyten scaling 16 GWh for 2026-2027 |
| NdFeB permanent magnets | China ~90-94% | Critical, blocked (2028-2030): capital-intensive, EV/wind demand crowds it out | All with BLDC motors and thrusters | Energy Fuels / Vacuumschmelze \$1.9B mine-to-magnet; Niron, Noveon nascent |
| Heavy rare earths (Dy, Tb) | China near-total | Critical: Oct 2025 extraterritorial 0.1%-content rule | All (high-temp motors) | White Mesa (Utah), a fraction of demand |
| CMOS daylight sensors | Sony/Samsung (Japan/Korea), China ~15% | Low: allied-secure | ISR, daylight FPV, USV | Already secure |
| Thermal / infrared cores | US FLIR vs China InfiRay/HikMicro (~45%) | High: Chinese cores cut price >60% and took the commercial market | Night ops: loitering, ISR, night FPV | Western defence-grade survives, losing the cost war |
| Germanium IR lens optics | China ~70% (germanium export-controlled) | High | Any thermal-equipped | Unaddressed |
| LiDAR | China Hesai vs West (~40%) | Medium: contested | UGV navigation, mapping | Western pioneers under price pressure |
| Advanced AI silicon | Designed in West, fabbed only at TSMC/Samsung (China ~5%) | Critical, unsolved: fabrication sits at Taiwan/Korea flashpoints | All autonomous | Semidynamics RISC-V, still Taiwan-fabbed |
| Logic-chip foundry | Taiwan/Korea ~80% | Critical: allied but geographically exposed | All | No near-term Western node |
| GNSS receivers | Qualcomm/Broadcom/u-blox, China ~25% | Low: multi-constellation resists spoofing | All autonomous | Already allied-controlled |
| Marine thrusters / water propulsion | West-leaning (China ~40%) | Medium: still magnet-exposed | USV, UUV/glider | Rides the Western marine base |
| Sonar and acoustic modems | US/EU/Norway (Teledyne, Kongsberg, Thales), China ~15% | Low: Western fortress | USV, UUV/glider | Sovereign, a source of leverage |
| Pressure-tolerant hulls and seals | US/EU (China ~25%) | Low | UUV, USV | Sovereign |
| Terrestrial drive motors and transmissions | US/EU legacy (China ~35%) | Low: Western advantage | UGV | Sovereign |
| Actuators and hydraulics | US/EU (China ~30%) | Low | UGV | Sovereign |

China's grip is only the sharpest case of the deeper pattern: every power now treats its position in the supply chain as a weapon, and each holds a different chokepoint:

- **Washington** holds the chips and the certifications. In December 2025 the [FCC barred new DJI and Autel equipment authorizations](https://dronelife.com/2025/12/22/fcc-adds-foreign-made-drones-and-components-to-covered-list-citing-national-security-risks/), and the Pentagon's ["Blue UAS" list](https://www.diu.mil/blue-uas-cleared-list) dictates which motors, radios and chips are allowed inside anything it buys. For Europe this cuts both ways: freedom from ITAR is a genuine selling point for European drones precisely because an ally's chips and software can be switched off by a change in Washington. The Pentagon is also pulling its own AI supply upward, signing [agreements to run frontier models on classified networks](https://www.war.gov/News/Releases/Release/Article/4475177/classified-networks-ai-agreements/).
- **Beijing** holds the components, as everything above shows. And the interdependence is not tidy even inside blocs: NVIDIA partners with LiDAR-maker [Hesai, a Pentagon-designated Chinese military company](https://www.kucoin.com/news/flash/nvidia-partners-with-hesai-a-pentagon-designated-chinese-military-company), while [over half the AI-enabling components recovered from Russian autonomous drones are made by US-headquartered firms](https://www.csis.org/analysis/how-russia-building-sovereign-drone-ecosystem-ai-driven-autonomy), because dual-use silicon flows through markets no embargo can seal.
- **Brussels** holds the purse, and its [SAFE loan instrument has become a geopolitical sorting machine](https://milmag.pl/en/the-safe-program-security-action-for-europe-as-the-foundation-of-a-new-european-defense-architecture-and-industrial-sovereignty/): €150B in loans with a 65% European-content rule, allocations weighted to the eastern flank (Poland alone ~€44B), the UK walking out of negotiations over IP-transfer and "Fortress Europe" terms, Canada joining as the first non-European G7 state, and Türkiye vetoed by Greece and Cyprus, which promptly answered with its own \$5B "HIT" fund.[^programs] Even finance is a front: EU sustainable-finance rules still bar many pension funds from arms manufacturers, confining the sector's capital to venture funds and state orders even as NATO's Hague pledge pushes members toward 5% of GDP.[^programs]

### The de-risking fight

Read off that map, the de-risking race splits into links that are nearly winnable and links that are stuck.[^derisking]

| Supply-chain link | Verdict | Who's attacking it |
|---|---|---|
| Airframes, software, firmware | Near parity | Neros (~1M FPV/yr on civilian-grade chips), Orqa (NDAA electronics), Uplift360 (recycled carbon fibre + Kevlar, with Leonardo) |
| Batteries | May leapfrog | Lyten (lithium-sulfur on ~\$5B of ex-Northvolt assets; no nickel, cobalt or graphite) |
| Magnets | Blocked (2028-2030) | Energy Fuels + Vacuumschmelze (\$1.9B integrated mine-to-magnet chain); Niron (iron-nitride), Noveon (recycling) |
| Advanced AI silicon | Unsolved | Axelera (Europe's edge-AI NPU, EuroHPC-backed) and Spain's Semidynamics (RISC-V) attack the design layer, but both are still fabbed at TSMC, so the fabrication chokepoint stands |

Governments are priming the pump, the Pentagon's Drone Dominance Program is buying 200,000-plus cheap drones while forcing Chinese parts out in scheduled "Gauntlets," and the EU's €90B Ukraine loan pours demand into European and Ukrainian lines, but the honest read is that although Europe can plausibly build the airframe, the code and even the battery, it would stuggle to build the magnet or the chip.

### Asia arms up

The Asia-Pacific bloc is running Europe's sovereignty playbook at higher intensity:

- **Taiwan** budgeted [\$1.43B for a deliberately "non-red" (China-free) drone industry](https://dset.tw/wp-content/uploads/2025/06/Drones-for-Democracy-U.S.-Taiwan-Cooperation-in-Building-a-Resilient-and-China-Free-UAV-Supply-Chain-1.pdf) targeting ~100,000 drones by 2028, with Thunder Tiger's Overkill the first Asian FPV on the US Blue UAS list.
- **South Korea**'s Hanwha is building an [indigenous drone turbojet](https://www.kedglobal.com/aerospace-defense/newsView/ked202607080009) and raising its stake in KAI to forge a national champion.[^rowmap]
- **Japan** is de-DJI-ing its government fleet, funnelling orders to China-free ACSL, while Mitsubishi Heavy flew Shield AI's Hivemind on its own airframes.[^rowmap]
- **India**'s production-linked-incentive scheme is bearing fruit: [ideaForge](https://www.crisil.com/mnt/winshare/Ratings/RatingList/RatingDocs/IdeaforgeTechnologyLimited_May%2027_%202026_RR_393423.html) is pivoting from mapping drones into loitering munitions with US partnerships.

Some said that the landscape of EU drone startups is a bubble. Legacy primes, for reference, trade at 1.6-2.7x revenue.

<iframe src="/assets/images/european-drone-landscape/chart-multiples.html" height="500" title="Revenue multiples: speculative startups vs profitable defence firms"></iframe>


### Parting words

Europe has, in three years, built a genuine drone industry with real unicorns, combat-proven products and a defensible sovereignty thesis. But the map has two shadows. The autonomy that counters jamming runs on American and Israeli silicon Europe doesn't make. And the mass that a real war demands runs on Chinese components Europe can't yet match on price.

## Appendix: the full company roster

Every company from the twenty-plus deep researches behind this article, grouped by what it actually sells. The body above covers the load-bearing ones; this is the exhaustive reference layer.

### Strike drones and loitering munitions

| Company | Country | Product | Notable |
|---|---|---|---|
| Helsing | Germany | HX-2 X-wing munition | €268M Bundeswehr contract; onboard AI targeting |
| Stark | Germany | OWE-V Virtus | €268M Bundeswehr contract; also Vanta USVs + Minerva C2 |
| Rheinmetall | Germany | FV-014 (UVision partner) | The prime in the German three-way split |
| Harmattan AI | France | Sonora / DELCO micro-drone | 5,000-unit DGA order; sub-€1,000 attritable doctrine |
| EOS Technologie | France | Veloce 330 jet munition | 400 km/h, KNDS EFP warhead; 17 delivered to French forces |
| Turgis & Gaillard + Renault | France | Chorus remotely-operated munition | €35M DGA start, up to €1B / ~600 units per month at Le Mans |
| Donaustahl | Germany | ALMP MAUS / Ratte / Stryga | Founder-designer Stefan Thumann; 100%-German supply chain; exports to Ukraine's Kraken unit |
| Delair | France | OSKAR + Damocles (with KNDS) | Revenue €30M to €60M in a year; 100+ kamikazes to Ukraine |
| Fire Point | Ukraine | FP-1, FP-5 "Flamingo" | FP-1 ~\$55k / 1,600 km; FP-5 carries 1,150 kg to ~3,000 km |
| Vyriy | Ukraine | FPV lines + ZIRKA interceptor | ~70% component localization; \$448 with TFL-1 guidance |
| AeroVironment | US | Switchblade 300 / 600 | 300 failed in Ukraine; 600 is the US Army LASSO pick |
| UVision | Israel | HERO family | \$982M US Army deal; acquired SpearUAV (VIPER) |
| XTEND | Israel | Mass FPV + XOS autonomy | \$1.5B SPAC; IDF tender for thousands |
| Elbit | Israel | SkyStriker | Part of a \$7.9B-revenue prime |
| ZALA (Kalashnikov) | Russia | Lancet, Izdeliye-53 | Swarm-capable pneumatic multi-tube launch |
| Neros | US | Archer FPV | 1M-a-year Torrance plant; 6,000-unit coalition order for Ukraine |
| Firestorm Labs | US | 3D-printed expeditionary drones | \$100M USAF deal; prints airframes on-theater |
| Mach Industries | US | Autonomous strike systems | \$300M Series C at \$1.8B; "Forge" distributed manufacturing |
| Baykar | Türkiye | TB2, Akinci, Kizilelma | TB2 in 37 countries; Kizilelma scored the first drone air-to-air kill |
| WB Group | Poland | Warmate munition, FlyEye ISR, Fonet comms | Piotr Wojciechowski's ~PLN 2.9B-revenue, PLN 679M-profit integrator |
| Destinus | Netherlands | Hypersonic strike, LORD interceptor | Founder Mikhail Kokorich; bought Daedalean for GPS-denied navigation |
| Hypersonica | Germany/UK | Hypersonic strike missiles | €23.3M Series A led by Plural |

### ISR and reconnaissance aircraft

| Company | Country | Product | Notable |
|---|---|---|---|
| Quantum Systems | Germany | Vector eVTOL | ~€300M revenue, profitable; dual Jetson autonomy |
| Tekever | Portugal | AR3, AR5 | 10,000+ combat hours; £400M UK OVERMATCH program |
| Skyeton | Ukraine | Raybird | 28 h endurance; first hydrogen-electric combat missions |
| Ukrspecsystems | Ukraine | Shark, PD-2 | \$200M UK factory; claims ~80% of HIMARS targeting |
| Turgis & Gaillard | France | Aarok MALE | 5.5-tonne Reaper-class, first flight Sept 2025, mostly self-funded |
| Schiebel | Austria | Camcopter S-100/S-300 | The dominant maritime VTOL; EU "SWORD" anti-submarine project |
| Threod Systems | Estonia | EOS C VTOL | Sales +1,100% in five years; 200+ units for Ukrainian artillery |
| Granta Autonomy | Lithuania | Hornet XR | Sub-3 kg silent ISR, GPS-denied; >\$2M recurring revenue |
| Atlas Aerospace | Latvia | AtlasPRO tricopter | Riga factory, combat-proven |
| KrattWorks | Estonia | Ghost Dragon ISR | Edge-AI vision with LTE/5G failover |
| Sky-Watch | Denmark | RQ-35 Heidrun | Won the Dutch battalion-ISR tender |
| Kelluu | Finland | Autonomous airships | €15M led by the NATO Innovation Fund |
| Shield AI | US | V-BAT | Hivemind autonomy is the USAF CCA default |
| Skydio | US | X10 / X10D | \$52M US Army order; \$3.5B SkyForge reshoring plan |
| Teledyne FLIR | US | Black Hornet 4 nano-drone | The pocket ISR standard, plus thermal cores |
| SWARM Biotactics | Germany | Cyborg-insect ISR | Live cockroaches with edge-AI backpacks; Bundeswehr customer |
| Buntar Aerospace | Ukraine | ISR software | \$10.4M raise |
| Onodrim Industries | Netherlands | Multi-domain sensing, border security | €40M seed |
| Robotican | Israel | ROOSTER drive-and-fly drone | GPS-denied indoor combat for NATO special forces |

### Counter-drone

| Company | Country | Approach | Notable |
|---|---|---|---|
| Origin Robotics | Latvia | BLAZE interceptor | France and Sweden both buying |
| Alpine Eagle | Germany | Sentinel mothership | Founder Jan-Hendrik Boelens; drops interceptors mid-air |
| Frankenburg Technologies | Estonia | Sub-2 kg mini-missiles | Co-founded by Taavi Madiberk; ~100/day near the front |
| Tytan Technologies | Germany | Autonomous interceptors | €30M Series A (Armira + NATO Innovation Fund) |
| Alta Ares | France | X-Lock, Black Bird AI interceptors | €50M Series A; combat-deployed in Ukraine |
| Nordic Air Defence | Sweden | Kreuger 100/100XR | Thermal seeker; integrated into Volvo convoy protection |
| Argus Interception | Germany | FALCON net-capture | First systems delivered to the Bundeswehr |
| Wild Hornets | Ukraine | Sting (~\$2,100) | 9,000+ Shaheds downed; ~70% of April 2026 interceptions |
| Dark River | Ukraine | APUS-1 (~\$3,500) | GPS-free interception to 50 km |
| Vidun | Ukraine | Fixed-wing interceptor | ~70% effective in December weather that grounded the rest |
| Skapion | Israel | Swarm neutralization | \$36M seed from Iron Dome veterans |
| MARSS | Monaco | NiDAR C2 + Interceptor-MR | Core of the UAE's DAMITA; bought by EOS |
| DroneShield | Australia | RF detection | Revenue +276%; under an ASIC disclosure investigation |
| MyDefence | Denmark | Wingman + Pitbull RF kits | \$26M US Army order for 485 mobile kits |
| Sensofusion | Finland | AIRFENCE + Fennec-1 | Launched a satellite to spot drone RF from orbit |
| Fortem Technologies | US | DroneHunter F700 net interceptor | The debris-free option over cities |
| Epirus | US | Leonidas high-power microwave | Fries whole swarms in a cone; ~3 km range |
| Anduril | US | Roadrunner-M | Reusable; ~8:1 cost ratio vs a Shahed; \$1.98B Kuwait deal |
| Raytheon | US | Coyote | The US Navy destroyer fit |
| Rafael | Israel | Iron Beam 100 kW laser | "A few dollars a shot"; fails in fog |
| AeroVironment | US | Titan-MS fusion | \$500M US Army Domestic Shield contract |
| Sky Fortress | Ukraine | ~9,500 acoustic sensors | Cued 80 of 84 kills in one saturation raid; Lithuania adopting |

### Naval and underwater

| Company | Country | Product | Notable |
|---|---|---|---|
| Exail (Thales) | France | UMIS, DriX, A18 | €3.9B acquisition; fibre-optic gyro monopoly play |
| Kraken Technology Group | UK | K3 Scout, K5, K7 boats | Asset-light: built by Rheinmetall, Anduril and Davie |
| Kraken Robotics | Canada | Synthetic-aperture sonar, SeaPower batteries | CAD\$102M revenue; \$615M Covelya buy; a different Kraken |
| Saronic | US | Spyglass to 180-ft Marauder | \$392M Navy deal; Port Alpha shipyard targets 600 hulls/yr |
| Saildrone | US | Wind/solar Explorer to Surveyor | Lockheed \$50M to arm them; Fincantieri-built Spectre class |
| Fincantieri | Italy | Underwater roll-up | WASS torpedoes, WSense modems, Graal Tech AUVs; €1.8B by 2030 |
| Naval Group | France | XL autonomous submarine | Sovereign demonstrator |
| Kongsberg | Norway | HUGIN AUVs | To 6,000 m; scaling a US plant for the Navy |
| Saab Seaeye | UK/Sweden | Falcon ROV, Sabertooth | Found Shackleton's Endurance |
| Ocean Infinity | UK | Crewless survey fleet | Eight 78-m robot ships |
| SubSea Craft | UK | VICTA diver-submersible | Ten ordered by Greece |
| Copenhagen Subsea | Denmark | Silent rim-driven thrusters | The component that keeps it independent |
| Helsing | Germany | SG-1 Fathom glider | Lura acoustic AI; Royal Navy "Atlantic Bastion" |
| Alseamar | France | Seaexplorer 1000-M glider | 1,700 km, 110 days |
| Magura (HUR) | Ukraine | V5, V7 USVs | A V7 with Sidewinders downed two Su-30SM fighters |
| Sea Baby (SBU) | Ukraine | 2,000 kg-payload USV | Carries Grad MLRS tubes; shot down an Mi-8 |
| Toloka | Ukraine | TLK-150 to TLK-1000 | Up to 5,000 kg warhead, 2,000 km |
| Delian Alliance | Greece | Interceptigon-N | Sleeps on the seabed for years, then 43 knots |

### Ground robots

| Company | Country | Product | Notable |
|---|---|---|---|
| Milrem Robotics | Estonia | THeMIS, HAVOC | 19 countries; EDGE-owned; leads the EU iMUGS program |
| ARX Robotics | Germany | Gereon line, Mithra OS | CEO Marc Wietfeld (ex-Bundeswehr officer); six European armies |
| Rheinmetall | Germany | Mission Master | The prime's UGV line |
| Textron | US | Ripsaw M3 | Won the US Army RCV phase |
| HDT + American Rheinmetall | US | S-MET logistics mules | 2,195 systems targeted by 2027 |
| Tencore | Ukraine | Termit | 300 kg tracked resupply/medevac |
| BlueBird Tech | Ukraine | Bandura | Starlink integrated to survive jamming |
| Norinco | China | VU-T10, P60 | P60 runs DeepSeek onboard; 10,000 scenarios in 48 s |
| Unitree (militarized) | China | "Machine Wolf" robot dogs | Rifle-armed, shown at PLA exercises |

### Delivery and commercial

| Company | Country | Product | Notable |
|---|---|---|---|
| Manna | Ireland | Food delivery | 250,000+ flights, per-flight profitable; pushed out of Ireland by councils |
| Zipline | US | Medical logistics | 2M+ deliveries; \$150M State Dept Africa contract |
| Dronamics | Bulgaria | Black Swan cargo | 350 kg over 2,500 km, middle-mile |
| Wingcopter | Germany | Tilt-rotor delivery | UNICEF/UPS heritage; TAF Industries JV |
| Dufour Aerospace | Switzerland | Aero-200 tilt-wing | 20 kg over 200 km demonstrated |
| RigiTech | Switzerland | Eiger quadplane | Daily medical routes on three continents, sold OEM |
| Everdrone | Sweden | Autonomous defibrillator delivery | Beats the ambulance in 94% of cases |
| Flyability | Switzerland | Elios caged drones | Inspects boilers and nuclear vaults from inside |
| Wingtra | Switzerland | VTOL survey | Centimetre accuracy, 50+ countries |
| Verity | Switzerland | Warehouse swarms | GPS-free, in the dark, for IKEA and Maersk |
| Voliro | Switzerland | Contact inspection | Presses ultrasonic probes on pipes |
| Dronehub | Poland | Drone-in-a-box + AUDROS net C-UAS | Deutsche Bahn's 33,000 km network |
| Azur Drones | France | Skeyetech security drone-in-a-box | First EASA no-pilot BVLOS approvals; 200+ sites |
| Elistair | France | Tethered Orion | 50 h endurance, jam-immune power-line link |
| Nordic Unmanned | Norway | Operations-as-a-service | 10,000+ hours flying EMSA maritime patrol |
| Parrot | France | ANAFI USA / Ai | The NDAA-compliant Western multirotor |
| ABZ Innovation | Hungary | L10/L30 spray drones | Attacking the DJI/XAG agri monopoly in Europe |
| BRINC | US | Drone-as-first-responder | \$157M raised; Motorola alliance |
| XAG | China | P150 agri drone + R150 rover | >60% of China's agricultural drone market |
| EHang | China | EH216-S passenger eVTOL | First type-certified autonomous passenger craft |
| JOUAV | China | VTOL mapping | ~620M RMB revenue |
| FIXAR | Latvia | Fixed-angle VTOL survey | Mechanically simpler tilt-rotor alternative |
| Acecore Technologies | Netherlands | Heavy-lift weatherproof multirotors | The Dutch industrial workhorse |
| Skyports | UK | Vertiports and drone logistics | \$151M raised, ADP-backed, Dubai eVTOL network |

### Autonomy software and command-and-control

| Company | Country | Product | Notable |
|---|---|---|---|
| Auterion | Switzerland/US | AuterionOS, Skynode, Nemyx | 33,000 strike kits to Ukraine; first multi-vendor swarm strike |
| Helsing | Germany | Altra, Centaur, Lura | The software-first thesis; Centaur flew a Gripen E |
| Shield AI | US | Hivemind | CEO Ryan Tseng; ported across airframes, DT25 to cruise missiles |
| Anduril | US | Lattice | \$20B ten-year US Army deal |
| Swarmer | Ukraine | Styx / MINAS / Trident OS | 82,000+ combat missions; 25 drones under full jamming |
| Comand AI | France | Prevail C2 | CEO Loïc Mougeolle; Saab invested; feeds GlobalEye |
| XTEND | Israel | XOS | Untrained soldiers directing swarms |
| Twist Robotics | Ukraine | OSCAR visual navigation | ~500,000 km of flights refined it |
| Oksi | US | OMNInav | Satellite-map matching, no GPS |
| Delian Alliance | Greece | OSIRIS navigation | Under 0.1% position error while jammed |
| The Fourth Law | Ukraine | TFL-1 terminal guidance | \$50-100 module; strike rates 20% to 70-80% |
| Trident Group | Ukraine | Universal targeting module | Raspberry Pi-based, zero-config |
| Daedalean | Switzerland | Certified visual AI | CHF 180M acquisition by Destinus |
| Spleenlab | Germany | Certified vision | Bought by Quantum Systems |

### Chips and compute

| Company | Country | Product | Notable |
|---|---|---|---|
| NVIDIA | US | Jetson line | The Western autonomy default; Samsung-fabbed |
| NXP | Netherlands | i.MX 8M Plus | The \$15 brain of Auterion's Skynode S |
| STMicroelectronics | France/Italy | STM32 flight controllers | The Pixhawk standard under every autonomy stack |
| Rockchip | China | RK3588 | \$60-100; guides both Ukrainian and Russian FPVs |
| Hailo | Israel | Hailo-10H dataflow NPU | ~16 TOPS/W; in distress, seeking a buyer in 2026 |
| Axelera AI | Netherlands | Metis | Europe's one serious contender; €61.6M EuroHPC |
| Ambarella | US | CV5 vision SoC | \$391M revenue; the domestic camera-chip option |
| Horizon Robotics | China | Journey 6 | 560 TOPS; sanctions-proof Chinese edge AI |
| Semidynamics | Spain | Gazzillion RISC-V | Sidesteps the HBM memory wall; still Taiwan-fabbed |
| Architect Labs | US | AI-designed ASICs | \$24M to compress the 2-5 year silicon cycle to weeks |
| TSMC / Samsung | Taiwan/Korea | The fabs | Where ~80% of the logic actually gets etched |

### Communications and datalinks

| Company | Country | Product | Notable |
|---|---|---|---|
| SpaceX Starlink | US | LEO constellation | The war's backbone; whitelisted in 2026 |
| Silvus Technologies | US | StreamCaster MANET | Bought by Motorola for \$4.4B |
| Persistent Systems | US | MPU5 / Wave Relay | 130-mile mesh links, onboard Android edge compute |
| Doodle Labs | US/Singapore | Mini Mesh Rider | 27 g mesh radio for small drones, 47 km links |
| Kymeta | US | Flat-panel satcom | Anti-jam links on Ukrainian USVs |
| Himera | Ukraine | Jam-resistant tactical radios | \$2.5M seed, front-proven |
| ExpressLRS | Open source | RC link firmware | Ukraine-modified to dodge jamming and AeroScope |

### Sensors and cameras

| Company | Country | Product | Notable |
|---|---|---|---|
| Teledyne FLIR | US | Boson+ thermal cores | ~20 mK; export-controlled |
| Lynred | France | Cooled MWIR detectors | Europe's genuine strong point |
| InfiRay / HikMicro | China | Amorphous-silicon thermal | Cut module prices >60%; the cheap-FPV standard |
| Sony | Japan | STARVIS 2, SenSWIR | 0.005 lux starlight vision; record SWIR pixels |
| SCD | Israel | Cardinal SWIR, Swift EI event camera | Decodes enemy laser designators at 50 kHz |
| NextVision | Israel | Stabilized micro EO/IR gimbals | \$168M revenue; inside half the West's drones |
| Odd Systems | Ukraine | Kurbas, Lupynis thermal FPV | \$150 thermal cameras at volume |
| Oko Camera | Ukraine | Oko Pro thermal | Under 30 mK sensitivity, 17 ms latency to onboard AI |
| Quantum Systems | Germany | WASP acoustic payload | Locates artillery fire at 15 km from a 150 g module |
| Hesai | China | LiDAR | US-designated Chinese military company; NVIDIA friction |

### Components, materials and energy

| Company | Country | Product | Notable |
|---|---|---|---|
| T-Motor | China | BLDC motors | Found inside Taiwan's "sovereign" Jackal drone |
| Hobbywing | China | ESCs | ~78.5% of the brushless ESC market |
| Gemfan | China | Propellers | The default FPV prop |
| CATL | China | Cells, incl. 500 Wh/kg condensed battery | Purpose-built for electric aviation |
| Lyten | US | Lithium-sulfur cells | On ex-Northvolt plants; no nickel, cobalt or graphite |
| Amprius | US | Silicon-nanowire cells | >450 Wh/kg, military-qualified |
| Verkor / ACC | France | Sovereign pouch cells | The European traceable-cell bet |
| Intelligent Energy | UK | Hydrogen fuel cells | Powers the hydrogen Raybird |
| Unusual Machines | US | NDAA motors, FCs, ESCs | 1M-motor/yr capacity; >\$100M cash, listed |
| LN Innov | France | VF65 sovereign motors | Reshoring on the old BIC factory site |
| Orqa | Croatia | FPV video + NDAA electronics | The European FPV-stack alternative |
| Uplift360 | UK/Luxembourg | Recycled carbon fibre and Kevlar | 99% purity, with Leonardo |
| Toray | Japan | PAN carbon-fibre precursor | >50% of the world's supply |
| Energy Fuels + Vacuumschmelze | US/Germany | Mine-to-magnet chain | \$1.9B deal; White Mesa to Hanau and Sumter |
| Niron Magnetics | US | Iron-nitride magnets | Rare-earth-free chemistry, scaling in Minnesota |
| Noveon Magnetics | US | Recycled NdFeB | \$215M Series C; 90% less energy than virgin |
| 3DTech | Ukraine | Fibre-optic spools | The 20 km coils behind unjammable FPVs |
| Dronavia | France | Parachutes, flight termination | The business SORA regulation created |

## Additional good reads

- [Austin Vernon, on the Ukraine war and the future of warfare](https://www.austinvernon.site/blog/ukrainewar.html): a sharp, operator's-eye synthesis of how Ukraine turned FPV mass, Starlink and the kill-confirmed marketplace into an 8-to-1 attrition machine, and why the front is now a deep no-man's-land where trucks can't move and logistics has to go unmanned.
- [RUSI, "Drones Win Battles, Components Win Wars"](https://www.rusi.org/explore-our-research/publications/commentary/drones-win-battles-components-win-wars): on why the component supply chain, not the airframe, decides the war, and the ~89% Chinese-component dependency behind both Ukraine and Europe.
- [CSIS, "Ukraine's Future Vision and Current Capabilities for Waging AI-Enabled Autonomous Warfare"](https://www.csis.org/analysis/ukraines-future-vision-and-current-capabilities-waging-ai-enabled-autonomous-warfare): on the autonomy and AI-targeting roadmap behind the cheap terminal-guidance modules.

[^controlmode]: The four-way taxonomy and the estimated Ukraine/Russia operational shares from an FPV control-architecture research synthesis (2026) drawing on procurement data, verified strike footage and commander statements; treat the percentages as informed estimates, not audited figures. The G.657.A2 fibre price surge (~560%, to \$33-35/km) and its collision with AI-data-centre demand via [DroneXL](https://dronexl.co/2026/05/11/ukraine-fiber-optic-spool-price-ai-data-center-demand/); the radio-FPV ~20-30% real strike rate via [War on the Rocks](https://warontherocks.com/i-fought-in-ukraine-and-heres-why-fpv-drones-kind-of-suck/); the TFL-1 module lifting strike rates to 70-80% via [Kyiv Post](https://www.kyivpost.com/post/60152); the dual fibre-plus-radio auto-switch via [DroneXL](https://dronexl.co/2026/03/23/ukraine-fiber-optic-fpv-drones-radio-cable/).

[^twilight]: [Militarnyi](https://militarnyi.com/en/articles/new-threat-fpv-drones-adapt-for-night-time-operations/) and [Kyiv Post](https://www.kyivpost.com/post/41114) on Ukrainian thermal FPV cameras and night operations; thermal-crossover explanation via [Drone Warfare](https://drone-warfare.com/counter-uas/eo-ir-detection/).

[^starvis]: [Sony Semiconductor](https://www.sony-semicon.com/en/technology/security/index.html) on STARVIS 2 low-light and near-infrared sensitivity.

[^lynred]: Cooled vs uncooled infrared and the thermal-crossover fix draw on the two "gemini_world" global-drone syntheses; Lynred is the Sofradir spin-off and a European leader in cooled MWIR detectors, Teledyne FLIR the US counterpart (Boson+ core on the Skydio X10). The InfiRay export-free thermal core, and its role as the cheap-FPV thermal supplier of choice, from the sensing-frontier synthesis (2026).

[^sensing]: Short-wave infrared for atmospheric penetration, event cameras for microsecond-latency change detection, acoustic arrays, and the Odd Systems Lupynis thermal-FPV line (the Lupynis-10-TFL-1 with an integrated terminal-guidance module quoted under \$1,000) all from a sensing-frontier-of-drone-warfare research synthesis (2026), which frames 2026 as the shift from day/night to all-weather, degraded-visual-environment sensing.

[^acoustic]: Acoustic detection arrays, Ukraine's Sky Fortress (a distributed microphone mesh cueing mobile fire teams onto Shahed engines) and Zvook, from the same sensing synthesis and the counter-drone research; they are cheap, passive, and hard to jam, but short-ranged and degraded by ambient noise. The Sky Fortress specifics (~9,500 sensors at \$400-500 each, edge classification with time-difference triangulation, the 80-of-84 raid, Lithuanian adoption) and the RF-fingerprinting technique from the sensing-frontier synthesis (2026).

[^programs]: National-program and funding-machinery detail from the 2026 worldwide drone-tech financing research synthesis: the UK Defence Investment Plan and its lethal-autonomy language; the Replicator-to-DAWG restructuring and \$54.6B FY2027 request; SAFE's wave allocations, the UK walkout, Canada's accession and the Greek/Cypriot veto of Türkiye plus its \$5B HIT answer; the SFDR sustainable-finance exclusion and the NATO Hague 5%-of-GDP pledge; Germany's 45th Panzer Brigade fielding plan; Helsing's ~€580M Combat Fighter System Nucleus contract and 80%-European cap-table engineering; the NATO Innovation Fund, DIANA, EDIP and ReArm figures; and the EASA SORA 2.5 / Light UAS Operator Certificate / U-space evolution with the Altitude Angel insolvency, from the regulatory research notes. Programme figures are governments' own announcements.

[^killzone]: The drone kill-zone depth (about 10 km by late 2025, 25 km by mid-2026, 30 km expected by year-end, 50-100 km for "medium" strikes) and the casualty inversion (artillery from ~80% to under 30%, drones to 70-80%) from a Ukrainian corps commander via [Euromaidan Press](https://euromaidanpress.com/2026/07/03/ukraines-eastern-kill-zone-is-25-km-deep-corps-commander-expects-30-by-years-end/) and [Ukrainska Pravda](https://www.pravda.com.ua/eng/news/2025/10/14/8002683/); the "Baba Yaga" night bombers and their mothership-relay role via [ASPI](https://www.aspistrategist.org.au/beyond-the-front-line-ukraine-is-deepening-its-drone-wall/); the doctrinal shift also from [Austin Vernon's Ukraine-war synthesis](https://www.austinvernon.site/blog/ukrainewar.html). These are battlefield estimates and one operator's-eye reading, not audited figures. The 25-50-drones-per-10-km density and the Russian infiltration-assault attrition (60-70% before the first line) from the sensing and communications syntheses via the same Euromaidan Press reporting.

[^glider]: The SG-1 Fathom, the Blue Ocean LOCUS glider acquisition, the Lura Large Acoustic Model and the £350M Plymouth "Resilience Factory" from a worldwide naval-and-terrestrial-drone research synthesis and [Janes](https://www.janes.com/defence-intelligence-insights/defence-news/c4isr/helsing-to-produce-sg-1-fathom-underwater-glider-at-uk-resilience-factory); Delian's seabed-dormant cylinder and Ukraine's Toloka undersea line from the same synthesis. SG-1 Fathom specifications (60 kg, 1.95 m, to 1,000 m, ~3 months) and the Royal Navy's SG-1-based "Atlantic Bastion" programme via [Helsing](https://helsing.ai/newsroom/helsing-unveils-lura-and-sg-1-fathom-autonomous-mass-to-surveil-and-defend-the-depths); France's Alseamar Seaexplorer 1000-M (1,700 km, 110 days) via [EDR Magazine](https://www.edrmagazine.eu/imdex-2025-alseamar-presents-the-seaexplorer-1000-m-underwater-glider-for-civilian-and-military-use); the Toloka TLK-150/400/1000 range-and-payload ladder via [United24](https://united24media.com/latest-news/ukraines-massive-underwater-drone-toloka-unveiled-at-brave1-defense-tech-valley-2025-in-lviv-11798); Delian's Interceptigon-N via [EDR Magazine](https://www.edrmagazine.eu/defea-2025-delian-alliance-industries-defending-the-greek-approaches-and-not-only).

[^links]: Silvus StreamCaster and Persistent Systems MPU5 / Wave Relay, and the "edge compute plus a resilient MANET datalink is the real weapon" framing, from an embedded-compute research synthesis ([Silvus](https://silvustechnologies.com/products/streamcaster-4400-enhanced/), [Persistent Systems](https://persistentsystems.com/solutions/uas-datalink/)); the Starlink backbone and the 2026 whitelist / blockade dynamic from [Austin Vernon's Ukraine-war synthesis](https://www.austinvernon.site/blog/ukrainewar.html). The geostationary-versus-LEO latency and the phased-array (AESA) mechanism via [Skyfront](https://skyfront.com/learn/starlink-drones) and [Qorvo](https://www.qorvo.com/design-hub/blog/the-role-of-beamforming-and-aesa-antennas-in-satcom-communications-part-3); the whitelist mechanics and the ~400 km2 gain via [InCyber](https://incyber.org/en/article/ukraine-to-block-access-to-starlink-for-unauthorized-devices/) and [Ukrainska Pravda](https://www.pravda.com.ua/eng/news/2026/05/22/8035859/); PACE failover via a communications-and-kill-zone research synthesis.

[^swarm]: Swarmer's \$15M raise and Nasdaq path from a Ukraine militaro-industrial research synthesis ([UA Tech Journal](https://www.uatechjournal.com/swarmer-raises-15-million-in-series-a-led-by-u-s-investor-the-largest-defense-tech-deal-in-ukraine-since-2022/), [United24](https://united24media.com/war-in-ukraine/ukrainian-drone-swarm-firm-swarmer-eyes-nasdaq-ipo-after-15m-funding-boost-15657)); the Russian Izdeliye-53 swarm architecture (pneumatic multi-tube launch, in-flight target sharing) from the embedded-compute synthesis and ISW.

[^endurance]: Lyten's lithium-sulfur cells on ex-Northvolt assets from the supply-chain de-risking synthesis ([Lyten](https://lyten.com/technology/lithium-sulfur/)); the hydrogen-electric Raybird and the Quantum Systems super-speed interceptor from a Ukraine militaro-industrial synthesis ([United24](https://united24media.com/latest-news/ukrainian-raybird-becomes-worlds-first-hydrogen-electric-drone-used-in-combat-15046), [Euromaidan Press](https://euromaidanpress.com/2026/05/31/ukraines-vector-drone-supplier-quantum-systems-is-developing-super-speed-interceptor-with-porsche-subsidiary-battery-cells/)).

[^counterai]: Russian multispectral decoys and camouflage tuned against target-recognition models, and the "revolution not here yet" assessment, from a loitering-munition research synthesis ([ISW](https://understandingwar.org/research/russia-ukraine/the-battlefield-ai-revolution-is-not-here-yet-the-status-of-current-russian-and-ukrainian-ai-drone-efforts/), [Forbes via Euromaidan Press](https://euromaidanpress.com/2025/03/06/forbes-ukrainian-ai-drones-claim-80-hit-rate-yet-human-pilots-remain-superior/), [The Strategist](https://www.aspistrategist.org.au/why-ukraines-ai-drones-arent-a-breakthrough-yet/)).

[^axelera]: [Axelera AI](https://en.wikipedia.org/wiki/Axelera_AI) and [IO+](https://ioplus.nl/en/posts/axelera-ai-bets-on-europes-edge-chips-for-robot-and-battlefield); Jetson and Hailo specs via [NVIDIA](https://developer.nvidia.com/embedded/jetson-modules) and [Hailo](https://hailo.ai/products/ai-accelerators/).

[^china]: [DroneLife](https://dronelife.com/2024/12/10/chinas-export-restrictions-on-drone-parts-could-reshape-global-supply-chains/) on China's drone-component export controls; FPV cost and import-dependence figures via [Eastern Circles](https://www.easterncircles.com/newsletter-27-how-china-has-become-world-leader-of-fpv-drones-and-what-it-means-for-european-strategic-autonomy/).

[^cuas]: Cost-exchange ratios (CSIS), interceptor kill rates (Zelensky/Syrskyi statements, RNBO and Ukrainian army media), the European airport/base incursions (Reuters, The Defense Post, opex360, and an IISS "shadow fleet" report), Iron Beam and the Roadrunner/Coyote comparison are drawn together from a focused counter-drone research synthesis of 2025-26 reporting; treat the single-outlet superlatives as attributed rather than independently audited. The Shahed interception-rate decline (94-97% early 2025 to 80-85% late 2025 under saturation), the high-power-microwave and net-capture categories, laser drone-hardening countermeasures, the Iron Dome / Tamir cost tradeoff and the "radar floor" mechanism behind Europe's airport blindness are from the same synthesis; the Arctica/Boracay shadow-fleet ship tracking via its IISS-derived reporting.

[^chips]: Chip-to-platform mappings, the NXP/Rockchip/Jetson/Hailo/Axelera specs, the Lancet teardown, the HX-2 FPGA safety layer and the Architect Labs round come from a focused embedded-compute research synthesis drawing on hardware teardowns, FCC filings, datasheets ([NVIDIA](https://developer.nvidia.com/embedded/jetson-modules), [Hailo](https://hailo.ai/products/ai-accelerators/), [Axelera](https://en.wikipedia.org/wiki/Axelera_AI)) and captured-hardware analysis. Hailo's 2026 distress (half its staff laid off, seeking a buyer despite a \$1.2B valuation) from the worldwide drone-industry synthesis.

[^dsr]: Dealroom x NATO Innovation Fund, "European Defence, Security & Resilience startups raised a record \$8.7B in 2025" (Feb 2026). The DSR category is broader than pure defense, including cyber and resilience. [nif.fund](https://www.nif.fund/news/dealroom-and-nato-innovation-fund-european-defence-security-resilience-startups-smash-record-with-8-7b-raised-in-2025/)

[^globalvc]: US (\$14.2B, nearly tripled from ~\$5B) and European (\$2.48B, up 38% from ~\$1.8B) defence-tech equity funding for 2025 from CB Insights via [Defense News](https://www.defensenews.com/industry/2026/01/20/defense-tech-startups-had-their-best-funding-year-ever-in-2025/); the ~\$49.9B global 2025 total (PitchBook) via [S&P Global](https://www.spglobal.com/market-intelligence/en/news-insights/articles/2026/3/venture-capital-investment-in-defense-tech-surges-while-m-a-activity-slows-99534071). Trackers define the category differently, which is why these numbers, the \$8.7B Dealroom "DSR" figure and the \$49.9B total do not all reconcile. The 2020 bars are estimated: global defence-tech VC was about [\$1.6B that year](https://news.crunchbase.com/defense-tech/startup-venture-funding-all-time-record-ai-anduril/), of which Europe was under 1% and the US the dominant share, so I split it roughly US \$1.3B / Europe \$0.2B. China's buildout is overwhelmingly state-financed and does not appear in venture-capital data.

[^helsing-ew]: Bloomberg (Jan 2026); see also [MIT Technology Review](https://www.technologyreview.com/2026/01/06/1129737/autonomous-warfare-europe-drones-defense-automated-kill-chains/) on European automated kill chains.

[^munich]: Dealroom x NATO Innovation Fund report (Feb 2026), via [table.media](https://table.media/assets/briefings/security/documents/nif-report-defence-security-and-resilience-2026.pdf).

[^germany]: [Defense News](https://www.defensenews.com/global/europe/2026/02/26/once-reluctant-germany-goes-big-on-one-way-attack-drones/) (Feb 2026); program scale, the Haraka Storm/Munster/Altmark trial results, the 25%-launch leak, the Project Flytrap recovery, unit costs and the *Maßgabebeschluss* €1B cap via [turdef](https://turdef.com/article/germany-launches-9b-strike-drone-shift-led-by-startups), Bloomberg, the Financial Times and a focused loitering-munition research synthesis.

[^fpv]: Analysis of the FPV supply chain via [Eastern Circles](https://www.easterncircles.com/newsletter-27-how-china-has-become-world-leader-of-fpv-drones-and-what-it-means-for-european-strategic-autonomy/).

[^ukraine]: Production trajectory and Brave1 figures via the Dealroom x NATO Innovation Fund report (Feb 2026); the DOT-Chain/e-Points mechanics, the Danish model, the Swarmer Nasdaq listing, the ~89% Chinese-component dependency and the source-critical grading of the Fire Point (~60%) and Ukrspecsystems (~80%) claims come from a focused research synthesis of 2025-26 reporting (Kyiv Independent, Ukrainska Pravda, CSIS, Forbes Ukraine, Sacra). Wartime figures are largely company-stated; treat superlatives as attributed.

[^dii]: Drone Industry Insights, 2025 global drone funding data, cited via the landscape research; dual-use vs commercial split.

[^bubble]: Revenue, valuation and multiple figures, the \$49B 2025 defence-VC total, the profitable-vs-speculative split and the correction anatomy come from a focused financial research synthesis drawing on audited German/registry filings (via Sacra), company results, and market analysis (New Market Pitch); Papperger's "Legos" remark is from The Atlantic (March 2026). Private-company revenues are frequently third-party estimates. The same synthesis reports Quantum Systems' CEO publicly floating a merger with Stark, and the US restructuring of "Replicator" into a Defense Autonomous Warfare Group whose FY2027 budget request jumped to ~\$54.6B.

[^ground]: Ground-robot detail (Milrem THeMIS/HAVOC and the 60-vehicle EDGE order, ARX-Roboneers, Rheinmetall's Mission Master, the US Army's Ripsaw/RCV and S-MET mule competitions, and China's Norinco armed robots and DeepSeek-driven robot dogs) from a worldwide naval-and-terrestrial-drone research synthesis (2026).

[^blacksea]: The Magura (military-intelligence, HUR) and Sea Baby (security service, SBU) uncrewed-surface-vessel campaigns, plus the Toloka underwater line, per the same synthesis; the "sank multiple warships / first USV to down crewed aircraft" claims are Ukrainian-government-stated.

[^ugv]: Ukrainian UGV market size, the 25,000-plus H1 2026 order and 50,000-plus January-to-May missions from the [KSE Institute defence-tech market report](https://institute.kse.ua/wp-content/uploads/2026/03/the-ukrainian_defense_technology_market_eng_march_2026.pdf) (Mar 2026); the casualty-evacuation loss/success modelling from [BMJ Military Health](https://militaryhealth.bmj.com/content/early/2026/01/26/military-2025-003188); platform specs (Termit, MAUL, Vepr, Bandura) via a communications-and-kill-zone research synthesis.

[^chokehold]: Component market-share figures (~94% magnets, ~75% Li-ion cells, ~90% optics/IR, ~80% multirotors) via RUSI (Nov 2025), and China's export-control timeline, gallium/germanium licences (2023), antimony (Aug 2024), the Skydio battery block and Ukraine magnet redirect (Dec 2024), heavy rare earths terbium/dysprosium (Apr 2025), and the extraterritorial 0.1%-content rule (Oct 2025) that triggered a threatened 100% US tariff and a one-year truce, from a supply-chain-de-risking research synthesis.

[^supplychain]: The subsystem-by-subsystem shares (China / US / EU / rest-of-world) come from [RUSI's drone-supply-chain study](https://static.rusi.org/rp-drone-supply-chains-china-nov-2025.pdf) (Nov 2025) cross-referenced with component market-structure reports, via a supply-chain deep-dive research synthesis. Three details are worth keeping: Beijing weaponised the battery link by [ordering Skydio's cell supplier to cut ties](https://www.csis.org/analysis/why-chinas-uav-supply-chain-restrictions-weaken-ukraines-negotiating-power) over its Taiwan sales, forcing one-battery-per-drone rationing; the 2024 NDAA and the FCC [banned Chinese drone batteries](https://medium.com/@hayekesteloo/fcc-banned-foreign-drone-batteries-but-china-makes-99-of-them-c2d74e32801f) with no scaled Western pouch-cell line to replace them; and China's InfiRay and HikMicro cut thermal-core prices more than 60% with amorphous-silicon arrays, seizing the commercial market from FLIR. The [Energy Fuels / Vacuumschmelze](https://www.cruxinvestor.com/posts/energy-fuels-the-mine-to-magnet-pivot-why-the-1-9b-vac-deal-changes-everything) mine-to-magnet chain and [Neros' Project Millennium](https://www.tectonicdefense.com/meet-project-millennium-neros-250000-square-foot-drone-factory/) plant are the clearest de-risking moves.

[^leash]: The "Guarded Swarms" framework (a hardware-coded semantic-coordination layer, Topic-Based Communication Space Petri Nets mapped onto FPGA primitives, and analog OR-inhibition guard channels on the actuator lines), applied by Helsing, from [MDPI Future Internet](https://www.mdpi.com/1999-5903/18/1/64) and its [preprint](https://arxiv.org/html/2607.02376v1); Vyriy's four-stage "Popcorn" initiation board with a 48-hour deterministic self-destruct via [Ukrainska Pravda](https://www.pravda.com.ua/eng/news/2026/01/13/8015914/); Architect Labs' \$24M seed to AI-design ASICs via [BusinessWire](https://www.businesswire.com/news/home/20260618895194/en/Architect-Labs-Raises-%2424M-Seed-to-Democratize-Custom-Chip-Design). From two 2026 embedded-hardware research syntheses.

[^derisking]: The de-risking roster, Neros (Project Millennium, ~\$121M raised), Orqa, Uplift360 (Leonardo partnership); Lyten's lithium-sulfur play on ~\$5B of ex-Northvolt assets; Niron (iron-nitride), Noveon (recycling) and Energy Fuels' \$1.9B Vacuumschmelze purchase on magnets; Spain's Semidynamics on RISC-V; and the demand-side pumps (the Pentagon's ~\$1.1B Drone Dominance Program with its component "Gauntlet" phase-out, and the EU's €90B Ukraine loan), all from the same synthesis. The parity-vs-stuck verdict is theirs.

[^rowmap]: Rest-of-world profiles from a worldwide (ex-Europe) drone-industry research synthesis (2026): Israel's IAI (~\$7.4B revenue, ~\$33B backlog) and Elbit; Türkiye's Baykar (~\$2.5B revenue, 88% exported) and TAI (Anka, KAAN); the UAE's EDGE (~\$4.9B revenue, a \$7B Indonesia deal); South Korea's KAI (KF-21), Hanwha and Korean Air (KUS-FS MALE, LOWUS stealth wingman); Japan's Mitsubishi Heavy (flew Shield AI's Hivemind), Subaru and ACSL; India's ideaForge; and Taiwan's Thunder Tiger (Blue UAS-certified Overkill FPV). The IDF's pivot to ~\$6,000 night-capable FPVs, the ~\$47.4B-to-\$98.2B market projection, and Japan's de-DJI procurement shift are from the same synthesis.
