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
VALID_FOOD_DOMAINS = frozenset(
    {"all", "brain-dha", "iron-focus", "steady-glucose", "bone-growth", "gut-immune", "lunchbox-swaps"}
)
VALID_LISTEN_DOMAINS = frozenset(
    {"all", "stem-podcast", "story-podcast", "audiobook-card", "phonics-decodable", "living-book", "hardware-player"}
)
FORMULA_PREFIXES = ("=", "+", "-", "@", "\t", "\r")


# ---------------------------------------------------------------------------
# Python Reference Oracles for SEM-10, NFI-10 & CSV Sanitization (Law 7)
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


def python_compute_nfi10(dims: dict[str, Any]) -> dict[str, Any]:
    """Reference NFI-10 oracle: Base 1 intake baseline + 5 food dimensions (0..2 each), capped at 10."""
    matrix = clamp_dim(dims.get("matrix", 0))
    glycemic = clamp_dim(dims.get("glycemic", 0))
    nutrients = clamp_dim(dims.get("nutrients", 0))
    additives = clamp_dim(dims.get("additives", 0))
    texture = clamp_dim(dims.get("texture", 0))

    raw_sum = matrix + glycemic + nutrients + additives + texture
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
        f"Base 1 + Matrix: {matrix}/2 \u2022 Glycemic: {glycemic}/2 \u2022 "
        f"Nutrients: {nutrients}/2 \u2022 Additives: {additives}/2 \u2022 "
        f"Texture: {texture}/2 (Total: {total_score}/10)"
    )
    return {
        "matrix": matrix,
        "glycemic": glycemic,
        "nutrients": nutrients,
        "additives": additives,
        "texture": texture,
        "rawSum": raw_sum,
        "score": total_score,
        "scoreLabel": f"{total_score}/10",
        "tier": tier,
        "stimulusClass": css_class,
        "nfiBreakdown": breakdown,
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
        return Boolean(el && el.classList && el.classList.contains(baseCls));
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

// Parse #food-calculator and #food-grid from index.html
const foodCalcContainer = registerEl(new MockElement('div', 'food-calculator', 'calc-card'));
const foodDimBoxHeaderRegex = /<div\s+class="([^"]*food-dim-box[^"]*)"\s+data-food-dim="([^"]+)">/g;
const allFoodBtnRegex = /<button[^>]*class="([^"]*food-opt-btn[^"]*)"[^>]*data-food-dim="([^"]+)"[^>]*data-pts="([^"]+)"[^>]*>([\s\S]*?)<\/button>/g;
const allFoodButtonsByDim = {};
let fbMatch;
while ((fbMatch = allFoodBtnRegex.exec(html)) !== null) {
  const fd = fbMatch[2];
  if (!allFoodButtonsByDim[fd]) allFoodButtonsByDim[fd] = [];
  allFoodButtonsByDim[fd].push({ cls: fbMatch[1], dim: fd, pts: fbMatch[3], text: fbMatch[4] });
}
let fMatch;
while ((fMatch = foodDimBoxHeaderRegex.exec(html)) !== null) {
  const boxCls = fMatch[1];
  const dim = fMatch[2];
  const boxEl = new MockElement('div', '', boxCls, { 'data-food-dim': dim });
  const optGroup = new MockElement('div', '', 'calc-opt-group');
  for (const bInfo of (allFoodButtonsByDim[dim] || [])) {
    const btn = new MockElement('button', '', bInfo.cls, { 'data-food-dim': bInfo.dim, 'data-pts': bInfo.pts });
    btn.textContent = bInfo.text;
    optGroup.appendChild(btn);
  }
  boxEl.appendChild(optGroup);
  foodCalcContainer.appendChild(boxEl);
}

registerEl(new MockElement('span', 'food-calc-score-badge', 'stimulus-tag stimulus-low'));
registerEl(new MockElement('span', 'food-calc-breakdown-text', 'sem-badge'));
registerEl(new MockElement('p', 'food-calc-verdict-desc', ''));
registerEl(new MockElement('button', 'food-calc-reset-btn', 'btn btn-outline btn-sm'));

registerEl(new MockElement('div', 'food-grid', 'grid-3'));
registerEl(new MockElement('span', 'food-count-badge', 'tag-badge'));
registerEl(new MockElement('input', 'food-search', 'search-input'));

if (html.includes('id="btn-copy-foods-swaps"')) {
  registerEl(new MockElement('button', 'btn-copy-foods-swaps', 'btn'));
}
if (html.includes('id="btn-export-foods-json"')) {
  registerEl(new MockElement('button', 'btn-export-foods-json', 'btn'));
}
if (html.includes('id="btn-export-foods-csv"')) {
  registerEl(new MockElement('button', 'btn-export-foods-csv', 'btn'));
}

registerEl(new MockElement('div', 'listen-grid', 'grid-3'));
registerEl(new MockElement('span', 'listen-count-badge', 'tag-badge'));
registerEl(new MockElement('input', 'listen-search', 'search-input'));
if (html.includes('id="btn-copy-listen-list"')) {
  registerEl(new MockElement('button', 'btn-copy-listen-list', 'btn'));
}
if (html.includes('id="btn-export-listen-json"')) {
  registerEl(new MockElement('button', 'btn-export-listen-json', 'btn'));
}
if (html.includes('id="btn-export-listen-csv"')) {
  registerEl(new MockElement('button', 'btn-export-listen-csv', 'btn'));
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
const gameStoppingFilterBtns = ['all', 'discrete-levels', 'calm-toybox', 'deep-sandbox', 'co-play'].map(
  (f, idx) => new MockElement('button', '', idx === 0 ? 'filter-btn active' : 'filter-btn', { 'data-filter': f })
);
const foodAgeFilterBtns = ['all', 'toddler', 'preschool', 'early-elementary', 'middle-elementary', 'preteen'].map(
  (f, idx) => new MockElement('button', '', idx === 0 ? 'filter-btn active' : 'filter-btn', { 'data-filter': f })
);
const foodDomainFilterBtns = ['all', 'brain-dha', 'iron-focus', 'steady-glucose', 'bone-growth', 'gut-immune', 'lunchbox-swaps'].map(
  (f, idx) => new MockElement('button', '', idx === 0 ? 'filter-btn active' : 'filter-btn', { 'data-filter': f })
);
const listenAgeFilterBtns = ['all', 'toddler', 'preschool', 'early-elementary', 'middle-elementary', 'preteen'].map(
  (f, idx) => new MockElement('button', '', idx === 0 ? 'filter-btn active' : 'filter-btn', { 'data-filter': f })
);
const listenDomainFilterBtns = ['all', 'stem-podcast', 'story-podcast', 'audiobook-card', 'phonics-decodable', 'living-book', 'hardware-player'].map(
  (f, idx) => new MockElement('button', '', idx === 0 ? 'filter-btn active' : 'filter-btn', { 'data-filter': f })
);

// Global Age Bar & Clinical Science Drawer Toggle
const globalAgeBar = registerEl(new MockElement('div', 'global-age-bar', 'global-age-bar'));
const globalAgeBtns = ['all', 'under-2', 'toddler', 'preschool', 'early-elementary', 'middle-elementary', 'preteen'].map(
  (a, idx) => {
    const btn = new MockElement('button', '', idx === 0 ? 'global-age-btn active' : 'global-age-btn', { 'data-global-age': a });
    globalAgeBar.appendChild(btn);
    return btn;
  }
);
registerEl(new MockElement('button', 'btn-toggle-clinical-details', 'btn btn-outline btn-sm'));

// Daily Blueprint Builder mock elements
const blueprintContainer = registerEl(new MockElement('div', 'daily-blueprint-builder', 'blueprint-card'));
const blueprintAgeBtns = ['under-2', 'toddler', 'preschool', 'early-elementary', 'middle-elementary', 'preteen'].map(
  (a, idx) => {
    const btn = new MockElement('button', '', idx === 1 ? 'blueprint-age-btn active' : 'blueprint-age-btn', { 'data-bp-age': a });
    blueprintContainer.appendChild(btn);
    return btn;
  }
);
registerEl(new MockElement('div', 'bp-stage-headline', ''));
registerEl(new MockElement('p', 'bp-stage-summary', ''));
registerEl(new MockElement('div', 'bp-sync-status', ''));
registerEl(new MockElement('div', 'bp-screen-budget', ''));
registerEl(new MockElement('div', 'bp-sleep-cutoff', ''));
registerEl(new MockElement('div', 'bp-meal-rule', ''));
registerEl(new MockElement('ul', 'bp-channels-list', 'fridge-col-list'));
registerEl(new MockElement('ul', 'bp-games-list', 'fridge-col-list'));
registerEl(new MockElement('ul', 'bp-foods-list', 'fridge-col-list'));
registerEl(new MockElement('ul', 'bp-listen-list', 'fridge-col-list'));
registerEl(new MockElement('button', 'btn-sync-age-directories', 'btn btn-primary btn-sm'));
registerEl(new MockElement('button', 'btn-copy-blueprint', 'btn btn-outline btn-sm'));
registerEl(new MockElement('button', 'btn-print-fridge-sheet', 'btn btn-outline btn-sm'));

// Parse real [data-tab-panel] sections and [data-tab] buttons from index.html
const tabPanels = [];
const panelRegex = /<section\s+([^>]*data-tab-panel="([^"]+)"[^>]*)>/g;
let pMatch;
while ((pMatch = panelRegex.exec(html)) !== null) {
  const fullAttrs = pMatch[1];
  const panelKey = pMatch[2];
  const idMatch = fullAttrs.match(/id="([^"]+)"/);
  const clsMatch = fullAttrs.match(/class="([^"]+)"/);
  const el = new MockElement('section', idMatch ? idMatch[1] : '', clsMatch ? clsMatch[1] : '', { 'data-tab-panel': panelKey });
  registerEl(el);
  tabPanels.push(el);
}

