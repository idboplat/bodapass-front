"use client";

import RenderMap from "@/components/map/RenderMap";

import RenderStaticMap from "@/components/map/RenderStaticMap";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const lat = Number(searchParams.get("lat")) ?? 33.450701;
  const lng = Number(searchParams.get("lng")) ?? 126.570667;

  return (
    <div>
      <RenderMap lat={lat} lng={lng} />
    </div>
  );
}
