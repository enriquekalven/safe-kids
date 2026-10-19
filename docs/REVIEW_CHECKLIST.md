# Enriq-Next Review Checklist & Regression Ledger

This checklist records the 8 Fixed Review Axes and the permanent `R-1`..`R-6` Regression Ledger for SafeKids Portal. Every ledger entry maps to an automated test in [`tests/`](../tests/) verified by [`tests/test_docs_integrity.py`](../tests/test_docs_integrity.py).

---

## 1. Eight Fixed Review Axes

### Axis 1: Silent Failure & Error Handling
- **Requirement**: No bare `catch {}` blocks or unhandled Promise rejections when browser APIs (`navigator.clipboard`, `localStorage`) are restricted by sandboxed iframes, private browsing, or strict permissions.
- **Implementation**: `copyWithFallback()` in [`public/app.js`](../public/app.js) catches clipboard rejection and falls back to `downloadFile(..., "text/plain;charset=utf-8")`. `readPersistedFilter()` and `writePersistedFilter()` guard `localStorage` access with safe fallback to `"all"`.
- **Verification**: `tests/test_parity.py::SafeKidsEnriqParityTests.test_r3_csv_formula_injection_and_negative_verifier` and `tests/test_parity.py::SafeKidsEnriqParityTests.test_r4_intent_aware_persistence_and_allowlist_validation`.

### Axis 2: Cross-Layer Mathematical Reconciliation
- **Requirement**: The SEM-10 scoring formula (`Base 1 + pacing + visual + audio + pressure + reward`, clamped to `[1, 10]`, Low `1–3`, Moderate `4–6`, High `7–10`) must reconcile identically across the Section 2 Rubric table, the live SEM-10 Calculator, all 28 YouTube channels, and all 33 educational games.
- **Implementation**: Canonical `computeSem10Score()` in [`public/app.js`](../public/app.js) computes `totalScore = Math.min(10, 1 + rawSum)` and formats `Base 1 + Pacing: X/2 • Visual: X/2 • Audio: X/2 • Pressure: X/2 • Reward: X/2 (Total: Y/10)`.
- **Verification**: `tests/test_parity.py::SafeKidsEnriqParityTests.test_r2_all_28_channels_and_33_games_reconcile_with_sem10_oracle` and `tests/test_parity.py::SafeKidsEnriqParityTests.test_r2_exhaustive_243_grid_and_400_fuzz_parity_python_vs_js`.

### Axis 3: Exhaustive Grid + Seeded Fuzz Parity
- **Requirement**: All $3^5 = 243$ valid SEM-10 dimension combinations plus 400 seeded (`random.Random(42)`) adversarial/malformed inputs (`NaN`, `null`, `-99`, `999`, `"2"`, `{}`) must produce bit-identical results between the Python reference oracle and `public/app.js`.
- **Implementation**: `SafeKidsCore.clampDimension()` and `SafeKidsCore.computeSem10Score()` in [`public/app.js`](../public/app.js).
- **Verification**: `tests/test_parity.py::SafeKidsEnriqParityTests.test_r2_exhaustive_243_grid_and_400_fuzz_parity_python_vs_js`.

### Axis 4: Security, XSS & Injection Immunity
- **Requirement**: Zero unsafe HTML interpolation (`innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`) in dynamic rendering, and full OWASP CSV formula injection neutralization (`=`, `+`, `-`, `@`, `\t`, `\r`, including after leading whitespace/non-breaking spaces) on all CSV exports.
- **Implementation**: DOM nodes constructed via `createElement` + `textContent` (`el()` helper in [`public/app.js`](../public/app.js)); CSV cells sanitized via `SafeKidsCore.sanitizeCsvCell()`.
- **Verification**: `tests/test_parity.py::SafeKidsEnriqParityTests.test_r3_csv_formula_injection_and_negative_verifier` and `tests/test_parity.py::SafeKidsEnriqParityTests.test_r5_high_trust_ui_tabular_nums_and_xss_safe_dom`.

### Axis 5: Intent-Aware State Persistence
- **Requirement**: User-selected directory filters (`MUST_PERSIST`) must survive page reloads via `localStorage` with strict allow-list validation against corrupted/injected values, while the What-If SEM-10 Self-Audit Calculator (`MUST_RESET_ON_RELOAD`) must reset cleanly to `1/10` on reload and display an explicit simulation badge.
- **Implementation**: `VALID_AGE_FILTERS` and `VALID_GAME_DOMAINS` allow-lists in [`public/app.js`](../public/app.js) + `SIMULATED • WHAT-IF PREVIEW (RESETS ON RELOAD)` badge in [`public/index.html`](../public/index.html).
- **Verification**: `tests/test_parity.py::SafeKidsEnriqParityTests.test_r4_intent_aware_persistence_and_allowlist_validation`.

### Axis 6: Offline Hermeticity & Zero Fabrication
- **Requirement**: Every test must execute in `< 5s` with outbound network sockets hard-blocked at the `socket.socket` layer, and zero `random.uniform`, `time.sleep`, or placeholder stubs in production or test code.
- **Implementation**: [`tests/network_guard.py`](../tests/network_guard.py) installed at the top of every test module + [`tools/ci/forbid_fabrication.py`](../tools/ci/forbid_fabrication.py) AST/token gate.
- **Verification**: `tests/test_parity.py::SafeKidsEnriqParityTests.test_network_guard_blocks_external_connections`.

