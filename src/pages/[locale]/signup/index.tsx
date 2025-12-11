import css from "./index.module.scss";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import Link from "next/link";
import { useRouter } from "next/router";
import { GradientBackground } from "@/components/background";
import { useTranslation } from "next-i18next";

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const locale = router.query.locale?.toString() || "ko";
  const loginTp = (router.query.loginTp?.toString() || "4") as "1" | "2" | "3" | "4" | "5";

  const nextPage = (tp: "leader" | "remote-crew") => () => {
    const searchParams = new URLSearchParams();
    if (loginTp) searchParams.set("loginTp", loginTp); // 1: 이메일, 2: 소셜, 3: 전화번호, 4: 아이디, 5: etc
    router.push(`/${locale}/signup/${tp}?${searchParams.toString()}`);
  };

  if (!router.isReady) return null;

  return (
    <div className={"mobileLayout"}>
      <GradientBackground />
      <div className={css.wrap}>
        <div className={css.inner}>
          <h1 className={css.title}>{loginTp !== "2" ? t("auth:1001") : t("auth:1002")}</h1>

          <div className={css.buttonContainer}>
            <button className={css.roleButton} onClick={nextPage("leader")}>
              <div className={css.buttonIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19 15L20.09 19.26L24 20L20.09 20.74L19 25L17.91 20.74L14 20L17.91 19.26L19 15Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5 15L6.09 19.26L10 20L6.09 20.74L5 25L3.91 20.74L0 20L3.91 19.26L5 15Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className={css.buttonContent}>
                <div className={css.buttonTitle}>반장</div>
                <div className={css.buttonSubtitle}>현장을 관리하고 인원을 배정합니다</div>
              </div>
            </button>

            {/* <button className={css.roleButton} onClick={nextPage("remote-crew")}>
              <div className={css.buttonIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM16 14C20.4 14 24 17.6 24 22H8C8 17.6 11.6 14 16 14Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8 4C10.2 4 12 5.8 12 8C12 10.2 10.2 12 8 12C5.8 12 4 10.2 4 8C4 5.8 5.8 4 8 4ZM8 14C12.4 14 16 17.6 16 22H0C0 17.6 3.6 14 8 14Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className={css.buttonContent}>
                <div className={css.buttonTitle}>팀원 (일용직)</div>
                <div className={css.buttonSubtitle}>배치되는 현장에서 근무합니다</div>
              </div>
            </button> */}
          </div>

          <div className={css.linkContainer}>
            <Link href={`/${locale}/signin`} className={css.signinLink}>
              이미 아이디가 있으신가요?
            </Link>
            <a target="_blank" href={`/${locale}/privacy`} className={css.privacyLink}>
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
