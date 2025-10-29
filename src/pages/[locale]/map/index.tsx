import RenderMap from "@/components/map/render-map";
import RenderStaticMap from "@/components/map/render-static-map";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";

export default function Page() {
  return (
    <div className={"mobileLayout"}>
      {/* <RenderMap /> */}
      {/* <RenderStaticMap /> */}
    </div>
  );
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
