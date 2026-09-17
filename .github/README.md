# GitHub configuration

`workflows/ci.yml` — CI pipeline running on every push/PR:

1. **backend job** — Python 3.12: `ruff check` + `pytest` (SQLite, no external services).
2. **frontend job** — Node: `npm ci`, `tsc --noEmit`, `vitest run`, production `build`.

Secrets are read from repository/action settings — never stored in files.