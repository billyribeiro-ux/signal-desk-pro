import { apiClient } from "@/lib/api/client";
import type { Revision, RevisionMessage } from "./types";
import type { PaginatedResponse } from "../clients/types";

export const revisionsApi = {
  list: (params?: Record<string, string | number | boolean | undefined>) =>
    apiClient.get<PaginatedResponse<Revision>>("/api/revisions", params),
  detail: (id: string) => apiClient.get<Revision>(`/api/revisions?id=${id}`),
  thread: (revisionId: string) =>
    apiClient.get<RevisionMessage[]>(`/api/revisions?revisionId=${revisionId}&type=thread`),
  action: (id: string, data: { action: string; comment: string }) =>
    apiClient.post<Revision>(`/api/revisions?id=${id}`, data),
};
