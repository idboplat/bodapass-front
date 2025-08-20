import css from "./signup.module.scss";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useTranslation } from "next-i18next";
import SignupForm from "@/components/signup/signup-form";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";

  return (
    <main className={css.main}>
      <div className={css.inner}>
        <h1 className={css.title}>{t("auth:1001")}</h1>
        <SignupForm type="1" />

        <Link href={`/${locale}/signin`}>이미 아이디가 있으신가요?</Link>
      </div>
    </main>
  );
}

const getStaticProps = makeStaticProps(["common", "auth"]);
export { getStaticPaths, getStaticProps };
