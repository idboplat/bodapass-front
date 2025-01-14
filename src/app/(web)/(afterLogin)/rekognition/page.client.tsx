"use client";
import Link from "next/link";
import css from "./page.module.scss";
import BackHeader from "@/components/common/header/BackHeader";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  return (
    <>
      <BackHeader title="Rekognition" onClickBack={onClickBack} />
      <div className={css.wrap}>
        <div className={css.box}>
          <Link href="/rekognition/regist" className={css.link}>
            <div className={css.item}>
              <h3>등록</h3>
              <div className={css.sub}></div>
            </div>
          </Link>

          <Link href="/rekognition/compare" className={css.link}>
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
