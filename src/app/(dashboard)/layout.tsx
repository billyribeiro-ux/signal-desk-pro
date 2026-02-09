"use client";

import { Suspense } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { RouteTransition } from "@/components/motion/route-transition";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { SkeletonCard } from "@/components/ui/skeleton";

function PageFallback() {
  return (
    <div className="space-y-6">
      <SkeletonCard />
      <div className="grid gap-6 lg:grid-cols-2">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <ErrorBoundary>
        <Suspense fallback={<PageFallback />}>
          <RouteTransition>{children}</RouteTransition>
        </Suspense>
      </ErrorBoundary>
    </AppShell>
  );
}
