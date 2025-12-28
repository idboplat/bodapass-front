import RenderMap from "@/components/map/render-map";
import { useDeviceLocation } from "@/hooks/use-user-location";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const searchParams = router.query;

  const { deviceLocation } = useDeviceLocation();

  const lat = Number(searchParams.lat) || 0;
  const lng = Number(searchParams.lng) || 0;
  const siteNm = (searchParams.siteNm as string) || "현장";
  const siteTelNo = (searchParams.siteTelNo as string) || "";
  const rad = (searchParams.rad as string) || "";

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  if (!deviceLocation) {
    return <LoadingOverlay visible />;
  }

  return (
    <div className={"mobileLayout"}>
      <RenderMap
        lat={lat}
        lng={lng}
        siteNm={siteNm}
        siteTelNo={siteTelNo}
        rad={rad}
        deviceLocation={deviceLocation}
      />
    </div>
  );
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
