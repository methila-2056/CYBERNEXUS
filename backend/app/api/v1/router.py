"""Aggregate router for all v1 endpoints.

New resource routers (events, alerts, incidents, ...) are included here as
their phases land, keeping the app factory untouched.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import health

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["health"])