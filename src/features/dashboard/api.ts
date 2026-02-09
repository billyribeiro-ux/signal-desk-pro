import { apiClient } from "@/lib/api/client";
import type { DashboardMetrics } from "./types";

export const metricsApi = {
  dashboard: () => apiClient.get<DashboardMetrics>("/api/metrics"),
};
