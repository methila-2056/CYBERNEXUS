import { useLocation } from "react-router-dom";
import { Construction, ShieldCheck } from "lucide-react";

import { EmptyState } from "@/components/ui/EmptyState";
import { PLACEHOLDER_ITEMS } from "@/lib/navigation";

/** Renders a clear "module landing in Phase N" page for unimplemented sections. */
export function ModulePlaceholder() {
  const { pathname } = useLocation();
  const item = PLACEHOLDER_ITEMS.find((entry) => entry.path === pathname);

  if (!item) return null;
  const Icon = item.icon;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-ink">{item.label}</h1>
        <p className="mt-1 text-sm text-muted">
          This CYBERNEXUS module is scaffolded and planned for Phase {item.phase}.
        </p>
      </div>

      <EmptyState
        title={`${item.label} lands in Phase ${item.phase}`}
        description="The module is defined in the architecture and will ship through its dedicated build phase together with the backend API, tests, and documentation."
        icon={<Icon className="h-8 w-8" />}
      />

      <div className="flex items-start gap-3 rounded-md border border-edge bg-panel px-4 py-3 text-xs text-muted">
        <Construction className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
        <span>
          Navigation is fully wired today; content, metrics, and controls appear
          with the module.
        </span>
      </div>

      <div className="flex items-start gap-3 rounded-md border border-success/40 bg-success/5 px-4 py-3 text-xs text-muted">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
        <span>
          Authorized-lab scope: this module will operate only against configured
          local/lab targets with simulated, non-destructive actions.
        </span>
      </div>
    </div>
  );
}