export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  clients: "/clients",
  projects: "/projects",
  projectDetail: (id: string) => `/projects/${id}` as const,
  revisions: "/revisions",
  settings: "/settings",
  motionShowcase: "/motion-showcase",
  api: {
    auth: "/api/auth",
    clients: "/api/clients",
    projects: "/api/projects",
    revisions: "/api/revisions",
    metrics: "/api/metrics",
  },
} as const;

export const NAV_ITEMS = [
  { label: "Dashboard", href: ROUTES.dashboard, icon: "LayoutDashboard" },
  { label: "Clients", href: ROUTES.clients, icon: "Users" },
  { label: "Projects", href: ROUTES.projects, icon: "FolderKanban" },
  { label: "Revisions", href: ROUTES.revisions, icon: "GitPullRequest" },
  { label: "Settings", href: ROUTES.settings, icon: "Settings" },
] as const;
