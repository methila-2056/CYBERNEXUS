# lab — local, intentionally vulnerable web application + simulations

A **locally-runnable** training web app with deliberate, well-documented vulnerabilities (SQL injection, XSS, broken access control, auth weaknesses, misconfiguration, API issues) — plus a **secure version** of the same app demonstrating fixes.

**Cybersecurity concept (Phase 9):** To learn web defence you must see attacks safely. OWASP categories and remediations are explained for every vulnerability.

Hard safety constraints:

- Runs **only on localhost** inside the `cybernexus-lab` Docker network.
- No tools here may be pointed at external sites.
- All simulations are harmless and generate synthetic/safe telemetry.

See `../docs/web-security.md`.