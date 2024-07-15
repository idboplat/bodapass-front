"use client";
import { Session } from "next-auth";
import { useTransactionClientStore } from "../_lib/store";
import Form from "./Form";
import { useEffect } from "react";

interface NavProps {
  session: Session;
}

export default function Nav({ session }: NavProps) {
  const resetTime = useTransactionClientStore((state) => state.resetTime);
  const actions = useTransactionClientStore((state) => state.actions);
  useEffect(() => {
    return () => {
      actions.unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Form session={session} key={resetTime} />;
}
