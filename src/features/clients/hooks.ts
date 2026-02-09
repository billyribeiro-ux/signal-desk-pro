import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/query-keys";
import { clientsApi } from "./api";
import type { ClientListParams } from "./types";
import type { ClientFormData } from "./schema";

export function useClients(params?: ClientListParams) {
  return useQuery({
    queryKey: queryKeys.clients.list(params as Record<string, unknown> | undefined),
    queryFn: () => clientsApi.list(params),
  });
}

export function useClient(id: string) {
  return useQuery({
    queryKey: queryKeys.clients.detail(id),
    queryFn: () => clientsApi.detail(id),
    enabled: !!id,
  });
}

export function useCreateClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ClientFormData) => clientsApi.create(data),
    onMutate: async (newClient) => {
      await qc.cancelQueries({ queryKey: queryKeys.clients.all });
      const previousLists = qc.getQueriesData({ queryKey: queryKeys.clients.all });

      qc.setQueriesData(
        { queryKey: queryKeys.clients.all },
        (old: unknown) => {
          if (!old || typeof old !== "object") return old;
          const prev = old as { data: unknown[]; meta: unknown };
          return {
            ...prev,
            data: [
              {
                id: `optimistic-${Date.now()}`,
                ...newClient,
                status: "onboarding",
                projectCount: 0,
                totalRevenue: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              ...(prev.data ?? []),
            ],
          };
        },
      );

      return { previousLists };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousLists) {
        for (const [key, data] of context.previousLists) {
          qc.setQueryData(key, data);
        }
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: queryKeys.clients.all });
    },
  });
}

export function useUpdateClient(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<ClientFormData>) => clientsApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.clients.all });
      qc.invalidateQueries({ queryKey: queryKeys.clients.detail(id) });
    },
  });
}

export function useDeleteClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => clientsApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.clients.all });
    },
  });
}
