# threat-intelligence — IOC management & enrichment

Manages Indicators of Compromise (IPs, domains, URLs, hashes, emails) and matches them against incoming events.

**Cybersecurity concept (Phase 12):** Threat intel gives events context — "this hash was already seen in the wild". Matches boost risk scores and enrichment (provider lookups) adds confidence.

Design notes:

- Enrichment is an **abstraction**: local sample data by default, providers plug in via environment variables only.
- API keys are never hard-coded or committed.
- Matches always lower the *confidence requirement* but never finalize a verdict alone; analysts confirm.

See `../docs/threat-intelligence.md` and `../docs/mitre-attack.md`.