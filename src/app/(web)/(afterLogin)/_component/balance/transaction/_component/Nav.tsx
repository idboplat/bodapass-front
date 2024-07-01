"use client";
import { Session } from "next-auth";
import { useTransactionStore } from "../_lib/store";
import Form from "./Form";

interface NavProps {
  session: Session;
  showReqBtn: boolean;
}

export default function Nav({ session, showReqBtn }: NavProps) {
  const resetTime = useTransactionStore((state) => state.resetTime);
  return <Form session={session} key={resetTime} showReqBtn={showReqBtn} />;
}