const tabSwitchBtns = [];
const tabBtnRegex = /<button\s+([^>]*data-tab="([^"]+)"[^>]*)>/g;
let tbMatch;
while ((tbMatch = tabBtnRegex.exec(html)) !== null) {
  const fullAttrs = tbMatch[1];
  const tabKey = tbMatch[2];
  const idMatch = fullAttrs.match(/id="([^"]+)"/);
  const clsMatch = fullAttrs.match(/class="([^"]+)"/);
  const btn = new MockElement('button', idMatch ? idMatch[1] : '', clsMatch ? clsMatch[1] : '', { 'data-tab': tabKey });
  registerEl(btn);
  tabSwitchBtns.push(btn);
}

registerEl(new MockElement('span', 'workspace-context-title', 'workspace-context-title'));
registerEl(new MockElement('span', 'workspace-context-badge', 'tag-badge'));
registerEl(new MockElement('span', 'workspace-pager-indicator', 'workspace-pager-indicator'));
registerEl(new MockElement('button', 'btn-prev-tab', 'btn btn-outline btn-sm'));
registerEl(new MockElement('button', 'btn-next-tab', 'btn btn-outline btn-sm'));

const storageMap = { ...(payload.initialStorage || {}) };
const localStorageMock = {
  getItem: (k) => Object.prototype.hasOwnProperty.call(storageMap, k) ? storageMap[k] : null,
  setItem: (k, v) => { storageMap[k] = String(v); },
  removeItem: (k) => { delete storageMap[k]; }
};

let lastClipboardText = null;
let printCalledCount = 0;
let downloads = [];
const domReadyCallbacks = [];

