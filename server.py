#!/usr/bin/env python3
"""Localhost-only HTTP server & Google Cloud TTS Chirp 3 HD proxy for SafeKids Portal.

Strictly binds to 127.0.0.1 (never 0.0.0.0), serves `public/`, and exposes:
  - GET  /api/tts/status
  - POST /api/tts  (live Chirp 3 HD synthesis across all 11 Atlas of Wonder languages)

Note: Static deployments (e.g. Firebase Hosting) automatically play the pre-rendered
Chirp 3 HD Studio MP3 files in `public/audio/<lang>/*.mp3` and fall back to browser
`speechSynthesis` when `/api/tts` is absent.
"""
from __future__ import annotations

import argparse
import base64
import hashlib
import http.server
import json
import os
from pathlib import Path
import re
import socketserver
import subprocess
import threading
import time
import urllib.error
import urllib.request

HOST = "127.0.0.1"
DEFAULT_PORT = 8080
REPO_ROOT = Path(__file__).resolve().parent
WEB_DIR = REPO_ROOT / "public"
CACHE_DIR = REPO_ROOT / ".tts_cache"

LANG_VOICE_MAP = {
    "en": ("en-US", "en-US-Chirp3-HD-{persona}"),
    "en-US": ("en-US", "en-US-Chirp3-HD-{persona}"),
    "es": ("es-ES", "es-ES-Chirp3-HD-{persona}"),
    "es-ES": ("es-ES", "es-ES-Chirp3-HD-{persona}"),
    "es-419": ("es-US", "es-US-Chirp3-HD-{persona}"),
    "zh": ("cmn-CN", "cmn-CN-Chirp3-HD-{persona}"),
    "zh-CN": ("cmn-CN", "cmn-CN-Chirp3-HD-{persona}"),
    "zh-Hans": ("cmn-CN", "cmn-CN-Chirp3-HD-{persona}"),
    "yue": ("yue-HK", "yue-HK-Chirp3-HD-{persona}"),
    "yue-HK": ("yue-HK", "yue-HK-Chirp3-HD-{persona}"),
    "yue-Hant-HK": ("yue-HK", "yue-HK-Chirp3-HD-{persona}"),
    "ja": ("ja-JP", "ja-JP-Chirp3-HD-{persona}"),
    "ja-JP": ("ja-JP", "ja-JP-Chirp3-HD-{persona}"),
    "ko": ("ko-KR", "ko-KR-Chirp3-HD-{persona}"),
    "ko-KR": ("ko-KR", "ko-KR-Chirp3-HD-{persona}"),
    "pt": ("pt-BR", "pt-BR-Chirp3-HD-{persona}"),
    "pt-BR": ("pt-BR", "pt-BR-Chirp3-HD-{persona}"),
    "fr": ("fr-FR", "fr-FR-Chirp3-HD-{persona}"),
    "fr-FR": ("fr-FR", "fr-FR-Chirp3-HD-{persona}"),
    "it": ("it-IT", "it-IT-Chirp3-HD-{persona}"),
    "it-IT": ("it-IT", "it-IT-Chirp3-HD-{persona}"),
    "de": ("de-DE", "de-DE-Chirp3-HD-{persona}"),
    "de-DE": ("de-DE", "de-DE-Chirp3-HD-{persona}"),
    "ar": ("ar-XA", "ar-XA-Chirp3-HD-{persona}"),
    "ar-XA": ("ar-XA", "ar-XA-Chirp3-HD-{persona}"),
}

VALID_PERSONAS = frozenset(
    {"Aoede", "Kore", "Leda", "Zephyr", "Puck", "Charon", "Fenrir", "Orus"}
)

EMOJI_AND_SYMBOL_RE = re.compile(
    r'[\U0001F300-\U0001FAFF\u2600-\u27BF•⇒→←«»„“”"「」『』]+',
    flags=re.UNICODE,
)


def _read_default_project() -> str:
    env_proj = (
        os.environ.get("GOOGLE_CLOUD_PROJECT", "").strip()
        or os.environ.get("GCLOUD_PROJECT", "").strip()
    )
    if env_proj:
        return env_proj
    rc_path = REPO_ROOT / ".firebaserc"
    if rc_path.is_file():
        try:
            rc = json.loads(rc_path.read_text(encoding="utf-8"))
            proj = str(rc.get("projects", {}).get("default", "")).strip()
            if proj:
                return proj
        except Exception:
            pass
    return ""


