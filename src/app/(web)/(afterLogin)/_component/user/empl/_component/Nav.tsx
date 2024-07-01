"use client";
import { Session } from "next-auth";
import { useEmplStore } from "../_lib/store";
import Form from "./Form";
import { useEffect } from "react";

interface NavProps {
  session: Session;
}
export default function Nav({ session }: NavProps) {
  const resetTime = useEmplStore((state) => state.resetTime);
  const actions = useEmplStore((state) => state.actions);
  useEffect(() => {
    return () => {
      actions.unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Form key={resetTime} session={session} />;
}
