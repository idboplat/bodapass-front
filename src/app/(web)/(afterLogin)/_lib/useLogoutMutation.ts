import { useApp } from "@/app/_lib/app";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useStore } from "zustand";

export const useLogoutMutation = () => {
  const store = useApp();
  const action = useStore(store, (store) => store.actions);

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
