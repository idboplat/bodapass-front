"use client";
import { Session } from "next-auth";
import Form from "./Form";
import { useEffect } from "react";
import { useClientStore } from "../_lib/store";

interface NavProps {
  session: Session;
}

export default function Nav({ session }: NavProps) {
  const resetTime = useClientStore((state) => state.resetTime);
  const actions = useClientStore((state) => state.actions);

  useEffect(() => {
    return () => {
      actions.unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Form key={resetTime} session={session} />;
}
