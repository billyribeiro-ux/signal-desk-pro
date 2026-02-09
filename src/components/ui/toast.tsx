"use client";

import { Toaster } from "sonner";
import { useTheme } from "@/context/theme-context";

export function ToastProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      theme={resolvedTheme}
      position="bottom-right"
      toastOptions={{
        className:
          "border border-border bg-surface text-text shadow-elevation-3 rounded-xl",
        duration: 4000,
      }}
      closeButton
      richColors
    />
  );
}
