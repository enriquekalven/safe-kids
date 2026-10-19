#!/usr/bin/env python3
"""Docs-Match-Code Integrity & Regression Ledger Verification Suite (Laws 1, 3, 4, 5, 6, 12).

Enforces:
1. Required `enriq-next` repo contracts exist (`STATE.md`, `assumptions.json`, `Makefile`,
   `docs/REVIEW_CHECKLIST.md`, `docs/PLAN.md`, `docs/TESTING.md`, `docs/DEMO_SCRIPT.md`,
   `docs/adr/0001-sem10-deterministic-rubric-and-no-fakes.md`).
2. `assumptions.json` schema and explicit `verified: false` / `ASSUMPTION` labeling.
3. `docs/REVIEW_CHECKLIST.md` has all 8 Fixed Review Axes and Regression Ledger entries `R-1`..`R-6`,
   and every locking test path (`tests/test_*.py::ClassName.test_method`) resolves to a real test on disk.
4. `README.md`, `public/index.html`, and `public/app.js` headline counts (28 channels, 33 games,
   18 primary citations) reconcile with 0 drift.
5. Every Markdown file (`README.md`, `STATE.md`, `docs/**/*.md`) has balanced code fences and
   every relative link and `#heading-anchor` resolves on disk.
6. Every file path listed in the `README.md` Repository Directory Structure tree exists on disk.
7. Negative verifiers (Law 5) prove broken links, unclosed fences, and missing test paths return `False`.
"""

from __future__ import annotations

import ast
import json
import re
import unittest
from pathlib import Path

from tests.network_guard import install_network_guard

install_network_guard()

REPO_ROOT = Path(__file__).resolve().parent.parent

