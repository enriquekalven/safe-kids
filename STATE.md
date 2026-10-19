# SafeKids Portal — Repository Delivery State (`STATE.md`)

**Last Updated**: 2026-04-12  
**Live Hosting Target**: `https://safe-kids.web.app` (Firebase Project `project-maui`, Hosting Site `safe-kids`)  
**Current Verification Status**: **PASS** (17/17 offline unit & parity tests, 5/5 mutation kills, 0 fabrication violations, 0 PII/customer tokens)

---

## 1. Truthful Delivery Summary

| Capability Surface | Status | Verification Evidence |
| :--- | :--- | :--- |
| **SEM-10 Deterministic Scoring Engine (`SafeKidsCore.computeSem10Score`)** | **SHIPPED & VERIFIED** | Exhaustive 243-point ($3^5$) state grid + 400 seeded adversarial fuzz cases verified between Python and Node.js in [`tests/test_parity.py`](tests/test_parity.py) |
| **Interactive SEM-10 Self-Audit Calculator (`#sem-calculator`)** | **SHIPPED & VERIFIED** | All 15 `.calc-opt-btn` buttons across 5 `.calc-dim-box` groups + `#calc-reset-btn` verified end-to-end against real `public/index.html` markup |
| **28 Curated Low-Stimulus YouTube Channels (Section 3)** | **SHIPPED & VERIFIED** | 28/28 channel entries reconciled with canonical SEM-10 breakdown (`Base 1 + Pacing • Visual • Audio • Pressure • Reward`) + JSON/CSV/Clipboard export |
| **33 Educator-Approved Low-Stimulus Games (Section 4)** | **SHIPPED & VERIFIED** | 33/33 game entries reconciled with canonical SEM-10 breakdown + 1-click JSON/CSV/Summary export toolbar |
| **OWASP CSV Formula Injection Defense & Clipboard Fallback** | **SHIPPED & VERIFIED** | `sanitizeCsvCell` neutralizes `=`, `+`, `-`, `@`, `\t`, `\r` prefixes; clipboard rejection falls back cleanly to `.txt` download |
| **Intent-Aware State Persistence (`localStorage`)** | **SHIPPED & VERIFIED** | `MUST_PERSIST` directory filters (`safekids_channel_age_filter`, `safekids_game_age_filter`, `safekids_game_domain_filter`) validated against strict allow-lists; `MUST_RESET_ON_RELOAD` calculator labeled in UI |

---

## 2. Correction Log (Enriq Law 1 — No Fabrication / Radical Honesty)

> **Correction (2026-04-12)**: Prior to this `enriq-next` hardening pass, `public/app.js` (`setupSemCalculator()`) queried `calcContainer.querySelectorAll(".calc-options")`, whereas `public/index.html` rendered `.calc-dim-box` and `.calc-opt-group`. As a result, clicking any of the 15 SEM-10 calculator option buttons or the `Reset Calculator` button in live production (`https://safe-kids.web.app`) was a silent no-op. In addition, the calculator's `rawSum === 0 ? 1 : rawSum` formula mapped both `0`-point and `1`-point raw sums to `1/10` (omitting the `Base 1` screen floor for `rawSum >= 1`), and all 28 channel badges hardcoded `Host/Ad: 1/2` instead of the canonical 5-dimension SEM-10 breakdown. All three defects are now fixed, locked by [`tests/test_parity.py`](tests/test_parity.py), and guarded by fault-injected mutants in [`tools/sim/mutation_check.py`](tools/sim/mutation_check.py).

---

## 3. Open Risks & Unverified Assumptions by Role

All unverified domain hypotheses are tracked in [`assumptions.json`](assumptions.json) with `"status": "ASSUMPTION"` and `"verified": false`:

1. **Clinical & Pediatric Media Research Lead (`ASM-001`, `ASM-002`)**:
   - The SEM-10 composite cutoffs (Low `1–3/10`, Moderate `4–6/10`, High `7–10/10`) synthesize published pediatric literature (`JAMA Pediatrics`, Lillard & Peterson 2011, Radesky et al. 2020) into a practical parent rubric, but the composite weights themselves have not been prospectively validated as a clinical diagnostic instrument.
2. **Privacy & Family Systems Architect (`ASM-003`)**:
   - SafeKids Portal is intentionally a zero-backend, zero-telemetry static web application (`100% client-side`). It cannot enforce OS-level or router-level blocks directly; parents must apply the documented Family Link, Screen Time, FreeTube, or NextDNS configurations on their own devices.
3. **Curated Directory Maintainer (`ASM-004`)**:
   - Third-party YouTube channels or game publishers could alter monetization or introduce ads after curation. Quarterly re-verification of all 28 channels and 33 games is required.
