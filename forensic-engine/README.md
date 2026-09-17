# forensic-engine — digital forensics & timelines

Builds chronological investigation timelines for incidents and tracks evidence metadata.

**Cybersecurity concept (Phase 15):** After detection, an analyst reconstructs *what happened, in what order, on what evidence*. A clean timeline turns scattered events into a story that supports accurate incident response and reporting.

Planned contents:

- Incident → chronological timeline (events, logins, processes, files, network, IOCs)
- Evidence metadata: type, source, timestamp, SHA-256 hash, description
- Analyst notes tied to timeline points
- Read-only linkage to `security_events` (evidence is never mutated)

Collection is limited to **authorized local contexts**; no invasive collection from external systems.

See `../docs/digital-forensics.md`.