# CYBERNEXUS Backend

FastAPI application server for the CYBERNEXUS platform.

**What lives here (Phase 1 foundation):**

- App factory (`app/main.py`) — single place where middleware, routes, and handlers are assembled
- Configuration (`app/core/config.py`) — typed, environment-driven settings (pydantic-settings)
- Database connectivity (`app/core/database.py`) — SQLAlchemy 2 engine/session; PostgreSQL by default, SQLite for tests
- Security middleware (`app/core/security.py`) — security headers
- Structured logging (`app/core/logging.py`)
- Health endpoints — `/health` (liveness) and `/api/v1/health` (database-aware)
- Alembic migration pipeline (baseline revision; domain tables arrive Phase 3)

**Domain modules** (auth, events, detection, alerts, incidents, …) are added phase by phase.
**Detection/ML/Forensics modules** live in sibling packages (`../detection-engine`, `../ml-engine`, …) and are imported here as libraries in later phases.

## Quick start

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1      # Windows
# source .venv/bin/activate     # macOS / Linux
pip install -e ".[dev]"         # editable install incl. dev tools
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

Verify: `http://localhost:8000/docs` and `http://localhost:8000/api/v1/health`.

## Tests

```powershell
pytest          # requires no external services (SQLite)
ruff check .    # lint
```

See `../docs/setup.md` and `../docs/architecture.md` for details.