"use client";
import { useTransactionStore } from "../_lib/store";
import Form from "./Form";

interface NavProps {
  showReqBtn: boolean;
}

export default function Nav({ showReqBtn }: NavProps) {
  const resetTime = useTransactionStore((state) => state.resetTime);
  return <Form key={resetTime} showReqBtn={showReqBtn} />;
}
