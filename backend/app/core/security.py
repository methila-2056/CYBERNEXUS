"""Security middleware for the API itself.

Phase 1 delivers:
- Security headers middleware (CSP, nosniff, framing, referrer, permissions).
- Safe exception handling so internal errors never leak stack traces or secrets.

Auth / RBAC / rate limiting / input validation arrive in later phases
(Authentication & RBAC, Security Hardening) — see docs/architecture.md.
"""

import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

logger = logging.getLogger("cybernexus.security")


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Attach defensive HTTP security headers to every response."""

    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "DENY")
        response.headers.setdefault("Referrer-Policy", "no-referrer")
        # Modern guidance: legacy XSS-Auditor is disabled (it introduced issues).
        response.headers.setdefault("X-XSS-Protection", "0")
        response.headers.setdefault(
            "Permissions-Policy",
            "geolocation=(), microphone=(), camera=()",
        )
        response.headers.setdefault("Content-Security-Policy", "default-src 'self'")
        return response


def register_exception_handlers(app: FastAPI) -> None:
    """Register a catch-all handler that never leaks internals."""

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception):
        logger.exception(
            "unhandled_exception method=%s path=%s",
            request.method,
            request.url.path,
        )
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error. See server logs."},
        )