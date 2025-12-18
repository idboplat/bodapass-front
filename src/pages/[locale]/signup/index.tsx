import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import RemoteCrewSignupHome from "@/components/signup/remote-crew-signup-home";
import LeaderSignupHome from "@/components/signup/leader-signup-home";
import IndexHome from "@/components/signup/index-home";
import {
  SignupFormProvider,
  SignupProvider,
  useSignupCtx,
} from "@/components/signup/context-provider";

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation();

  if (!router.isReady) return null;

  return (
    <SignupProvider>
      <SignupFormProvider>
        <Route />
      </SignupFormProvider>
    </SignupProvider>
  );
}

function Route() {
  const { wrkTp, step, isLoading } = useSignupCtx();

  // sessionStorage에서 code를 가져오는 중
  if (isLoading) {
    return null;
  }

  // 반장 회원가입
  if (step !== "1" && wrkTp === "1") {
    return <LeaderSignupHome />;
  }

  // 팀원/일용직 회원가입
  if (step !== "1" && (wrkTp === "2" || wrkTp === "3")) {
    return <RemoteCrewSignupHome />;
  }

  return <IndexHome />;
}

const getStaticProps = makeStaticProps(["common", "auth"]);
export { getStaticPaths, getStaticProps };
