import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/query-keys";
import { metricsApi } from "./api";

export function useDashboardMetrics() {
  return useQuery({
    queryKey: queryKeys.metrics.dashboard(),
    queryFn: () => metricsApi.dashboard(),
  });
}
