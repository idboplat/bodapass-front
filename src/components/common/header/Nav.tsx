import Link from "next/link";
import css from "./Nav.module.scss";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();
  const locale = router.query.locale;

  return (
    <nav className={css.nav}>
      <div className={css.fixed}>
        <ul className={css.inner}>
          <li className={css.item}>
            <Link href={`/${locale}/demo/ocr`}>
              <span>OCR</span>
            </Link>
          </li>
          <li className={css.item}>
            <Link href={`/${locale}/demo/rekognition`}>
              <span>얼굴인식</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
