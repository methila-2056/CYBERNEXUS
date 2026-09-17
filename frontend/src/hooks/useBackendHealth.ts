import { useCallback, useEffect, useState } from "react";

import type { BackendState } from "@/types";
import { api } from "@/lib/api";

/**
 * Poll the backend health endpoint so the top status bar always reflects real
 * connectivity. Purely read-only; drives UI state only.
 */
export function useBackendHealth(intervalMs = 15000): BackendState {
  const [state, setState] = useState<BackendState>({ kind: "checking" });

  const check = useCallback(async () => {
    try {
      const health = await api.getHealth();
      setState(
        health.status === "ok" && health.database === "ok"
          ? { kind: "online", health }
          : { kind: "degraded", health },
      );
    } catch {
      setState({ kind: "offline" });
    }
  }, []);

  useEffect(() => {
    void check();
    const timer = window.setInterval(() => void check(), intervalMs);
    return () => window.clearInterval(timer);
  }, [check, intervalMs]);

  return state;
}

/** Live clock for the status bar (UTC by default). */
export function useNow(intervalMs = 1000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs]);
  return now;
}