"""Pytest fixtures for the backend test-suite."""

import os
import sys
from pathlib import Path

# Ensure `app` is importable regardless of how pytest is invoked.
BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

# Test configuration must be set BEFORE the app package is first imported,
# because settings are cached per process.
os.environ.setdefault("APP_ENV", "test")
os.environ.setdefault("DATABASE_URL", "sqlite://")
os.environ.setdefault("SECRET_KEY", "test-secret-not-for-production")
os.environ.setdefault(
    "CORS_ORIGINS", "http://testserver,http://localhost:5173"
)

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from app.main import app  # noqa: E402


@pytest.fixture(scope="session")
def client() -> TestClient:
    """HTTP-level test client bound to the application."""
    with TestClient(app) as test_client:
        yield test_client
