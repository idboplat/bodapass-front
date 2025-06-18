"use client";

import AutoCapture from "@/components/auto-capture";

export default function Page() {
  return (
    <AutoCapture
      onFaceDetected={() => {
        console.log("face detected");
      }}
    />
  );
}
