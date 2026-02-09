"use client";

import { cn } from "@/lib/utils/cn";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="w-full overflow-auto rounded-xl border border-border">
      <table className={cn("w-full caption-bottom text-body-sm", className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className }: TableProps) {
  return (
    <thead className={cn("border-b border-border bg-elevated/50", className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className }: TableProps) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)}>{children}</tbody>;
}

export function TableRow({ children, className }: TableProps) {
  return (
    <tr
      className={cn(
        "border-b border-border transition-colors hover:bg-elevated/30",
        className,
      )}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className }: TableProps) {
  return (
    <th
      className={cn(
        "h-11 px-4 text-left align-middle text-caption font-semibold text-text-muted uppercase tracking-wider",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className }: TableProps) {
  return (
    <td className={cn("px-4 py-3 align-middle text-text", className)}>
      {children}
    </td>
  );
}
