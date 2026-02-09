"use client";

import { AppShell } from "@/components/layout/app-shell";
import { RouteTransition } from "@/components/motion/route-transition";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <ErrorBoundary>
        <RouteTransition>{children}</RouteTransition>
      </ErrorBoundary>
    </AppShell>
  );
}
