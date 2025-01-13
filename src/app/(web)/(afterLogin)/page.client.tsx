"use client";
import Camera from "@/components/Camera";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Client() {
  const router = useRouter();

  return (
    <div>
      <h1>홈화면</h1>
    </div>
  );
}
