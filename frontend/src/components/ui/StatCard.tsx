import type { LucideIcon } from "lucide-react";

type Tone = "critical" | "high" | "medium" | "low" | "neutral";

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  tone?: Tone;
}

const TONE_TEXT: Record<Tone, string> = {
  critical: "text-sev-critical",
  high: "text-sev-high",
  medium: "text-sev-medium",
  low: "text-sev-low",
  neutral: "text-ink",
};

const TONE_LED: Record<Tone, string> = {
  critical: "bg-sev-critical",
  high: "bg-sev-high",
  medium: "bg-sev-medium",
  low: "bg-sev-low",
  neutral: "bg-faint",
};

/** Metric card. Values show "—" until the data phase lands (no fake metrics). */
export function StatCard({ label, value, hint, icon: Icon, tone = "neutral" }: StatCardProps) {
  return (
    <div className="rounded-lg border border-edge bg-panel p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted">{label}</span>
        <Icon className={`h-4 w-4 ${TONE_TEXT[tone]}`} />
      </div>
      <div className={`mt-2 font-mono text-2xl font-semibold ${TONE_TEXT[tone]}`}>{value}</div>
      <div className="mt-2 flex items-center gap-2 text-xs text-faint">
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${TONE_LED[tone]}`} />
        {hint}
      </div>
    </div>
  );
}