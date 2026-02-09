"use client";

import { KpiCards } from "@/features/dashboard/components/kpi-cards";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatRelative } from "@/lib/utils/format";
import type { KpiMetric, ActivityItem } from "@/features/dashboard/types";

const mockKpis: KpiMetric[] = [
  { label: "Active Clients", value: "48", change: 12, trend: "up" },
  { label: "Open Projects", value: "23", change: -3, trend: "down" },
  { label: "Pending Revisions", value: "7", change: 0, trend: "flat" },
  { label: "Monthly Revenue", value: "$142K", change: 8.5, trend: "up" },
];

const mockActivity: ActivityItem[] = [
  { id: "1", type: "client_onboarded", title: "New client onboarded", description: "Acme Corp completed onboarding", actor: "Alex Morgan", createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "2", type: "project_created", title: "Project created", description: "Website Redesign for TechStart", actor: "Jordan Lee", createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "3", type: "revision_submitted", title: "Revision submitted", description: "Logo v3 for BrandCo", actor: "Sam Chen", createdAt: new Date(Date.now() - 14400000).toISOString() },
  { id: "4", type: "status_changed", title: "Status updated", description: "Mobile App moved to In Review", actor: "Alex Morgan", createdAt: new Date(Date.now() - 28800000).toISOString() },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-heading-1 font-bold text-text">Dashboard</h1>
        <p className="mt-1 text-body text-text-muted">Welcome back, here is your overview.</p>
      </div>

      <KpiCards metrics={mockKpis} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-heading-3 font-semibold text-text">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            {mockActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-body-sm font-medium text-text">{item.title}</p>
                  <p className="text-caption text-text-muted">{item.description}</p>
                </div>
                <span className="text-caption text-text-muted whitespace-nowrap">{formatRelative(item.createdAt)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-heading-3 font-semibold text-text">Throughput</h2>
          <div className="mt-4 flex h-48 items-end gap-3">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => {
              const h = [40, 55, 45, 70, 60, 80][i];
              return (
                <div key={month} className="flex flex-1 flex-col items-center gap-1">
                  <ProgressBar value={h} direction="vertical" barClassName="rounded-t-lg rounded-b-none" />
                  <span className="text-caption text-text-muted">{month}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
