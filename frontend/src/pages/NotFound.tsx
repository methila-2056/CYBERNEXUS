import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

/** 404 page rendered for unknown routes inside the console shell. */
export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Compass className="mb-4 h-10 w-10 text-faint" />
      <h1 className="text-lg font-semibold text-ink">Route not found</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        This path does not exist in the CYBERNEXUS console. Return to the
        overview to continue investigating.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-md border border-edge px-4 py-2 text-sm text-muted hover:text-ink"
      >
        Back to Overview
      </Link>
    </div>
  );
}