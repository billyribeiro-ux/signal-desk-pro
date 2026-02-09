export interface KpiMetric {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "flat";
}

export interface ActivityItem {
  id: string;
  type: "project_created" | "revision_submitted" | "client_onboarded" | "status_changed";
  title: string;
  description: string;
  actor: string;
  createdAt: string;
}

export interface DashboardMetrics {
  kpis: KpiMetric[];
  activity: ActivityItem[];
  throughput: number[];
}
