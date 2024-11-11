"use client";
import { Session } from "next-auth";
import { useAdminStore } from "@/stores/admin";
import Form from "./Form";
import { useEffect } from "react";

interface NavProps {
  session: Session;
}
export default function Nav({ session }: NavProps) {
  const resetTime = useAdminStore((state) => state.resetTime);
  const actions = useAdminStore((state) => state.actions);
  useEffect(() => {
    return () => {
      actions.unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Form key={resetTime} session={session} />;
}
