#!/usr/bin/env bash
# Run the CYBERNEXUS FastAPI backend with hot-reload.
set -euo pipefail

PORT="${1:-8000}"
backend="$(cd "$(dirname "$0")/../backend" && pwd)"
cd "$backend"

if [ ! -d .venv ]; then
  echo "[backend-run] Creating virtual environment..."
  python3 -m venv .venv
fi

.venv/bin/python -m pip install -e ".[dev]"

echo "[backend-run] Applying Alembic migrations..."
.venv/bin/python -m alembic upgrade head

echo "[backend-run] Starting uvicorn on :${PORT} ..."
.venv/bin/python -m uvicorn app.main:app --reload --port "$PORT"