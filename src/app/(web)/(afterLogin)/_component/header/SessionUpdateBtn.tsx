"use client";
import { defaultBtn } from "@/app/_component/btn/btn.css";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SessionUpdateBtn() {
  const router = useRouter();
  const { update } = useSession();

  const mutateUpdateSession = useMutation({
    mutationKey: ["updateSession"],
    mutationFn: async () => {
      const result = await update({ type: "updateSession" });
      if (result) {
        router.refresh();
      }
    },
  });

  return (
    <button onClick={() => mutateUpdateSession.mutate()} className={defaultBtn}>
      연장하기
    </button>
  );
}
