import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/query-keys";
import { revisionsApi } from "./api";

export function useRevisions(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: queryKeys.revisions.list(params),
    queryFn: () => revisionsApi.list(params),
  });
}

export function useRevision(id: string) {
  return useQuery({
    queryKey: queryKeys.revisions.detail(id),
    queryFn: () => revisionsApi.detail(id),
    enabled: !!id,
  });
}

export function useRevisionThread(revisionId: string) {
  return useQuery({
    queryKey: queryKeys.revisions.thread(revisionId),
    queryFn: () => revisionsApi.thread(revisionId),
    enabled: !!revisionId,
  });
}

export function useRevisionAction(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { action: string; comment: string }) =>
      revisionsApi.action(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.revisions.all });
      qc.invalidateQueries({ queryKey: queryKeys.revisions.detail(id) });
    },
  });
}
