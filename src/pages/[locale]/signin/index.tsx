import LoginForm from "@/components/login/LoginForm";
import css from "./index.module.scss";
import { KAKAO_REDIRECT_URI } from "@/constants";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useTranslation } from "next-i18next";

export default function Page() {
  const { t } = useTranslation();

  return (
    <main className={css.main}>
      <div className={css.inner}>
        <h1 className={css.title}>{t("auth:0001")}</h1>
        <LoginForm />
      </div>

      <div>
        <div>Kakao</div>
        <div>
          <a
            href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
              process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
            }&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&prompt=select_account`}
          >
            {t("auth:0002")}
          </a>
        </div>
      </div>
    </main>
  );
}

const getStaticProps = makeStaticProps(["common", "auth"]);
export { getStaticPaths, getStaticProps };
