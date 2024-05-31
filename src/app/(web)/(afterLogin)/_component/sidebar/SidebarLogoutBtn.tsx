"use client";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { logoutBtn } from "./sidebar.css";

export default function SidebarLogoutBtn() {
  const mutateLogout = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await signOut({ redirect: true, callbackUrl: "/login" });
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
