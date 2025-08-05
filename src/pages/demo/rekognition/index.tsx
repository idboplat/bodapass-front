import Link from "next/link";
import css from "./index.module.scss";
import BackHeader from "@/components/common/header/BackHeader";
import { useRouter } from "next/router";
import { clsx } from "clsx";

export default function Page() {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  return (
    <>
      <BackHeader title="Rekognition" onClickBack={onClickBack} />
      <div className={clsx(css.wrap)}>
        <div className={css.box}>
          <Link href="/demo/rekognition/aws" className={css.link}>
            <div className={css.item}>
              <h3>AWS</h3>
              <div className={css.sub}></div>
            </div>
          </Link>

          <Link href="/demo/rekognition/nhn" className={css.link}>
            <div className={css.item}>
              <h3>NHN</h3>
              <div className={css.sub}></div>
            </div>
          </Link>

          <Link href="/demo/rekognition/nhn-aws" className={css.link}>
            <div className={css.item}>
              <h3>NHN + AWS</h3>
              <div className={css.sub}></div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
