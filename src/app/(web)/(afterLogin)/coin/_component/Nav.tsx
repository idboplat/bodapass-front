"use client";
import { Session } from "next-auth";
import { useCoinStore } from "../_lib/store";
import Form from "./Form";

interface NavProps {
  session: Session;
}

export default function Nav({ session }: NavProps) {
  const resetTime = useCoinStore((state) => state.resetTime);
  return <Form key={resetTime} session={session} />;
}
