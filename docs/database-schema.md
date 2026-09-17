# CYBERNEXUS Database Design

> **Status:** Design document (Phase 1). ORM models and migrations for the domain tables are implemented in Phase 3; this document is the normative design those phases implement.

## 1. Design Goals

- **Normalized** storage: no duplicate authoritative state, clear foreign keys.
- **Query-friendly** indexes on the fields analysts search most.
- **Postgres-first**, SQLite-compatible enough for tests.
- **Auditable**: key entities carry `created_at`/`updated_at`; who-did-what lives in `audit_logs`.
- **Attribution preserved**: events keep raw payloads for investigations.

## 2. Conventions

- Ids: integer `BIGSERIAL` primary keys (simple and readable for students). `{domain}_id` is exposed as a UUID for cross-module references.
- Timestamps: `TIMESTAMPTZ` (Postgres) / `DateTime` with timezone (SQLite stores naive; backend always writes UTC).
- Enums: stored as text with Python-side enums, validated at the API boundary.
- Soft deletes are not used by default; deletion of *events* is restricted (they are evidence).
- Every table has indexes on foreign keys used in joins.

## 3. Domain Entities (Schema Overview)

### Identity & Access

**users**
- `id` PK, `username` unique, `email` unique, `password_hash` (Argon2id/bcrypt), `full_name`, `role_id` FK, `is_active`, `is_locked`, `failed_login_count`, `last_login_at`, `created_at`, `updated_at`

**roles**
- `id` PK, `name` unique (admin / soc_analyst / security_engineer / viewer), `description`, `created_at`

**permissions**
- `id` PK, `name` unique, `description`

**role_permissions** (join)
- `role_id` FK, `permission_id` FK, composite PK

**audit_logs**
- `id` PK, `user_id` FK nullable, `action`, `resource_type`, `resource_id`, `details` (JSONB/text), `ip_address`, `user_agent`, `created_at`
- Index: `created_at`, `user_id`, `action`
- Note: **not editable by normal users**; backend refuses update/delete.

### Event Pipeline

**security_events** (the central normalized event store)
- `id` PK, `event_id` (unique external id), `timestamp`
- `source_type` (windows / linux / auth / web / api / network / suricata / sysmon / cloud / container / other)
- `source_name`, `hostname`, `username`
- `source_ip`, `destination_ip`, `source_port`, `destination_port`, `protocol`
- `event_type`, `category`, `severity` (info/low/medium/high/critical)
- `raw_message` (text), `normalized_data` (JSONB)
- `process_name`, `process_id`, `file_path`, `file_hash`, `domain`, `url`, `user_agent`
- `mitre_tactic`, `mitre_technique`, `confidence` float, `risk_score` int
- `ingested_at`
- Indexes: `timestamp`, `source_ip`, `destination_ip`, `hostname`, `username`, `event_type`, `severity`, `source_type`, `mitre_technique`, `event_id unique`

**network_events** — optional denormalized view/flows: `id`, `event_id` FK nullable, timestamps, addresses, ports, protocol, bytes_in/out, packets, connection_count, dns_query, dns_response, status

**authentication_events** — `id`, `event_id` FK nullable, `timestamp`, `username`, `auth_type`, `success`, `failure_reason`, `source_ip`, `user_agent`, `domain`, `service`

### Detection & Response

**detection_rules**
- `id` PK, `rule_id` unique, `name`, `description`, `category`, `severity`
- `logic` (YAML/json), `conditions`, `threshold`, `time_window_seconds`
- `mitre_tactic`, `mitre_technique`, `enabled`, `version`, `author`, `created_at`, `updated_at`

**alerts**
- `id` PK, `alert_id` unique, `title`, `description`, `severity`, `confidence`, `risk_score`
- `event_ids` (JSON array), `rule_id` FK nullable, `source`, `affected_asset`
- `status` (new / acknowledged / investigating / resolved / false_positive)
- `assignee_id` FK nullable, `created_at`, `updated_at`, `resolved_at`

