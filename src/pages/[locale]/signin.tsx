import SigninForm from "@/components/signin/signin-form";
import css from "./signin.module.scss";
import { KAKAO_REDIRECT_URI } from "@/constants";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import KakaoLoginIcon from "/public/assets/svg/kakao.svg?react";
import { Button, UnstyledButton } from "@mantine/core";

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const locale = router.query.locale?.toString() || "ko";

  const onClickKakaoLogin = () => {
    const kakaoLoginUrl = new URL("https://kauth.kakao.com/oauth/authorize");
    kakaoLoginUrl.searchParams.set("response_type", "code");
    kakaoLoginUrl.searchParams.set("client_id", process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY);
    kakaoLoginUrl.searchParams.set("redirect_uri", KAKAO_REDIRECT_URI);
    kakaoLoginUrl.searchParams.set("prompt", "select_account");
    window.location.href = kakaoLoginUrl.toString();
  };

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
          <UnstyledButton className={css.kakaoSigninButton} onClick={onClickKakaoLogin}>
            <KakaoLoginIcon />
            <span>{t("auth:0002")}</span>
          </UnstyledButton>
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
