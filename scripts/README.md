# scripts — development & lab helpers

Cross-platform helper scripts (`.ps1` for Windows, `.sh` for macOS/Linux).
Run everything from the repository root.

| Script | Purpose |
| --- | --- |
| `db-up.ps1` / `db-up.sh` | Start the PostgreSQL container (database only) |
| `backend-run.ps1` / `backend-run.sh` | Install backend deps, migrate, run uvicorn with reload |
| `frontend-run.ps1` / `frontend-run.sh` | Install frontend deps and run the Vite dev server |
| `full-stack.ps1` / `full-stack.sh` | Build and run the whole stack with Docker Compose |

## db-up

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\db-up.ps1
```

Notes: relies on `docker-compose.yml` at the repository root. The container
mounts a named volume (`cybernexus_pgdata`), so data survives restarts; use
`docker compose down -v` to reset it.

## backend-run

Starts the FastAPI backend with hot-reload (port 8000 by default).

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\backend-run.ps1 -Port 8000
```

First run: creates `.venv`, `pip install -e ".[dev]"`, applies Alembic
migrations (`alembic upgrade head`), then `uvicorn app.main:app --reload`.

## frontend-run

Starts the Vite dev server (port 5173 by default).

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\frontend-run.ps1 -Port 5173
```

First run: `npm install`. The dev proxy forwards `/api` to the backend on
port 8000.

## full-stack

Builds and runs the entire stack with Docker Compose:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\full-stack.ps1
```

## Why two shells

PowerShell scripts run natively on Windows without WSL; the matching `.sh`
scripts cover macOS/Linux and CI-style environments. Both are thin wrappers
over the exact commands documented in `docs/setup.md`.

## Later-phase scripts (planned, not yet present)

`start_lab`, `stop_lab`, `reset_lab`, `generate_events`,
`generate_bruteforce_events`, `generate_network_events`,
`generate_ransomware_simulation`, `generate_phishing_samples`.

All simulations generate harmless, clearly-labelled synthetic telemetry
against local/lab targets only.