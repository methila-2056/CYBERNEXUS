# CYBERNEXUS Architecture

> **Status:** Foundation (Phase 1). This document describes the target architecture. Modules are delivered incrementally in later phases.

## 1. Purpose

This document explains **what** CYBERNEXUS is made of, **how** it is organised, and — most importantly — **why** each decision was made. It is written for two CSE students who are new to cybersecurity engineering, so terminology is explained inline.

## 2. High-Level Data Flow

```
DATA SOURCES
    |-- Windows Endpoint (Sysmon-style)
    |-- Linux Endpoint
    |-- Authentication Logs
    |-- Web Application
    |-- API Logs
    |-- Network Security Logs (Suricata EVE JSON)
    |-- Cloud Audit Logs
    |-- Container Security Events
    v
INGESTION LAYER
    v
NORMALIZATION LAYER
    v
EVENT STORAGE
    v
CORRELATION ENGINE
    +----------------------+
    |                      |
    v                      v
RULE ENGINE           ML ENGINE
    |                      |
    +----------+-----------+
               |
               v
        RISK SCORING
               |
               v
       ALERT MANAGEMENT
               |
               v
      INCIDENT MANAGEMENT
               |
   +-------+-------+-------+
   v       v       v       v
 MITRE    THREAT   FORENSICS  RESPONSE ACTIONS
 ATT&CK   INTEL    TIMELINE   (simulated)
   |       |       |
   +-------+-------+
               |
               v
       REPORTING / AUDIT
```

The pipeline is unidirectional: events flow **in** and only read-only workflows (hunting, forensics, reporting) loop back. This keeps the system predictable and safe.

## 3. Design Principles

| Principle | Meaning in practice |
| --- | --- |
| **Defensive only** | All code detects, investigates, and reports. No code attacks external systems. |
| **Local & safe** | Lab targets are localhost/Docker-lab only; response actions are labelled simulations. |
| **Modular** | Each domain is a separate package that can be added, tested, and explained independently. |
| **Explainable** | Every rule, risk score, and MITRE mapping carries documentation of *why*. |
| **Honest** | Synthetic data is labelled synthetic; models never report inflated accuracy; CVEs are not claimed exploitable without evidence. |
| **Beginner-friendly** | No unnecessary abstraction, meaningful names, comments on complex security logic. |
| **Correctness first** | Tests run at the end of every phase before code is considered done. |

## 4. Monorepo Layout

A **monorepo** keeps everything in one repository while still separating modules — the simplest thing for students to navigate and for GitHub/Actions to build.

```
CYBERNEXUS/
|-- frontend/            # React + Vite SOC console (TypeScript)
|-- backend/             # FastAPI server: config, DB, API routes
|-- detection-engine/    # Python package: rule-based detection
|-- ml-engine/           # Python package: training + inference
|-- collectors/          # Python package: safe local telemetry
|-- threat-intelligence/ # Python package: IOC + enrichment
|-- forensic-engine/     # Python package: timelines + evidence
|-- response-engine/     # Python package: simulated response
|-- lab/                 # Local intentionally vulnerable + secure web app
|-- datasets/            # Synthetic/simulated datasets (CSV/parquet) + generators
|-- rules/               # Detection rules in YAML
|-- mitre/               # Versioned MITRE ATT&CK datasets (JSON)
|-- models/              # Serialized ML artifacts (gitignored)
|-- docs/                # Documentation (why + how)
|-- tests/               # Cross-module integration tests
|-- docker/              # Dockerfiles + compose fragments
|-- scripts/             # Dev/lab scripts (.ps1 and .sh)
|-- .github/             # GitHub Actions CI
|-- docker-compose.yml
|-- .env.example
|-- LICENSE
```

**Why separate packages?** Each `*-engine` directory is a small Python package with its own `pyproject.toml`. The backend imports them like any library. This means a new module can be developed, tested, and explained on its own, then wired into the API with a few lines. It also keeps the backend small enough for beginners to understand.

**Why not microservices?** A single API process that imports all modules is far easier to run, debug, and understand. Docker Compose already isolates the infrastructure pieces (database, apps) without forcing every module into its own container.

## 5. Backend Structure

```
backend/
|-- pyproject.toml           # PEP 621 metadata + pinned deps; pip install -e .
|-- alembic.ini
|-- alembic/                 # migration scripts (versioned schema changes)
|-- app/
|   |-- main.py              # FastAPI app factory, middleware, routes
|   |-- core/
|   |   |-- config.py        # pydantic-settings: all env config in one object
|   |   |-- database.py      # SQLAlchemy engine + session factory
|   |   |-- logging.py       # structured logging configuration
|   |   |-- security.py      # headers, CORS, (later) auth helpers
|   |-- api/
|   |   |-- v1/
|   |       |-- router.py    # mounts all v1 endpoints
|   |       |-- endpoints/   # one file per resource domain
|   |-- models/              # SQLAlchemy ORM models (Phase 3+)
|   |-- schemas/             # Pydantic request/response schemas (Phase 3+)
|-- tests/                   # pytest suite
```

**Why an app factory?** `create_app()` lets tests spin up isolated instances (e.g., with a SQLite database and test settings) without sharing state with the dev server.

