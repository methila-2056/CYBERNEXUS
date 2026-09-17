import { useState } from "react";
import { Link } from "react-router-dom";
import { Circle, Lock, Moon, Sun } from "lucide-react";

import { useBackendHealth, useNow } from "@/hooks/useBackendHealth";
import { getInitialTheme, toggleTheme } from "@/theme/theme";
import type { Theme } from "@/theme/theme";
import type { BackendState } from "@/types";

function StatusPill({ state }: { state: BackendState }) {
  if (state.kind === "checking") {
    return (
      <span className="status-pill text-warn">
        <Circle className="h-2.5 w-2.5 animate-pulse fill-warn" />
        checking backend…
      </span>
    );
  }
  if (state.kind === "online") {
    return (
      <span className="status-pill text-success">
        <Circle className="h-2.5 w-2.5 fill-success" />
        backend online · db ok
      </span>
    );
  }
  if (state.kind === "degraded") {
    return (
      <span className="status-pill text-warn">
        <Circle className="h-2.5 w-2.5 fill-warn" />
        backend degraded
      </span>
    );
  }
  return (
    <span className="status-pill text-danger">
      <Circle className="h-2.5 w-2.5 fill-danger" />
      backend unreachable
    </span>
  );
}

/** Top status bar: real backend connectivity, live clock, theme, sign-in link. */
export function TopStatusBar() {
  const backend = useBackendHealth();
  const now = useNow();
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-edge bg-panel px-4">
      <StatusPill state={backend} />

      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-muted" title="Live UTC clock">
          {now.toISOString()}
        </span>

        <button
          type="button"
          onClick={() => setTheme(toggleTheme(theme))}
          aria-label="Toggle color theme"
          title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          className="rounded-md border border-edge p-1.5 text-muted hover:text-ink"
        >
          {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>

        <Link
          to="/login"
          className="flex items-center gap-2 rounded-md border border-edge px-3 py-1.5 text-sm text-muted hover:text-ink"
        >
          <Lock className="h-3.5 w-3.5" />
          Sign in
        </Link>
      </div>
    </header>
  );
}