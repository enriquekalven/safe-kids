#!/usr/bin/env python3
"""Fabrication, AI-Slop, Placeholder & Unsafe DOM Guard (Laws 1, 2, 5, 8).

Scans production code and documentation for:
- Placeholder people/companies (`Jane Doe`, `John Smith`, `Acme`)
- Lorem ipsum filler
- Fake AI accuracy claims (`99.9% AI Accuracy`, `Unleash the Power of`)
- Random UI number generation (`Math.random()`)
- Unsafe DOM sinks (`innerHTML =`, `outerHTML =`, `document.write(`, `window.alert(`)
- Explicit fake-data markers (`TODO(fake)`, `FAKE_DATA`)
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent

SKIP_DIRS = frozenset(
    {".git", ".firebase", "node_modules", "__pycache__", ".pytest_cache", ".ruff_cache", ".venv", "venv"}
)
SKIP_FILES = frozenset(
    {
        "forbid_fabrication.py",
        "test_parity.py",
        "test_no_real_names.py",
        "test_docs_integrity.py",
        "mutation_check.py",
    }
)

# (Regex, violation_name, product_code_only)
RULES: list[tuple[re.Pattern[str], str, bool]] = [
    (re.compile(r"\b(Jane|John)\s+(Doe|Smith)\b"), "placeholder_person_name", False),
    (re.compile(r"\bAcme\b"), "placeholder_company_name", False),
    (re.compile(r"\b(lorem ipsum|dolor sit amet)\b", re.I), "lorem_ipsum_filler", False),
    (re.compile(r"\b(mock|fake|sample|dummy)_(balance|payment|tenant|transaction|cost|metric)s?\b", re.I),
     "fake_fixture_in_repo", False),
    (re.compile(r"Math\.random\(\)"), "random_invented_number_in_ui", True),
    (re.compile(r"\bTODO\(fake\)|\bFAKE_DATA\b"), "explicit_fake_data_marker", False),
    (re.compile(r"\b99\.9%\s+AI\s+Accuracy\b|\bUnleash\s+the\s+Power\s+of\b", re.I), "ai_slop_marketing_trope", False),
    (re.compile(r"\.(innerHTML|outerHTML)\s*="), "unsafe_dom_innerhtml_assignment", True),
    (re.compile(r"\bdocument\.write\s*\("), "unsafe_document_write", True),
    (re.compile(r"\b(window\.)?(alert|confirm|prompt)\s*\("), "blocking_browser_dialog", True),
]


def scan_text_for_fabrication(text: str, is_product_code: bool = True) -> list[str]:
    """Pure validator returning a list of fabrication/slop rule violations in `text`."""
    violations: list[str] = []
    for pattern, rule_name, product_only in RULES:
        if product_only and not is_product_code:
            continue
        m = pattern.search(text)
        if m:
            violations.append(f"{rule_name}: matched {m.group(0)!r}")
    return violations


def scan_repository(root: Path = REPO_ROOT) -> list[str]:
    hits: list[str] = []
    for path in sorted(root.rglob("*")):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if not path.is_file() or path.name in SKIP_FILES:
            continue
        data = path.read_bytes()
        if b"\x00" in data[:4096]:
            continue
        text = data.decode("utf-8", errors="ignore")
        rel = path.relative_to(root)
        is_product = rel.parts[0] == "public" if rel.parts else False
        for v in scan_text_for_fabrication(text, is_product_code=is_product):
            hits.append(f"{rel}: {v}")
    return hits


def main() -> int:
    hits = scan_repository(REPO_ROOT)
    if hits:
        print("FAIL: forbid_fabrication detected violations:", file=sys.stderr)
        for h in hits:
            print(f"  - {h}", file=sys.stderr)
        return 1
    print("OK: forbid_fabrication passed (0 placeholder/AI-slop/DOM-sink violations).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
