"use client";
import Camera from "@/components/Camera";
import { useCamera } from "@/hooks/useCamera";

export default function Page() {
  const camera = useCamera();
  return (
    <div>
      <Camera videoRef={camera.videoRef} canvasRef={camera.canvasRef} isMobile={true} />
    </div>
  );
}
