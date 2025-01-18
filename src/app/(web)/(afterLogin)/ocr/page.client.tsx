"use client";
import Link from "next/link";
import css from "./page.module.scss";
import BackHeader from "@/components/common/header/BackHeader";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { Anchor, Breadcrumbs } from "@mantine/core";

const items = [{ title: "OCR", href: "/ocr" }].map((item, index) => (
  <Anchor component={Link} href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export default function Page() {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  return (
    <>
      <BackHeader title="OCR" onClickBack={onClickBack} />
      <div className={classNames(css.wrap)}>
        <Breadcrumbs separator="→" separatorMargin="md">
          {items}
        </Breadcrumbs>
        <h2 className={css.title}>신분증 유형을 선택해주세요</h2>
        <div className={css.box}>
          <Link href="/ocr/idCard" className={css.link}>
            <div className={css.item}>
              <h3>신분증</h3>
              <div className={css.sub}>주민등록증, 운전면허증, 외국인등록증</div>
            </div>
          </Link>

          <Link href="/ocr/passport" className={css.link}>
            <div className={css.item}>
              <h3>여권</h3>
              <div className={css.sub}></div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
