"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (_tabId: string) => void;
  children: (_activeTab: string) => React.ReactNode;
  className?: string;
}

export function Tabs({ tabs, defaultTab, onTabChange, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id ?? "");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className={className}>
      <div className="flex border-b border-border" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const ariaProps = { "aria-selected": isActive ? ("true" as const) : ("false" as const) };
          return (
            <button
              key={tab.id}
              role="tab"
              {...ariaProps}
              aria-controls={`tabpanel-${tab.id}`}
              className={cn(
                "relative px-4 py-2.5 text-body-sm font-medium transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                isActive
                  ? "text-primary"
                  : "text-text-muted hover:text-text",
              )}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={activeTab}
        className="pt-4"
      >
        {children(activeTab)}
      </div>
    </div>
  );
}
