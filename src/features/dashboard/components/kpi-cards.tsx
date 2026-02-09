"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { formatPercent } from "@/lib/utils/format";
import type { KpiMetric } from "../types";

const trendIcons = { up: TrendingUp, down: TrendingDown, flat: Minus };

export function KpiCards({ metrics }: { metrics: KpiMetric[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m) => {
        const Icon = trendIcons[m.trend];
        return (
          <Card key={m.label} hover>
            <p className="text-body-sm font-medium text-text-muted">{m.label}</p>
            <p className="mt-2 text-heading-1 font-bold text-text">{m.value}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <Icon className={cn("h-4 w-4", m.trend === "up" ? "text-success" : m.trend === "down" ? "text-danger" : "text-text-muted")} />
              <span className={cn("text-caption font-medium", m.trend === "up" ? "text-success" : m.trend === "down" ? "text-danger" : "text-text-muted")}>
                {formatPercent(m.change)}
              </span>
              <span className="text-caption text-text-muted">vs last month</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
