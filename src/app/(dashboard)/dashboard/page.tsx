"use client";

import { useDashboardMetrics } from "@/features/dashboard/hooks";
import { KpiCards } from "@/features/dashboard/components/kpi-cards";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";
import { formatRelative } from "@/lib/utils/format";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboardMetrics();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-5 w-72" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AlertCircle className="h-12 w-12 text-danger" />
        <h2 className="mt-4 text-heading-3 font-semibold text-text">Failed to load dashboard</h2>
        <p className="mt-1 text-body-sm text-text-muted">Something went wrong fetching your metrics.</p>
        <Button variant="secondary" className="mt-4" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-heading-1 font-bold text-text">Dashboard</h1>
        <p className="mt-1 text-body text-text-muted">Welcome back, here is your overview.</p>
      </div>

      <KpiCards metrics={data.kpis} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-heading-3 font-semibold text-text">Recent Activity</h2>
          {data.activity.length === 0 ? (
            <p className="mt-4 text-body-sm text-text-muted">No recent activity.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {data.activity.map((item) => (
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
          )}
        </Card>

        <Card>
          <h2 className="text-heading-3 font-semibold text-text">Throughput</h2>
          <div className="mt-4 flex h-48 items-end gap-3">
            {months.map((month, i) => {
              const h = data.throughput[i] ?? 0;
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
