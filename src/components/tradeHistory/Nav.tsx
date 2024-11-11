"use client";
import { Session } from "next-auth";
import Form from "./Form";
import { useOrderHistoryStore } from "../../stores/tradeHistory";
import { useEffect } from "react";

interface NavProps {
  session: Session;
}

export default function Nav({ session }: NavProps) {
  const resetTime = useOrderHistoryStore((state) => state.resetTime);
  const actions = useOrderHistoryStore((state) => state.actions);
  useEffect(() => {
    return () => {
      actions.unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Form key={resetTime} session={session} />;
}
