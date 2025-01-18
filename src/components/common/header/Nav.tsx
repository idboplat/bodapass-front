import Link from "next/link";
import css from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={css.nav}>
      <div className={css.fixed}>
        <ul className={css.inner}>
          <li className={css.item}>
            <Link href="/ocr">
              <span>OCR</span>
            </Link>
          </li>
          <li className={css.item}>
            <Link href="/rekognition">
              <span>얼굴인식</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
