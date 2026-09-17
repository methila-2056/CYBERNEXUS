#!/usr/bin/env bash
# Start the CYBERNEXUS PostgreSQL database (Docker).
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

if [ ! -f .env ]; then
  echo "[db-up] .env not found - copying .env.example. Edit it before production use."
  cp .env.example .env
fi

echo "[db-up] Starting postgres container..."
docker compose up -d postgres
docker compose ps postgres