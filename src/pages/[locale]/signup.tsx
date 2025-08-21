import css from "./signup.module.scss";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useTranslation } from "next-i18next";
import SignupForm from "@/components/signup/signup-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { TSignUpDto } from "@/libraries/auth/auth.dto";

export default function Page() {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";
  const loginTp = (router.query.loginTp?.toString() || "1") as TSignUpDto["loginTp"];
  const workerTp = (router.query.workerTp?.toString() || "") as TSignUpDto["workerTp"];
  const brokerId = (router.query.brokerId?.toString() || "") as TSignUpDto["brokerId"];
  const externalId = (router.query.externalId?.toString() || "") as TSignUpDto["externalId"];
  const password = (router.query.password?.toString() || "") as TSignUpDto["password"];

  if (!router.isReady) return null;

  return (
    <main className={css.main}>
      <div className={css.inner}>
        <h1 className={css.title}>{t("auth:1001")}</h1>

        <SignupForm
          initState={{
            loginTp,
            workerTp,
            brokerId,
            externalId,
            password,
          }}
        />

        <Link href={`/${locale}/signin`}>이미 아이디가 있으신가요?</Link>
      </div>
    </main>
  );
}

const getStaticProps = makeStaticProps(["common", "auth"]);
export { getStaticPaths, getStaticProps };
