import UsdBHome from "@/components/ocr/useb-home";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";

export default function Page() {
  return <UsdBHome isMobile={true} />;
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
