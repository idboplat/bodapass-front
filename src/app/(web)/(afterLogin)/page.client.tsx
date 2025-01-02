"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Client() {
  const session = useSession();
  const router = useRouter();

  return <div>홈화면</div>;
}
