import ClovaHome from "@/components/ocr/clova-home";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";

export default function Page() {
  return <ClovaHome isMobile={true} type="idCard" />;
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
