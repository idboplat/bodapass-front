import { TWrkTp } from "@/types/common";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import css from "./index-home.module.scss";
import Link from "next/link";
import { useSignupCtx } from "./context-provider";
import LeaderIcon from "/public/assets/svg/leader.svg";
import CustomStep from "../common/custom-step";

interface PageProps {}

export default function IndexHome({}: PageProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const ctx = useSignupCtx();

  const nextPage = (tp: TWrkTp) => () => {
    const searchParams = new URLSearchParams();
    searchParams.set("loginTp", ctx.loginTp);
    searchParams.set("wrkTp", tp);
    searchParams.set("step", "2");
    router.push(`/${ctx.locale}/signup/?${searchParams.toString()}`);
  };

  return (
    <div className={"mobileLayout"}>
      <div className={css.wrap}>
        <CustomStep totalSteps={4} currentStep={1} />
        <div className={css.inner}>
          <div className={css.buttonContainer}>
            <button className={css.roleButton} onClick={nextPage("1")}>
              <div className={css.buttonIcon}>
                <LeaderIcon width={50} height={29} />
              </div>
              <div className={css.buttonContent}>
                <div className={css.buttonTitle}>반장</div>
                <div className={css.buttonSubtitle}>현장을 관리하고 인원을 배정합니다</div>
              </div>
            </button>
          </div>

          <div className={css.linkContainer}>
            <Link href={`/${ctx.locale}/signin`} className={css.signinLink}>
              이미 아이디가 있으신가요?
            </Link>
            <a target="_blank" href={`/${ctx.locale}/privacy`} className={css.privacyLink}>
              개인정보 처리방침
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
