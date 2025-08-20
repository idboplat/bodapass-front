import RenderMap from "@/components/map/render-map";
import RenderStaticMap from "@/components/map/render-static-map";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const searchParams = router.query;

  const lat = Number(searchParams.lat) || 33.450701;
  const lng = Number(searchParams.lng) || 126.570667;

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className={"mobileLayout"}>
      <RenderMap lat={lat} lng={lng} />
    </div>
  );
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
