import {Button, Title} from '@mantine/core';
import Link from 'next/link';
import css from "./Header.module.scss";

export default function Header () {
  return (
    <header className={css.header}>
      <div className={css.inner}>
        <Link href="/">
          <Title component="h1">DEMO</Title>
        </Link>
        <Button component={Link} href="/admin">Admin</Button>
      </div>
    </header>
  )
}
