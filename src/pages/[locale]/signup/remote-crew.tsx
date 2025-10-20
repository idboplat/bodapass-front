import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import RemoteCrewSignupHome from "@/components/signup/remote-crew-signup-home";
import { useRouter } from "next/router";
import { TSignUpDto } from "@/libraries/auth/auth.dto";

// 비대면 팀원 회원가입 페이지
export default function Page() {
  const router = useRouter();

  const loginTp = (router.query.loginTp?.toString() || "1") as "1" | "2" | "3";
  const workerTp = (router.query.workerTp?.toString() || "2") as "2" | "3";
  const brokerId = (router.query.brkrId?.toString() || "") as TSignUpDto["brkrId"];
  const externalId = (router.query.externalId?.toString() || "") as TSignUpDto["externalId"];
  const code = (router.query.code?.toString() || "") as TSignUpDto["password"];

  if (!router.isReady) return null;

  return (
    <RemoteCrewSignupHome
      loginTp={loginTp}
      initState={{ brokerId, externalId, password: code }}
      workerTp={workerTp}
    />
  );
}

const getStaticProps = makeStaticProps(["common", "auth"]);
export { getStaticPaths, getStaticProps };
