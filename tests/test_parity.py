#!/usr/bin/env python3
"""Cross-Engine Parity, DOM Wiring, Fuzzing & Negative-Verifier Suite (Laws 1, 2, 4, 5, 6, 7, 8).

Locks regressions R-1 through R-5:
- R-1: Interactive SEM-10 Calculator DOM selector wiring (.calc-dim-box vs dead .calc-options).
- R-2: Canonical SEM-10 mathematical parity across Python, JS, 28 channels, 33 games,
       all 243 (3^5) grid states, and 400 seeded adversarial fuzz cases.
- R-3: CSV formula-injection neutralization (=, +, -, @, \\t, \\r), clipboard error resilience,
       and 1-click export parity across both Channels and Educator-Approved Games.
- R-4: Intent-aware state persistence (MUST_PERSIST allow-list validation for directory filters
       vs. MUST_RESET_ON_RELOAD for the ephemeral SEM-10 self-audit calculator).
- R-5: High-Trust Instrument UI invariants (tabular-nums, SIMULATED preview badge, zero innerHTML/alert).
"""

from __future__ import annotations

import itertools
import json
import math
import random
import re
import subprocess
import unittest
from pathlib import Path
from typing import Any

from tests.network_guard import ExternalNetworkBlockedError, install_network_guard

install_network_guard()

REPO_ROOT = Path(__file__).resolve().parent.parent
INDEX_HTML = REPO_ROOT / "public" / "index.html"
APP_JS = REPO_ROOT / "public" / "app.js"
STYLES_CSS = REPO_ROOT / "public" / "styles.css"

VALID_AGE_FILTERS = frozenset(
    {"all", "toddler", "preschool", "early-elementary", "middle-elementary", "preteen"}
)
VALID_GAME_DOMAINS = frozenset({"all", "logic", "spatial", "coding", "sandbox", "stem", "sel"})
FORMULA_PREFIXES = ("=", "+", "-", "@", "\t", "\r")


# ---------------------------------------------------------------------------
# Python Reference Oracle for SEM-10 & CSV Sanitization (Law 7)
# ---------------------------------------------------------------------------
def clamp_dim(val: Any) -> int:
    """Deterministic dimension sanitizer: maps any input to integer in {0, 1, 2}."""
    if isinstance(val, bool) or val is None:
        return 0
    if isinstance(val, (int, float)):
        if math.isnan(val) or math.isinf(val):
            return 0
        num = int(math.floor(val + 0.5)) if val >= 0 else int(math.ceil(val - 0.5))
    elif isinstance(val, str):
        stripped = val.strip()
        if not re.match(r"^-?\d+$", stripped):
            return 0
        num = int(stripped)
    else:
        return 0
    return max(0, min(2, num))


def python_compute_sem10(dims: dict[str, Any]) -> dict[str, Any]:
    """Reference SEM-10 oracle: Base 1 screen floor + 5 dimensions (0..2 each), capped at 10."""
    pacing = clamp_dim(dims.get("pacing", 0))
    visual = clamp_dim(dims.get("visual", 0))
    audio = clamp_dim(dims.get("audio", 0))
    pressure = clamp_dim(dims.get("pressure", 0))
    reward = clamp_dim(dims.get("reward", 0))

    raw_sum = pacing + visual + audio + pressure + reward
    total_score = min(10, 1 + raw_sum)

    if total_score <= 3:
        tier = "low"
        css_class = "stimulus-low"
    elif total_score <= 6:
        tier = "med"
        css_class = "stimulus-med"
    else:
        tier = "high"
        css_class = "stimulus-high"

    breakdown = (
        f"Base 1 + Pacing: {pacing}/2 \u2022 Visual: {visual}/2 \u2022 "
        f"Audio: {audio}/2 \u2022 Pressure: {pressure}/2 \u2022 "
        f"Reward: {reward}/2 (Total: {total_score}/10)"
    )
    return {
        "pacing": pacing,
        "visual": visual,
        "audio": audio,
        "pressure": pressure,
        "reward": reward,
        "rawSum": raw_sum,
        "score": total_score,
        "scoreLabel": f"{total_score}/10",
        "tier": tier,
        "stimulusClass": css_class,
        "semBreakdown": breakdown,
    }


