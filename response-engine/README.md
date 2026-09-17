# response-engine — simulated (safe) automated response

Choreographs **simulated** response workflows so students can see the full Detect → Investigate → Respond → Report loop without risking anything real.

**Cybersecurity concept (Phase 21, SOAR):** Playbooks automate the reaction to a detection (create alert, open incident, add IOC, notify analyst). Here every action is a **lab simulation** and labelled as such in the UI and data:

- `simulate_endpoint_isolate`
- `simulate_ip_block`
- `simulate_account_disable`
- `preserve_telemetry`, `add_ioc`, `enrich`, `notify`

No real-world blocking, no destructive actions, no remote execution. Parameters are validated; `is_simulation` defaults to true.

See `../docs/incident-response.md`.