**alert_notes** — `id`, `alert_id` FK, `user_id` FK, `note`, `created_at`

**incidents**
- `id` PK, `incident_id` unique, `title`, `category`, `severity`
- `status` (open / triage / investigating / contained / eradication / recovery / resolved / closed)
- `owner_id` FK nullable, `created_at`, `updated_at`, `resolution`
- `affected_assets` (JSON), `related_alert_ids`, `related_event_ids`, `iocs`, `mitre_techniques`, `notes`, `response_actions`, `resources` (JSON/text)

**incident_events** — `incident_id` FK, `event_id` FK, composite PK (association of events to an incident)

**response_actions**
- `id` PK, `incident_id` FK nullable, `type` (simulate_endpoint_isolate / simulate_ip_block / simulate_account_disable / notify / enrich / add_ioc / preserve_telemetry / other), `status` (queued/running/succeeded/failed), `params` JSON, `performed_by`, `is_simulation` bool default true, `created_at`, `completed_at`

### Endpoint & Network Telemetry

**endpoints**
- `id` PK, `endpoint_id` unique, `hostname`, `os`, `os_version`, `ip_address`, `mac_address`
- `agent_status` (online/offline/unknown), `last_seen`, `risk_level` (low/medium/high/critical)
- `logged_in_user`, `process_count`, `security_status` (json/text), `created_at`, `updated_at`

### Threat Intelligence

**iocs**
- `id` PK, `ioc_id` unique, `value` unique, `type` (ip/domain/url/hash/email)
- `source`, `confidence` float, `first_seen`, `last_seen`, `tags` (JSON), `description`, `active`, `created_at`
- Indexes on `value`, `type`, `confidence`

**threat_intelligence** — enrichment/observations: `id`, `ioc_id` FK nullable, `provider`, `raw_response` (JSON), `verdict` (malicious/suspicious/benign/unknown), `score`, `fetched_at`

### MITRE ATT&CK

**mitre_tactics** — `id`, `tactic_id` (e.g. TA0001), `name`, `description`, `version`

**mitre_techniques** — `id`, `technique_id` (e.g. T1110), `name`, `tactic_id` FK nullable, `subtechnique_of` nullable self-FK, `description`, `detection` (mitigations guidance text), `version`

### Risk & Vulnerability Management

**assets** — `id`, `asset_id` unique, `name`, `type` (server/workstation/application/database/network/cloud), `owner`, `criticality` (low/medium/high/critical), `location`, `ip_address`, `os`, `software` (JSON), `created_at`

**vulnerabilities**
- `id`, `asset_id` FK, `vulnerability_id` unique, `title`, `description`, `cve` nullable, `cvss` float nullable, `severity` (critical/high/medium/low), `status` (open / accepted_risk / mitigated / resolved), `remediation`, `discovered_at`, `resolved_at`
- Indexes: `asset_id`, `severity`, `status`, `cve`

**risk_register**
- `id`, `risk_id` unique, `asset_id` FK nullable, `threat`, `vulnerability`, `likelihood` (int 1-5), `impact` (int 1-5), `risk_score` int, `owner`, `status` (identified/assessed/mitigated/accepted/monitored), `mitigation`, `created_at`, `updated_at`

### Forensics

**forensic_evidence**
- `id`, `evidence_id` unique, `incident_id` FK nullable, `type` (log/network-pcap/process/file/hash/screenshot/other), `source`, `timestamp`, `file_hash` (sha256 of artifact), `file_path`, `size_bytes`, `description`, `created_by`, `created_at`
- Indexes: `incident_id`, `type`, `timestamp`

**forensic_timeline** — `id`, `incident_id` FK, `timestamp`, `category`, `description`, `event_id` FK nullable, `evidence_id` FK nullable, `created_by`, `created_at`; index on `incident_id + timestamp`

### Cloud, Container, DevSecOps

