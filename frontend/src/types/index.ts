export interface Health {
  status: "ok" | "degraded";
  database: "ok" | "error";
  app: string;
  version: string;
}

export type BackendState =
  | { kind: "checking" }
  | { kind: "online"; health: Health }
  | { kind: "degraded"; health: Health }
  | { kind: "offline" };