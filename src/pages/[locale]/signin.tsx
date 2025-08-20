import SigninForm from "@/components/signin/signin-form";
import css from "./signin.module.scss";
import { KAKAO_REDIRECT_URI } from "@/constants";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import KakaoLoginIcon from "/public/assets/svg/kakao.svg?react";

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const locale = router.query.locale?.toString() || "ko";

  return (
    <main className={css.main}>
      <div className={css.inner}>
        <h1 className={css.title}>{t("auth:0001")}</h1>
        <SigninForm />
      </div>

      <br />
      <br />

      <div>
        <div>소셜 계정으로 로그인</div>

        <br />

        <div>
          <a
            className={css.kakaoSigninButton}
            href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
              process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
            }&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&prompt=select_account`}
          >
            <KakaoLoginIcon />
            <span>{t("auth:0002")}</span>
          </a>
        </div>
      </div>

      <br />

      <div>
        <Link href={`/${locale}/signup`}>회원가입</Link>
      </div>
    </main>
  );
}

const getStaticProps = makeStaticProps(["common", "auth"]);
export { getStaticPaths, getStaticProps };
