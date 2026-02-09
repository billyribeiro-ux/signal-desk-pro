export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    session: () => [...queryKeys.auth.all, "session"] as const,
  },
  clients: {
    all: ["clients"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.clients.all, "list", params] as const,
    detail: (id: string) => [...queryKeys.clients.all, "detail", id] as const,
  },
  projects: {
    all: ["projects"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.projects.all, "list", params] as const,
    detail: (id: string) =>
      [...queryKeys.projects.all, "detail", id] as const,
  },
  revisions: {
    all: ["revisions"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.revisions.all, "list", params] as const,
    detail: (id: string) =>
      [...queryKeys.revisions.all, "detail", id] as const,
    thread: (revisionId: string) =>
      [...queryKeys.revisions.all, "thread", revisionId] as const,
  },
  metrics: {
    all: ["metrics"] as const,
    dashboard: () => [...queryKeys.metrics.all, "dashboard"] as const,
    activity: () => [...queryKeys.metrics.all, "activity"] as const,
  },
  settings: {
    all: ["settings"] as const,
    profile: () => [...queryKeys.settings.all, "profile"] as const,
    notifications: () =>
      [...queryKeys.settings.all, "notifications"] as const,
  },
} as const;