class ChirpCredentialProvider:
    """Thread-safe Google Cloud OAuth helper with 45-minute token caching."""

    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._token: str | None = None
        self._project: str | None = None
        self._expires_at = 0.0

    def get_credentials(self) -> tuple[str | None, str | None]:
        now = time.time()
        with self._lock:
            if self._token and self._project and now < self._expires_at:
                return self._token, self._project

            token = os.environ.get("GOOGLE_OAUTH_ACCESS_TOKEN", "").strip()
            project = _read_default_project()

            if not token:
                try:
                    token = subprocess.check_output(
                        ["gcloud", "auth", "print-access-token"],
                        stderr=subprocess.DEVNULL,
                        timeout=6,
                        text=True,
                    ).strip()
                except Exception:
                    token = ""

            if not token:
                fb_cfg = Path.home() / ".config" / "configstore" / "firebase-tools.json"
                if fb_cfg.is_file():
                    try:
                        fb_data = json.loads(fb_cfg.read_text(encoding="utf-8"))
                        token = str(fb_data.get("tokens", {}).get("access_token", "")).strip()
                    except Exception:
                        token = ""

            if not project:
                try:
                    project = subprocess.check_output(
                        ["gcloud", "config", "get-value", "project"],
                        stderr=subprocess.DEVNULL,
                        timeout=6,
                        text=True,
                    ).strip()
                except Exception:
                    project = ""

            if not token or not project or project == "(unset)":
                return None, None

            self._token = token
            self._project = project
            self._expires_at = now + 2700.0
            return self._token, self._project

    def invalidate(self) -> None:
        with self._lock:
            self._token = None
            self._expires_at = 0.0


def prepare_chirp_text(text: str, lang_key: str) -> str:
    """Clean decorative symbols and normalize clauses so Chirp 3 HD reads naturally."""
    cleaned = EMOJI_AND_SYMBOL_RE.sub(" ", text or "")
    cleaned = cleaned.replace("≤", "<=").replace("—", ", ").replace("–", " - ")
    cleaned = re.sub(r"\s*[;؛:]\s*", ". ", cleaned)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    if lang_key in ("zh", "zh-CN", "zh-Hans", "yue", "yue-HK", "yue-Hant-HK", "ja", "ja-JP"):
        cleaned = re.sub(r"\.\s+", "。", cleaned)
    return cleaned[:2200]


class ChirpSynthesizer:
    """Synthesizes speech via Google Cloud Text-to-Speech v1 (Chirp 3 HD) with disk caching."""

    def __init__(self, cred_provider: ChirpCredentialProvider, cache_dir: Path) -> None:
        self._creds = cred_provider
        self._cache_dir = cache_dir

    def resolve_voice(self, lang: str, persona: str = "Aoede") -> tuple[str, str, str]:
        safe_persona = persona if persona in VALID_PERSONAS else "Aoede"
        lang_key = (lang or "en").strip()
        if lang_key not in LANG_VOICE_MAP:
            prefix = lang_key.split("-")[0]
            lang_key = prefix if prefix in LANG_VOICE_MAP else "en"
        lang_code, template = LANG_VOICE_MAP[lang_key]
        return lang_key, lang_code, template.format(persona=safe_persona)

    def synthesize(
        self,
        text: str,
        lang: str = "en",
        persona: str = "Aoede",
        speaking_rate: float = 1.0,
    ) -> tuple[bytes, str, bool]:
        lang_key, lang_code, voice_name = self.resolve_voice(lang, persona)
        prepared = prepare_chirp_text(text, lang_key)
        if not prepared:
            raise ValueError("Text is required for TTS synthesis")

        rate = max(0.75, min(1.35, float(speaking_rate or 1.0)))
        self._cache_dir.mkdir(parents=True, exist_ok=True)
        cache_key = hashlib.sha256(
            f"sk_v1|{lang_code}|{voice_name}|{rate:.2f}|{prepared}".encode("utf-8")
        ).hexdigest()
        cache_path = self._cache_dir / f"{cache_key}.mp3"
        if cache_path.is_file() and cache_path.stat().st_size > 256:
            return cache_path.read_bytes(), voice_name, True

        token, project = self._creds.get_credentials()
        if not token or not project:
            raise RuntimeError("Google Cloud credentials unavailable for Chirp 3 HD")

        audio_cfg: dict[str, object] = {"audioEncoding": "MP3"}
        if abs(rate - 1.0) >= 0.01:
            audio_cfg["speakingRate"] = rate

        payload = json.dumps(
            {
                "input": {"text": prepared},
                "voice": {"languageCode": lang_code, "name": voice_name},
                "audioConfig": audio_cfg,
            }
        ).encode("utf-8")
        req = urllib.request.Request(
            "https://texttospeech.googleapis.com/v1/text:synthesize",
            data=payload,
            method="POST",
            headers={
                "Authorization": f"Bearer {token}",
                "x-goog-user-project": project,
                "Content-Type": "application/json; charset=utf-8",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=16) as resp:
                resp_data = json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as err:
            if err.code == 401:
                self._creds.invalidate()
            err_body = err.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"Google TTS HTTP {err.code}: {err_body[:240]}") from err

        audio_b64 = resp_data.get("audioContent")
        if not audio_b64:
            raise RuntimeError("Google TTS response missing audioContent")
        audio_bytes = base64.b64decode(audio_b64)
        try:
            cache_path.write_bytes(audio_bytes)
        except OSError:
            pass
        return audio_bytes, voice_name, False


