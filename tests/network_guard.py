"""Hermetic outbound network & DNS blocker for offline unit tests (Law 6)."""

from __future__ import annotations

import ipaddress
import os
import socket
from typing import Any

_LOCAL_NAMES = frozenset({"", "localhost", "localhost.localdomain"})
_real_socket_connect = socket.socket.connect
_real_socket_connect_ex = socket.socket.connect_ex
_real_create_connection = socket.create_connection
_real_getaddrinfo = socket.getaddrinfo
_attempts: list[str] = []


class ExternalNetworkBlockedError(RuntimeError):
    """Raised when an offline test attempts an outbound network or DNS connection."""


def _is_local(host: Any) -> bool:
    if host is None:
        return True
    if isinstance(host, bytes):
        host = host.decode("ascii", "replace")
    if not isinstance(host, str):
        return False
    host = host.strip().lower()
    if host in _LOCAL_NAMES:
        return True
    try:
        return ipaddress.ip_address(host.split("%", 1)[0]).is_loopback
    except ValueError:
        return False


def _is_loopback_address(address: Any) -> bool:
    if isinstance(address, (tuple, list)) and address:
        return _is_local(address[0])
    return isinstance(address, (str, bytes))


def _refuse(target: Any, what: str = "live network connection to") -> ExternalNetworkBlockedError:
    _attempts.append(str(target))
    return ExternalNetworkBlockedError(
        f"Unit test attempted {what} {target!r}. Offline tests must run 100% hermetically."
    )


def install_network_guard() -> None:
    """Block all non-loopback socket connections and DNS lookups, and poison ADC path."""
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/nonexistent/enriq-next-hermetic-adc.json"

    def _guarded_connect(self: socket.socket, address: Any) -> Any:
        if self.family in (socket.AF_INET, socket.AF_INET6) and not _is_loopback_address(address):
            raise _refuse(address[0] if isinstance(address, tuple) else address)
        return _real_socket_connect(self, address)

    def _guarded_connect_ex(self: socket.socket, address: Any) -> Any:
        if self.family in (socket.AF_INET, socket.AF_INET6) and not _is_loopback_address(address):
            raise _refuse(address[0] if isinstance(address, tuple) else address)
        return _real_socket_connect_ex(self, address)

    def _guarded_getaddrinfo(host: Any, port: Any, *args: Any, **kwargs: Any) -> Any:
        if not _is_local(host):
            raise _refuse(host, "DNS lookup for")
        return _real_getaddrinfo(host, port, *args, **kwargs)

    socket.socket.connect = _guarded_connect  # type: ignore[assignment]
    socket.socket.connect_ex = _guarded_connect_ex  # type: ignore[assignment]
    socket.getaddrinfo = _guarded_getaddrinfo  # type: ignore[assignment]
