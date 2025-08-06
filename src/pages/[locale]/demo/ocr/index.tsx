import Link from "next/link";
import css from "./index.module.scss";
import BackHeader from "@/components/common/header/BackHeader";
import { useRouter } from "next/router";
import { clsx } from "clsx";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";

export default function Page() {
  const router = useRouter();
  const locale = router.query.locale;

  const onClickBack = () => {
    router.back();
  };

  return (
    <>
      <BackHeader title="OCR" onClickBack={onClickBack} />
      <div className={clsx(css.wrap)}>
        <h2 className={css.title}>공급자를 선택해주세요</h2>
        <div className={css.box}>
          <Link href={`/${locale}/demo/ocr/clova`} className={css.link}>
            <div className={css.item}>
              <h3>CLOVA</h3>
              <div className={css.sub}>주민등록증만 테스트 가능합니다.</div>
            </div>
          </Link>

          <Link href={`/${locale}/demo/ocr/useb`} className={css.link}>
            <div className={css.item}>
              <h3>useB.</h3>
              <div className={css.sub}>
                주민등록증, 운전면허증, 외국인등록증, 국내여권, 해외여권 테스트 가능합니다.
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
