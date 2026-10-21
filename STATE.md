# SafeKids Portal — Repository Delivery State (`STATE.md`)

**Last Updated**: 2026-04-12  
**Live Hosting Target**: `https://safe-kids.web.app` (Firebase Project `project-maui`, Hosting Site `safe-kids`)  
**Current Verification Status**: **PASS** (25/25 offline unit & parity tests, 7/7 mutation kills, 0 fabrication violations, 0 PII/customer tokens)

---

## 1. Truthful Delivery Summary

| Capability Surface | Status | Verification Evidence |
| :--- | :--- | :--- |
| **SEM-10 & NFI-10 Deterministic Scoring Engines (`computeSem10Score`, `computeNfi10Score`)** | **SHIPPED & VERIFIED** | Dual exhaustive 243-point ($3^5$) state grids + 400 seeded adversarial fuzz cases each (`1,286/1,286` total parity matches) verified between Python and Node.js in [`tests/test_parity.py`](tests/test_parity.py) |
| **Interactive SEM-10 & NFI-10 Self-Audit Calculators (`#sem-calculator`, `#food-calculator`)** | **SHIPPED & VERIFIED** | All 15 `.calc-opt-btn` buttons across 5 `.calc-dim-box` groups + all 15 `.food-opt-btn` buttons across 5 `.food-dim-box` groups verified end-to-end against real `public/index.html` markup |
| **Left-Panel App-Shell Workspace & Global Header Age Bar (`setupWorkspaceTabs`, `setupGlobalAgeBar`)** | **SHIPPED & VERIFIED** | Sticky 296px left navigation panel grouping all 10 sections into 7 focused tabs (`overview`, `science`, `channels`, `games`, `nutrition`, `listen`, `lockdown`) + `all` Full Handbook mode, Global Header Age Selector Bar (`#global-age-bar`), and allow-listed `safekids_active_tab` persistence verified in [`tests/test_parity.py`](tests/test_parity.py) |
| **Mobile-First Parent Infographic View, 6 Pillar Posters & Lightbox (`setupInfographicExperience`)** | **SHIPPED & VERIFIED** | 6 custom illustrated parent infographic posters (`infographic-nourish-staples.jpg`, `infographic-nourish-swaps.jpg`, `infographic-watch-channels.jpg`, `infographic-play-games.jpg`, `infographic-listen-audio.jpg`, `infographic-lockdown-shield.jpg`), screenshot-ready 4-quadrant flashcard grids across all 5 pillars, `📸 2-Min Infographic View` toggle (`#btn-toggle-infographic-mode`), fullscreen zoom/save lightbox (`#infographic-lightbox`), and sticky 6-tab mobile bottom bar (`#mobile-pillar-bar`) verified in [`tests/test_parity.py`](tests/test_parity.py) |
| **Calm Tech Progressive Disclosure UX (`appendClinicalDrawer`, `setupClinicalDrawerToggleAll`)** | **SHIPPED & VERIFIED** | Compact 3-Second Glance card fronts across all 119 cards (`28` Watch + `33` Play + `32` Nourish + `26` Listen & Read) paired with 1-click `.card-clinical-drawer` drawers, global `#btn-toggle-clinical-details` button, and `<details class="showcase-collapsible">` section guides verified in [`tests/test_parity.py`](tests/test_parity.py) |
| **Editorial Illustrations & Dynamic Card Visual Banners (`public/images/*.jpg`)** | **SHIPPED & VERIFIED** | 17 custom illustrations (11 editorial banners + 6 high-resolution pillar infographic posters) across Hero 4-Pillar strip, 10 Recommendation cards, section showcase banners, and all 119 directory cards verified on disk in [`tests/test_parity.py`](tests/test_parity.py) |
| **28 Curated Low-Stimulus YouTube Channels (Pillar 1: Watch)** | **SHIPPED & VERIFIED** | 28/28 channel entries reconciled with canonical SEM-10 breakdown (`Base 1 + Pacing • Visual • Audio • Pressure • Reward`), PhD dialogic co-viewing bridges, and JSON/CSV/Clipboard export |
| **33 Educator-Approved Low-Stimulus Games (Pillar 2: Play)** | **SHIPPED & VERIFIED** | 33/33 game entries reconciled with canonical SEM-10 breakdown, Stopping-Cue & Transition Taxonomy filter (`discrete-levels`, `calm-toybox`, `deep-sandbox`, `co-play`), and 1-click JSON/CSV/Clipboard export |
| **32 Pediatrician- & Dietitian-Vetted Whole Foods & Swaps (Pillar 3: Nourish)** | **SHIPPED & VERIFIED** | 32/32 whole-food & lunchbox swap entries reconciled with canonical NFI-10 breakdown, UPF trap replaced, bioavailability synergy, CDC/AAP choking gates, MD picky-eater sensory food bridges, and 1-click Grocery Swap List / JSON / CSV export |
| **26 Screen-Free Audio, Podcasts & Living Books (Pillar 4: Listen & Read)** | **SHIPPED & VERIFIED** | 26/26 screen-free audio & book picks across 6 formats (`stem-podcast`, `story-podcast`, `audiobook-card`, `phonics-decodable`, `living-book`, `hardware-player`) reconciled with SEM-10 oracle, PhD dialogic reading prompts, and 1-click Reading/Audio List / JSON / CSV export |
| **OWASP CSV Formula Injection Defense & Clipboard Fallback** | **SHIPPED & VERIFIED** | `sanitizeCsvCell` neutralizes `=`, `+`, `-`, `@`, `\t`, `\r` prefixes across all 4 CSV exporters (Channels, Games, Whole Foods, Listen & Read); clipboard rejection falls back cleanly |
| **Intent-Aware State Persistence (`localStorage`)** | **SHIPPED & VERIFIED** | `MUST_PERSIST` workspace tab & directory filters (`safekids_active_tab`, `safekids_channel_age_filter`, `safekids_game_age_filter`, `safekids_game_domain_filter`, `safekids_game_stopping_filter`, `safekids_food_age_filter`, `safekids_food_domain_filter`, `safekids_listen_age_filter`, `safekids_listen_domain_filter`, `safekids_blueprint_age`) validated against strict allow-lists; `MUST_RESET_ON_RELOAD` calculators labeled in UI |

