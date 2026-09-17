# Start the CYBERNEXUS PostgreSQL database (Docker).
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

Set-Location $root
if (-not (Test-Path ".env")) {
    Write-Host "NOTE: .env not found - copying .env.example. Edit it before production use."
    Copy-Item ".env.example" ".env"
}

Write-Host "[db-up] Starting postgres container..."
docker compose up -d postgres
Write-Host "[db-up] Status:"
docker compose ps postgres