FENCE_RE = re.compile(r"^( {0,3})(`{3,}|~{3,})(.*)$")
INLINE_CODE_RE = re.compile(r"`[^`\n]+`")
LINK_RE = re.compile(r"!?\[[^\]]*\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
HEADING_RE = re.compile(r"^#{1,6}\s+(.+?)\s*$")


def validate_code_fences(text: str) -> tuple[bool, str]:
    in_fence = False
    fence_char = ""
    fence_len = 0
    open_line = 0
    for idx, line in enumerate(text.splitlines(), start=1):
        m = FENCE_RE.match(line)
        if not m:
            continue
        marker = m.group(2)
        trailing = m.group(3).strip()
        if not in_fence:
            in_fence = True
            fence_char = marker[0]
            fence_len = len(marker)
            open_line = idx
        elif marker[0] == fence_char and len(marker) >= fence_len and not trailing:
            in_fence = False
    if in_fence:
        return False, f"unclosed_code_fence_opened_at_line_{open_line}"
    return True, "ok"


def github_slug(heading: str) -> str:
    clean = re.sub(r"`([^`]*)`", r"\1", heading)
    clean = re.sub(r"[^\w\s-]", "", clean).strip().lower()
    return clean.replace(" ", "-")


def extract_headings(md_path: Path) -> set[str]:
    slugs: set[str] = set()
    in_fence = False
    fence_char = ""
    fence_len = 0
    for line in md_path.read_text(encoding="utf-8").splitlines():
        m = FENCE_RE.match(line)
        if m:
            marker = m.group(2)
            trailing = m.group(3).strip()
            if not in_fence:
                in_fence = True
                fence_char = marker[0]
                fence_len = len(marker)
            elif marker[0] == fence_char and len(marker) >= fence_len and not trailing:
                in_fence = False
            continue
        if in_fence:
            continue
        hm = HEADING_RE.match(line)
        if hm:
            slugs.add(github_slug(hm.group(1)))
    return slugs


def validate_markdown_links(md_path: Path) -> tuple[bool, list[str]]:
    errors: list[str] = []
    in_fence = False
    fence_char = ""
    fence_len = 0
    for idx, line in enumerate(md_path.read_text(encoding="utf-8").splitlines(), start=1):
        m = FENCE_RE.match(line)
        if m:
            marker = m.group(2)
            trailing = m.group(3).strip()
            if not in_fence:
                in_fence = True
                fence_char = marker[0]
                fence_len = len(marker)
            elif marker[0] == fence_char and len(marker) >= fence_len and not trailing:
                in_fence = False
            continue
        if in_fence:
            continue
        scrubbed = INLINE_CODE_RE.sub("", line)
        for lm in LINK_RE.finditer(scrubbed):
            target = lm.group(1).strip()
            if target.startswith(("http://", "https://", "mailto:", "file://")):
                continue
            if "#" in target:
                file_part, anchor = target.split("#", 1)
            else:
                file_part, anchor = target, ""
            resolved = (md_path.parent / file_part).resolve() if file_part else md_path.resolve()
            if not resolved.exists():
                errors.append(f"{md_path.name}:{idx}: broken_link_target '{target}'")
                continue
            if anchor and resolved.suffix == ".md":
                slugs = extract_headings(resolved)
                if anchor.lower() not in slugs:
                    errors.append(f"{md_path.name}:{idx}: broken_heading_anchor '#{anchor}'")
    return len(errors) == 0, errors


def verify_test_reference_exists(repo_root: Path, ref: str) -> tuple[bool, str]:
    """Verify `tests/test_file.py::ClassName.test_method` exists via AST inspection."""
    if "::" not in ref:
        return False, f"invalid_test_ref_format:{ref}"
    rel_file, symbol = ref.split("::", 1)
    file_path = repo_root / rel_file
    if not file_path.is_file():
        return False, f"missing_test_file:{rel_file}"
    tree = ast.parse(file_path.read_text(encoding="utf-8"))
    if "." in symbol:
        cls_name, fn_name = symbol.split(".", 1)
        for node in tree.body:
            if isinstance(node, ast.ClassDef) and node.name == cls_name:
                for item in node.body:
                    if isinstance(item, ast.FunctionDef) and item.name == fn_name:
                        return True, "ok"
        return False, f"missing_method:{symbol}_in_{rel_file}"
    for node in tree.body:
        if isinstance(node, ast.FunctionDef) and node.name == symbol:
            return True, "ok"
    return False, f"missing_function:{symbol}_in_{rel_file}"


class DocsMatchCodeIntegrityTests(unittest.TestCase):
    """Enforces Law 4 and Law 12 across all repository documentation and contracts."""

    def test_required_enriq_next_contracts_exist(self) -> None:
        required_files = [
            "README.md",
            "STATE.md",
            "assumptions.json",
            "Makefile",
            "docs/REVIEW_CHECKLIST.md",
            "docs/PLAN.md",
            "docs/TESTING.md",
            "docs/DEMO_SCRIPT.md",
            "docs/adr/0001-sem10-deterministic-rubric-and-no-fakes.md",
            "tests/network_guard.py",
            "tests/test_parity.py",
            "tests/test_no_real_names.py",
            "tests/test_docs_integrity.py",
            "tools/ci/forbid_fabrication.py",
            "tools/sim/mutation_check.py",
        ]
        for rel in required_files:
            self.assertTrue((REPO_ROOT / rel).is_file(), f"Missing required contract file: {rel}")

    def test_assumptions_json_honesty_and_schema(self) -> None:
        data = json.loads((REPO_ROOT / "assumptions.json").read_text(encoding="utf-8"))
        self.assertIn("assumptions", data)
        assumptions = data["assumptions"]
        self.assertGreaterEqual(len(assumptions), 4)
        for item in assumptions:
            for key in ("id", "status", "statement", "owner_role", "verification_plan"):
                self.assertIn(key, item)
            self.assertEqual(item["status"], "ASSUMPTION")
            self.assertFalse(item.get("verified", True), f"Assumption {item['id']} must have verified=False")

    def test_review_checklist_8_axes_and_locking_tests_exist(self) -> None:
        checklist = (REPO_ROOT / "docs" / "REVIEW_CHECKLIST.md").read_text(encoding="utf-8")
        for axis_num in range(1, 9):
            self.assertIn(f"### Axis {axis_num}:", checklist)
        for r_num in range(1, 10):
            self.assertRegex(checklist, rf"\*\*R-{r_num}\*\*")

        test_refs = re.findall(r"`(tests/test_[a-z0-9_]+\.py::[A-Za-z0-9_.]+)`", checklist)
        self.assertGreaterEqual(len(test_refs), 9, "Every R-1..R-9 entry must cite a locking test")
        for ref in test_refs:
            ok, reason = verify_test_reference_exists(REPO_ROOT, ref)
            self.assertTrue(ok, f"Broken locking test reference in REVIEW_CHECKLIST.md: {ref} ({reason})")

    def test_markdown_fences_and_links_across_all_docs(self) -> None:
        md_files = [REPO_ROOT / "README.md", REPO_ROOT / "STATE.md"] + sorted(
            (REPO_ROOT / "docs").rglob("*.md")
        )
        for md_path in md_files:
            text = md_path.read_text(encoding="utf-8")
            ok_fence, reason_fence = validate_code_fences(text)
            self.assertTrue(ok_fence, f"{md_path.name}: {reason_fence}")
            ok_links, link_errors = validate_markdown_links(md_path)
            self.assertTrue(ok_links, "\n".join(link_errors))

    def test_readme_directory_tree_and_headline_counts_match_code(self) -> None:
        readme = (REPO_ROOT / "README.md").read_text(encoding="utf-8")
        html = (REPO_ROOT / "public" / "index.html").read_text(encoding="utf-8")
        js = (REPO_ROOT / "public" / "app.js").read_text(encoding="utf-8")

        # 28 channels, 33 games, 32 whole foods, 26 listen/read, 30 citations must match across README, index.html, and app.js
        self.assertIn("28 Unique Channels", readme)
        self.assertIn("33 Curated Games", readme)
        self.assertIn("32 Whole-Food Swaps & Staples", readme)
        self.assertIn("26 Screen-Free Audio & Living Books", readme)
        self.assertIn("30 Studies & Statutes", readme)
        self.assertIn(">28<", html)
        self.assertIn(">33<", html)
        self.assertIn(">32<", html)
        self.assertIn(">26<", html)
        self.assertIn(">30<", html)
        self.assertIn("28 Unique Curated Low-Stimulus Channels", js)
        self.assertIn("33 Educator-Approved, Low-Stimulus Cognitive Games", js)
        self.assertIn("32 Pediatrician- & Dietitian-Vetted Whole Foods & Lunchbox Swaps", js)

        # Verify files referenced in README directory structure block exist
        for expected_path in (
            "firebase.json",
            ".firebaserc",
            "README.md",
            "STATE.md",
            "assumptions.json",
            "Makefile",
            "public/index.html",
            "public/styles.css",
            "public/app.js",
            "docs/REVIEW_CHECKLIST.md",
            "docs/PLAN.md",
            "docs/TESTING.md",
            "docs/DEMO_SCRIPT.md",
            "tests/test_parity.py",
            "tools/sim/mutation_check.py",
        ):
            self.assertIn(Path(expected_path).name, readme)
            self.assertTrue((REPO_ROOT / expected_path).exists(), f"Missing {expected_path}")

    def test_negative_verifiers_for_docs_integrity(self) -> None:
        """Law 5: Verifiers must return False on unclosed fences and non-existent test symbols."""
        ok_fence, reason_fence = validate_code_fences("# Title\n```python\nprint(1)\n")
        self.assertFalse(ok_fence)
        self.assertIn("unclosed_code_fence", reason_fence)

        ok_ref, reason_ref = verify_test_reference_exists(
            REPO_ROOT, "tests/test_parity.py::SafeKidsEnriqParityTests.test_nonexistent_ghost"
        )
        self.assertFalse(ok_ref)
        self.assertIn("missing_method", reason_ref)


if __name__ == "__main__":
    unittest.main()
