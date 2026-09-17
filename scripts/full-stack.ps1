# Build and run the full CYBERNEXUS stack with Docker Compose.
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

Set-Location $root

if (-not (Test-Path ".env")) {
    Write-Host "[full-stack] .env not found - copying .env.example. Edit secrets before production use."
    Copy-Item ".env.example" ".env"
}

Write-Host "[full-stack] Building images (first run may take a few minutes)..."
docker compose up --build