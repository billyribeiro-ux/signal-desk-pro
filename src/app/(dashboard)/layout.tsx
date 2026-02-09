"use client";

import { AppShell } from "@/components/layout/app-shell";
import { RouteTransition } from "@/components/motion/route-transition";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <RouteTransition>{children}</RouteTransition>
    </AppShell>
  );
}
