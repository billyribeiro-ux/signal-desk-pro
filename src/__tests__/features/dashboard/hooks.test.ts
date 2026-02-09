import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";
import { useDashboardMetrics } from "@/features/dashboard/hooks";

vi.mock("@/features/dashboard/api", () => ({
  metricsApi: {
    dashboard: vi.fn().mockResolvedValue({
      kpis: [
        { label: "Active Clients", value: "5", change: 12, trend: "up" },
        { label: "Open Projects", value: "3", change: -1, trend: "down" },
      ],
      activity: [
        { id: "a1", type: "client_onboarded", title: "New client", description: "Test", actor: "Alex", createdAt: "2024-06-01T00:00:00Z" },
      ],
      throughput: [40, 55, 45, 70, 60, 80],
    }),
  },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe("useDashboardMetrics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches dashboard metrics successfully", async () => {
    const { result } = renderHook(() => useDashboardMetrics(), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.kpis).toHaveLength(2);
    expect(result.current.data?.activity).toHaveLength(1);
    expect(result.current.data?.throughput).toEqual([40, 55, 45, 70, 60, 80]);
  });

  it("returns correct KPI structure", async () => {
    const { result } = renderHook(() => useDashboardMetrics(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const kpi = result.current.data!.kpis[0];
    expect(kpi).toHaveProperty("label");
    expect(kpi).toHaveProperty("value");
    expect(kpi).toHaveProperty("change");
    expect(kpi).toHaveProperty("trend");
  });
});
