"""Tests for the foundation health endpoints and security headers."""

from fastapi.testclient import TestClient


def test_liveness(client: TestClient) -> None:
    """GET /health returns the liveness payload."""
    response = client.get("/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["app"] == "CYBERNEXUS"


def test_api_health_reports_database_ok(client: TestClient) -> None:
    """GET /api/v1/health performs a real database probe (SQLite in tests)."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["database"] == "ok"


def test_security_headers_present(client: TestClient) -> None:
    """Every response carries the defensive security headers."""
    response = client.get("/health")
    assert response.headers.get("x-content-type-options") == "nosniff"
    assert response.headers.get("x-frame-options") == "DENY"
    assert response.headers.get("referrer-policy") == "no-referrer"
    assert response.headers.get("content-security-policy") == "default-src 'self'"


def test_cors_preflight_allowed_origin(client: TestClient) -> None:
    """CORS allows the configured dev origin."""
    response = client.options(
        "/api/v1/health",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "GET",
        },
    )
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "http://localhost:5173"


def test_unknown_route_returns_structured_404(client: TestClient) -> None:
    """Unknown API routes produce FastAPI's standard {detail} shape."""
    response = client.get("/api/v1/does-not-exist")
    assert response.status_code == 404
    assert "detail" in response.json()


def test_non_error_responses_do_not_leak_internals(client: TestClient) -> None:
    """A normal response should not expose stack traces or env secrets."""
    response = client.get("/api/v1/health")
    assert "Traceback" not in response.text
    assert "secret_key" not in response.text.lower()
