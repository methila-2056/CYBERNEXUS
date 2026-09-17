# CYBERNEXUS Setup Guide

How to install, configure, and run CYBERNEXUS on a local machine (Windows and macOS/Linux). This is the **foundation** setup — everything listed here is verified in Phase 1.

## 1. Prerequisites

| Tool | Version | Why |
| --- | --- | --- |
| Python | 3.12+ | Backend runtime |
| Node.js + npm | 20+ / 10+ | Frontend build |
| Docker Desktop + Compose | recent | PostgreSQL + full-stack mode |
| Git | any recent | Version control |

Check your machine:

```powershell
# Windows PowerShell
python --version
node --version
npm --version
docker compose version
git --version
```

## 2. Get the code

```powershell
git clone https://github.com/methila-2056/CYBERNEXUS.git
cd CYBERNEXUS
```

## 3. Configure environment

```powershell
Copy-Item .env.example .env      # Windows
# cp .env.example .env           # macOS / Linux
```

Open `.env` and set at least:

- `SECRET_KEY` → a long random string (see below).
- `DATABASE_URL` → keep the Postgres default for dev, or point at your local DB.

Generate a strong secret key:

```powershell
python -c "import secrets; print(secrets.token_hex(48))"
```

## 4. Start PostgreSQL (recommended dev mode)

The backend and frontend run on the host for hot-reload; only the database runs in Docker.

```powershell
docker compose up -d postgres
docker compose ps        # confirm postgres is healthy
```

If you prefer a full containerized stack instead:

```powershell
docker compose up --build
```

## 5. Run the backend

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1        # Windows
# source .venv/bin/activate       # macOS / Linux
pip install -e ".[dev]"
alembic upgrade head              # apply database migrations
uvicorn app.main:app --reload --port 8000
```

Verify:

- API docs: http://localhost:8000/docs
- Liveness: http://localhost:8000/health
- DB-aware health: http://localhost:8000/api/v1/health (returns `{"status":"ok","database":"ok"}`)

## 6. Run the frontend

New terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. The dev server proxies `/api` to the backend on port 8000, and the top status bar shows backend connectivity.

## 7. Run tests

```powershell
# Backend (uses SQLite automatically in test config)
cd backend
pytest

# Lint
ruff check .

# Frontend
cd frontend
npm test
npm run build        # type + production build check
```

## 8. Database migrations

CYBERNEXUS uses Alembic for schema versioning.

```powershell
cd backend
alembic upgrade head         # apply all pending migrations
alembic current              # show current revision
alembic revision -m "msg"    # create a new migration (after editing models)
```

> Phase 1 ships an empty baseline migration. Real domain tables arrive with Phase 3.

## 9. SQLite fallback

Tests and hack-time runs can use SQLite; no Postgres needed:

```powershell
# In tests: automatic.
# Manual: set DATABASE_URL to
#   sqlite:///./cybernexus.db
# then run `alembic upgrade head` and `uvicorn app.main:app --reload`.
```

## 10. Common problems

| Symptom | Fix |
| --- | --- |
| Backend can't reach DB | Is `docker compose up -d postgres` running? Check `DATABASE_URL` |
| Port 8000/5432/5173 busy | Stop conflicting apps, or change ports in `.env`/`vite.config.ts` |
| CORS errors in browser | Ensure the frontend origin is in `CORS_ORIGINS` in `.env` |
| `alembic upgrade head` fails | Reset with `alembic downgrade base` then retry; ensure DB reachable |
| npm install is slow | Use a registry mirror; this is expected on first install |
| Windows line-ending noise | `.gitattributes` normalizes to LF; avoid committing CRLF diffs |

## 11. Scripts (optional)

See `scripts/README.md` for helpers such as `db-up`, `backend-run`, `frontend-run`, and `full-stack` for both PowerShell and Bash.

## 12. After Phase 1

Phase 1 is the **foundation**: app boots, DB connects, UI shell renders, CI green. Authentication, ingestion, detection, and all modules are added in subsequent phases and this guide will be extended per module.