"use client";

import { cn } from "@/lib/utils/cn";
import { useAppSelector } from "@/store/hooks";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar />
      <div
        className={cn(
          "transition-all duration-300",
          collapsed ? "ml-[72px]" : "ml-64",
        )}
      >
        <Topbar />
        <main id="main-content" className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