**cloud_events**
- `id`, `event_id` FK nullable, `provider` (aws/azure/gcp/simulated), `account_id`, `region`, `service`, `resource`, `action`, `actor`, `outcome` (success/denied/error), `source_ip`, `details` (JSON), `timestamp`
- Indexes: `provider`, `action`, `timestamp`

**container_findings**
- `id`, `image_name`, `image_tag`, `image_digest`, `registry`, `vulnerability_id` or `finding_id`, `package`, `installed_version`, `fixed_version`, `severity`, `description`, `remediation`, `config_issue`, `exposed_ports` (JSON), `scanner`, `detected_at`

**devsecops_findings**
- `id`, `pipeline`, `build_id`, `stage` (sast / dependency / secret / container / build / gate), `finding_id`, `file`, `package`, `finding`, `severity` (critical/high/medium/low/warning), `recommendation`, `status` (passed/failed/warning), `reported_at`, `fixed_at`

### Reporting & Notification

**reports** — `id`, `report_id` unique, `type` (incident / vulnerability / threat_hunting / security_posture / soc_daily / endpoint / threat_intel), `title`, `summary`, `content` (JSON/text), `format` (pdf/csv/json), `created_by`, `created_at`

**notifications** — `id`, `user_id` FK nullable, `type` (critical_alert / new_incident / incident_escalation / vulnerability_discovery / pipeline_failure / system), `title`, `body`, `channel` (in_app/email/both), `read`, `created_at`

## 4. Key Relationships

- `users.role_id` → `roles.id` (many users to one role)
- `roles` ↔ `permissions` via `role_permissions` (many-to-many)
- `alert_notes.user_id` → `users.id`; `alerts.assignee_id` → `users.id`
- `incidents.owner_id` → `users.id`
- `incident_events: incident_id` → `incidents.id`, `event_id` → `security_events.id`
- `incidents` reference alerts via `related_alert_ids`; alerts reference events via `event_ids`
- `alerts.rule_id` → `detection_rules.id`
- `network_events.event_id` / `authentication_events.event_id` → `security_events.id` (1:1 optional, preserving raw)
- `iocs` → `threat_intelligence` (1:N enrichment observations)
- `mitre_techniques.tactic_id` → `mitre_tactics.id`; `mitre_techniques.subtechnique_of` → self
- `vulnerabilities.asset_id` → `assets.id`
- `risk_register.asset_id` → `assets.id`
- `forensic_evidence.incident_id` → `incidents.id`
- `forensic_timeline.incident_id` → `incidents.id`, optional `event_id` → `security_events.id`, `evidence_id` → `forensic_evidence.id`

## 5. Indexing Strategy

Hot query paths and their indexes:
- Time-series: `security_events.timestamp`, `authentication_events.timestamp`, `cloud_events.timestamp`
- Oscilloscope fields: `source_ip`, `destination_ip`, `hostname`, `username`, `event_type`, `severity`, `source_type`, `mitre_technique`
- Status: `alerts.status`, `incidents.status`, `vulnerabilities.status`
- External identity: unique indexes on `iocs.value`, `users.username`/`email`, `security_events.event_id`

## 6. Migration Strategy (Alembic)

- One migration per schema change, reviewed and committed.
- `revision`/`down_revision` chain must remain linear (no unmerged branches).
- Data backfills belong in the same migration as the schema change they support.
- Phase 1 ships a **baseline** (empty) migration to prove the pipeline; Phase 3 adds domain tables.

## 7. Security Notes

- Passwords: only hashes ever stored (Argon2id, Phase 2).
- No client control over `security_events` delete/update; events are append-only evidence.
- `audit_logs` are insert-only; the API exposes read/create only.
- JSON blobs are validated by Pydantic before assignment to keep them consistent.
- All ORM access uses parameterized queries (SQLAlchemy) — no string-built SQL.

## 8. Testing

- Unit tests use SQLite; integration tests that need Postgres semantics run in CI against a Postgres service container.
- Tests assert schema via SQLAlchemy metadata and migration `upgrade`/`downgrade` round trips.