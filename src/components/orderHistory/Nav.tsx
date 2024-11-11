"use client";
import { Session } from "next-auth";
import Form from "./Form";
import { useTradeHistoryStore } from "@/stores/orderHistory";
import { useEffect } from "react";

interface NavProps {
  session: Session;
}

export default function Nav({ session }: NavProps) {
  const resetTime = useTradeHistoryStore((state) => state.resetTime);
  const actions = useTradeHistoryStore((state) => state.actions);
  useEffect(() => {
    return () => {
      actions.unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Form key={resetTime} session={session} />;
}
