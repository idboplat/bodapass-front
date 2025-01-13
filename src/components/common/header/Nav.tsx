import Link from 'next/link'
import css from "./Nav.module.scss"

export default function Nav() {
  return (
    <nav className={css.nav}>
      <ul className={css.inner}>
        <li className={css.item}>
          <Link href="/ocr">OCR</Link>
        </li>
        <li className={css.item}>
          <Link href="/recognition">얼굴인식</Link>
        </li>
      </ul>
    </nav>
  )
}