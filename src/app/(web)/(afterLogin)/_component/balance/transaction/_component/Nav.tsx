"use client";
import { useTransactionStore } from "../_lib/store";
import Form from "./Form";

export default function Nav() {
  const resetTime = useTransactionStore((state) => state.resetTime);
  return <Form key={resetTime} />;
}
