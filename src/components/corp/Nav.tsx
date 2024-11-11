"use client";
import { Session } from "next-auth";
import Form from "./Form";
import { useCorpStore } from "@/stores/corp";
import { useEffect } from "react";

interface NavProps {
  session: Session;
}

export default function Nav({ session }: NavProps) {
  const resetTime = useCorpStore((state) => state.resetTime);
  const actions = useCorpStore((state) => state.actions);
  useEffect(() => {
    return () => {
      actions.unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Form key={resetTime} session={session} />;
}
