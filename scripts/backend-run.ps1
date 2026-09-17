# Run the CYBERNEXUS FastAPI backend with hot-reload.
param(
    [int]$Port = 8000
)
$ErrorActionPreference = "Stop"
$backend = Join-Path (Split-Path -Parent $PSScriptRoot) "backend"

Set-Location $backend

# Create the virtual environment on first run.
if (-not (Test-Path ".venv\Scripts\python.exe")) {
    Write-Host "[backend-run] Creating virtual environment..."
    python -m venv .venv
}

# Install (or refresh) package with dev extras.
& ".venv\Scripts\python.exe" -m pip install -e ".[dev]"
if ($LASTEXITCODE -ne 0) { throw "pip install failed" }

# Apply database migrations.
Write-Host "[backend-run] Applying Alembic migrations..."
& ".venv\Scripts\python.exe" -m alembic upgrade head
if ($LASTEXITCODE -ne 0) { throw "alembic upgrade failed (is Postgres running? see scripts/db-up.ps1)" }

Write-Host "[backend-run] Starting uvicorn on :$Port ..."
& ".venv\Scripts\python.exe" -m uvicorn app.main:app --reload --port $Port