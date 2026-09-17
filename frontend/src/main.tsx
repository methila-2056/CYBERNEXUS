import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { applyTheme, getInitialTheme } from "@/theme/theme";
import App from "./App";

import "@/styles/index.css";

// Apply the saved (default: dark) theme before first paint to avoid flashes.
applyTheme(getInitialTheme());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);