import RenderMap from "@/components/map/RenderMap";
import RenderStaticMap from "@/components/map/RenderStaticMap";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const searchParams = router.query;

  const lat = Number(searchParams.lat) ?? 33.450701;
  const lng = Number(searchParams.lng) ?? 126.570667;

  return (
    <div>
      <RenderMap lat={lat} lng={lng} />
    </div>
  );
}
