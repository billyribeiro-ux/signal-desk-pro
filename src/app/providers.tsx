"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/query/query-client";
import { StoreProvider } from "@/store/provider";
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "@/context/theme-context";
import { UiProvider } from "@/context/ui-context";
import { ToastProvider } from "@/components/ui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <AuthProvider>
          <ThemeProvider>
            <UiProvider>
              {children}
              <ToastProvider />
            </UiProvider>
          </ThemeProvider>
        </AuthProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}
