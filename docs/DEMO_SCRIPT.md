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
   - `unittest` runs `17` offline tests under [`tests/network_guard.py`](../tests/network_guard.py), including the $3^5 = 243$ exhaustive SEM-10 state grid + `400` seeded adversarial fuzz inputs (`643/643` Python-to-JavaScript parity matches).
   - [`tools/sim/mutation_check.py`](../tools/sim/mutation_check.py) injects `5` faults into [`public/app.js`](../public/app.js) (including reverting `.calc-dim-box` to the prior broken `.calc-options` selector) and proves `5/5` (`100%`) are killed.

---

## Minute 2: Interactive SEM-10 Self-Audit Calculator & State Honesty (`#sem-calculator`)

1. Open `https://safe-kids.web.app/#sem-calculator` (or `http://127.0.0.1:8080/#sem-calculator`).
2. Point out the explicit ephemeral simulation badge: **`SIMULATED • WHAT-IF PREVIEW (RESETS ON RELOAD)`**.
3. Click **`1 pt: 5–15s scenes / Smooth pans`** under **1. Pacing & Scene Cuts**:
   - Observe the live score badge immediately update from **`SEM-10 Score: 1/10 — Low Stimulus (Approved)`** to **`SEM-10 Score: 2/10 — Low Stimulus (Approved)`** (`Base 1 + Pacing: 1/2 • Visual: 0/2 • Audio: 0/2 • Pressure: 0/2 • Reward: 0/2 (Total: 2/10)`).
4. Click **`2 pts`** across all 5 dimensions:
   - Observe the badge turn red (**`SEM-10 Score: 10/10 — High Stimulus (Block / Avoid)`**).
5. Click **`Reset Calculator`** (or reload the page) and confirm it returns cleanly to **`1/10`**.

---

## Minute 3: Intent-Aware Filter Persistence & OWASP-Safe JSON/CSV Export (`#channels` & `#games`)

1. Scroll to **Section 3 (`#channels`)** and click **`Preschool (3–5)`**:
   - Reload the browser tab and observe that **`Preschool (3–5)`** remains active (`safekids_channel_age_filter` persisted in `localStorage` with allow-list validation).
2. Scroll to **Section 4 (`#games`)**, filter by **`Logic & Math`**, and click **`Export Games (CSV)`** and **`Export Games (JSON)`**:
   - Inspect the downloaded CSV and JSON files: every game's `semBreakdown` matches the canonical 5-dimension SEM-10 rubric (`Base 1 + Pacing • Visual • Audio • Pressure • Reward`), and every CSV cell is RFC 4180 quoted and protected against OWASP formula injection.
