import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";

describe("CYBERNEXUS app shell", () => {
  beforeEach(() => {
    // No backend in unit tests; the health poll should resolve to offline.
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("backend absent")));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the sidebar branding and headline navigation links", () => {
    render(<App />);

    expect(screen.getByText("CYBERNEXUS")).toBeInTheDocument();
    expect(screen.getByText("Security Command Center")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /alerts/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /incidents/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /threat hunting/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /settings/i })).toBeInTheDocument();
  });

  it("renders the overview dashboard on the index route", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Security Overview" })).toBeInTheDocument();
    expect(screen.getByText("Live event stream")).toBeInTheDocument();
    expect(screen.getByText("Critical alerts")).toBeInTheDocument();
  });

  it("renders a module placeholder for a scaffolded route", () => {
    window.history.pushState({}, "", "/threat-hunting");
    render(<App />);

    expect(screen.getByRole("heading", { name: "Threat Hunting" })).toBeInTheDocument();
    expect(screen.getByText(/lands in Phase 14/i)).toBeInTheDocument();
  });
});