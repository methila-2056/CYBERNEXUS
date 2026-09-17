# CYBERNEXUS Frontend

React + TypeScript + Vite SOC console.

**Phase 1 foundation:**

- Dark security-console theme (default) with light-theme option via a toggle
- `AppLayout` shell: 21-item sidebar navigation + top status bar
- Live backend connectivity indicator in the top bar
- Routes: Overview (placeholder dashboard), Login form skeleton, and a coming-soon page for every module
- Typed API wrapper (`src/lib/api.ts`) with the dev proxy `/api -> :8000`

**What lands later:** real dashboards (charts, tables, filters) per module phase, authentication wiring (Phase 2), and severity/status components.

## Quick start

```powershell
npm install
npm run dev        # http://localhost:5173
```

## Scripts

- `npm run dev` — Vite dev server with HMR and `/api` proxy to `http://localhost:8000`
- `npm run build` — `tsc --noEmit` + production build
- `npm run preview` — serve the production build locally
- `npm test` — Vitest unit tests

See `../docs/setup.md`.