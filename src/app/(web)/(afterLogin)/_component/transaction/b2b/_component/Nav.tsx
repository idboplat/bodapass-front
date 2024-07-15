"use client";
import { Session } from "next-auth";
import { useTransactionCorpStore } from "../_lib/store";
import Form from "./Form";
import { useEffect } from "react";

interface NavProps {
  session: Session;
  showReqBtn: boolean;
}

export default function Nav({ session, showReqBtn }: NavProps) {
  const resetTime = useTransactionCorpStore((state) => state.resetTime);
  const actions = useTransactionCorpStore((state) => state.actions);
  useEffect(() => {
    return () => {
      actions.unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Form session={session} key={resetTime} showReqBtn={showReqBtn} />;
}
