"use client";
import { useLogoutMutation } from "@/hooks/useLogoutMutation";

export default function SidebarLogoutBtn() {
  const mutateLogout = useLogoutMutation();

  return (
    <button type="button" onClick={() => mutateLogout.mutate()} disabled={mutateLogout.isPending}>
      로그아웃
    </button>
  );
}
