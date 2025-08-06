import RenderMap from "@/components/map/RenderMap";
import RenderStaticMap from "@/components/map/RenderStaticMap";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";

export default function Page() {
  return (
    <div className={"mobileLayout"}>
      {/* <RenderMap /> */}
      <RenderStaticMap />
    </div>
  );
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
