"use client";
import { useLogoutMutation } from "@web/(afterLogin)/_lib/useLogoutMutation";
import css from "./Sidebar.module.scss";

export default function SidebarLogoutBtn() {
  const mutateLogout = useLogoutMutation();

  return (
    <button
      className={css.logoutBtn}
      type="button"
      onClick={() => mutateLogout.mutate()}
      disabled={mutateLogout.isPending}
    >
      로그아웃
    </button>
  );
}
