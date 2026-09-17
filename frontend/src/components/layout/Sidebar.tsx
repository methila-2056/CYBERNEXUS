import { NavLink } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

import { NAV_ITEMS } from "@/lib/navigation";

/** Left navigation rail listing every CYBERNEXUS module (21 sections). */
export function Sidebar() {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-edge bg-panel-2">
      <div className="flex items-center gap-3 border-b border-edge px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10">
          <ShieldCheck className="h-5 w-5 text-accent" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-wide text-ink">
            CYBERNEXUS
          </div>
          <div className="text-[10px] uppercase tracking-widest text-muted">
            Security Command Center
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Main navigation">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-accent/10 font-medium text-accent"
                        : "text-muted hover:bg-panel hover:text-ink"
                    }`
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.path !== "/" && (
                    <span className="font-mono text-[10px] text-faint">
                      P{item.phase}
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-edge px-5 py-3 text-[10px] font-mono text-faint">
        v0.1.0 · foundation · lab-only
      </div>
    </aside>
  );
}