#!/usr/bin/env bash
# Build and run the full CYBERNEXUS stack with Docker Compose.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

if [ ! -f .env ]; then
  echo "[full-stack] .env not found - copying .env.example. Edit secrets before production use."
  cp .env.example .env
fi

echo "[full-stack] Building images (first run may take a few minutes)..."
docker compose up --build