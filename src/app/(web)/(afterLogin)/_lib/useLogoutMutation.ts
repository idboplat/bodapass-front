import { useSetApp } from "@/app/_lib/app";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export const useLogoutMutation = () => {
  const action = useSetApp();

  const mutate = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await signOut({ redirect: false, callbackUrl: "/login" });
      action.logout();
      window.location.href = "/login";
    },
  });

  return mutate;
};