def python_sanitize_csv_cell(val: Any) -> str:
    """RFC 4180 quoting + OWASP CSV formula injection neutralization."""
    raw = "" if val is None else str(val)
    raw = raw.replace("\r\n", " ").replace("\r", " ").replace("\n", " ")
    stripped_leading = raw.lstrip(" \u00a0\u3000\u200b")
    if stripped_leading.startswith(FORMULA_PREFIXES) or raw.startswith(FORMULA_PREFIXES):
        raw = "'" + raw
    escaped = raw.replace('"', '""')
    return f'"{escaped}"'


def verify_csv_export_safety(csv_text: str) -> tuple[bool, str]:
    """Deterministic verifier checking that no CSV cell starts with an unquoted formula trigger."""
    for line_idx, line in enumerate(csv_text.splitlines(), start=1):
        cells = re.findall(r'"((?:[^"]|"")*)"', line)
        if not cells:
            return False, f"line_{line_idx}_missing_quoted_cells"
        for cell_idx, cell in enumerate(cells):
            unquoted = cell.replace('""', '"')
            trimmed = unquoted.lstrip(" \u00a0\u3000\u200b")
            if trimmed.startswith(FORMULA_PREFIXES):
                return False, f"unsafe_formula_prefix_at_line_{line_idx}_col_{cell_idx}"
    return True, "ok"


