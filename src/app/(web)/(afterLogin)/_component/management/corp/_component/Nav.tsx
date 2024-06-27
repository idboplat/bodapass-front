"use client";
import { Session } from "next-auth";
import Form from "./Form";
import { useCorpStore } from "../_lib/store";

interface NavProps {
  session: Session;
}

export default function Nav({ session }: NavProps) {
  const resetTime = useCorpStore((state) => state.resetTime);
  return <Form key={resetTime} session={session} />;
}