### Axis 7: Account Hygiene & Zero Customer/PII Leakage
- **Requirement**: Zero real customer identifiers, internal project dumps, or personal emails in the repository tree, and `firebase.json` must ignore internal/test directories from static hosting deploys.
- **Implementation**: Removed accidental 902 KB `projects.txt` dump, hardened [`firebase.json`](../firebase.json) `hosting.ignore`, and locked SHA-256 forbidden token digests in [`tests/test_no_real_names.py`](../tests/test_no_real_names.py).
- **Verification**: `tests/test_no_real_names.py::AccountHygieneAndPiiGuardTests.test_no_restricted_names_or_local_paths_in_repo`.

### Axis 8: Docs-Match-Code & Mutation Survival Gate
- **Requirement**: All Markdown links, heading anchors, directory trees, headline counts (`28` channels, `33` games, `18` citations), and Regression Ledger test references must resolve on disk, and 100% of fault-injected mutants in [`tools/sim/mutation_check.py`](../tools/sim/mutation_check.py) must be killed.
- **Implementation**: [`tests/test_docs_integrity.py`](../tests/test_docs_integrity.py) and [`tools/sim/mutation_check.py`](../tools/sim/mutation_check.py).
- **Verification**: `tests/test_docs_integrity.py::DocsMatchCodeIntegrityTests.test_review_checklist_8_axes_and_locking_tests_exist`.

---

## 2. Permanent Regression Ledger (`R-1`..`R-6`)

| ID | Surface / File | Root Cause Found in Ground-Truth Audit | Remediation | Locking Test Reference |
| :--- | :--- | :--- | :--- | :--- |
| **R-1** | [`public/app.js`](../public/app.js) (`setupSemCalculator`) | `setupSemCalculator()` queried `.calc-options`, which did not exist in [`public/index.html`](../public/index.html) (which uses `.calc-dim-box` and `.calc-opt-group`), rendering all 15 calculator buttons and `#calc-reset-btn` dead in production. | Updated `setupSemCalculator()` to bind `.calc-dim-box[data-dim]` and `.calc-opt-btn[data-dim][data-pts]` and route through `computeSem10Score()`. | `tests/test_parity.py::SafeKidsEnriqParityTests.test_r1_sem10_calculator_buttons_update_score_and_reset` |
| **R-2** | [`public/app.js`](../public/app.js) (`computeSem10Score`, `channels`, `games`) | Calculator used `rawSum === 0 ? 1 : rawSum` (collapsing `rawSum=1` to `1/10` instead of `2/10`), all 28 channels hardcoded `Host/Ad: 1/2`, and all 33 games ordered dimensions as `Pacing • Audio • Visual` instead of Rubric order. | Implemented canonical `computeSem10Score()` (`min(10, 1 + rawSum)`) and reconciled all 28 channels and 33 games to `Base 1 + Pacing • Visual • Audio • Pressure • Reward`. | `tests/test_parity.py::SafeKidsEnriqParityTests.test_r2_all_28_channels_and_33_games_reconcile_with_sem10_oracle` |
| **R-3** | [`public/app.js`](../public/app.js) (`sanitizeCsvCell`, `setupExportTools`) | `escapeCsv()` did not neutralize OWASP CSV formula prefixes (`=`, `+`, `-`, `@`, `\t`, `\r`); clipboard failure lacked `.catch()` download fallback; Section 4 Games lacked JSON/CSV/Clipboard export buttons. | Added `sanitizeCsvCell()`, `copyWithFallback()`, and 1-click Games export buttons (`#btn-copy-games`, `#btn-export-games-json`, `#btn-export-games-csv`). | `tests/test_parity.py::SafeKidsEnriqParityTests.test_r3_csv_formula_injection_and_negative_verifier` |
| **R-4** | [`public/app.js`](../public/app.js), [`public/index.html`](../public/index.html) | Directory age/domain filters reset on every page reload instead of persisting (`MUST_PERSIST`), and `#sem-calculator` lacked an explicit `SIMULATED • WHAT-IF PREVIEW (RESETS ON RELOAD)` badge (`MUST_RESET_ON_RELOAD`). | Added allow-list validated `localStorage` persistence for channel/game filters and added the simulation badge to `#sem-calculator`. | `tests/test_parity.py::SafeKidsEnriqParityTests.test_r4_intent_aware_persistence_and_allowlist_validation` |
| **R-5** | [`public/styles.css`](../public/styles.css), [`public/app.js`](../public/app.js) | Numeric badges/tables lacked `font-variant-numeric: tabular-nums` and `.logo-icon` used a decorative multi-stop gradient instead of high-trust slate (`#0f172a`). | Enforced `font-variant-numeric: tabular-nums` across `.stat-num`, `.stimulus-tag`, `.sem-badge`, and `.rubric-table`, and updated `.logo-icon` to solid `#0f172a`. | `tests/test_parity.py::SafeKidsEnriqParityTests.test_r5_high_trust_ui_tabular_nums_and_xss_safe_dom` |
| **R-6** | [`firebase.json`](../firebase.json), [`tests/test_no_real_names.py`](../tests/test_no_real_names.py) | Working tree contained an untracked 902 KB `projects.txt` dump of GCP project IDs and lacked automated PII/customer-token and fabrication gates. | Deleted `projects.txt`, added `projects.txt`, `tests/**`, `tools/**`, `docs/**`, `STATE.md`, `assumptions.json`, and `Makefile` to `firebase.json` `hosting.ignore`, and added AST/digest gates. | `tests/test_no_real_names.py::AccountHygieneAndPiiGuardTests.test_no_projects_txt_dump_and_personal_firebase_boundary` |