# ---------------------------------------------------------------------------
# Node.js Bridge for Running Real `public/app.js` & Real `public/index.html`
# ---------------------------------------------------------------------------
NODE_HARNESS_SCRIPT = r"""
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync(process.argv[1], 'utf8');
const jsCode = fs.readFileSync(process.argv[2], 'utf8');
const payload = JSON.parse(process.argv[3]);

// Minimal realistic DOM harnessed directly from real public/index.html
class MockElement {
  constructor(tagName, id = '', className = '', attrs = {}) {
    this.tagName = tagName.toUpperCase();
    this.id = id;
    this.className = className;
    this.attributes = { ...attrs };
    this.style = {};
    this.children = [];
    this.listeners = {};
    this._textContent = '';
    this.value = '';
    this.innerText = '';
    this.classList = {
      add: (...cls) => {
        const set = new Set(this.className.split(/\s+/).filter(Boolean));
        cls.forEach(c => set.add(c));
        this.className = [...set].join(' ');
      },
      remove: (...cls) => {
        const set = new Set(this.className.split(/\s+/).filter(Boolean));
        cls.forEach(c => set.delete(c));
        this.className = [...set].join(' ');
      },
      contains: (c) => this.className.split(/\s+/).filter(Boolean).includes(c)
    };
  }
  get textContent() {
    if (this.children.length > 0 && !this._textContent) {
      return this.children.map(c => c.textContent || '').join('');
    }
    return this._textContent;
  }
  set textContent(v) {
    this._textContent = String(v ?? '');
    this.innerText = this._textContent;
    this.children = [];
  }
  getAttribute(k) { return this.attributes[k] ?? null; }
  setAttribute(k, v) { this.attributes[k] = String(v); }
  appendChild(child) {
    if (child && child.isFragment) {
      this.children.push(...child.children);
    } else if (child) {
      this.children.push(child);
    }
    return child;
  }
  removeChild(child) {
    this.children = this.children.filter(c => c !== child);
  }
  replaceChildren(...nodes) {
    this.children = [];
    nodes.forEach(n => this.appendChild(n));
  }
  addEventListener(evt, fn) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(fn);
  }
  click() {
    (this.listeners['click'] || []).forEach(fn => fn({ currentTarget: this, target: this }));
  }
  triggerInput(val) {
    this.value = val;
    (this.listeners['input'] || []).forEach(fn => fn({ currentTarget: this, target: this }));
  }
  querySelectorAll(selector) {
    const results = [];
    const matchSel = (el, sel) => {
      if (sel.startsWith('.')) {
        const baseCls = sel.slice(1).split('[')[0];
        return el.classList.contains(baseCls);
      }
      return false;
    };
    const walk = (node) => {
      for (const child of node.children || []) {
        if (matchSel(child, selector)) results.push(child);
        walk(child);
      }
    };
    walk(this);
    return results;
  }
}

// Parse actual public/index.html to verify real DOM selectors and IDs exist
const elementsById = {};
const registerEl = (el) => { if (el.id) elementsById[el.id] = el; return el; };

const calcContainer = registerEl(new MockElement('div', 'sem-calculator', 'calc-card'));
// Extract real dimension boxes and their buttons from index.html
const dimBoxHeaderRegex = /<div\s+class="([^"]*calc-dim-box[^"]*)"\s+data-dim="([^"]+)">/g;
const allBtnRegex = /<button[^>]*class="([^"]*calc-opt-btn[^"]*)"[^>]*data-dim="([^"]+)"[^>]*data-pts="([^"]+)"[^>]*>([\s\S]*?)<\/button>/g;
const allButtonsByDim = {};
let bMatch;
while ((bMatch = allBtnRegex.exec(html)) !== null) {
  const d = bMatch[2];
  if (!allButtonsByDim[d]) allButtonsByDim[d] = [];
  allButtonsByDim[d].push({ cls: bMatch[1], dim: d, pts: bMatch[3], text: bMatch[4] });
}
let match;
while ((match = dimBoxHeaderRegex.exec(html)) !== null) {
  const boxCls = match[1];
  const dim = match[2];
  const boxEl = new MockElement('div', '', boxCls, { 'data-dim': dim });
  const optGroup = new MockElement('div', '', 'calc-opt-group');
  for (const bInfo of (allButtonsByDim[dim] || [])) {
    const btn = new MockElement('button', '', bInfo.cls, { 'data-dim': bInfo.dim, 'data-pts': bInfo.pts });
    btn.textContent = bInfo.text;
    optGroup.appendChild(btn);
  }
  boxEl.appendChild(optGroup);
  calcContainer.appendChild(boxEl);
}

registerEl(new MockElement('span', 'calc-score-badge', 'stimulus-tag stimulus-low'));
registerEl(new MockElement('span', 'calc-breakdown-text', 'sem-badge'));
registerEl(new MockElement('p', 'calc-verdict-desc', ''));
registerEl(new MockElement('button', 'calc-reset-btn', 'btn btn-outline btn-sm'));

registerEl(new MockElement('div', 'channel-grid', 'grid-3'));
registerEl(new MockElement('span', 'channel-count-badge', 'tag-badge'));
registerEl(new MockElement('input', 'channel-search', 'search-input'));
registerEl(new MockElement('button', 'btn-copy-urls', 'btn'));
registerEl(new MockElement('button', 'btn-export-json', 'btn'));
registerEl(new MockElement('button', 'btn-export-csv', 'btn'));

registerEl(new MockElement('div', 'game-grid', 'grid-3'));
registerEl(new MockElement('span', 'game-count-badge', 'tag-badge'));
registerEl(new MockElement('input', 'game-search', 'search-input'));

if (html.includes('id="btn-copy-games-urls"')) {
  registerEl(new MockElement('button', 'btn-copy-games-urls', 'btn'));
}
if (html.includes('id="btn-export-games-json"')) {
  registerEl(new MockElement('button', 'btn-export-games-json', 'btn'));
}
if (html.includes('id="btn-export-games-csv"')) {
  registerEl(new MockElement('button', 'btn-export-games-csv', 'btn'));
}

const channelFilterBtns = ['all', 'toddler', 'preschool', 'early-elementary', 'middle-elementary', 'preteen'].map(
  (f, idx) => new MockElement('button', '', idx === 0 ? 'filter-btn active' : 'filter-btn', { 'data-filter': f })
);
const gameAgeFilterBtns = ['all', 'toddler', 'preschool', 'early-elementary', 'middle-elementary', 'preteen'].map(
  (f, idx) => new MockElement('button', '', idx === 0 ? 'filter-btn active' : 'filter-btn', { 'data-filter': f })
);
const gameDomainFilterBtns = ['all', 'logic', 'spatial', 'coding', 'sandbox', 'stem', 'sel'].map(
  (f, idx) => new MockElement('button', '', idx === 0 ? 'filter-btn active' : 'filter-btn', { 'data-filter': f })
);

const storageMap = { ...(payload.initialStorage || {}) };
const localStorageMock = {
  getItem: (k) => Object.prototype.hasOwnProperty.call(storageMap, k) ? storageMap[k] : null,
  setItem: (k, v) => { storageMap[k] = String(v); },
  removeItem: (k) => { delete storageMap[k]; }
};

let lastClipboardText = null;
let downloads = [];
const domReadyCallbacks = [];

const documentMock = {
  addEventListener: (evt, fn) => { if (evt === 'DOMContentLoaded') domReadyCallbacks.push(fn); },
  getElementById: (id) => elementsById[id] || null,
  querySelectorAll: (sel) => {
    if (sel === '#channel-filters .filter-btn') return channelFilterBtns;
    if (sel === '#game-age-filters .filter-btn') return gameAgeFilterBtns;
    if (sel === '#game-domain-filters .filter-btn') return gameDomainFilterBtns;
    if (sel === '.copy-btn') return [];
    return [];
  },
  createElement: (tag) => new MockElement(tag),
  createElementNS: (ns, tag) => new MockElement(tag),
  createTextNode: (txt) => ({ textContent: String(txt) }),
  createDocumentFragment: () => ({ isFragment: true, children: [], appendChild(c) { this.children.push(c); } }),
  body: new MockElement('body')
};

const sandbox = {
  document: documentMock,
  window: { localStorage: localStorageMock },
  localStorage: localStorageMock,
  navigator: {
    clipboard: {
      writeText: (txt) => {
        if (payload.failClipboard) return Promise.reject(new Error('Clipboard blocked in sandboxed iframe'));
        lastClipboardText = txt;
        return Promise.resolve();
      }
    }
  },
  Blob: class { constructor(parts, opts) { this.content = parts.join(''); this.type = opts?.type; } },
  URL: {
    createObjectURL: (blob) => { downloads.push(blob); return 'blob:mock'; },
    revokeObjectURL: () => {}
  },
  setTimeout: (fn) => { fn(); return 1; },
  clearTimeout: () => {},
  console
};

vm.runInNewContext(jsCode + `\n;
globalThis.__exports = {
  channelsData,
  gamesData,
  computeSem10Score: typeof computeSem10Score === 'function' ? computeSem10Score : null,
  sanitizeCsvCell: typeof sanitizeCsvCell === 'function' ? sanitizeCsvCell : null,
};`, sandbox);

domReadyCallbacks.forEach(fn => fn());

// Simulate interactive calculator clicks if requested
if (payload.clickCalc) {
  for (const [dim, pts] of Object.entries(payload.clickCalc)) {
    const boxes = calcContainer.querySelectorAll('.calc-dim-box');
    const box = boxes.find(b => b.getAttribute('data-dim') === dim);
    if (box) {
      const btns = box.querySelectorAll('.calc-opt-btn');
      const targetBtn = btns.find(b => b.getAttribute('data-pts') === String(pts));
      if (targetBtn) targetBtn.click();
    }
  }
}

if (payload.clickResetAfter) {
  elementsById['calc-reset-btn'].click();
}

if (payload.clickChannelFilter) {
  const btn = channelFilterBtns.find(b => b.getAttribute('data-filter') === payload.clickChannelFilter);
  if (btn) btn.click();
}

if (payload.clickGameAgeFilter) {
  const btn = gameAgeFilterBtns.find(b => b.getAttribute('data-filter') === payload.clickGameAgeFilter);
  if (btn) btn.click();
}

if (payload.clickGameDomainFilter) {
  const btn = gameDomainFilterBtns.find(b => b.getAttribute('data-filter') === payload.clickGameDomainFilter);
  if (btn) btn.click();
}

if (payload.triggerExports) {
  if (elementsById['btn-export-csv']) elementsById['btn-export-csv'].click();
  if (elementsById['btn-export-json']) elementsById['btn-export-json'].click();
  if (elementsById['btn-copy-urls']) elementsById['btn-copy-urls'].click();
  if (elementsById['btn-export-games-csv']) elementsById['btn-export-games-csv'].click();
  if (elementsById['btn-export-games-json']) elementsById['btn-export-games-json'].click();
  if (elementsById['btn-copy-games-urls']) elementsById['btn-copy-games-urls'].click();
}

const evalResults = [];
if (payload.evalDimsList && sandbox.__exports.computeSem10Score) {
  for (const d of payload.evalDimsList) {
    evalResults.push(sandbox.__exports.computeSem10Score(d));
  }
}

const csvSanitizeResults = [];
if (payload.csvInputs && sandbox.__exports.sanitizeCsvCell) {
  for (const c of payload.csvInputs) {
    csvSanitizeResults.push(sandbox.__exports.sanitizeCsvCell(c));
  }
}

const out = {
  channelsCount: sandbox.__exports.channelsData.length,
  gamesCount: sandbox.__exports.gamesData.length,
  channelsData: sandbox.__exports.channelsData,
  gamesData: sandbox.__exports.gamesData,
  hasComputeSem10Score: Boolean(sandbox.__exports.computeSem10Score),
  hasSanitizeCsvCell: Boolean(sandbox.__exports.sanitizeCsvCell),
  calcScoreBadge: elementsById['calc-score-badge'].textContent,
  calcScoreClass: elementsById['calc-score-badge'].className,
  calcBreakdownText: elementsById['calc-breakdown-text'].textContent,
  calcVerdictDesc: elementsById['calc-verdict-desc'].textContent,
  renderedChannelCount: elementsById['channel-grid'].children.length,
  renderedGameCount: elementsById['game-grid'].children.length,
  channelBadgeText: elementsById['channel-count-badge'].textContent,
  gameBadgeText: elementsById['game-count-badge'].textContent,
  storageAfter: storageMap,
  downloads: downloads.map(d => ({ type: d.type, content: d.content })),
  lastClipboardText,
  hasGameExportButtons: Boolean(
    elementsById['btn-copy-games-urls'] &&
    elementsById['btn-export-games-json'] &&
    elementsById['btn-export-games-csv']
  ),
  evalResults,
  csvSanitizeResults
};

process.stdout.write(JSON.stringify(out));
"""


