"use client";

import { Tabs } from "@/components/ui/tabs";
import { ProfileForm } from "@/features/settings/components/profile-form";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "appearance", label: "Appearance" },
  { id: "notifications", label: "Notifications" },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-1 font-bold text-text">Settings</h1>
        <p className="mt-1 text-body text-text-muted">Manage your account preferences</p>
      </div>

      <Tabs tabs={tabs} defaultTab="profile">
        {(activeTab) => (
          <>
            {activeTab === "profile" && (
              <Card>
                <h2 className="text-heading-3 font-semibold text-text mb-4">Profile Information</h2>
                <ProfileForm />
              </Card>
            )}
            {activeTab === "appearance" && (
              <Card>
                <h2 className="text-heading-3 font-semibold text-text mb-4">Appearance</h2>
                <p className="text-body-sm text-text-muted mb-4">Choose your preferred theme</p>
                <div className="flex gap-3">
                  {(["light", "dark", "system"] as const).map((t) => (
                    <Button
                      key={t}
                      variant={theme === t ? "primary" : "secondary"}
                      onClick={() => setTheme(t)}
                      className="capitalize"
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </Card>
            )}
            {activeTab === "notifications" && (
              <Card>
                <h2 className="text-heading-3 font-semibold text-text mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  {["Email Digest", "Project Updates", "Revision Alerts", "Client Activity"].map((label) => {
                    const id = `notif-${label.toLowerCase().replace(/\s+/g, "-")}`;
                    return (
                      <div key={label} className="flex items-center justify-between rounded-lg border border-border p-4">
                        <label htmlFor={id} className="text-body-sm font-medium text-text cursor-pointer">{label}</label>
                        <input id={id} type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-ring" aria-label={label} />
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </>
        )}
      </Tabs>
    </div>
  );
}
