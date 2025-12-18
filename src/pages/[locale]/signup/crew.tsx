import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  OnSiteSignupProvider,
  SignupFormProvider,
  useSignupCtx,
} from "@/components/signup/context-provider";
import CrewSignUpHome from "@/components/signup/crew-signup-home";

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation();

  if (!router.isReady) return null;

  return (
    <OnSiteSignupProvider wrkTp="2" loginTp="4">
      <SignupFormProvider>
        <CrewSignUpHome />
      </SignupFormProvider>
    </OnSiteSignupProvider>
  );
}

const getStaticProps = makeStaticProps(["common", "auth"]);
export { getStaticPaths, getStaticProps };
