"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number;
  className?: string;
  barClassName?: string;
  direction?: "horizontal" | "vertical";
}

export function ProgressBar({
  value,
  className,
  barClassName,
  direction = "horizontal",
}: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      if (direction === "horizontal") {
        barRef.current.style.width = `${value}%`;
      } else {
        barRef.current.style.height = `${value}%`;
      }
    }
  }, [value, direction]);

  return (
    <div
      className={cn(
        direction === "horizontal"
          ? "h-1.5 w-full rounded-full bg-elevated"
          : "w-full flex-1",
        className,
      )}
    >
      <div
        ref={barRef}
        className={cn(
          "rounded-full bg-primary transition-all duration-500",
          direction === "horizontal" ? "h-full" : "w-full",
          barClassName,
        )}
      />
    </div>
  );
}