---

## 2. Correction Log (Enriq Law 1 — No Fabrication / Radical Honesty)

> **Correction (2026-04-12)**: Prior to this `enriq-next` hardening pass, `public/app.js` (`setupSemCalculator()`) queried `calcContainer.querySelectorAll(".calc-options")`, whereas `public/index.html` rendered `.calc-dim-box` and `.calc-opt-group`. As a result, clicking any of the 15 SEM-10 calculator option buttons or the `Reset Calculator` button in live production (`https://safe-kids.web.app`) was a silent no-op. In addition, the calculator's `rawSum === 0 ? 1 : rawSum` formula mapped both `0`-point and `1`-point raw sums to `1/10` (omitting the `Base 1` screen floor for `rawSum >= 1`), and all 28 channel badges hardcoded `Host/Ad: 1/2` instead of the canonical 5-dimension SEM-10 breakdown. All three defects are now fixed, and the portal has been expanded with Pillar 3 (**Wholesome Pediatric Nutrition & Brain-Fuel**: NFI-10 rubric, `#food-calculator`, 32 whole-food & swap cards, and 12 new clinical nutrition citations), locked by [`tests/test_parity.py`](tests/test_parity.py), and guarded by 7 fault-injected mutants in [`tools/sim/mutation_check.py`](tools/sim/mutation_check.py).

---

## 3. Open Risks & Unverified Assumptions by Role

All unverified domain hypotheses are tracked in [`assumptions.json`](assumptions.json) with `"status": "ASSUMPTION"` and `"verified": false`:

1. **Clinical & Pediatric Media / Nutrition Research Lead (`ASM-001`, `ASM-002`, `ASM-005`)**:
   - The SEM-10 and NFI-10 composite cutoffs (Low `1–3/10`, Moderate `4–6/10`, High `7–10/10`) synthesize published pediatric literature (`JAMA Pediatrics`, AAP Committee on Nutrition, NIH Hall et al. 2019, McCann et al. 2007) into practical parent screening rubrics, but the composite weights have not been prospectively validated as clinical diagnostic instruments.
2. **Privacy & Family Systems Architect (`ASM-003`)**:
   - SafeKids Portal is intentionally a zero-backend, zero-telemetry static web application (`100% client-side`). It cannot enforce OS-level or router-level blocks directly; parents must apply the documented Family Link, Screen Time, FreeTube, or NextDNS configurations on their own devices.
3. **Curated Directory Maintainer (`ASM-004`)**:
   - Third-party YouTube channels, game publishers, or commercial food formulations could change after curation. Quarterly re-verification of all 28 channels, 33 games, and 32 whole-food swap references is required.
