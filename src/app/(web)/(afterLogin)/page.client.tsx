"use client";
import VideoCapture from "@/components/VideoCapture";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Client() {
  const session = useSession();
  const router = useRouter();

  return (
    <div>
      <h1>홈화면</h1>
      <VideoCapture onFaceDetected={() => console.log("face detected")} />
    </div>
  );
}
