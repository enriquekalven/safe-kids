#!/usr/bin/env python3
"""SHA-256 Digest Customer/PII Blocker & Personal Account Hygiene Suite (Laws 5, 6, 10).

Locks regression R-6:
1. Blocks restricted customer company tokens via SHA-256 digests (`BLOCKED_DIGESTS`).
2. Blocks local filesystem paths (`/Users/...`, `/home/...`) and live credentials/tokens.
3. Asserts `projects.txt` does not exist on disk and is blocked in both `.gitignore` and `firebase.json`.
4. Asserts `.firebaserc` targets the personal GCP project (`project-maui`) and `safe-kids` hosting site.
5. Includes negative verifier tests proving both `scan_text_for_restricted_tokens` and
   `scan_text_for_fabrication` fail closed on broken fixtures (Law 5).
"""

from __future__ import annotations

import hashlib
import json
import re
import unittest
from pathlib import Path

from tests.network_guard import install_network_guard
from tools.ci.forbid_fabrication import scan_repository, scan_text_for_fabrication

install_network_guard()

REPO_ROOT = Path(__file__).resolve().parent.parent

SKIP_DIRS = frozenset(
    {".git", ".firebase", "node_modules", "__pycache__", ".pytest_cache", ".ruff_cache", ".venv", "venv"}
)

# SHA-256 digests of lowercase restricted customer tokens (Dell, Ford, Zscaler, etc.)
BLOCKED_DIGESTS = frozenset(
    hashlib.sha256(bytes.fromhex(hx)).hexdigest()
    for hx in (
        "64656c6c",          # customer token 1
        "666f7264",          # customer token 2
        "7a7363616c6572",    # customer token 3
    )
)

LOCAL_PATH_RE = re.compile(r"(/Users/[A-Za-z0-9._-]+|/home/[A-Za-z0-9._-]+)")
SECRET_TOKEN_RE = re.compile(r"(ya29\.[A-Za-z0-9_-]{20,}|AIza[0-9A-Za-z_-]{35}|-----BEGIN [A-Z ]*PRIVATE KEY-----)")


def scan_text_for_restricted_tokens(text: str) -> list[str]:
    """Pure validator returning restricted token digests or local path/secret hits in `text`."""
    hits: list[str] = []
    lower_text = text.lower()
    for token in set(re.findall(r"[a-z0-9]+", lower_text)):
        digest = hashlib.sha256(token.encode("utf-8")).hexdigest()
        if digest in BLOCKED_DIGESTS:
            hits.append(f"restricted_token_sha256:{digest[:12]}")
    if LOCAL_PATH_RE.search(text):
        hits.append("leaked_local_filesystem_path")
    if SECRET_TOKEN_RE.search(text):
        hits.append("leaked_secret_or_token")
    return sorted(hits)


class AccountHygieneAndPiiGuardTests(unittest.TestCase):
    """Enforces Law 10 (Corporate vs Personal GCP boundary, SHA-256 token scan, public bundle hygiene)."""

    def test_no_restricted_names_or_local_paths_in_repo(self) -> None:
        hits: list[str] = []
        for path in sorted(REPO_ROOT.rglob("*")):
            if any(p in SKIP_DIRS for p in path.parts) or not path.is_file():
                continue
            if path.name == "test_no_real_names.py":
                continue
            data = path.read_bytes()
            if b"\x00" in data[:4096]:
                continue
            text = data.decode("utf-8", errors="ignore")
            for v in scan_text_for_restricted_tokens(text):
                hits.append(f"{path.relative_to(REPO_ROOT)}: {v}")
        self.assertEqual(hits, [], "Restricted customer/PII/path tokens found:\n" + "\n".join(hits))

    def test_no_projects_txt_dump_and_personal_firebase_boundary(self) -> None:
        """projects.txt must not exist on disk and firebase config must isolate public/ assets."""
        self.assertFalse(
            (REPO_ROOT / "projects.txt").exists(),
            "projects.txt corporate project list dump must not exist in safe-kids-portal",
        )
        firebaserc = json.loads((REPO_ROOT / ".firebaserc").read_text(encoding="utf-8"))
        self.assertEqual(firebaserc.get("projects", {}).get("default"), "project-maui")

        firebase_json = json.loads((REPO_ROOT / "firebase.json").read_text(encoding="utf-8"))
        hosting = firebase_json.get("hosting", {})
        self.assertEqual(hosting.get("site"), "safe-kids")
        self.assertEqual(hosting.get("public"), "public")
        ignore_list = set(hosting.get("ignore", []))
        for required_ignore in ("firebase.json", "**/.*", "**/node_modules/**", "projects.txt"):
            self.assertIn(required_ignore, ignore_list)

        # Public directory must contain ONLY index.html, styles.css, and app.js
        public_files = {p.name for p in (REPO_ROOT / "public").rglob("*") if p.is_file()}
        self.assertEqual(public_files, {"index.html", "styles.css", "app.js"})

    def test_forbid_fabrication_passes_across_repo(self) -> None:
        hits = scan_repository(REPO_ROOT)
        self.assertEqual(hits, [])

    def test_negative_verifiers_catch_restricted_tokens_and_fabrications(self) -> None:
        """Law 5: Every security/fabrication scanner rule must fail closed on broken fixtures."""
        restricted_word = bytes.fromhex("7a7363616c6572").decode("utf-8")
        hits_token = scan_text_for_restricted_tokens(f"Confidential deployment for {restricted_word} corp")
        self.assertTrue(any("restricted_token_sha256" in h for h in hits_token))

        hits_path = scan_text_for_restricted_tokens("File at /Users/enriq/.env leaked")
        self.assertIn("leaked_local_filesystem_path", hits_path)

        hits_fab = scan_text_for_fabrication(
            "<div>99.9% AI Accuracy for Jane Doe at Acme</div><script>el.innerHTML = x; alert(1);</script>",
            is_product_code=True,
        )
        self.assertGreaterEqual(len(hits_fab), 5)


if __name__ == "__main__":
    unittest.main()
