import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/query-keys";
import { settingsApi } from "./api";

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.settings.profile(),
    queryFn: () => settingsApi.getProfile(),
  });
}

export function useNotificationPreferences() {
  return useQuery({
    queryKey: queryKeys.settings.notifications(),
    queryFn: () => settingsApi.getNotifications(),
  });
}
