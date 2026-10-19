# ADR 0001: Deterministic SEM-10 Rubric Oracle, Zero-InnerHTML DOM Rendering, and OWASP-Safe Client Exports

- **Status**: Accepted
- **Date**: 2026-04-12
- **Related Issues / Ledger IDs**: `R-1`, `R-2`, `R-3`, `R-4`, `R-5`, `R-6`

---

## 1. Context

SafeKids Portal (`https://safe-kids.web.app`) helps parents, educators, and pediatric clinicians evaluate children's YouTube channels and interactive games using the **SEM-10 (Stimulus & Executive-Function Metric, 1–10 Scale)** rubric. During our ground-truth audit (`enriq-next` Step 1 & Step 2), we discovered three classes of systemic drift:

1. **DOM/Selector Drift (`R-1`)**: [`public/app.js`](../../public/app.js) queried `.calc-options` while [`public/index.html`](../../public/index.html) used `.calc-dim-box`, making the interactive SEM-10 calculator non-functional in production.
2. **Cross-Layer Formula Drift (`R-2`)**: The interactive calculator used `rawSum === 0 ? 1 : rawSum` (collapsing `rawSum = 1` into `1/10` instead of `Base 1 + 1 = 2/10`), all 28 channels hardcoded `Host/Ad: 1/2`, and all 33 games ordered dimensions as `Pacing • Audio • Visual` instead of the Section 2 Rubric order (`Pacing • Visual • Audio • Pressure • Reward`).
3. **Export & State Hygiene Gaps (`R-3`, `R-4`)**: CSV export lacked OWASP formula-injection neutralization (`=`, `+`, `-`, `@`, `\t`, `\r`), clipboard writes lacked a rejection fallback for restricted contexts, Section 4 (Games) lacked JSON/CSV export tools, and directory filters did not persist across page reloads.

---

## 2. Decision

1. **Single Canonical SEM-10 Oracle (`SafeKidsCore.computeSem10Score`)**:
   - Define `clampDimension(val)` mapping any input to `{0, 1, 2}` and `computeSem10Score(dims)` computing `totalScore = Math.min(10, 1 + pacing + visual + audio + pressure + reward)`.
   - Enforce a single canonical breakdown string across all 28 channels, all 33 games, and the live calculator:
     `Base 1 + Pacing: P/2 • Visual: V/2 • Audio: A/2 • Pressure: U/2 • Reward: R/2 (Total: T/10)`.
2. **Zero-`innerHTML` DOM Rendering**:
   - Construct all dynamic cards and badges exclusively via `document.createElement` and `textContent` (`el()` helper in [`public/app.js`](../../public/app.js)), enforced by [`tools/ci/forbid_fabrication.py`](../../tools/ci/forbid_fabrication.py).
3. **OWASP CSV Sanitization & Clipboard Download Fallback**:
   - Sanitize every exported CSV cell via `SafeKidsCore.sanitizeCsvCell(val)` (prefixing `' ` whenever the raw or whitespace-trimmed string starts with `=`, `+`, `-`, `@`, `\t`, or `\r`) and wrap `navigator.clipboard.writeText` in `copyWithFallback()` so rejected clipboard promises automatically download a `.txt` file.
4. **Intent-Aware Persistence**:
   - Persist directory filters (`safekids_channel_age_filter`, `safekids_game_age_filter`, `safekids_game_domain_filter`) in `localStorage` guarded by strict allow-lists (`VALID_AGE_FILTERS`, `VALID_GAME_DOMAINS`), while keeping `#sem-calculator` ephemeral (`MUST_RESET_ON_RELOAD`) with an explicit `SIMULATED • WHAT-IF PREVIEW (RESETS ON RELOAD)` badge.

---

## 3. Consequences

- **Positive**: 100% mathematical reconciliation across the Section 2 Rubric, Section 3 Channels (`28`), Section 4 Games (`33`), and the live SEM-10 Calculator (`643/643` grid + fuzz parity in [`tests/test_parity.py`](../../tests/test_parity.py)); `5/5` fault-injected mutants killed in [`tools/sim/mutation_check.py`](../../tools/sim/mutation_check.py).
- **Trade-off**: Adding a new channel or game requires specifying its 5 SEM-10 dimensions so [`tests/test_parity.py`](../../tests/test_parity.py) can verify its `semScore`, `stimulus`, and `semBreakdown` against the oracle before deployment.
