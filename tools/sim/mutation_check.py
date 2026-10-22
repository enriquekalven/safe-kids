#!/usr/bin/env python3
"""Fault-Injection Mutation Gate for `safe-kids-portal` (Law 5).

Injects realistic single-point defects into `public/app.js` and verifies that
`tests/test_parity.py` fails (`returncode != 0`) and kills 100% of mutants.
Restores the original source file atomically in a `finally:` block.
"""

from __future__ import annotations

from dataclasses import dataclass
import os
from pathlib import Path
import subprocess
import sys

REPO_ROOT = Path(__file__).resolve().parent.parent.parent


@dataclass(frozen=True)
class Mutant:
    name: str
    file: str
    original: str
    mutated: str
    test_target: str
    why: str


MUTANTS: tuple[Mutant, ...] = (
    Mutant(
        name="r1_revert_calculator_selector_to_dead_calc_options",
        file="public/app.js",
        original="const dimGroups = calcContainer.querySelectorAll('.calc-dim-box');",
        mutated="const dimGroups = calcContainer.querySelectorAll('.calc-options');",
        test_target="tests.test_parity.SafeKidsEnriqParityTests.test_r1_sem10_calculator_buttons_update_score_and_reset",
        why="Simulates R-1 bug where SEM-10 calculator queries non-existent .calc-options selector.",
    ),
    Mutant(
        name="r2_drop_base_1_screen_floor_in_sem10_oracle",
        file="public/app.js",
        original="const rawSum = pacing + visual + audio + pressure + reward;\n  const totalScore = Math.min(10, 1 + rawSum);",
        mutated="const rawSum = pacing + visual + audio + pressure + reward;\n  const totalScore = Math.min(10, rawSum === 0 ? 1 : rawSum);",
        test_target="tests.test_parity.SafeKidsEnriqParityTests.test_r2_exhaustive_243_grid_and_400_fuzz_parity_python_vs_js",
        why="Simulates R-2 bug where 1-pt rawSum collapses to 1/10 instead of 2/10.",
    ),
    Mutant(
        name="r2_shift_low_stimulus_tier_boundary",
        file="public/app.js",
        original="const rawSum = pacing + visual + audio + pressure + reward;\n  const totalScore = Math.min(10, 1 + rawSum);\n\n  let tier = 'high';\n  let stimulusClass = 'stimulus-high';\n  if (totalScore <= 3) {",
        mutated="const rawSum = pacing + visual + audio + pressure + reward;\n  const totalScore = Math.min(10, 1 + rawSum);\n\n  let tier = 'high';\n  let stimulusClass = 'stimulus-high';\n  if (totalScore < 3) {",
        test_target="tests.test_parity.SafeKidsEnriqParityTests.test_r2_exhaustive_243_grid_and_400_fuzz_parity_python_vs_js",
        why="Proves boundary check on SEM-10 Low Stimulus tier (3/10) is locked.",
    ),
    Mutant(
        name="r3_disable_csv_formula_injection_guard",
        file="public/app.js",
        original="if (/^[=+\\-@\\t\\r]/.test(trimmedLeading) || /^[=+\\-@\\t\\r]/.test(normalized)) {",
        mutated="if (false) {",
        test_target="tests.test_parity.SafeKidsEnriqParityTests.test_r3_csv_formula_injection_and_negative_verifier",
        why="Simulates R-3 bug where CSV export leaves =CMD|... formula prefixes unneutralized.",
    ),
    Mutant(
        name="r4_bypass_localstorage_allowlist_validation",
        file="public/app.js",
        original="return allowedSet.has(stored) ? stored : fallback;",
        mutated="return stored || fallback;",
        test_target="tests.test_parity.SafeKidsEnriqParityTests.test_r4_intent_aware_persistence_and_allowlist_validation",
        why="Simulates R-4 bug where corrupted/injected localStorage filter state bypasses allow-list validation.",
    ),
    Mutant(
        name="r7_drop_base_1_floor_in_nfi10_oracle",
        file="public/app.js",
        original="const rawSum = matrix + glycemic + nutrients + additives + texture;\n  const totalScore = Math.min(10, 1 + rawSum);",
        mutated="const rawSum = matrix + glycemic + nutrients + additives + texture;\n  const totalScore = Math.min(10, rawSum === 0 ? 1 : rawSum);",
        test_target="tests.test_parity.SafeKidsEnriqParityTests.test_r7_nfi10_exhaustive_243_grid_and_400_fuzz_parity_python_vs_js",
        why="Proves NFI-10 whole-food oracle Base 1 + 5x2 math is locked against off-by-one drift.",
    ),
    Mutant(
        name="r7_break_food_calculator_selector",
        file="public/app.js",
        original="const dimGroups = calcContainer.querySelectorAll('.food-dim-box');",
        mutated="const dimGroups = calcContainer.querySelectorAll('.food-options');",
        test_target="tests.test_parity.SafeKidsEnriqParityTests.test_r7_food_calculator_buttons_persistence_and_csv_export",
        why="Proves NFI-10 interactive food label auditor button binding is locked.",
    ),
    Mutant(
        name="r11_skip_saved_language_on_load",
        file="public/app.js",
        original="  if (currentLanguage !== 'en') {\n    applyPortalLanguage(currentLanguage, { persist: false });\n  }",
        mutated="  if (false) {\n    applyPortalLanguage(currentLanguage, { persist: false });\n  }",
        test_target="tests.test_parity.SafeKidsEnriqParityTests.test_r11_dark_mode_and_multilingual_i18n_switcher",
        why="Simulates returning ES/ZH/JA/KO users getting English chrome because the saved language is never applied.",
    ),
    Mutant(
        name="r11_bypass_language_allowlist",
        file="public/app.js",
        original="const lang = ALLOWED_LANGUAGES.has(rawLang) ? rawLang : 'en';",
        mutated="const lang = rawLang || 'en';",
        test_target="tests.test_parity.SafeKidsEnriqParityTests.test_r11_dark_mode_and_multilingual_i18n_switcher",
        why="Simulates a tampered <select> value flowing into the language controls unvalidated.",
    ),
    Mutant(
        name="r11_drop_dark_theme_persistence",
        file="public/app.js",
        original="applyPortalTheme(nextTheme, { persist: true });",
        mutated="applyPortalTheme(nextTheme, { persist: false });",
        test_target="tests.test_parity.SafeKidsEnriqParityTests.test_r11_dark_mode_and_multilingual_i18n_switcher",
        why="Simulates dark mode silently resetting to light on every reload.",
    ),
    Mutant(
        name="r12_revert_spanish_choking_quarters",
        file="public/app.js",
        original="cortar uvas y tomates cherry en cuartos a lo largo",
        mutated="cortar uvas y tomates cherry a lo largo",
        test_target="tests.test_parity.SafeKidsEnriqParityTests.test_r12_i18n_dictionary_parity_clinical_safety_and_print_safe_dark_mode",
        why="Simulates the Spanish choking-hazard rule regressing from quartering to halving grapes.",
    ),
    Mutant(
        name="r12_leak_dark_theme_into_print",
        file="public/styles.css",
        original="@media screen {\n:root[data-theme=\"dark\"],\nbody.dark-mode {",
        mutated="@media all {\n:root[data-theme=\"dark\"],\nbody.dark-mode {",
        test_target="tests.test_parity.SafeKidsEnriqParityTests.test_r12_i18n_dictionary_parity_clinical_safety_and_print_safe_dark_mode",
        why="Simulates dark-mode colors leaking into the printed caregiver fridge sheet.",
    ),
)


