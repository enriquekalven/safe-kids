# SafeKids Portal — Veteran SME Grill, Architecture Plan & Scale Matrix (`docs/PLAN.md`)

---

## 1. Veteran SME Adversarial Grill (Step 2)

Before writing or refactoring code, the repository was subjected to a 5-lens Veteran SME adversarial grill:

1. **Pediatric Neurodevelopment & Media Psychologist Lens**:
   - *Finding*: The Section 2 SEM-10 Rubric defined `Base 1 + 5 dimensions (0–2 pts each), capped at 10`, where `1–3/10` is Low Stimulus, `4–6/10` is Moderate Stimulus, and `7–10/10` is High Stimulus. However, `setupSemCalculator()` in [`public/app.js`](../public/app.js) computed `rawSum === 0 ? 1 : rawSum` (dropping the `Base 1` screen floor for `rawSum >= 1`), and all 28 channel cards hardcoded `Host/Ad: 1/2` regardless of whether a channel had zero host/ad pressure (`0/2`) or light sponsorship (`1/2`).
   - *Resolution*: Extracted `SafeKidsCore.computeSem10Score()` with strict `min(10, 1 + rawSum)` math and reconciled all 28 channels and 33 games to the canonical 5-dimension breakdown (`Base 1 + Pacing: X/2 • Visual: X/2 • Audio: X/2 • Pressure: X/2 • Reward: X/2 (Total: Y/10)`).
2. **Frontend DOM & Accessibility Systems Engineer Lens**:
   - *Finding*: `setupSemCalculator()` queried `.calc-options`, a selector that did not exist in [`public/index.html`](../public/index.html) (which uses `.calc-dim-box` and `.calc-opt-group`). All 15 calculator buttons and `#calc-reset-btn` were silent no-ops in live production.
   - *Resolution*: Re-bound `setupSemCalculator()` to `.calc-dim-box[data-dim]` and `.calc-opt-btn[data-dim][data-pts]` and locked the behavior against the real `public/index.html` DOM in [`tests/test_parity.py`](../tests/test_parity.py).
3. **Application Security & OWASP Auditor Lens**:
   - *Finding*: `escapeCsv()` wrapped strings in quotes but did not neutralize leading formula triggers (`=`, `+`, `-`, `@`, `\t`, `\r`), leaving exported CSV files vulnerable to spreadsheet formula execution if a field began with a formula prefix. Furthermore, `navigator.clipboard.writeText()` had no `.catch()` handler.
   - *Resolution*: Implemented `SafeKidsCore.sanitizeCsvCell()` with leading-whitespace-aware OWASP formula neutralization and `copyWithFallback()` automatic `.txt` download fallback.
4. **State Persistence & UX Honesty Lens**:
   - *Finding*: Parent filter selections (`#channel-filters`, `#game-age-filters`, `#game-domain-filters`) were lost on page refresh (`MUST_PERSIST` violation), while `#sem-calculator` lacked an explicit What-If reset badge (`MUST_RESET_ON_RELOAD`).
   - *Resolution*: Added allow-list validated `localStorage` persistence for directory filters and labeled `#sem-calculator` with `SIMULATED • WHAT-IF PREVIEW (RESETS ON RELOAD)`.
5. **Cloud Release & Account Hygiene Engineer Lens**:
   - *Finding*: An untracked 902 KB `projects.txt` file containing GCP project listings sat in the repo root.
   - *Resolution*: Deleted `projects.txt`, hardened [`firebase.json`](../firebase.json) `hosting.ignore`, and added [`tests/test_no_real_names.py`](../tests/test_no_real_names.py) and [`tools/ci/forbid_fabrication.py`](../tools/ci/forbid_fabrication.py).
