import { apiClient } from "@/lib/api/client";
import type { UserProfile, NotificationPreferences } from "./types";
import type { ProfileFormData } from "./schema";

export const settingsApi = {
  getProfile: () => apiClient.get<UserProfile>("/api/auth?type=profile"),
  updateProfile: (data: ProfileFormData) => apiClient.put<UserProfile>("/api/auth", data),
  getNotifications: () => apiClient.get<NotificationPreferences>("/api/auth?type=notifications"),
  updateNotifications: (data: NotificationPreferences) =>
    apiClient.put<NotificationPreferences>("/api/auth?type=notifications", data),
};
