import { apiClient } from "@/lib/api/client";
import type { AuthResponse, AuthCredentials } from "./types";

export const authApi = {
  login: (credentials: AuthCredentials) =>
    apiClient.post<AuthResponse>("/api/auth", credentials),
  logout: () => apiClient.post<void>("/api/auth", { action: "logout" }),
};
