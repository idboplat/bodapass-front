"use client";
import { Session } from "next-auth";
import Form from "./Form";
import { useOpenOrderStore } from "../_lib/store";
import { useEffect } from "react";

interface NavProps {
  session: Session;
}

export default function Nav({ session }: NavProps) {
  const resetTime = useOpenOrderStore((state) => state.resetTime);
  const actions = useOpenOrderStore((state) => state.actions);
  useEffect(() => {
    return () => {
      actions.unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Form key={resetTime} session={session} />;
}