6. **Pediatric Clinical Nutrition & Feeding Safety SME Lens (`R-7`)**:
   - *Finding*: Parents managing screen overstimulation simultaneously battle NOVA-4 ultra-processed supermarket snacks (pouches, extruded puffs, synthetic dyes, liquid sugars) that trigger glycemic crashes and undermine classroom executive function, while needing explicit CDC/AAP choking-modification and early-allergen guidance.
   - *Resolution*: Added the 10-Point Nutritional & Food-Matrix Integrity Rubric (**NFI-10**, `SafeKidsCore.computeNfi10Score()`), the interactive Food Label Auditor (`#food-calculator`), 32 curated whole-food swaps across 6 developmental domains (`#nutrition-directory`), and 12 peer-reviewed clinical nutrition citations (`#19`–`#30`, bringing total Bibliography to 30).

---

## 2. Why These Pieces & Alternative When Scale Changes

| Architectural Piece | Why Chosen for Current Scale (28 Channels, 33 Games, 32 Whole-Food Swaps, 30 Citations) | Alternative When Scale Changes (> 1,000 Curated Items or Multi-Editor Workflow) |
| :--- | :--- | :--- |
| **Static Zero-Dependency Vanilla JS (`public/app.js`)** | Zero build-step fragility, instant `< 50ms` client-side filtering, 100% inspectable DOM construction (`createElement` + `textContent`), and zero third-party npm supply-chain risk. | Pre-compiled static site generator (Eleventy/Astro) with build-time JSON schema validation and paginated static index shards. |
| **Universal UMD/Browser `SafeKidsCore` Module** | Allows the exact same `public/app.js` file to execute in the browser and be imported directly by Node.js in [`tests/test_parity.py`](../tests/test_parity.py) without transpilation. | Dedicated shared ES module package (`packages/safekids-core`) published with TypeScript declaration files. |
| **Client-Side Blob JSON/CSV Export (`sanitizeCsvCell`)** | Zero server round-trips, works offline after page load, and enforces OWASP formula neutralization deterministically across Channels, Games, and Whole-Food Swaps. | Signed server-side export endpoint with streaming RFC 4180 generation when datasets exceed browser memory (`> 50 MB`). |
| **Allow-List Validated `localStorage` Filter State** | Preserves parent age/domain filter choices across reloads (`safekids_channel_age_filter`, `safekids_game_age_filter`, `safekids_game_domain_filter`, `safekids_food_age_filter`, `safekids_food_domain_filter`) with zero cookies or tracking. | URL query-parameter state synced with `History.replaceState` for shareable filtered deep links across family devices. |
| **Python + Node Subprocess Cross-Runtime Parity Harness** | Verifies all $3^5 = 243$ SEM-10 and NFI-10 states, 800 total fuzz inputs, and real `public/index.html` DOM interactions in `< 1.5s` with zero external dependencies. | Headless Playwright browser matrix in CI when multi-page routing or WebGL canvas components are introduced. |

---

## 3. What Moves vs. What Stays Behind (Transplant & Deployment Boundary)

| Artifact / Directory | Deployed to Firebase Hosting (`public/`) | Stays Behind in Git / CI Verification Only | Rationale |
| :--- | :--- | :--- | :--- |
| [`public/index.html`](../public/index.html), [`public/styles.css`](../public/styles.css), [`public/app.js`](../public/app.js) | **MOVES (Deployed)** | Tested in CI | Production static web application served via Firebase global CDN (`https://safe-kids.web.app`). |
| [`firebase.json`](../firebase.json), [`.firebaserc`](../.firebaserc) | Deployment config | **STAYS BEHIND** | Configures cache headers, clean URLs, and `hosting.ignore` rules so internal files never ship to CDN. |
| [`STATE.md`](../STATE.md), [`assumptions.json`](../assumptions.json), [`Makefile`](../Makefile), [`docs/`](../docs/) | Excluded via `hosting.ignore` | **STAYS BEHIND** | Engineering governance, ADRs, regression ledger, and smoking-gun demo script. |
| [`tests/`](../tests/), [`tools/`](../tools/) | Excluded via `hosting.ignore` | **STAYS BEHIND** | Offline hermetic test suite, network socket blocker, AST fabrication scanner, and 7-mutant fault-injection harness. |

