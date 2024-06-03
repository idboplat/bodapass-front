"use client";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { logoutBtn } from "./sidebar.css";
import { useApp } from "@/app/_lib/app";
import { useStore } from "zustand";

export default function SidebarLogoutBtn() {
  const store = useApp();
  const action = useStore(store, (store) => store.actions);

  const mutateLogout = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await signOut({ redirect: false, callbackUrl: "/login" });
      action.logout();
      window.location.href = "/login";
    },
  });

  return (
    <button
      className={logoutBtn}
      type="button"
      onClick={() => mutateLogout.mutate()}
      disabled={mutateLogout.isPending}
    >
      로그아웃
    </button>
  );
}
