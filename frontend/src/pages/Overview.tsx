import {
  Activity,
  AlertTriangle,
  BellRing,
  Bug,
  MonitorSmartphone,
  ShieldAlert,
  Siren,
  Star,
} from "lucide-react";

import { EmptyState } from "@/components/ui/EmptyState";
import { Panel } from "@/components/ui/Panel";
import { StatCard } from "@/components/ui/StatCard";

/**
 * SOC Overview (Phase 4 will populate these with real data).
 * Values are intentionally shown as "—" with the landing phase labelled,
 * so the dashboard never displays fabricated metrics.
 */
export function Overview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink">Security Overview</h1>
          <p className="mt-1 text-sm text-muted">
            Executive + analyst view of the defensive posture. Data arrives in
            Phase 4 (SOC dashboard).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Critical alerts" value="—" hint="Phase 4" icon={AlertTriangle} tone="critical" />
        <StatCard label="High alerts" value="—" hint="Phase 4" icon={BellRing} tone="high" />
        <StatCard label="Medium alerts" value="—" hint="Phase 4" icon={BellRing} tone="medium" />
        <StatCard label="Low alerts" value="—" hint="Phase 4" icon={BellRing} tone="low" />
        <StatCard label="Active incidents" value="—" hint="Phase 6" icon={Siren} tone="critical" />
        <StatCard label="Resolved incidents" value="—" hint="Phase 6" icon={Star} tone="neutral" />
        <StatCard label="Endpoints online" value="—" hint="Phase 7" icon={MonitorSmartphone} tone="neutral" />
        <StatCard label="Vulnerabilities" value="—" hint="Phase 16" icon={Bug} tone="neutral" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Alert trend" subtitle="last 24h · Phase 4">
          <ChartPlaceholder label="Alert trend chart" />
        </Panel>
        <Panel title="Severity distribution" subtitle="Phase 4">
          <ChartPlaceholder label="Severity distribution chart" />
        </Panel>
        <Panel title="Events over time" subtitle="Phase 4">
          <ChartPlaceholder label="Events over time chart" />
        </Panel>
        <Panel title="Top detected techniques" subtitle="MITRE ATT&CK · Phase 13">
          <ChartPlaceholder label="Top techniques chart" />
        </Panel>
      </div>

      <Panel title="Live event stream" subtitle="Phase 4">
        <EmptyState
          title="No events yet"
          description="Normalized security events will stream here once the ingestion pipeline is implemented (Phase 3-4)."
          icon={<Activity className="h-8 w-8" />}
        />
      </Panel>

      <div className="flex items-start gap-3 rounded-md border border-warn/40 bg-warn/5 px-4 py-3 text-xs text-muted">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warn" />
        <span>
          Advisory: detection coverage, risk scores, and MITRE mappings will be
          shown with documented evidence only when the respective engines ship —
          no overstated coverage in the interim.
        </span>
      </div>
    </div>
  );
}

function ChartPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-48 items-center justify-center rounded-md border border-dashed border-edge-strong text-xs text-faint">
      {label} · renders in its module phase
    </div>
  );
}