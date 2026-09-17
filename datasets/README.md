# datasets — synthetic / simulated security datasets

Source data for detection development, ML training, and demo scenarios.

**Labelling requirement:** every dataset declares its provenance in a `README`/manifest — `synthetic`, `simulated`, `public`, or `collected from controlled lab`. CYBERNEXUS never fabricates real-world statistics or misrepresents data.

Planned sets (Phase 17 + generators in `scripts/`):

- Normal login behaviour
- Brute force
- Port scanning
- DNS anomalies
- Ransomware-like file activity
- Suspicious processes
- Network anomalies
- Web attacks
- Cloud events

Generated artifacts land in `datasets/generated/` (gitignored); committed datasets are small, labelled, and versioned.