const queryAllGrids = (sel) => {
  const grids = ['channel-grid', 'game-grid', 'food-grid', 'listen-grid'];
  const out = [];
  for (const gid of grids) {
    if (elementsById[gid]) {
      out.push(...elementsById[gid].querySelectorAll(sel));
    }
  }
  return out;
};

const documentMock = {
  addEventListener: (evt, fn) => { if (evt === 'DOMContentLoaded') domReadyCallbacks.push(fn); },
  getElementById: (id) => elementsById[id] || null,
  querySelectorAll: (sel) => {
    if (sel === '#channel-filters .filter-btn') return channelFilterBtns;
    if (sel === '#game-age-filters .filter-btn') return gameAgeFilterBtns;
    if (sel === '#game-domain-filters .filter-btn') return gameDomainFilterBtns;
    if (sel === '#game-stopping-filters .filter-btn') return gameStoppingFilterBtns;
    if (sel === '#food-age-filters .filter-btn') return foodAgeFilterBtns;
    if (sel === '#food-domain-filters .filter-btn') return foodDomainFilterBtns;
    if (sel === '#listen-age-filters .filter-btn') return listenAgeFilterBtns;
    if (sel === '#listen-domain-filters .filter-btn') return listenDomainFilterBtns;
    if (sel === '#global-age-bar .global-age-btn') return globalAgeBtns;
    if (sel === '.card-clinical-drawer') return queryAllGrids('.card-clinical-drawer');
    if (sel === '.card-drawer-toggle') return queryAllGrids('.card-drawer-toggle');
    if (sel === '[data-tab-panel]') return tabPanels;
    if (sel === '.sidebar-nav-btn') return tabSwitchBtns.filter(b => b.classList.contains('sidebar-nav-btn'));
    if (sel === '[data-tab]') return tabSwitchBtns;
    if (sel === 'a[href^="#"]') return [];
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
  window: {
    localStorage: localStorageMock,
    scrollTo: () => {},
    print: () => { printCalledCount += 1; },
    location: { hash: payload.initialHash || '' }
  },
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
  foodsData: typeof foodsData !== 'undefined' ? foodsData : [],
  listenReadData: typeof listenReadData !== 'undefined' ? listenReadData : [],
  computeSem10Score: typeof computeSem10Score === 'function' ? computeSem10Score : null,
  computeNfi10Score: typeof computeNfi10Score === 'function' ? computeNfi10Score : null,
  sanitizeCsvCell: typeof sanitizeCsvCell === 'function' ? sanitizeCsvCell : null,
  computeDailyBlueprint: typeof computeDailyBlueprint === 'function' ? computeDailyBlueprint : null,
  getGameStoppingProfile: typeof getGameStoppingProfile === 'function' ? getGameStoppingProfile : null,
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

if (payload.clickFoodCalc) {
  for (const [dim, pts] of Object.entries(payload.clickFoodCalc)) {
    const boxes = foodCalcContainer.querySelectorAll('.food-dim-box');
    const box = boxes.find(b => b.getAttribute('data-food-dim') === dim);
    if (box) {
      const btns = box.querySelectorAll('.food-opt-btn');
      const targetBtn = btns.find(b => b.getAttribute('data-pts') === String(pts));
      if (targetBtn) targetBtn.click();
    }
  }
}

if (payload.clickFoodResetAfter) {
  elementsById['food-calc-reset-btn'].click();
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

if (payload.clickGameStoppingFilter) {
  const btn = gameStoppingFilterBtns.find(b => b.getAttribute('data-filter') === payload.clickGameStoppingFilter);
  if (btn) btn.click();
}

if (payload.clickFoodAgeFilter) {
  const btn = foodAgeFilterBtns.find(b => b.getAttribute('data-filter') === payload.clickFoodAgeFilter);
  if (btn) btn.click();
}

if (payload.clickFoodDomainFilter) {
  const btn = foodDomainFilterBtns.find(b => b.getAttribute('data-filter') === payload.clickFoodDomainFilter);
  if (btn) btn.click();
}

if (payload.clickListenAgeFilter) {
  const btn = listenAgeFilterBtns.find(b => b.getAttribute('data-filter') === payload.clickListenAgeFilter);
  if (btn) btn.click();
}

if (payload.clickListenDomainFilter) {
  const btn = listenDomainFilterBtns.find(b => b.getAttribute('data-filter') === payload.clickListenDomainFilter);
  if (btn) btn.click();
}

if (payload.clickGlobalAge) {
  const btn = globalAgeBtns.find(b => b.getAttribute('data-global-age') === payload.clickGlobalAge);
  if (btn) btn.click();
}

if (payload.clickToggleAllScience) {
  if (elementsById['btn-toggle-clinical-details']) elementsById['btn-toggle-clinical-details'].click();
}

if (payload.clickBlueprintAge) {
  const btn = blueprintAgeBtns.find(b => b.getAttribute('data-bp-age') === payload.clickBlueprintAge);
  if (btn) btn.click();
}

if (payload.clickSyncBlueprintDirectories) {
  if (elementsById['btn-sync-age-directories']) elementsById['btn-sync-age-directories'].click();
}

if (payload.clickCopyBlueprint) {
  if (elementsById['btn-copy-blueprint']) elementsById['btn-copy-blueprint'].click();
}

if (payload.clickPrintBlueprint) {
  if (elementsById['btn-print-fridge-sheet']) elementsById['btn-print-fridge-sheet'].click();
}

if (payload.clickWorkspaceTab) {
  const btn = tabSwitchBtns.find(b => b.getAttribute('data-tab') === payload.clickWorkspaceTab);
  if (btn) btn.click();
}

if (payload.clickNextTabCount) {
  for (let i = 0; i < payload.clickNextTabCount; i++) {
    if (elementsById['btn-next-tab']) elementsById['btn-next-tab'].click();
  }
}

if (payload.clickPrevTabCount) {
  for (let i = 0; i < payload.clickPrevTabCount; i++) {
    if (elementsById['btn-prev-tab']) elementsById['btn-prev-tab'].click();
  }
}

if (payload.triggerExports) {
  if (elementsById['btn-export-csv']) elementsById['btn-export-csv'].click();
  if (elementsById['btn-export-json']) elementsById['btn-export-json'].click();
  if (elementsById['btn-copy-urls']) elementsById['btn-copy-urls'].click();
  if (elementsById['btn-export-games-csv']) elementsById['btn-export-games-csv'].click();
  if (elementsById['btn-export-games-json']) elementsById['btn-export-games-json'].click();
  if (elementsById['btn-copy-games-urls']) elementsById['btn-copy-games-urls'].click();
  if (elementsById['btn-export-foods-csv']) elementsById['btn-export-foods-csv'].click();
  if (elementsById['btn-export-foods-json']) elementsById['btn-export-foods-json'].click();
  if (elementsById['btn-copy-foods-swaps']) elementsById['btn-copy-foods-swaps'].click();
  if (elementsById['btn-export-listen-csv']) elementsById['btn-export-listen-csv'].click();
  if (elementsById['btn-export-listen-json']) elementsById['btn-export-listen-json'].click();
  if (elementsById['btn-copy-listen-list']) elementsById['btn-copy-listen-list'].click();
}

const evalResults = [];
if (payload.evalDimsList && sandbox.__exports.computeSem10Score) {
  for (const d of payload.evalDimsList) {
    evalResults.push(sandbox.__exports.computeSem10Score(d));
  }
}

const evalFoodResults = [];
if (payload.evalFoodDimsList && sandbox.__exports.computeNfi10Score) {
  for (const d of payload.evalFoodDimsList) {
    evalFoodResults.push(sandbox.__exports.computeNfi10Score(d));
  }
}

const csvSanitizeResults = [];
if (payload.csvInputs && sandbox.__exports.sanitizeCsvCell) {
  for (const c of payload.csvInputs) {
    csvSanitizeResults.push(sandbox.__exports.sanitizeCsvCell(c));
  }
}

const channelPhdBoxes = elementsById['channel-grid'].querySelectorAll('.expert-bridge-phd').length;
const gamePhdBoxes = elementsById['game-grid'].querySelectorAll('.expert-bridge-phd').length;
const gameStoppingPills = elementsById['game-grid'].querySelectorAll('.stopping-cue-pill').length;
const foodMdBoxes = elementsById['food-grid'].querySelectorAll('.expert-bridge-md').length;
const listenPhdBoxes = elementsById['listen-grid'].querySelectorAll('.expert-bridge-phd').length;
const allDrawers = queryAllGrids('.card-clinical-drawer');
const openDrawerCount = allDrawers.filter(d => d.classList.contains('drawer-open')).length;

const out = {
  channelsCount: sandbox.__exports.channelsData.length,
  gamesCount: sandbox.__exports.gamesData.length,
  foodsCount: sandbox.__exports.foodsData.length,
  listenCount: sandbox.__exports.listenReadData.length,
  channelsData: sandbox.__exports.channelsData,
  gamesData: sandbox.__exports.gamesData,
  foodsData: sandbox.__exports.foodsData,
  listenReadData: sandbox.__exports.listenReadData,
  hasComputeSem10Score: Boolean(sandbox.__exports.computeSem10Score),
  hasComputeNfi10Score: Boolean(sandbox.__exports.computeNfi10Score),
  hasSanitizeCsvCell: Boolean(sandbox.__exports.sanitizeCsvCell),
  hasComputeDailyBlueprint: Boolean(sandbox.__exports.computeDailyBlueprint),
  calcScoreBadge: elementsById['calc-score-badge'].textContent,
  calcScoreClass: elementsById['calc-score-badge'].className,
  calcBreakdownText: elementsById['calc-breakdown-text'].textContent,
  calcVerdictDesc: elementsById['calc-verdict-desc'].textContent,
  foodCalcScoreBadge: elementsById['food-calc-score-badge'].textContent,
  foodCalcScoreClass: elementsById['food-calc-score-badge'].className,
  foodCalcBreakdownText: elementsById['food-calc-breakdown-text'].textContent,
  foodCalcVerdictDesc: elementsById['food-calc-verdict-desc'].textContent,
  renderedChannelCount: elementsById['channel-grid'].children.length,
  renderedGameCount: elementsById['game-grid'].children.length,
  renderedFoodCount: elementsById['food-grid'].children.length,
  renderedListenCount: elementsById['listen-grid'].children.length,
  channelPhdBoxes,
  gamePhdBoxes,
  gameStoppingPills,
  foodMdBoxes,
  listenPhdBoxes,
  totalDrawerCount: allDrawers.length,
  openDrawerCount,
  bpStageHeadline: elementsById['bp-stage-headline'].textContent,
  bpScreenBudget: elementsById['bp-screen-budget'].textContent,
  bpSleepCutoff: elementsById['bp-sleep-cutoff'].textContent,
  bpMealRule: elementsById['bp-meal-rule'].textContent,
  bpSyncStatus: elementsById['bp-sync-status'].textContent,
  bpChannelsCount: elementsById['bp-channels-list'].children.length,
  bpGamesCount: elementsById['bp-games-list'].children.length,
  bpFoodsCount: elementsById['bp-foods-list'].children.length,
  bpListenCount: elementsById['bp-listen-list'].children.length,
  printCalledCount,
  channelBadgeText: elementsById['channel-count-badge'].textContent,
  gameBadgeText: elementsById['game-count-badge'].textContent,
  foodBadgeText: elementsById['food-count-badge'].textContent,
  listenBadgeText: elementsById['listen-count-badge'].textContent,
  storageAfter: storageMap,
  downloads: downloads.map(d => ({ type: d.type, content: d.content })),
  lastClipboardText,
  hasGameExportButtons: Boolean(
    elementsById['btn-copy-games-urls'] &&
    elementsById['btn-export-games-json'] &&
    elementsById['btn-export-games-csv']
  ),
  hasFoodExportButtons: Boolean(
    elementsById['btn-copy-foods-swaps'] &&
    elementsById['btn-export-foods-json'] &&
    elementsById['btn-export-foods-csv']
  ),
  hasListenExportButtons: Boolean(
    elementsById['btn-copy-listen-list'] &&
    elementsById['btn-export-listen-json'] &&
    elementsById['btn-export-listen-csv']
  ),
  visibleTabPanels: tabPanels.filter(p => !p.classList.contains('tab-hidden')).map(p => p.getAttribute('data-tab-panel')),
  allTabPanelsCount: tabPanels.length,
  workspaceContextTitle: elementsById['workspace-context-title'].textContent,
  workspaceContextBadge: elementsById['workspace-context-badge'].textContent,
  workspacePagerIndicator: elementsById['workspace-pager-indicator'].textContent,
  evalResults,
  evalFoodResults,
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
    """Comprehensive verification suite locking R-1 through R-9."""

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
    # R-3: CSV Formula Injection Guard, Negative Verifier & 4-Pillar Export Parity
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

        # Verify Channel, Game, Wholesome Food, and Listen & Read CSV/JSON exports triggered and pass safety check
        csv_downloads = [d["content"] for d in res["downloads"] if "text/csv" in (d["type"] or "")]
        json_downloads = [d["content"] for d in res["downloads"] if "application/json" in (d["type"] or "")]
        self.assertEqual(len(csv_downloads), 4, "Expected Channel, Game, Wholesome Food, and Listen & Read CSV downloads")
        self.assertEqual(len(json_downloads), 4, "Expected Channel, Game, Wholesome Food, and Listen & Read JSON downloads")
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

    # -----------------------------------------------------------------------
    # R-7: Wholesome Pediatric Nutrition & NFI-10 3-Pillar Parity
    # -----------------------------------------------------------------------
    def test_r7_nfi10_exhaustive_243_grid_and_400_fuzz_parity_python_vs_js(self) -> None:
        """All 243 (3^5) NFI-10 grid states and 400 seeded fuzz cases match between Python and JS."""
        grid_cases = [
            {"matrix": m, "glycemic": g, "nutrients": n, "additives": a, "texture": t}
            for m, g, n, a, t in itertools.product([0, 1, 2], repeat=5)
        ]
        self.assertEqual(len(grid_cases), 243)

        rng = random.Random(20261019)
        weird_scalars: list[Any] = [
            0, 1, 2, -1, -999, 3, 42, 1.0, 1.9, -0.5,
            "0", "1", "2", " 1 ", "\u00a02\u3000", "\u200b1", "abc", "",
            None, True, False, [], {},
        ]
        fuzz_cases = [
            {
                k: rng.choice(weird_scalars)
                for k in ("matrix", "glycemic", "nutrients", "additives", "texture")
            }
            for _ in range(400)
        ]

        all_cases = grid_cases + fuzz_cases
        res = run_node_harness({"evalFoodDimsList": all_cases})
        self.assertTrue(res["hasComputeNfi10Score"], "computeNfi10Score must be exposed in app.js")
        js_results = res["evalFoodResults"]
        self.assertEqual(len(js_results), len(all_cases))

        tiers_seen: set[str] = set()
        for idx, case in enumerate(all_cases):
            expected = python_compute_nfi10(case)
            actual = js_results[idx]
            tiers_seen.add(expected["tier"])
            self.assertEqual(
                actual,
                expected,
                f"NFI-10 parity mismatch at case {idx} ({case}): JS={actual} vs PY={expected}",
            )
        self.assertEqual(tiers_seen, {"low", "med", "high"})

    def test_r7_all_32_whole_food_swaps_reconcile_with_nfi10_oracle_and_citations(self) -> None:
        """All 32 curated whole-food staple & swap items reconcile with NFI-10 oracle and carry trap/swap metadata."""
        res = run_node_harness()
        self.assertEqual(res["foodsCount"], 32)
        self.assertEqual(res["renderedFoodCount"], 32)
        self.assertEqual(res["foodBadgeText"], "32 whole foods & swaps")

        canonical_nfi_re = re.compile(
            r"^Base 1 \+ Matrix: ([012])/2 • Glycemic: ([012])/2 • "
            r"Nutrients: ([012])/2 • Additives: ([012])/2 • Texture: ([012])/2 \(Total: (\d+)/10\)$"
        )

        for item in res["foodsData"]:
            name = item["name"]
            breakdown = item.get("nfiBreakdown", "")
            m = canonical_nfi_re.match(breakdown)
            self.assertIsNotNone(
                m,
                f"Food item '{name}' does not match canonical NFI-10 format: {breakdown!r}",
            )
            assert m is not None
            dims = {
                "matrix": int(m.group(1)),
                "glycemic": int(m.group(2)),
                "nutrients": int(m.group(3)),
                "additives": int(m.group(4)),
                "texture": int(m.group(5)),
            }
            oracle = python_compute_nfi10(dims)
            self.assertEqual(item["nfiScore"], oracle["scoreLabel"], f"Food '{name}' nfiScore mismatch")
            self.assertEqual(item["stimulusClass"], oracle["stimulusClass"], f"Food '{name}' stimulusClass mismatch")
            self.assertEqual(breakdown, oracle["nfiBreakdown"], f"Food '{name}' nfiBreakdown mismatch")
            self.assertIn(item["category"], VALID_FOOD_DOMAINS - {"all"}, f"Invalid food domain for '{name}'")
            for age_tag in item["age"]:
                self.assertIn(age_tag, VALID_AGE_FILTERS - {"all"}, f"Invalid age tag '{age_tag}' for '{name}'")
            # Every food card must include the ultra-processed trap replaced, whole-food swap, synergy/safety, and citation
            for req_field in ("trapReplaced", "wholeFoodSwap", "synergySafety", "whyCliniciansApprove", "researchAnchor", "link"):
                self.assertTrue(
                    isinstance(item.get(req_field), str) and len(item[req_field].strip()) >= 10,
                    f"Food '{name}' missing or short required field '{req_field}'",
                )
            self.assertTrue(
                isinstance(item.get("keyNutrients"), list) and len(item["keyNutrients"]) >= 2,
                f"Food '{name}' must list at least 2 keyNutrients",
            )

    def test_r7_food_calculator_buttons_persistence_and_csv_export(self) -> None:
        """Clicking .food-opt-btn inside .food-dim-box updates live NFI-10 score, resets on reload, and persists filters."""
        res_high = run_node_harness(
            {
                "clickFoodCalc": {
                    "matrix": 2,
                    "glycemic": 2,
                    "nutrients": 2,
                    "additives": 2,
                    "texture": 1,
                }
            }
        )
        # Base 1 + 2+2+2+2+1 = 10/10 Ultra-Processed Hazard
        self.assertIn("10/10", res_high["foodCalcScoreBadge"])
        self.assertIn("stimulus-high", res_high["foodCalcScoreClass"])
        self.assertIn(
            "Base 1 + Matrix: 2/2 \u2022 Glycemic: 2/2 \u2022 Nutrients: 2/2 \u2022 Additives: 2/2 \u2022 Texture: 1/2 (Total: 10/10)",
            res_high["foodCalcBreakdownText"],
        )

        # Single 1-pt click (e.g. Matrix: 1/2 NOVA-3 sourdough/cheese) MUST be 2/10, not 1/10!
        res_two = run_node_harness({"clickFoodCalc": {"matrix": 1}})
        self.assertIn("2/10", res_two["foodCalcScoreBadge"])
        self.assertIn("Total: 2/10", res_two["foodCalcBreakdownText"])

        # Clicking Reset Food Auditor must return to 1/10 Whole-Food Staple baseline
        res_reset = run_node_harness(
            {"clickFoodCalc": {"matrix": 2, "glycemic": 2, "additives": 2}, "clickFoodResetAfter": True}
        )
        self.assertIn("1/10", res_reset["foodCalcScoreBadge"])
        self.assertIn("stimulus-low", res_reset["foodCalcScoreClass"])
        self.assertIn("Total: 1/10", res_reset["foodCalcBreakdownText"])

        # Verify food filter persistence + allow-list validation + export buttons
        res_persist = run_node_harness(
            {
                "clickFoodAgeFilter": "toddler",
                "clickFoodDomainFilter": "lunchbox-swaps",
                "clickFoodCalc": {"matrix": 2, "additives": 2},
            }
        )
        self.assertTrue(res_persist["hasFoodExportButtons"], "Wholesome Food section must have 1-click export buttons")
        storage = res_persist["storageAfter"]
        self.assertEqual(storage.get("safekids_food_age_filter"), "toddler")
        self.assertEqual(storage.get("safekids_food_domain_filter"), "lunchbox-swaps")
        for k in storage:
            self.assertNotIn("nfi", k.lower())

        # Corrupted food filter storage must fall back safely to 'all' (32 items)
        res_corrupt = run_node_harness(
            {
                "initialStorage": {
                    "safekids_food_age_filter": "<img src=x onerror=alert(1)>",
                    "safekids_food_domain_filter": "evil-domain",
                }
            }
        )
        self.assertEqual(res_corrupt["renderedFoodCount"], 32)

    def test_visual_illustrations_and_card_banners_present(self) -> None:
        """Every image referenced in index.html and app.js must exist in public/images/ and have descriptive alt text."""
        html_text = INDEX_HTML.read_text(encoding="utf-8")
        js_text = APP_JS.read_text(encoding="utf-8")

        html_imgs = re.findall(r'<img\s+[^>]*src="([^"]+)"[^>]*>', html_text)
        self.assertGreaterEqual(len(html_imgs), 25, "Expected 4-pillar hero strip, 10 rec banners, 8 showcase banners, and 5 step thumbs")

        for img_tag in re.findall(r'<img\s+[^>]+>', html_text):
            alt_match = re.search(r'alt="([^"]+)"', img_tag)
            self.assertIsNotNone(alt_match, f"Missing non-empty alt attribute on {img_tag}")
            self.assertGreaterEqual(len(alt_match.group(1).strip()), 10)

        js_imgs = re.findall(r"src:\s*'([^']+)'", js_text)
        self.assertGreaterEqual(len(js_imgs), 8, "Expected channel, game, food, and listen visual strip image mappings in app.js")

        for rel_src in set(html_imgs + js_imgs):
            img_path = REPO_ROOT / "public" / rel_src
            self.assertTrue(img_path.is_file(), f"Referenced image does not exist on disk: {rel_src}")
            self.assertGreater(img_path.stat().st_size, 10_000, f"Image file unexpectedly tiny: {rel_src}")

    def test_workspace_left_panel_tabs_and_persistence(self) -> None:
        """Left-panel app-shell workspace must isolate 7 categorized tabs, support 'all' mode, and persist safely."""
        # Default initial load shows only 'overview' panels (hero + recommendations = 2 sections)
        res_default = run_node_harness()
        self.assertEqual(res_default["allTabPanelsCount"], 10)
        self.assertEqual(res_default["visibleTabPanels"], ["overview", "overview"])
        self.assertIn("Overview & Top 9 Parent Recommendations", res_default["workspaceContextTitle"])
        self.assertIn("Viewing Tab 1 of 7", res_default["workspacePagerIndicator"])

        # Clicking 'nutrition' tab shows only the Wholesome Food section and persists to localStorage
        res_nutrition = run_node_harness({"clickWorkspaceTab": "nutrition"})
        self.assertEqual(res_nutrition["visibleTabPanels"], ["nutrition"])
        self.assertEqual(res_nutrition["storageAfter"].get("safekids_active_tab"), "nutrition")
        self.assertIn("Whole Foods & Lunchbox Swaps", res_nutrition["workspaceContextTitle"])
        self.assertIn("Viewing Tab 5 of 7", res_nutrition["workspacePagerIndicator"])

        # Clicking 'listen' tab shows only the Listen & Read section and persists to localStorage
        res_listen = run_node_harness({"clickWorkspaceTab": "listen"})
        self.assertEqual(res_listen["visibleTabPanels"], ["listen"])
        self.assertEqual(res_listen["storageAfter"].get("safekids_active_tab"), "listen")
        self.assertIn("Listen & Read", res_listen["workspaceContextTitle"])
        self.assertIn("Viewing Tab 6 of 7", res_listen["workspacePagerIndicator"])

        # Clicking 'all' shows all 10 sections for full-page reading/printing
        res_all = run_node_harness({"clickWorkspaceTab": "all"})
        self.assertEqual(len(res_all["visibleTabPanels"]), 10)
        self.assertEqual(res_all["storageAfter"].get("safekids_active_tab"), "all")
        self.assertIn("Complete SafeKids Parent Portal Reference", res_all["workspaceContextTitle"])

        # Next/Prev pager buttons step cleanly through the 7 ordered tabs
        res_pager = run_node_harness({"clickNextTabCount": 2})
        self.assertEqual(res_pager["visibleTabPanels"], ["channels"])
        self.assertEqual(res_pager["storageAfter"].get("safekids_active_tab"), "channels")

        # Corrupted localStorage tab value safely falls back to 'overview'
        res_corrupt_tab = run_node_harness(
            {"initialStorage": {"safekids_active_tab": "javascript:alert(1)"}}
        )
        self.assertEqual(res_corrupt_tab["visibleTabPanels"], ["overview", "overview"])

    def test_r8_expert_lenses_blueprint_bridges_stopping_cues_and_fridge_sheet(self) -> None:
        """Multi-expert upgrades: Daily Blueprint Builder, PhD/MD card bridges, Game Stopping-Cue filter, and Fridge Sheet."""
        res_default = run_node_harness()
        self.assertTrue(res_default["hasComputeDailyBlueprint"])
        # All 28 channels + 33 games + 26 listen items render Educational PhD Off-Screen/Dialogic Transfer boxes
        self.assertEqual(res_default["channelPhdBoxes"], 28)
        self.assertEqual(res_default["gamePhdBoxes"], 33)
        self.assertEqual(res_default["listenPhdBoxes"], 26)
        # All 33 games render Stopping-Cue / Session-Exit Friction pills
        self.assertEqual(res_default["gameStoppingPills"], 33)
        # All 32 whole-food swaps render Pediatric Feeding MD 3-Step Picky-Eater Sensory Bridge boxes
        self.assertEqual(res_default["foodMdBoxes"], 32)
        # Default blueprint is 'toddler' with 4 channels, 4 games, 4 foods, and 4 listen/read items
        self.assertIn("Toddlers (Ages 2–3)", res_default["bpStageHeadline"])
        self.assertEqual(res_default["bpChannelsCount"], 4)
        self.assertEqual(res_default["bpGamesCount"], 4)
        self.assertEqual(res_default["bpFoodsCount"], 4)
        self.assertEqual(res_default["bpListenCount"], 4)

        # Selecting 'under-2' shows 0 mins/day passive video rule per AAP
        res_under2 = run_node_harness({"clickBlueprintAge": "under-2"})
        self.assertIn("Under 2 Years", res_under2["bpStageHeadline"])
        self.assertIn("0 mins/day", res_under2["bpScreenBudget"])
        self.assertEqual(res_under2["storageAfter"].get("safekids_blueprint_age"), "under-2")

        # Selecting 'early-elementary' + clicking Sync All 4 Directories filters Watch, Play, Nourish, and Listen simultaneously
        res_sync = run_node_harness(
            {
                "clickBlueprintAge": "early-elementary",
                "clickSyncBlueprintDirectories": True,
                "clickCopyBlueprint": True,
                "clickPrintBlueprint": True,
            }
        )
        self.assertEqual(res_sync["storageAfter"].get("safekids_channel_age_filter"), "early-elementary")
        self.assertEqual(res_sync["storageAfter"].get("safekids_game_age_filter"), "early-elementary")
        self.assertEqual(res_sync["storageAfter"].get("safekids_food_age_filter"), "early-elementary")
        self.assertEqual(res_sync["storageAfter"].get("safekids_listen_age_filter"), "early-elementary")
        self.assertIn("Synced Watch", res_sync["bpSyncStatus"])
        self.assertIn("SAFEKIDS CAREGIVER & BABYSITTER DAILY PLAN", res_sync["lastClipboardText"])
        self.assertIn("PILLAR 4: SCREEN-FREE AUDIO & LIVING BOOKS (LISTEN & READ)", res_sync["lastClipboardText"])
        self.assertEqual(res_sync["printCalledCount"], 1)

        # Game Stopping-Cue filters partition the 33 games into discrete-levels, calm-toybox, and deep-sandbox
        res_discrete = run_node_harness({"clickGameStoppingFilter": "discrete-levels"})
        res_toybox = run_node_harness({"clickGameStoppingFilter": "calm-toybox"})
        res_sandbox = run_node_harness({"clickGameStoppingFilter": "deep-sandbox"})
        res_coplay = run_node_harness({"clickGameStoppingFilter": "co-play"})

        self.assertGreater(res_discrete["renderedGameCount"], 0)
        self.assertGreater(res_toybox["renderedGameCount"], 0)
        self.assertGreater(res_sandbox["renderedGameCount"], 0)
        self.assertGreater(res_coplay["renderedGameCount"], 0)
        self.assertEqual(
            res_discrete["renderedGameCount"] + res_toybox["renderedGameCount"] + res_sandbox["renderedGameCount"],
            33,
            "All 33 games must partition cleanly across discrete-levels, calm-toybox, and deep-sandbox",
        )
        self.assertEqual(res_sandbox["storageAfter"].get("safekids_game_stopping_filter"), "deep-sandbox")

    # -----------------------------------------------------------------------
    # R-9: Pillar 4 Listen & Read (26 Picks) + Calm Tech Progressive Disclosure UX
    # -----------------------------------------------------------------------
    def test_r9_listen_and_read_directory_rubric_filters_and_progressive_drawer(self) -> None:
        """All 26 Listen & Read items reconcile with SEM-10 oracle, support age/format filters, and wire Calm Tech drawers."""
        res = run_node_harness()
        self.assertEqual(res["listenCount"], 26)
        self.assertEqual(res["renderedListenCount"], 26)
        self.assertEqual(res["listenBadgeText"], "26 audio & book picks")
        self.assertTrue(res["hasListenExportButtons"])

        # Progressive disclosure drawers: all 119 cards (28+33+32+26) have a .card-clinical-drawer closed by default
        self.assertEqual(res["totalDrawerCount"], 119)
        self.assertEqual(res["openDrawerCount"], 0)

        # Clicking #btn-toggle-clinical-details opens all 119 clinical drawers at once
        res_expanded = run_node_harness({"clickToggleAllScience": True})
        self.assertEqual(res_expanded["openDrawerCount"], 119)

        canonical_re = re.compile(
            r"^Base 1 \+ Pacing: ([012])/2 • Visual: ([012])/2 • "
            r"Audio: ([012])/2 • Pressure: ([012])/2 • Reward: ([012])/2 \(Total: (\d+)/10\)$"
        )
        seen_domains: set[str] = set()
        for item in res["listenReadData"]:
            name = item["name"]
            breakdown = item.get("semBreakdown", "")
            m = canonical_re.match(breakdown)
            self.assertIsNotNone(m, f"Listen item '{name}' does not match canonical SEM-10 format: {breakdown!r}")
            assert m is not None
            dims = {
                "pacing": int(m.group(1)),
                "visual": int(m.group(2)),
                "audio": int(m.group(3)),
                "pressure": int(m.group(4)),
                "reward": int(m.group(5)),
            }
            oracle = python_compute_sem10(dims)
            self.assertEqual(item["stimulusScore"], oracle["scoreLabel"], f"Listen '{name}' stimulusScore mismatch")
            self.assertEqual(item["stimulusClass"], oracle["stimulusClass"], f"Listen '{name}' stimulusClass mismatch")
            self.assertEqual(breakdown, oracle["semBreakdown"], f"Listen '{name}' semBreakdown mismatch")
            self.assertIn(item["category"], VALID_LISTEN_DOMAINS - {"all"}, f"Invalid listen domain for '{name}'")
            seen_domains.add(item["category"])
            for age_tag in item["age"]:
                self.assertIn(age_tag, VALID_AGE_FILTERS - {"all"}, f"Invalid age tag '{age_tag}' for '{name}'")
            for req_field in (
                "creator",
                "categoryLabel",
                "trapReplaced",
                "whyEducatorsApprove",
                "dialogicPrompt",
                "researchAnchor",
                "link",
            ):
                self.assertTrue(
                    isinstance(item.get(req_field), str) and len(item[req_field].strip()) >= 8,
                    f"Listen '{name}' missing or short required field '{req_field}'",
                )
            self.assertTrue(
                isinstance(item.get("startWith"), list) and len(item["startWith"]) >= 2,
                f"Listen '{name}' must have at least 2 startWith items",
            )
            self.assertTrue(
                isinstance(item.get("languageSkills"), list) and len(item["languageSkills"]) >= 2,
                f"Listen '{name}' must have at least 2 languageSkills items",
            )

        # Ensure all 6 audio/book domains are represented
        self.assertEqual(seen_domains, VALID_LISTEN_DOMAINS - {"all"})

        # Filter Listen & Read by age and domain and verify persistence
        res_filter = run_node_harness(
            {
                "clickListenAgeFilter": "early-elementary",
                "clickListenDomainFilter": "phonics-decodable",
            }
        )
        self.assertGreater(res_filter["renderedListenCount"], 0)
        self.assertLess(res_filter["renderedListenCount"], 26)
        self.assertEqual(res_filter["storageAfter"].get("safekids_listen_age_filter"), "early-elementary")
        self.assertEqual(res_filter["storageAfter"].get("safekids_listen_domain_filter"), "phonics-decodable")

        # Global Age Selector Bar (#global-age-bar) synchronizes all 4 directories + Blueprint simultaneously
        res_global = run_node_harness({"clickGlobalAge": "preschool"})
        self.assertEqual(res_global["storageAfter"].get("safekids_channel_age_filter"), "preschool")
        self.assertEqual(res_global["storageAfter"].get("safekids_game_age_filter"), "preschool")
        self.assertEqual(res_global["storageAfter"].get("safekids_food_age_filter"), "preschool")
        self.assertEqual(res_global["storageAfter"].get("safekids_listen_age_filter"), "preschool")
        self.assertIn("Preschool (Ages 4–5)", res_global["bpStageHeadline"])


if __name__ == "__main__":
    unittest.main()

