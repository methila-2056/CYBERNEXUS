# collectors — safe local telemetry collection

Collects and **normalizes** security telemetry from controlled sources into the standard CYBERNEXUS event schema.

**Cybersecurity concept (Phases 7-8, 10):** This is the "eyes" of the SOC — Sysmon-style Windows events, Linux auth logs, web/app logs, and Suricata EVE JSON all arrive differently and must be normalized so the detection engine sees one format.

Safety rules:

- Collectors only read **local, authorized** sources (lab apps, test dirs, configured log files).
- The ransomware **simulator** only touches files inside a dedicated, clearly-labeled lab directory with benign content.
- No stealth, no persistence, no exfiltration — collection is transparent and documented.

See `../docs/endpoint-security.md` and `../docs/network-security.md`.