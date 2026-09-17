# detectors / engines / collectors — module packages

This directory will contain the **rule-based detection engine** package. It imports cleanly into the backend.

**Cybersecurity concept being implemented here (Phase 5):** Detections turn a stream of normalized events into actionable alerts by matching descriptive rules (e.g. "5 failed logins from one IP in 60 seconds").

Planned contents:

- `pyproject.toml` — installable as `detection-engine`
- `rules/` catalogue loading
- Rule evaluation: matching, thresholds, time windows
- Risk-scoring weights (documented, configurable)
- MITRE ATT&CK mapping annotations per rule

See `../rules/` for the human-readable rule files and `../docs/detection-engineering.md` for methodology.