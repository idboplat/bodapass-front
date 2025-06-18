"use client";
import Link from "next/link";
import css from "./page.module.scss";
import BackHeader from "@/components/common/header/BackHeader";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
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
      <div className={clsx(css.wrap)}>
        <Breadcrumbs separator="→" separatorMargin="md">
          {items}
        </Breadcrumbs>
        <h2 className={css.title}>공급자를 선택해주세요</h2>
        <div className={css.box}>
          <Link href="/ocr/idCard" className={css.link}>
            <div className={css.item}>
              <h3>CLOVA</h3>
              <div className={css.sub}>주민등록증만 테스트 가능합니다.</div>
            </div>
          </Link>

          <Link href="/ocr/usb" className={css.link}>
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
