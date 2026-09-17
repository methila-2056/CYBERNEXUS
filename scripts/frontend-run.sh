#!/usr/bin/env bash
# Run the CYBERNEXUS Vite frontend dev server.
set -euo pipefail

PORT="${1:-5173}"
frontend="$(cd "$(dirname "$0")/../frontend" && pwd)"
cd "$frontend"

if [ ! -d node_modules ]; then
  echo "[frontend-run] Installing dependencies (first run)..."
  npm install
fi

echo "[frontend-run] Starting Vite on :${PORT} ..."
npm run dev -- --port "$PORT"