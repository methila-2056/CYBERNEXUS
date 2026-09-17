import type { Health } from "@/types";

/** Base path for all versioned API calls (proxied to :8000 in dev). */
const API_BASE = "/api/v1";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: "application/json" },
      ...init,
    });
  } catch {
    // Network-level failure (backend down, proxy error).
    throw new ApiError("Unable to reach the CYBERNEXUS API", 0);
  }

  if (!response.ok) {
    let detail = response.statusText;
    try {
      const body = (await response.json()) as { detail?: string };
      if (body.detail) detail = body.detail;
    } catch {
      // Non-JSON error body; keep the status text.
    }
    throw new ApiError(detail, response.status);
  }

  return (await response.json()) as T;
}

export const api = {
  getHealth: () => request<Health>("/health"),
};