"use client";
import Link from "next/link";
import css from "./page.module.scss";
import { clsx } from "clsx";

export default function Page() {

  return (
    <>
      <div className={clsx(css.wrap)}>
        <div className={css.box}>
          <Link href="/demo/ocr" className={css.link}>
            <div className={css.item}>
              <h3>OCR</h3>
              <div className={css.sub}>신분증 OCR 테스트</div>
            </div>
          </Link>

          <Link href="/demo/rekognition" className={css.link}>
            <div className={css.item}>
              <h3>Face Recognition</h3>
              <div className={css.sub}>
                얼굴인식 테스트
              </div>
            </div>
          </Link>

          <Link href="/demo/map" className={css.link}>
            <div className={css.item}>
              <h3>Kakao Map</h3>
              <div className={css.sub}>
                카카오 지도 테스트
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
