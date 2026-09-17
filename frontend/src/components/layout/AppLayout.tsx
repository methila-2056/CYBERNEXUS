import { Outlet } from "react-router-dom";

import { Sidebar } from "./Sidebar";
import { TopStatusBar } from "./TopStatusBar";

/** Shell for all authenticated-style console pages (sidebar + status bar). */
export function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopStatusBar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}