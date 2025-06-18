"use client";

import AutoCapture from "@/components/auto-capture";

export default function Page() {
  return (
    <AutoCapture
      onFaceDetected={(blob) => {
        console.log("face detected", blob);
      }}
    />
  );
}
