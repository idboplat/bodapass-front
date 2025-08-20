import { Button, Title } from "@mantine/core";
import Link from "next/link";
import css from "./header.module.scss";
import { clsx } from "clsx";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const locale = router.query.locale;

  return (
    <header className={css.header}>
      <div className={clsx(css.absoute, "default")}>
        <div className={css.inner}>
          <Link href={`/${locale}`}>
            <Title component="h1">DEMO</Title>
          </Link>
        </div>
      </div>
    </header>
  );
}
