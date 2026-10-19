# SafeKids Portal — Verification, Parity & Mutation Testing Guide (`docs/TESTING.md`)

All tests in this repository execute **100% offline** in `< 2s` under [`tests/network_guard.py`](../tests/network_guard.py), which monkeypatches `socket.socket.connect`, `socket.socket.connect_ex`, `socket.create_connection`, and `socket.getaddrinfo` to raise `ExternalNetworkBlockedError` on any non-loopback connection attempt.

---

## 1. Quick Verification Commands

Run the complete verification gate via [`Makefile`](../Makefile):

```bash
make verify
```

Or invoke each verification layer directly:

```bash
# 1. Static AST & token scanner (Law 1, Law 2, Law 8)
python3 tools/ci/forbid_fabrication.py

# 2. Full unit, parity, PII-hygiene & docs-integrity suite (17 tests across 3 suites)
python3 -m unittest discover -s tests -v

# 3. 5-mutant fault-injection harness against public/app.js (Law 5)
python3 tools/sim/mutation_check.py
```

---

## 2. Test Suite Inventory & Requirement Map

| Test Suite | Test Method | Laws Enforced | What It Verifies |
| :--- | :--- | :--- | :--- |
| [`tests/test_parity.py`](../tests/test_parity.py) | `SafeKidsEnriqParityTests.test_network_guard_blocks_external_connections` | Law 6 | Proves `socket.create_connection(("8.8.8.8", 53))` and `socket.getaddrinfo("example.com", 443)` raise `ExternalNetworkBlockedError`. |
| [`tests/test_parity.py`](../tests/test_parity.py) | `SafeKidsEnriqParityTests.test_r1_sem10_calculator_buttons_update_score_and_reset` | Law 4, Law 8 | Parses real [`public/index.html`](../public/index.html) `.calc-dim-box` markup, clicks `2 pts` across all 5 dimensions (`10/10 — High Stimulus`), clicks `1 pt` on Pacing (`2/10`), and clicks `#calc-reset-btn` (`1/10`). |
| [`tests/test_parity.py`](../tests/test_parity.py) | `SafeKidsEnriqParityTests.test_r2_all_28_channels_and_33_games_reconcile_with_sem10_oracle` | Law 4, Law 7 | Verifies all 28 channels and 33 games in [`public/app.js`](../public/app.js) match `python_compute_sem10` and `SafeKidsCore.computeSem10Score` with zero `Host/Ad:` drift. |
| [`tests/test_parity.py`](../tests/test_parity.py) | `SafeKidsEnriqParityTests.test_r2_exhaustive_243_grid_and_400_fuzz_parity_python_vs_js` | Law 7 | Runs all $3^5 = 243$ valid dimension states + 400 seeded (`random.Random(42)`) malformed/adversarial inputs across Python and Node.js (`643/643` bit-identical matches). |
| [`tests/test_parity.py`](../tests/test_parity.py) | `SafeKidsEnriqParityTests.test_r3_csv_formula_injection_and_negative_verifier` | Law 5, Law 8 | Verifies OWASP CSV formula neutralization (`=`, `+`, `-`, `@`, `\t`, `\r`, leading whitespace/NBSP), negative verifier detection, Section 4 Games JSON/CSV export, and clipboard rejection fallback. |
| [`tests/test_parity.py`](../tests/test_parity.py) | `SafeKidsEnriqParityTests.test_r4_intent_aware_persistence_and_allowlist_validation` | Law 8, Law 9 | Verifies `MUST_PERSIST` filters (`safekids_channel_age_filter`, `safekids_game_age_filter`, `safekids_game_domain_filter`), allow-list rejection of injected values, and `MUST_RESET_ON_RELOAD` calculator behavior. |
| [`tests/test_parity.py`](../tests/test_parity.py) | `SafeKidsEnriqParityTests.test_r5_high_trust_ui_tabular_nums_and_xss_safe_dom` | Law 8, Law 11 | Verifies `font-variant-numeric: tabular-nums` in [`public/styles.css`](../public/styles.css), solid `#0f172a` `.logo-icon`, and zero `innerHTML` usage in [`public/app.js`](../public/app.js). |
| [`tests/test_no_real_names.py`](../tests/test_no_real_names.py) | `AccountHygieneAndPiiGuardTests.*` (4 tests) | Law 5, Law 10 | Scans all tracked files against SHA-256 forbidden customer digests, checks `projects.txt` absence and `firebase.json` `hosting.ignore`, and proves negative verifiers fire on synthetic tokens. |
| [`tests/test_docs_integrity.py`](../tests/test_docs_integrity.py) | `DocsMatchCodeIntegrityTests.*` (6 tests) | Law 4, Law 5, Law 12 | Verifies all contract files, `assumptions.json` schema, 8 review axes, `R-1`..`R-6` AST test resolution, Markdown fences/links/anchors, and README directory tree parity. |

---

## 3. Mutation Harness Summary (`tools/sim/mutation_check.py`)

[`tools/sim/mutation_check.py`](../tools/sim/mutation_check.py) injects 5 targeted single-fault mutations into [`public/app.js`](../public/app.js) inside an isolated temporary copy and requires `5/5` (`100%`) kills:

1. `r1_revert_calculator_selector_to_dead_calc_options` -> **KILLED** by `test_r1_sem10_calculator_buttons_update_score_and_reset`
2. `r2_drop_base_1_screen_floor_in_sem10_oracle` -> **KILLED** by `test_r2_exhaustive_243_grid_and_400_fuzz_parity_python_vs_js`
3. `r2_shift_low_stimulus_tier_boundary` -> **KILLED** by `test_r2_exhaustive_243_grid_and_400_fuzz_parity_python_vs_js`
4. `r3_disable_csv_formula_injection_guard` -> **KILLED** by `test_r3_csv_formula_injection_and_negative_verifier`
5. `r4_bypass_localstorage_allowlist_validation` -> **KILLED** by `test_r4_intent_aware_persistence_and_allowlist_validation`
