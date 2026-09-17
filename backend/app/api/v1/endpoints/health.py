"""Health endpoints.

GET /api/v1/health  - liveness *and* database reachability (runs SELECT 1).
GET /health         - lightweight liveness used by load balancers/k8s.
"""

import logging

from fastapi import APIRouter
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.core.config import get_settings
from app.core.database import get_engine

logger = logging.getLogger("cybernexus.health")

router = APIRouter()


@router.get("", summary="Health check (liveness + database)")
def health_check() -> dict:
    """Return application status and database reachability."""
    settings = get_settings()

    database_status = "ok"
    try:
        with get_engine().connect() as connection:
            connection.execute(text("SELECT 1"))
    except SQLAlchemyError as exc:  # noqa: BLE001 - we must catch all DB errors here
        logger.warning("database_health_check_failed reason=%s", type(exc).__name__)
        database_status = "error"

    return {
        "status": "ok" if database_status == "ok" else "degraded",
        "database": database_status,
        "app": settings.app_name,
        "version": "0.1.0",
    }
