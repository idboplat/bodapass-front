import RenderMap from "@/components/map/render-map";
import RenderStaticMap from "@/components/map/render-static-map";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const searchParams = router.query;

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  const lat = Number(searchParams.lat) || 0;
  const lng = Number(searchParams.lng) || 0;
  const siteNm = (searchParams.siteNm as string) || "현장";
  const siteTelNo = (searchParams.siteTelNo as string) || "";
  const rad = (searchParams.rad as string) || "";
  return (
    <div className={"mobileLayout"}>
      <RenderMap lat={lat} lng={lng} siteNm={siteNm} siteTelNo={siteTelNo} rad={rad} />
    </div>
  );
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
