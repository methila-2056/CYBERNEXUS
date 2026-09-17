"""CYBERNEXUS backend application entry point.

Creates the FastAPI app with middleware, route registration, and global
error handling. Uses an app *factory* so tests can build isolated instances.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import __version__
from app.api.v1.router import api_router
from app.core.config import get_settings
from app.core.logging import setup_logging
from app.core.security import SecurityHeadersMiddleware, register_exception_handlers


def create_app() -> FastAPI:
    """Assemble and return a configured FastAPI application."""
    settings = get_settings()
    setup_logging(settings.log_level)

    app = FastAPI(
        title=f"{settings.app_name} API",
        description=(
            "Unified Cybersecurity Command, Intelligence, Defense & Automated "
            "Response Platform - educational defensive lab. "
            "Intended for authorized local/lab targets only."
        ),
        version=__version__,
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # CORS: only allow explicit browser origins (never a wildcard).
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Defensive HTTP security headers.
    app.add_middleware(SecurityHeadersMiddleware)

    # Safe error handling (no internals leaked).
    register_exception_handlers(app)

    # Versioned API routes.
    app.include_router(api_router, prefix=settings.api_v1_prefix)

    @app.get("/health", tags=["health"], summary="Liveness probe")
    def liveness() -> dict:
        """Simple liveness probe for orchestration tooling."""
        return {"status": "ok", "app": settings.app_name, "version": __version__}

    return app


app = create_app()