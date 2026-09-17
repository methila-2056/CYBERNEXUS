import type { ReactNode } from "react";

interface PanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  accent?: boolean;
}

/** Standard bordered card used across the console. */
export function Panel({ title, subtitle, children, accent }: PanelProps) {
  return (
    <section
      className={`rounded-lg border bg-panel ${accent ? "border-accent/40" : "border-edge"}`}
    >
      <header className="flex items-baseline justify-between gap-4 border-b border-edge px-4 py-3">
        <h2 className="text-sm font-semibold text-ink">{title}</h2>
        {subtitle && <span className="text-xs text-muted">{subtitle}</span>}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}