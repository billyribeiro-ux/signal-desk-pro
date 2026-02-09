import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";
import { useClients, useClient, useCreateClient } from "@/features/clients/hooks";

// Mock the API module
vi.mock("@/features/clients/api", () => ({
  clientsApi: {
    list: vi.fn().mockResolvedValue({
      data: [
        { id: "1", name: "Test Client", email: "test@test.com", company: "TestCo", status: "active", industry: "Tech", projectCount: 2, totalRevenue: 50000, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-01-01T00:00:00Z" },
      ],
      meta: { total: 1, page: 1, pageSize: 20, totalPages: 1 },
    }),
    detail: vi.fn().mockResolvedValue({
      id: "1", name: "Test Client", email: "test@test.com", company: "TestCo", status: "active", industry: "Tech", projectCount: 2, totalRevenue: 50000, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-01-01T00:00:00Z",
    }),
    create: vi.fn().mockResolvedValue({
      id: "99", name: "New Client", email: "new@test.com", company: "NewCo", status: "onboarding", industry: "SaaS", projectCount: 0, totalRevenue: 0, createdAt: "2024-06-01T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z",
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

describe("useClients", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches client list successfully", async () => {
    const { result } = renderHook(() => useClients(), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.data).toHaveLength(1);
    expect(result.current.data?.data[0].name).toBe("Test Client");
    expect(result.current.data?.meta.total).toBe(1);
  });

  it("passes search params to API", async () => {
    const { clientsApi } = await import("@/features/clients/api");
    const { result } = renderHook(() => useClients({ search: "test" }), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(clientsApi.list).toHaveBeenCalledWith({ search: "test" });
  });
});

describe("useClient", () => {
  it("fetches single client by ID", async () => {
    const { result } = renderHook(() => useClient("1"), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.name).toBe("Test Client");
    expect(result.current.data?.id).toBe("1");
  });

  it("does not fetch when id is empty", () => {
    const { result } = renderHook(() => useClient(""), { wrapper: createWrapper() });
    expect(result.current.fetchStatus).toBe("idle");
  });
});

describe("useCreateClient", () => {
  it("creates a client and returns new data", async () => {
    const { result } = renderHook(() => useCreateClient(), { wrapper: createWrapper() });

    result.current.mutate({ name: "New Client", email: "new@test.com", company: "NewCo", industry: "SaaS" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.name).toBe("New Client");
    expect(result.current.data?.status).toBe("onboarding");
  });
});
