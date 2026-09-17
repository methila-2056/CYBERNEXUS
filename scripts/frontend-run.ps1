# Run the CYBERNEXUS Vite frontend dev server.
param(
    [int]$Port = 5173
)
$ErrorActionPreference = "Stop"
$frontend = Join-Path (Split-Path -Parent $PSScriptRoot) "frontend"

Set-Location $frontend

if (-not (Test-Path "node_modules")) {
    Write-Host "[frontend-run] Installing dependencies (first run)..."
    npm install
    if ($LASTEXITCODE -ne 0) { throw "npm install failed" }
}

Write-Host "[frontend-run] Starting Vite on :$Port ..."
npm run dev -- --port $Port