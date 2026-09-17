import type { ReactNode } from "react";

/** Centered placeholder for panels whose content ships in a later phase. */
export function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-edge-strong px-6 py-10 text-center">
      {icon && <div className="text-faint">{icon}</div>}
      <div>
        <div className="text-sm font-medium text-ink">{title}</div>
        <div className="mt-1 max-w-md text-xs text-muted">{description}</div>
      </div>
      {action}
    </div>
  );
}