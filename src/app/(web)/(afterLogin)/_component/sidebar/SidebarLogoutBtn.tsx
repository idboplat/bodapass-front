"use client";
import { useLogoutMutation } from "@web/(afterLogin)/_lib/useLogoutMutation";
import { logoutBtn } from "./sidebar.css";

export default function SidebarLogoutBtn() {
  const mutateLogout = useLogoutMutation();

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
