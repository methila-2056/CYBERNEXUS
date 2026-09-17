import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppLayout } from "@/components/layout/AppLayout";
import { ToastProvider } from "@/components/ui/Toast";
import { PLACEHOLDER_ITEMS } from "@/lib/navigation";
import { Login } from "@/pages/Login";
import { ModulePlaceholder } from "@/pages/ModulePlaceholder";
import { NotFound } from "@/pages/NotFound";
import { Overview } from "@/pages/Overview";

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<AppLayout />}>
            <Route index element={<Overview />} />
            {PLACEHOLDER_ITEMS.map((item) => (
              <Route
                key={item.path}
                path={item.path.slice(1)}
                element={<ModulePlaceholder />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}