import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/query-keys";
import { projectsApi } from "./api";
import type { Project, ProjectListParams } from "./types";

export function useProjects(params?: ProjectListParams) {
  return useQuery({
    queryKey: queryKeys.projects.list(params as Record<string, unknown>),
    queryFn: () => projectsApi.list(params),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => projectsApi.detail(id),
    enabled: !!id,
  });
}

export function useUpdateProject(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Project>) => projectsApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.projects.all });
      qc.invalidateQueries({ queryKey: queryKeys.projects.detail(id) });
    },
  });
}
