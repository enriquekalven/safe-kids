# SafeKids Portal — 3-Minute Smoking-Gun Demo Script (`docs/DEMO_SCRIPT.md`)

**Target Audience**: Parents, Pediatric Media Researchers, and Engineering Reviewers  
**Live URL**: `https://safe-kids.web.app` (or local `make preview` at `http://127.0.0.1:8080`)

---

## Minute 1: Automated Hermetic Verification & Mutation Gate (Terminal)

1. From the repository root, run the full `enriq-next` verification suite:
   ```bash
   make verify
   ```
2. **Smoking-Gun Observation**:
   - [`tools/ci/forbid_fabrication.py`](../tools/ci/forbid_fabrication.py) confirms `0` fabrication primitives, `0` unsafe `innerHTML` sinks, and `0` bare `catch` blocks across `14` files.
   - `unittest` runs `20` offline tests under [`tests/network_guard.py`](../tests/network_guard.py), including the $3^5 = 243$ exhaustive SEM-10 and NFI-10 state grids + `800` total seeded adversarial fuzz inputs (`1,286/1,286` Python-to-JavaScript parity matches across both rubrics).
   - [`tools/sim/mutation_check.py`](../tools/sim/mutation_check.py) injects `7` faults into [`public/app.js`](../public/app.js) across both SEM-10 and NFI-10 calculators, oracles, CSV sanitizers, and `localStorage` allow-lists, proving `7/7` (`100%`) are killed.

---

## Minute 2: Dual Interactive SEM-10 & NFI-10 Self-Audit Calculators (`#sem-calculator` & `#food-calculator`)

1. Open `https://safe-kids.web.app/#sem-calculator` (or `http://127.0.0.1:8080/#sem-calculator`).
2. Point out the explicit ephemeral simulation badges on both calculators: **`SIMULATED • WHAT-IF PREVIEW (RESETS ON RELOAD)`**.
3. Click **`1 pt: 5–15s scenes / Smooth pans`** under **1. Pacing & Scene Cuts** in `#sem-calculator`:
   - Observe the live score badge immediately update from **`SEM-10 Score: 1/10 — Low Stimulus (Approved)`** to **`SEM-10 Score: 2/10 — Low Stimulus (Approved)`**.
4. Scroll to **`#food-calculator`** (the **NFI-10 Food & Snack Label Auditor**):
   - Audit a supermarket fruit pouch (`NOVA-4 Ultra-Processed = 2 pts`, `>10% kcal Free/Liquid Sugar = 2 pts`, `Pulverized/Pureed Matrix = 2 pts`) and watch the badge jump to **`NFI-10 Score: 7/10 — Ultra-Processed Trap (Swap Out)`**.
   - Click **`Reset Food Auditor`** and confirm it resets cleanly to **`1/10 — Whole-Food Staple (Daily Fuel)`**.

---

## Minute 3: 3-Pillar Directories, Intent-Aware Persistence & OWASP-Safe Exports (`#channels`, `#games`, `#nutrition-directory`)

1. Scroll to **Section 3 (`#channels`)** and **Section 4 (`#games`)** to demonstrate persistent age/domain filters across `28` YouTube channels and `33` cognitive games.
2. Scroll to **Section 5 (`#nutrition-directory`) — Vetted Whole-Food & Brain-Fuel Directory (`32` Swaps)**:
   - Filter by **`Iron, Heme & Oxygenation`** or **`Lunchbox Swaps (0g Added Sugar)`** and reload the tab to prove `safekids_food_domain_filter` persists via allow-list validated `localStorage`.
   - Inspect any card to see the **Swap Out (Ultra-Processed Trap)** banner, **Bioavailability Synergy**, **CDC/AAP Choking & Allergen Safety**, and primary clinical citation (`AAP`, `ESPGHAN`, `LEAP Trial`, `Hall et al. NIH Inpatient RCT`).
   - Click **`Copy Grocery Swap List`**, **`Export Foods (JSON)`**, and **`Export Foods (CSV)`** to verify 1-click RFC 4180 + OWASP formula-safe exports.

