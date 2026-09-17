# CYBERNEXUS Documentation Index

Every document explains both **how** a component works and **why** the design was chosen. Status columns track the build phase that authors each document.

| Document | Purpose | Status |
| --- | --- | --- |
| [architecture.md](architecture.md) | Full architecture, data flow, module map, decisions | ✅ Phase 1 |
| [setup.md](setup.md) | Installation and run instructions | ✅ Phase 1 |
| [database-schema.md](database-schema.md) | Normalized schema, relationships, indexes, enums | ✅ Phase 1 |
| cybersecurity-basics.md | Security fundamentals for the authors | ⏳ |
| networking.md | Network concepts used by the platform | ⏳ |
| soc.md | SOC operations concepts | ⏳ |
| siem.md | SIEM concepts and how CYBERNEXUS implements them | ⏳ |
| detection-engineering.md | Writing, testing, and tuning detection rules | ⏳ Phase 5 |
| threat-intelligence.md | IOC management and enrichment | ⏳ Phase 12 |
| mitre-attack.md | Using the MITRE ATT&CK framework | ⏳ Phase 13 |
| threat-hunting.md | Analyst hunting methodology + syntax | ⏳ Phase 14 |
| digital-forensics.md | Timeline and evidence methodology | ⏳ Phase 15 |
| incident-response.md | Incident workflow and response playbooks | ⏳ Phase 6/21 |
| vulnerability-management.md | Asset/CVE register methodology | ⏳ Phase 16 |
| web-security.md | OWASP lab walkthrough + remediations | ⏳ Phase 9 |
| endpoint-security.md | Endpoint telemetry and detection | ⏳ Phase 7 |
| network-security.md | Network monitoring and detections | ⏳ Phase 8 |
| cloud-security.md | Cloud audit telemetry (simulated first) | ⏳ Phase 18 |
| container-security.md | Container findings analysis | ⏳ Phase 19 |
| devsecops.md | CI/CD security gates | ⏳ Phase 20 |
| machine-learning.md | ML pipeline, features, evaluation, limitations | ⏳ Phase 17 |
| api.md | REST API reference and conventions | ⏳ Phase 2/3 |
| testing.md | Test strategy and how to run the suite | ⏳ Phase 24 |
| threat-model.md | STRIDE threat model of CYBERNEXUS itself | ⏳ Phase 23 |
| limitations.md | Explicit limitations of the platform | ⏳ |
| project-plan.md | Phase roadmap and team contribution structure | ⏳ Phase 26 |

## Beginner-first convention

For every major module we follow this template (also mirrored in code and this index):

1. Purpose
2. Cybersecurity concept
3. Architecture
4. Implementation
5. Testing
6. Example scenario
7. Interview explanation
8. Common mistakes
9. Limitations