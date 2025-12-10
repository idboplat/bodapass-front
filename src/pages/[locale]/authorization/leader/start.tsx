import LeaderStartHome from "@/components/authorization/leader-start-home";
import { Authorized } from "@/libraries/auth/authorized";
import Head from "next/head";
import { useRouter } from "next/router";

// http://localhost:3000/ko/authorization/leader/start
export default function LeaderStartRegisterPage() {
  const router = useRouter();

  return (
    <>
      {/* SSR */}
      <Head>
        <title>추가인증</title>
      </Head>

      {!router.isReady ? (
        <div>Loading...</div>
      ) : (
        <Authorized>
          <LeaderStartHome />
        </Authorized>
      )}
    </>
  );
}
