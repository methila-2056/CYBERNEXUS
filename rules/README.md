# rules — detection rules (human-readable)

Versioned detection rules in a readable format (e.g., YAML) that the `detection-engine` package loads.

Every rule documents, per requirement:

- `rule_id`, `name`, `description`, `category`, `severity`
- logic / conditions / threshold / `time_window_seconds`
- MITRE tactic & technique mapping **with rationale**
- false-positive considerations (documented, not assumed)
- version + author

See `../detection-engine/` for the engine and `../docs/detection-engineering.md` for methodology.