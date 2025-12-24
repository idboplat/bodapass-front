import Link from "next/link";
import { useRouter } from "next/router";
import css from "./layout.module.scss";

export const WithSignInLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";

  return (
    <div className={"mobileLayout"}>
      <div className={css.wrap}>
        <div className={css.inner}>
          {children}
          <div className={css.linkContainer}>
            <Link className={css.signinLink} href={`/${locale}/signin`}>
              이미 아이디가 있으신가요?
            </Link>
            <a className={css.privacyLink} target="_blank" href={`/${locale}/privacy`}>
              개인정보 처리방침
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WithoutSignInLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className={"mobileLayout"}>
      <div className={css.wrap}>
        <div className={css.inner}>
          <h1 className={css.title}>{title}</h1>

          {children}
        </div>
      </div>
    </div>
  );
};
