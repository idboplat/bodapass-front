import Link from "next/link";
import css from "./index.module.scss";
import { clsx } from "clsx";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const locale = router.query.locale;

  return (
    <div className={"mobileLayout"}>
      <div className={clsx(css.wrap)}>
        <div className={css.box}>
          <Link href={`/${locale}/demo/ocr`} className={css.link}>
            <div className={css.item}>
              <h3>OCR</h3>
              <div className={css.sub}>신분증 OCR 테스트</div>
            </div>
          </Link>

          <Link href={`/${locale}/demo/rekognition`} className={css.link}>
            <div className={css.item}>
              <h3>Face Recognition</h3>
              <div className={css.sub}>얼굴인식 테스트</div>
            </div>
          </Link>

          <Link href={`/${locale}/demo/map`} className={css.link}>
            <div className={css.item}>
              <h3>Kakao Map</h3>
              <div className={css.sub}>카카오 지도 테스트</div>
            </div>
          </Link>

          <Link href={`/${locale}/demo/post-code`} className={css.link}>
            <div className={css.item}>
              <h3>Post Code</h3>
              <div className={css.sub}>우편번호 테스트</div>
            </div>
          </Link>

          <Link href={`/${locale}/demo/camera`} className={css.link}>
            <div className={css.item}>
              <h3>R2 Upload</h3>
              <div className={css.sub}>R2 Upload 테스트</div>
            </div>
          </Link>

          <Link href={`/${locale}/demo/register`} className={css.link}>
            <div className={css.item}>
              <h3>Face Register</h3>
              <div className={css.sub}>얼굴 등록 테스트</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
