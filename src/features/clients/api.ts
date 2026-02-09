import { apiClient } from "@/lib/api/client";
import type { Client, ClientListParams, PaginatedResponse } from "./types";
import type { ClientFormData } from "./schema";

export const clientsApi = {
  list: (params?: ClientListParams) =>
    apiClient.get<PaginatedResponse<Client>>("/api/clients", params as Record<string, string | number | boolean | undefined>),
  detail: (id: string) => apiClient.get<Client>(`/api/clients?id=${id}`),
  create: (data: ClientFormData) => apiClient.post<Client>("/api/clients", data),
  update: (id: string, data: Partial<ClientFormData>) =>
    apiClient.put<Client>(`/api/clients?id=${id}`, data),
  delete: (id: string) => apiClient.delete<void>(`/api/clients?id=${id}`),
};
