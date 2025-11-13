import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import LeaderSignupHome from "@/components/signup/leader-signup-home";
import { useRouter } from "next/router";
import { TSignUpDto } from "@/libraries/auth/auth.dto";

// 반장 회원가입
export default function Page() {
  const router = useRouter();

  const loginTp = (router.query.loginTp?.toString() || "4") as "1" | "2" | "3" | "4" | "5";
  const externalId = (router.query.externalId?.toString() || "") as TSignUpDto["externalId"];
  const code = (router.query.code?.toString() || "") as TSignUpDto["password"];

  if (!router.isReady) return null;

  return <LeaderSignupHome loginTp={loginTp} initState={{ externalId, password: code }} />;
}

const getStaticProps = makeStaticProps(["common", "auth"]);
export { getStaticPaths, getStaticProps };
