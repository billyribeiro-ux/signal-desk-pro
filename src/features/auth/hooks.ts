import { useMutation } from "@tanstack/react-query";
import { authApi } from "./api";
import { useAuth } from "@/context/auth-context";
import type { AuthCredentials } from "./types";

export function useLogin() {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: (credentials: AuthCredentials) => authApi.login(credentials),
    onSuccess: async (_data, variables) => {
      await signIn(variables.email, variables.password);
    },
  });
}
