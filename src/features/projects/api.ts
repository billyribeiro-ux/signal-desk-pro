import { apiClient } from "@/lib/api/client";
import type { Project, ProjectListParams } from "./types";
import type { PaginatedResponse } from "../clients/types";

export const projectsApi = {
  list: (params?: ProjectListParams) =>
    apiClient.get<PaginatedResponse<Project>>("/api/projects", params as Record<string, string | number | boolean | undefined>),
  detail: (id: string) => apiClient.get<Project>(`/api/projects?id=${id}`),
  create: (data: Partial<Project>) => apiClient.post<Project>("/api/projects", data),
  update: (id: string, data: Partial<Project>) =>
    apiClient.put<Project>(`/api/projects?id=${id}`, data),
  delete: (id: string) => apiClient.delete<void>(`/api/projects?id=${id}`),
};
