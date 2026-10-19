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
        original="const totalScore = Math.min(10, 1 + rawSum);",
        mutated="const totalScore = Math.min(10, rawSum === 0 ? 1 : rawSum);",
        test_target="tests.test_parity.SafeKidsEnriqParityTests.test_r2_exhaustive_243_grid_and_400_fuzz_parity_python_vs_js",
        why="Simulates R-2 bug where 1-pt rawSum collapses to 1/10 instead of 2/10.",
    ),
    Mutant(
        name="r2_shift_low_stimulus_tier_boundary",
        file="public/app.js",
        original="if (totalScore <= 3) {",
        mutated="if (totalScore < 3) {",
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
        timeout=20,
    )


def main() -> int:
    print(f"Running baseline check across {len(MUTANTS)} target tests...")
    baseline = subprocess.run(
        [sys.executable, "-m", "unittest", "tests/test_parity.py"],
        cwd=str(REPO_ROOT),
        capture_output=True,
        text=True,
        timeout=30,
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