**Why pydantic-settings?** All configuration (DB URL, secrets, CORS origins) comes from environment variables through one typed object. Beginners see every setting in one place, and secrets never live in code.

## 6. Frontend Structure

```
frontend/
|-- package.json
|-- vite.config.ts            # dev proxy: /api -> backend
|-- index.html
|-- src/
|   |-- main.tsx              # React entry
|   |-- App.tsx               # router + providers
|   |-- styles/index.css      # Tailwind v4 + theme tokens
|   |-- lib/api.ts            # typed fetch wrapper (errors, auth later)
|   |-- theme/                # dark (default) + light tokens
|   |-- components/
|   |   |-- layout/           # AppLayout: sidebar + top status bar
|   |   |-- ...               # shared UI (severity badges, etc.)
|   |-- pages/                # one route per section
|   |-- types/                # domain types
|-- tests/
```

**Why a SOC shell first?** The 21-module navigation and the dark console theme are the "skeleton" every later phase hangs off. Building the shell in Phase 1 means each future module only adds a page + API, keeping every phase small and testable.

## 7. Database Strategy

- Primary datababase: **PostgreSQL** (via Docker) — production-like, supports JSONB, full-text search, and the indexes we need.
- Fallback: **SQLite** — used by tests and for anyone who wants to run without Docker. The backend switches purely through `DATABASE_URL`.
- **Alembic** owns schema changes. Migrations are committed to the repo so every teammate and every CI run can bring the DB to the same state.

The full schema design (tables, relationships, indexes, enums) lives in [database-schema.md](database-schema.md).

## 8. Security Architecture (for the platform itself)

| Concern | Approach |
| --- | --- |
| Passwords | Argon2id/bcrypt hashing (Phase 2) |
| Sessions | Short-lived JWT + configurable expiry (Phase 2) |
| Authorization | RBAC enforced in backend, never only in the UI (Phase 2) |
| SQL safety | ORM/parameterized queries only |
| XSS | Frontend escapes output; no `dangerouslySetInnerHTML` with user data |
| CORS | Explicit allow-list from env |
| Headers | `X-Content-Type-Options`, `X-Frame-Options`, CSP (Phase 1 baseline) |
| Secrets | `.env` only, `.gitignore`d, `.env.example` has no real values |
| Errors | Safe exception handler: no stack traces or secrets leaked to clients |
| Rate limiting | Applied to auth + ingestion (Phase 23 hardening layer) |
| Audit | Immutable audit log for admin/security actions (Phase 35 of spec) |

The threat model of CYBERNEXUS itself is documented in `docs/threat-model.md`.

## 9. Where Each Logical Layer Lives

| Logical layer | Primary package(s) |
| --- | --- |
| Ingestion | `backend` API (`/api/events`) + `collectors` |
| Normalization | `collectors` + `backend` |
| Storage | `backend` models (PostgreSQL) |
| Correlation / rules | `detection-engine` |
| ML | `ml-engine` |
| Risk scoring | `detection-engine` |
| Alerts / incidents | `backend` |
| TI / IOC | `threat-intelligence` |
| MITRE | `mitre` data + `backend` |
| Forensics | `forensic-engine` + `backend` |
| Response | `response-engine` (simulated) |
| Reporting | `backend` |

## 10. Development Phases (Roadmap)

The project is built in 26 ordered phases. **Phase 1 (this release)** delivers the foundation only.

| Phase | Deliverable | Status |
| --- | --- | --- |
| 1 | Project foundation (this release) | ✅ |
| 2 | Authentication + RBAC | ⏳ |
| 3 | Database tables + event ingestion | ⏳ |
| 4 | SOC dashboard | ⏳ |
| 5 | Detection engine | ⏳ |
| 6 | Alerts + incidents | ⏳ |
| 7 | Endpoint security | ⏳ |
| 8 | Network security | ⏳ |
| 9 | Web security lab | ⏳ |
| 10 | Ransomware behaviour detection | ⏳ |
| 11 | Phishing analysis | ⏳ |
| 12 | Threat intelligence | ⏳ |
| 13 | MITRE ATT&CK | ⏳ |
| 14 | Threat hunting | ⏳ |
| 15 | Digital forensics | ⏳ |
| 16 | Vulnerability management | ⏳ |
| 17 | ML anomaly detection | ⏳ |
| 18 | Cloud security | ⏳ |
| 19 | Container security | ⏳ |
| 20 | DevSecOps | ⏳ |
| 21 | Automated response (simulated) | ⏳ |
| 22 | Reporting | ⏳ |
| 23 | Security hardening | ⏳ |
| 24 | Testing expansion | ⏳ |
| 25 | Documentation completion | ⏳ |
| 26 | Final integration | ⏳ |

## 11. Conventions

- Backend: Python 3.12, `ruff` lint+format, pytest, `pip install -e .[dev]`.
- Frontend: TypeScript strict, `tsc --noEmit`, Vitest.
- Every PR/push must pass CI (lint + tests + build) before merge.
- No hard-coded secrets. No arbitrary shell execution from the web UI. No execution of uploaded files.
- Comments explain *why* on complex logic; names explain *what*.