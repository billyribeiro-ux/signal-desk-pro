"use client";

import { Bell, Search, Moon, Sun } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const { user } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-[50] flex h-16 items-center justify-between border-b border-border bg-surface/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="search"
            placeholder="Search anything..."
            className="h-9 w-64 rounded-lg border border-border bg-bg pl-9 pr-3 text-body-sm text-text placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
            aria-label="Search"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {resolvedTheme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>

        <div className="ml-2 flex items-center gap-3 border-l border-border pl-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-caption font-semibold text-text-inverse">
            {user?.name?.charAt(0) ?? "U"}
          </div>
          <div className="hidden sm:block">
            <p className="text-body-sm font-medium text-text">{user?.name}</p>
            <p className="text-caption text-text-muted">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