def atomic_write(target: Path, content: str) -> None:
    tmp = target.with_name(f".{target.name}.{os.getpid()}.tmp")
    tmp.write_text(content, encoding="utf-8")
    os.replace(tmp, target)


def run_test(test_target: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, "-m", "unittest", test_target],
        cwd=str(REPO_ROOT),
        capture_output=True,
        text=True,
        timeout=30,
    )


def main() -> int:
    print(f"Running baseline check across {len(MUTANTS)} target tests...")
    baseline = subprocess.run(
        [sys.executable, "-m", "unittest", "tests/test_parity.py"],
        cwd=str(REPO_ROOT),
        capture_output=True,
        text=True,
        timeout=90,
    )
    if baseline.returncode != 0:
        print("FAIL: Baseline tests must pass before running mutation gate:\n" + baseline.stderr, file=sys.stderr)
        return 1

    killed = 0
    survived: list[str] = []

    for m in MUTANTS:
        path = REPO_ROOT / m.file
        original_source = path.read_text(encoding="utf-8")
        count = original_source.count(m.original)
        if count != 1:
            print(
                f"FAIL: Mutant {m.name} target snippet count={count} (expected 1) in {m.file}",
                file=sys.stderr,
            )
            return 1

        mutated_source = original_source.replace(m.original, m.mutated, 1)
        try:
            atomic_write(path, mutated_source)
            proc = run_test(m.test_target)
            if proc.returncode != 0 and ("FAILED" in proc.stderr or "AssertionError" in proc.stderr):
                killed += 1
                print(f"  [KILLED] {m.name} ({m.why})")
            else:
                survived.append(m.name)
                print(f"  [SURVIVED] {m.name}!", file=sys.stderr)
        finally:
            atomic_write(path, original_source)

    print(f"\nMutation Gate Summary: {killed}/{len(MUTANTS)} mutants killed (100% required).")
    if survived:
        print(f"FAIL: Survived mutants: {survived}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