def run_node_harness(payload: dict[str, Any] | None = None) -> dict[str, Any]:
    proc = subprocess.run(
        ["node", "-e", NODE_HARNESS_SCRIPT, str(INDEX_HTML), str(APP_JS), json.dumps(payload or {})],
        capture_output=True,
        text=True,
        check=True,
        timeout=10,
    )
    return json.loads(proc.stdout)


class SafeKidsEnriqParityTests(unittest.TestCase):
    """Comprehensive verification suite locking R-1 through R-5."""

    def test_network_guard_blocks_external_connections(self) -> None:
        with self.assertRaises(ExternalNetworkBlockedError):
            import socket as _s

            _s.getaddrinfo("youtube.com", 443)

    # -----------------------------------------------------------------------
    # R-1: Interactive SEM-10 Calculator DOM Selector & Button Wiring
    # -----------------------------------------------------------------------
    def test_r1_sem10_calculator_buttons_update_score_and_reset(self) -> None:
        """Clicking .calc-opt-btn inside .calc-dim-box must update the live SEM-10 score."""
        res_high = run_node_harness(
            {
                "clickCalc": {
                    "pacing": 2,
                    "visual": 2,
                    "audio": 2,
                    "pressure": 1,
                    "reward": 2,
                }
            }
        )
        # Base 1 + 2+2+2+1+2 = 10/10 High Stimulus
        self.assertIn("10/10", res_high["calcScoreBadge"])
        self.assertIn("stimulus-high", res_high["calcScoreClass"])
        self.assertIn(
            "Base 1 + Pacing: 2/2 \u2022 Visual: 2/2 \u2022 Audio: 2/2 \u2022 Pressure: 1/2 \u2022 Reward: 2/2 (Total: 10/10)",
            res_high["calcBreakdownText"],
        )

        # Single 1-pt click (e.g. Visual: 1/2 like Sago Mini World) MUST be 2/10, not 1/10!
        res_two = run_node_harness({"clickCalc": {"visual": 1}})
        self.assertIn("2/10", res_two["calcScoreBadge"])
        self.assertIn("Total: 2/10", res_two["calcBreakdownText"])

        # Clicking Reset Calculator must return to 1/10 Ultra-Low baseline
        res_reset = run_node_harness(
            {"clickCalc": {"pacing": 2, "visual": 2, "reward": 2}, "clickResetAfter": True}
        )
        self.assertIn("1/10", res_reset["calcScoreBadge"])
        self.assertIn("stimulus-low", res_reset["calcScoreClass"])
        self.assertIn("Total: 1/10", res_reset["calcBreakdownText"])

    # -----------------------------------------------------------------------
    # R-2: Cross-Layer & Cross-Engine SEM-10 Parity (243 Grid + 400 Fuzz + Data)
    # -----------------------------------------------------------------------
    def test_r2_exhaustive_243_grid_and_400_fuzz_parity_python_vs_js(self) -> None:
        """All 243 (3^5) grid states and 400 seeded adversarial fuzz cases match between Python and JS."""
        grid_cases = [
            {"pacing": p, "visual": v, "audio": a, "pressure": pr, "reward": r}
            for p, v, a, pr, r in itertools.product([0, 1, 2], repeat=5)
        ]
        self.assertEqual(len(grid_cases), 243)

        rng = random.Random(20261018)
        weird_scalars: list[Any] = [
            0, 1, 2, -1, -999, 3, 42, 1.0, 1.9, -0.5,
            "0", "1", "2", " 1 ", "\u00a02\u3000", "\u200b1", "abc", "",
            None, True, False, [], {},
        ]
        fuzz_cases = [
            {
                k: rng.choice(weird_scalars)
                for k in ("pacing", "visual", "audio", "pressure", "reward")
            }
            for _ in range(400)
        ]

        all_cases = grid_cases + fuzz_cases
        res = run_node_harness({"evalDimsList": all_cases})
        self.assertTrue(res["hasComputeSem10Score"], "computeSem10Score must be exposed in app.js")
        js_results = res["evalResults"]
        self.assertEqual(len(js_results), len(all_cases))

        tiers_seen: set[str] = set()
        for idx, case in enumerate(all_cases):
            expected = python_compute_sem10(case)
            actual = js_results[idx]
            tiers_seen.add(expected["tier"])
            self.assertEqual(
                actual,
                expected,
                f"Parity mismatch at case {idx} ({case}): JS={actual} vs PY={expected}",
            )
        # Guard against vacuous sweep: all 3 tiers ('low', 'med', 'high') must be reached
        self.assertEqual(tiers_seen, {"low", "med", "high"})

    def test_r2_all_28_channels_and_33_games_reconcile_with_sem10_oracle(self) -> None:
        """Every channel and game in app.js must use the canonical SEM-10 breakdown and match the oracle."""
        res = run_node_harness()
        self.assertEqual(res["channelsCount"], 28)
        self.assertEqual(res["gamesCount"], 33)

        canonical_re = re.compile(
            r"^Base 1 \+ Pacing: ([012])/2 • Visual: ([012])/2 • "
            r"Audio: ([012])/2 • Pressure: ([012])/2 • Reward: ([012])/2 \(Total: (\d+)/10\)$"
        )

        for collection_name, items in (("channel", res["channelsData"]), ("game", res["gamesData"])):
            for item in items:
                name = item["name"]
                breakdown = item.get("semBreakdown", "")
                m = canonical_re.match(breakdown)
                self.assertIsNotNone(
                    m,
                    f"{collection_name} '{name}' does not match canonical SEM-10 format: {breakdown!r}",
                )
                assert m is not None
                dims = {
                    "pacing": int(m.group(1)),
                    "visual": int(m.group(2)),
                    "audio": int(m.group(3)),
                    "pressure": int(m.group(4)),
                    "reward": int(m.group(5)),
                }
                oracle = python_compute_sem10(dims)
                self.assertEqual(
                    item["stimulusScore"],
                    oracle["scoreLabel"],
                    f"{collection_name} '{name}' stimulusScore mismatch",
                )
                self.assertEqual(
                    item["stimulusClass"],
                    oracle["stimulusClass"],
                    f"{collection_name} '{name}' stimulusClass mismatch",
                )
                self.assertEqual(
                    breakdown,
                    oracle["semBreakdown"],
                    f"{collection_name} '{name}' semBreakdown mismatch",
                )

    # -----------------------------------------------------------------------
    # R-3: CSV Formula Injection Guard, Negative Verifier & Games Export Parity
    # -----------------------------------------------------------------------
    def test_r3_csv_formula_injection_and_negative_verifier(self) -> None:
        """sanitizeCsvCell must neutralize OWASP formula injection vectors, and verifier must catch raw formulas."""
        vectors = [
            "=CMD|' /C calc'!A0",
            "+SUM(A1:A10)",
            "-2+3+cmd|' /C calc'!A0",
            "@SUM(1+1)*cmd|' /C calc'!A0",
            "\t=1+1",
            "\r=1+1",
            "   =HYPERLINK(\"http://evil.tld\")",
            "\u00a0=IMPORTXML(A1,B1)",
            "Normal \"Quoted\" Title\nWith Newline",
        ]
        res = run_node_harness({"csvInputs": vectors, "triggerExports": True, "failClipboard": True})
        self.assertTrue(res["hasSanitizeCsvCell"], "sanitizeCsvCell must be exposed in app.js")
        self.assertTrue(res["hasGameExportButtons"], "Educator Games section must have 1-click export buttons")

        for raw, js_cell in zip(vectors, res["csvSanitizeResults"]):
            py_cell = python_sanitize_csv_cell(raw)
            self.assertEqual(js_cell, py_cell, f"CSV cell mismatch for {raw!r}")
            ok, reason = verify_csv_export_safety(js_cell)
            self.assertTrue(ok, f"Sanitized cell failed safety verifier ({reason}): {js_cell}")

        # Verify both Channel and Game CSV/JSON exports triggered and pass safety check
        csv_downloads = [d["content"] for d in res["downloads"] if "text/csv" in (d["type"] or "")]
        json_downloads = [d["content"] for d in res["downloads"] if "application/json" in (d["type"] or "")]
        self.assertEqual(len(csv_downloads), 2, "Expected both Channel CSV and Game CSV downloads")
        self.assertEqual(len(json_downloads), 2, "Expected both Channel JSON and Game JSON downloads")
        for csv_doc in csv_downloads:
            ok, reason = verify_csv_export_safety(csv_doc)
            self.assertTrue(ok, reason)

        # Law 5 Negative Verifier: broken CSV fixture with unescaped formula MUST return False
        broken_csv = '"Channel Name","YouTube URL"\n"=CMD|\' /C calc\'!A0","https://example.com"'
        ok_neg, reason_neg = verify_csv_export_safety(broken_csv)
        self.assertFalse(ok_neg)
        self.assertIn("unsafe_formula_prefix", reason_neg)

    # -----------------------------------------------------------------------
    # R-4: Intent-Aware State Persistence (MUST_PERSIST vs MUST_RESET_ON_RELOAD)
    # -----------------------------------------------------------------------
    def test_r4_intent_aware_persistence_and_allowlist_validation(self) -> None:
        """Directory filters persist with allow-list validation; SEM-10 calculator resets on reload."""
        res = run_node_harness(
            {
                "clickChannelFilter": "toddler",
                "clickGameAgeFilter": "preteen",
                "clickGameDomainFilter": "coding",
                "clickCalc": {"pacing": 2, "reward": 2},
            }
        )
        storage = res["storageAfter"]
        self.assertEqual(storage.get("safekids_channel_age_filter"), "toddler")
        self.assertEqual(storage.get("safekids_game_age_filter"), "preteen")
        self.assertEqual(storage.get("safekids_game_domain_filter"), "coding")
        # Calculator must NEVER persist to localStorage (MUST_RESET_ON_RELOAD)
        for k in storage:
            self.assertNotIn("calc", k.lower())
            self.assertNotIn("sem", k.lower())

        # Reload with malicious/corrupted localStorage values -> must fall back safely to 'all'
        res_corrupt = run_node_harness(
            {
                "initialStorage": {
                    "safekids_channel_age_filter": "<script>alert(1)</script>",
                    "safekids_game_age_filter": "__proto__",
                    "safekids_game_domain_filter": "DROP TABLE games;",
                }
            }
        )
        self.assertEqual(res_corrupt["renderedChannelCount"], 28)
        self.assertEqual(res_corrupt["renderedGameCount"], 33)

    # -----------------------------------------------------------------------
    # R-5: Anti-AI-Slop UI, Tabular Numerals & XSS-Safe DOM Invariants
    # -----------------------------------------------------------------------
    def test_r5_high_trust_ui_tabular_nums_and_xss_safe_dom(self) -> None:
        css = STYLES_CSS.read_text(encoding="utf-8")
        html = INDEX_HTML.read_text(encoding="utf-8")
        js = APP_JS.read_text(encoding="utf-8")

        self.assertIn("tabular-nums", css, "styles.css must enforce font-variant-numeric: tabular-nums")
        self.assertIn("SIMULATED", html, "index.html must include SIMULATED preview badge on SEM-10 calculator")
        self.assertNotRegex(js, r"\.(innerHTML|outerHTML)\s*=")
        self.assertNotRegex(js, r"\b(alert|confirm|prompt)\s*\(")


if __name__ == "__main__":
    unittest.main()
