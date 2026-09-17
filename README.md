# CYBERNEXUS

**Unified Cybersecurity Command, Intelligence, Defense & Automated Response Platform**

A unified, defensive cybersecurity platform that brings together SOC operations, SIEM-style event management, threat detection, threat intelligence, MITRE ATT&CK mapping, digital forensics, incident response, and safe security automation — built as an **educational final-year engineering project**.

> **IMPORTANT:** CYBERNEXUS is a **defensive, educational lab platform**. Every detection, simulation, and lab scenario runs only against **authorized local systems, test environments, and intentionally vulnerable lab applications**. It does **not** contain or enable real-world exploit automation, malware, credential theft, or any capability intended to compromise third-party systems.

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Motivation](#motivation)
3. [Objectives](#objectives)
4. [Architecture](#architecture)
5. [Features](#features)
6. [Technology Stack](#technology-stack)
7. [Project Structure](#project-structure)
8. [Installation](#installation)
9. [Environment Variables](#environment-variables)
10. [Docker Setup](#docker-setup)
11. [Sample Credentials (Local Demo)](#sample-credentials-local-demo)
12. [Running Tests](#running-tests)
13. [Lab Scenarios](#lab-scenarios)
14. [Detection Examples](#detection-examples)
15. [MITRE ATT&CK Mapping](#mitre-attack-mapping)
16. [ML Architecture](#ml-architecture)
17. [Security Architecture](#security-architecture)
18. [Project Limitations](#project-limitations)
19. [Future Enhancements](#future-enhancements)
20. [Team Contribution Structure](#team-contribution-structure)
21. [License](#license)

---

## Problem Statement

Organizations are flooded with security telemetry from dozens of sources — endpoints, servers, networks, web applications, authentication systems, cloud platforms, and containers. Raw logs are meaningless without a system that can **collect, normalize, correlate, and interpret** them.

A modern Security Operations Center (SOC) relies on several expensive, enterprise-only platforms (SIEM, XDR, SOAR, EDR). Students entering cybersecurity rarely get hands-on access to such systems because they are complex, costly, and production-locked.

**CYBERNEXUS solves this by building one integrated, defensive security platform that students can run fully on a local machine** — demonstrating the complete defensive lifecycle from telemetry collection to detection, investigation, incident response, and reporting.

## Motivation

- Cybersecurity skills are best learned by **seeing the full picture**, not isolated tools.
- Most educational projects are single-domain (a scanner, a dashboard, a classifier). CYBERNEXUS ties together **every major defensive domain** into one coherent platform.
- It proves real engineering skills: backend APIs, databases, frontend UI, ML, security engineering, and documentation.
- Three pillars drive every design decision: **correctness, explainability, and safety**.

## Objectives

- Build a modular, unified SOC + SIEM + XDR-style platform runnable entirely on a local machine.
- Normalize heterogeneous security telemetry into one standard event schema.
- Detect malicious behaviour through **rule-based detection** and **machine-learning anomaly detection**.
- Score risk transparently and manage alerts and incidents end-to-end.
- Provide threat hunting, IOC management, MITRE ATT&CK mapping, and digital forensics timelines.
- Ship a safe **web application security lab** with intentionally vulnerable (and securely fixed) versions of the same app.
- Automate safe, **simulated** response actions only.
- Generate professional reports and audit logs.
- Teach the *why* behind every decision through comprehensive, beginner-friendly documentation.

## Architecture

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
INGESTION LAYER -> NORMALIZATION LAYER -> EVENT STORAGE
    v
CORRELATION ENGINE
    +-- RULE ENGINE
    +-- ML ENGINE
    v
RISK SCORING -> ALERT MANAGEMENT -> INCIDENT MANAGEMENT
    +-- MITRE ATT&CK MAPPING
    +-- THREAT INTELLIGENCE / IOC MATCHING
    +-- DIGITAL FORENSICS TIMELINE
    v
INCIDENT RESPONSE (simulated, safe)
    v
REPORTING / AUDIT / CONTINUOUS IMPROVEMENT
```

The full architecture, the rationale for every choice, and the intended data flow are documented in [docs/architecture.md](docs/architecture.md).

## Features

| Domain | Capability |
| --- | --- |
| SOC Overview | Executive + analyst dashboard, live event stream, severity charts |
| SIEM | Event ingestion, normalization, search, filters, pagination, event detail |
| Detection Engine | Modular rule-based detection with MITRE mapping and documented logic |
| ML Anomaly Detection | scikit-learn based behavioural anomaly scoring with honest evaluation |
| Risk Scoring | Transparent, configurable, weighted risk scoring |
| Alerts & Incidents | Full workflow: new → ack → investigate → resolve / false positive |
| Endpoint Security | Endpoint inventory, process/network/file/login activity |
| Network Security | Flow monitoring, port-scan/brute-force/DNS anomaly detection |
| Web Security Lab | Local OWASP-style vulnerable app + secure version, with remediation guides |
| Ransomware Behaviour | Safe detection of ransomware-like file activity in a sandbox directory |
| Malware Behaviour | Behaviour analysis from synthetic/safe telemetry only |
| Phishing Analysis | URL/email analysis with explainable risk verdicts |
| Identity & Access | Authentication monitoring, brute-force / spray detection |
| Threat Intelligence | IOC management and local enrichment abstraction |
| Threat Hunting | Analyst search across IP / domain / hash / user / host / process |
| MITRE ATT&CK | Versioned local dataset, coverage view, evidence-based mapping |
| Digital Forensics | Incident timelines, evidence metadata, analyst notes |
| Vulnerability Management | Asset/CVE register with honest, non-overstated severity |
| Cloud Security | Simulated cloud audit telemetry (AWS/Azure-ready architecture) |
| Container Security | Image metadata + findings analysis, never executes images |
| DevSecOps | SAST/dependency/secret/container scan gates dashboard |
| Risk Management | Transparent likelihood × impact register |
| SOAR (safe) | Simulated response workflows — clearly labelled simulations |
| Reporting | Incident/vulnerability/hunting/posture reports; PDF/CSV/JSON export |
| Audit | Immutable administrative audit trail |

## Technology Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, Recharts, Lucide icons

**Backend:** Python 3.12+, FastAPI, Pydantic v2, SQLAlchemy 2, Alembic

**Database:** PostgreSQL (dev); SQLite (tests / lightweight fallback)

**Auth:** JWT, Argon2id/bcrypt password hashing, role-based access control

**ML:** scikit-learn, pandas, NumPy, joblib (XGBoost where justified)

**Lab tooling:** Docker, Suricata (§ EVE JSON), Sysmon-style events, Wireshark/Nmap/Burp/ZAP as operator tools (never automated against external targets)

**Infra:** Docker, Docker Compose, GitHub Actions

## Project Structure

See [docs/architecture.md](docs/architecture.md) for the full module map. Top level:

```
CYBERNEXUS/
|-- frontend/            # React + Vite SOC console
|-- backend/             # FastAPI API server
|-- detection-engine/    # Rule-based detection package
|-- ml-engine/           # Machine-learning anomaly pipeline
|-- collectors/          # Local, safe telemetry collectors
|-- threat-intelligence/ # IOC management + enrichment abstraction
|-- forensic-engine/     # Forensic timelines + evidence handling
|-- response-engine/     # Safe (simulated) response workflows
|-- lab/                 # Local vulnerable + secure web app lab
|-- datasets/            # Synthetic/simulated security datasets
|-- rules/               # Detection rule YAML/JSON files
|-- mitre/               # Versioned MITRE ATT&CK local dataset
|-- models/              # Serialized ML artifacts (gitignored)
|-- docs/                # Comprehensive documentation
|-- tests/               # Cross-module integration tests
|-- docker/              # Dockerfiles
|-- scripts/             # Dev/lab helper scripts
|-- .github/             # CI/CD
|-- docker-compose.yml
|-- .env.example
|-- LICENSE
```

## Installation

> Phase 1 is a **foundation release**. It provides a running skeleton — authentication, ingestion, detection, and all functional modules arrive in later phases. See [docs/setup.md](docs/setup.md) for exact commands.

### Prerequisites

- Python 3.12+
- Node.js 20+ (npm)
- Docker Desktop with Docker Compose
- Git

### Quick start (recommended dev mode)

```bash
# 1. Configure environment
cp .env.example .env          # then edit secrets in .env

# 2. Start Postgres (Docker)
docker compose up -d postgres

# 3. Backend
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows; source .venv/bin/activate on macOS/Linux
pip install -e ".[dev]"
alembic upgrade head
uvicorn app.main:app --reload

# 4. Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` (frontend) and `http://localhost:8000/docs` (API docs).

### One-command full stack (Docker)

```bash
docker compose up --build
```

## Environment Variables

All configuration is environment-driven. Copy `.env.example` to `.env` and never commit `.env`. Key variables:

| Variable | Purpose |
| --- | --- |
| `APP_NAME` | Application name used in API/docs |
| `APP_ENV` | `development` / `test` / `production` |
| `SECRET_KEY` | JWT signing secret (generate a long random value) |
| `DATABASE_URL` | SQLAlchemy connection URL (Postgres in dev, SQLite fallback) |
| `CORS_ORIGINS` | Comma-separated allowed browser origins |
| `JWT_*` | JWT algorithm/expiry settings (Phase 2) |
| `THREAT_INTEL_*` | Optional external TI provider keys (never hard-coded) |

## Docker Setup

```bash
docker compose up --build          # full stack
docker compose up -d postgres      # infra only (host-run apps)
docker compose down                # stop
docker compose down -v             # stop and wipe volumes (resets lab data)
```

See [docker/README.md](docker/README.md).

## Sample Credentials (Local Demo)

> Seeded in **Phase 2 (Authentication & RBAC)**. Placeholders:

| Role | Username | Purpose |
| --- | --- | --- |
| Administrator | `admin` | Full access |
| SOC Analyst | `analyst` | Monitoring/alerts/incidents/hunting |
| Security Engineer | `engineer` | Rules/vulnerabilities/config |
| Viewer | `viewer` | Read-only dashboards |

Passwords are generated and printed to the console on first seed; never use default credentials in production.

## Running Tests

```bash
# Backend
cd backend && pytest

# Frontend
cd frontend && npm test

# Full CI (same as GitHub Actions)
# see .github/workflows/ci.yml
```

## Lab Scenarios

> Implemented in later phases. Each scenario is a **safe, local, simulated** run:

1. Brute Force
2. Port Scan
3. Suspicious PowerShell
4. Ransomware-like File Activity
5. Phishing
6. Web Attack
7. Suspicious DNS
8. Privilege Change
9. IOC Detection
10. Cloud Misconfiguration

## Detection Examples

> Rule catalogue lands in Phase 5 with full logic, false-positive analysis, and MITRE mapping. Planned rules include: brute-force authentication, password spraying, port scanning, suspicious DNS, PowerShell anomaly, ransomware-like file activity, suspicious web requests, authentication anomaly, privilege-change anomaly, unusual outbound connections, and IOC matches.

## MITRE ATT&CK Mapping

Every detection rule documents its tactic/technique mapping with evidence and clearly states that mappings are analytical judgements, not authoritative determinations. Data is stored in a versioned local dataset (`mitre/`) so the module works offline.

## ML Architecture

The ML engine (Phases 17) trains behavioural anomaly detectors on **synthetic/simulated datasets** only. Evaluation reports accuracy, precision, recall, F1, confusion matrix, and ROC-AUC with an explicit focus on false positives/negatives. Dataset limitations are documented; inflated metrics are never presented.

## Security Architecture

CYBERNEXUS secures itself with: Argon2id/bcrypt password hashing, expiring JWTs, RBAC enforced server-side, parameterized ORM queries, secure headers, CORS allow-listing, rate limiting (Phase 23), validated input, restricted file uploads, env-var-only secrets, immutable audit logs, and dependency checks. See [docs/threat-model.md](docs/threat-model.md) and [docs/architecture.md](docs/architecture.md).

## Project Limitations

- CYBERNEXUS is an **educational platform**, not an enterprise-grade product. It intentionally does not claim production-readiness without evidence.
- Detection rules and ML models are trained/evaluated on **synthetic and simulated** data; real-world performance will differ.
- External threat-intelligence integration is an abstraction; local sample data is used when no provider is configured.
- Response actions are **simulations** and never perform real, destructive blocking.

## Future Enhancements

- Live Sysmon/Suricata forwarding via collectors
- Optional AWS/Azure cloud-audit importers
- External TI providers (VirusTotal, AbuseIPDB) behind env-var credentials
- XGBoost-based detection with documented feature importance
- Multi-tenant organization support
- Live email notification transport

## Team Contribution Structure

| Area | Suggested split |
| --- | --- |
| Backend/API/DB | Team member A |
| Detection + ML engine | Team member B |
| Frontend/UI | Team member B |
| Lab apps + collectors | Team member A |
| Docs/tests/reporting | Shared |
| Integration/CI/Docker | Shared |

## License

[MIT](LICENSE). This is an educational defensive project for authorized local environments only.