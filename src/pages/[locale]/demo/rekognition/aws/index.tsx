import Link from "next/link";
import css from "./index.module.scss";
import BackHeader from "@/components/common/header/BackHeader";
import { useRouter } from "next/router";
import { clsx } from "clsx";

export default function Page() {
  const router = useRouter();
  const locale = router.query.locale;

  const onClickBack = () => {
    router.back();
  };

  return (
    <>
      <BackHeader title="Rekognition" onClickBack={onClickBack} />
      <div className={clsx(css.wrap)}>
        <div className={css.box}>
          <Link href={`/${locale}/demo/rekognition/aws/regist`} className={css.link}>
            <div className={css.item}>
              <h3>등록</h3>
              <div className={css.sub}></div>
            </div>
          </Link>

          <Link href={`/${locale}/demo/rekognition/aws/compare`} className={css.link}>
            <div className={css.item}>
              <h3>조회</h3>
              <div className={css.sub}></div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
