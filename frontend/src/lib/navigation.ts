import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BellRing,
  BrainCircuit,
  Bug,
  Cloud,
  Container,
  Crosshair,
  FileText,
  Fingerprint,
  GitBranch,
  Globe,
  LayoutDashboard,
  MonitorSmartphone,
  Network,
  Radar,
  ScrollText,
  Search,
  Settings,
  ShieldAlert,
  Siren,
  Zap,
} from "lucide-react";

/**
 * Central navigation configuration.
 * Each module is delivered in the phase shown; the UI renders a
 * "coming in Phase N" placeholder until the module's page is implemented.
 */
export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  phase: number;
}

export const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Overview", icon: LayoutDashboard, phase: 4 },
  { path: "/monitoring", label: "Live Monitoring", icon: Activity, phase: 4 },
  { path: "/alerts", label: "Alerts", icon: BellRing, phase: 6 },
  { path: "/incidents", label: "Incidents", icon: Siren, phase: 6 },
  { path: "/endpoints", label: "Endpoints", icon: MonitorSmartphone, phase: 7 },
  { path: "/network", label: "Network", icon: Network, phase: 8 },
  { path: "/web-security", label: "Web Security", icon: Globe, phase: 9 },
  { path: "/identity", label: "Identity & Access", icon: Fingerprint, phase: 11 },
  { path: "/threat-intel", label: "Threat Intelligence", icon: BrainCircuit, phase: 12 },
  { path: "/threat-hunting", label: "Threat Hunting", icon: Radar, phase: 14 },
  { path: "/mitre", label: "MITRE ATT&CK", icon: Crosshair, phase: 13 },
  { path: "/vulnerabilities", label: "Vulnerabilities", icon: Bug, phase: 16 },
  { path: "/forensics", label: "Digital Forensics", icon: Search, phase: 15 },
  { path: "/response", label: "Automated Response", icon: Zap, phase: 21 },
  { path: "/cloud", label: "Cloud Security", icon: Cloud, phase: 18 },
  { path: "/containers", label: "Container Security", icon: Container, phase: 19 },
  { path: "/devsecops", label: "DevSecOps", icon: GitBranch, phase: 20 },
  { path: "/risk", label: "Risk Management", icon: ShieldAlert, phase: 16 },
  { path: "/reports", label: "Reports", icon: FileText, phase: 22 },
  { path: "/audit", label: "Audit Logs", icon: ScrollText, phase: 3 },
  { path: "/settings", label: "Settings", icon: Settings, phase: 23 },
];

export const PLACEHOLDER_ITEMS = NAV_ITEMS.filter((item) => item.path !== "/");