CRED_PROVIDER = ChirpCredentialProvider()
SYNTHESIZER = ChirpSynthesizer(CRED_PROVIDER, CACHE_DIR)


class SafeKidsPortalHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(WEB_DIR), **kwargs)

    def end_headers(self) -> None:
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
        super().end_headers()

    def _send_json(self, status_code: int, payload: dict[str, object]) -> None:
        data = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self) -> None:
        clean_path = self.path.split("?", 1)[0].split("#", 1)[0]
        if clean_path == "/api/tts/status":
            token, project = CRED_PROVIDER.get_credentials()
            self._send_json(
                200,
                {
                    "available": bool(token and project),
                    "engine": "Google Cloud TTS Chirp 3 HD",
                    "defaultPersona": "Aoede",
                    "personas": sorted(VALID_PERSONAS),
                    "languages": ["en", "es", "zh", "yue", "ja", "ko", "pt", "fr", "it", "de", "ar"],
                },
            )
            return

        parts = [p for p in clean_path.split("/") if p]
        if any(p.startswith(".") for p in parts):
            self.send_error(403, "Forbidden")
            return
        super().do_GET()

    def do_POST(self) -> None:
        if self.path.split("?", 1)[0] != "/api/tts":
            self.send_error(404, "Not Found")
            return

        try:
            content_len = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            content_len = 0

        if content_len <= 0 or content_len > 16384:
            self._send_json(400, {"error": "Invalid request payload size"})
            return

        try:
            data = json.loads(self.rfile.read(content_len).decode("utf-8"))
        except Exception:
            self._send_json(400, {"error": "Invalid JSON body"})
            return

        text = str(data.get("text") or "").strip()
        lang = str(data.get("lang") or "en").strip()
        persona = str(data.get("persona") or "Aoede").strip()
        speaking_rate = data.get("speakingRate", 1.0)
        if not text:
            self._send_json(400, {"error": "Missing 'text' field"})
            return

        try:
            audio_bytes, voice_name, cached = SYNTHESIZER.synthesize(
                text=text, lang=lang, persona=persona, speaking_rate=speaking_rate
            )
        except Exception as exc:
            self._send_json(503, {"error": str(exc)})
            return

        self.send_response(200)
        self.send_header("Content-Type", "audio/mpeg")
        self.send_header("Content-Length", str(len(audio_bytes)))
        self.send_header("X-TTS-Voice", voice_name)
        self.send_header("X-TTS-Cache", "HIT" if cached else "MISS")
        self.send_header("Cache-Control", "public, max-age=86400")
        self.end_headers()
        self.wfile.write(audio_bytes)


class ThreadedPortalServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run SafeKids Portal server with Chirp 3 HD TTS.")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT)
    args = parser.parse_args()
    with ThreadedPortalServer((HOST, args.port), SafeKidsPortalHandler) as httpd:
        print(f"SafeKids Portal + Chirp 3 HD running at http://{HOST}:{args.port}/")
        httpd.serve_forever()
