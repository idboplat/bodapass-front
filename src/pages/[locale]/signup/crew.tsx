import css from "./index.module.scss";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useTranslation } from "next-i18next";
import SignupForm from "@/components/signup/crew-signup-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { TCrewSignUpDto } from "@/libraries/auth/auth.dto";
import { GradientBackground } from "@/components/background";

export default function Page() {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";
  const loginTp = (router.query.loginTp?.toString() || "1") as TCrewSignUpDto["loginTp"];
  const workerTp = (router.query.workerTp?.toString() || "2") as "2" | "3";
  const brokerId = (router.query.brkrId?.toString() || "") as TCrewSignUpDto["brkrId"];
  const externalId = (router.query.externalId?.toString() || "") as TCrewSignUpDto["externalId"];
  const code = (router.query.code?.toString() || "") as TCrewSignUpDto["password"];

  if (!router.isReady) return null;

  return (
    <div className={"mobileLayout"}>
      <GradientBackground />

      <div className={css.wrap}>
        <div className={css.inner}>
          <h1 className={css.title}>{workerTp === "2" ? "팀원" : "일용직"} 회원가입</h1>

          <SignupForm
            initState={{
              loginTp,
              brokerId,
              externalId,
              password: code,
            }}
            workerTp={workerTp}
          />

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
}

const getStaticProps = makeStaticProps(["common", "auth"]);
export { getStaticPaths, getStaticProps };
