# tests — cross-module integration tests

Tests that span modules (backend + detection engine + threat intel + forensics), complementing each module's own unit tests.

Coverage includes, per requirements: valid/invalid event ingestion, authentication failure, unauthorized access, rule trigger, false positive, alert creation, incident creation, MITRE mapping, IOC match, forensic timeline, and report generation.

Run the whole suite from the repo root via the script in CI (see `.github/workflows/ci.yml` and `docs/testing.md`).