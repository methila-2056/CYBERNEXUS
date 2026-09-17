import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, ShieldCheck } from "lucide-react";

import { useToast } from "@/components/ui/Toast";

/**
 * Login screen skeleton. Real authentication (JWT + RBAC) is implemented in
 * Phase 2; today the form validates shape and explains what ships next.
 */
export function Login() {
  const { toast } = useToast();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      toast("Authentication & RBAC are implemented in Phase 2.", "info");
    }, 400);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-abyss px-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-xs text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to console
        </Link>

        <div className="rounded-lg border border-edge bg-panel p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent/10">
              <ShieldCheck className="h-6 w-6 text-accent" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-wide text-ink">
                CYBERNEXUS
              </div>
              <div className="text-xs uppercase tracking-widest text-muted">
                Security Command Center
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="identifier" className="mb-1 block text-xs font-medium text-muted">
                Username or email
              </label>
              <input
                id="identifier"
                name="identifier"
                autoComplete="username"
                required
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                className="w-full rounded-md border border-edge bg-panel-2 px-3 py-2 text-sm text-ink outline-none focus:border-accent/60"
                placeholder="analyst@cybernexus.local"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-xs font-medium text-muted">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-md border border-edge bg-panel-2 px-3 py-2 pr-10 text-sm text-ink outline-none focus:border-accent/60"
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted hover:text-ink"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-accent px-4 py-2 text-sm font-semibold text-abyss transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Checking…" : "Sign in"}
            </button>
          </form>

          <div className="mt-5 border-t border-edge pt-4 text-center text-[11px] text-faint">
            Demo accounts (admin / analyst / engineer / viewer) are seeded in
            Phase 2. Passwords are never shown or committed in plain text.
          </div>
        </div>
      </div>
    </div>
  );
}