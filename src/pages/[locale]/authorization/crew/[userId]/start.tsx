import CrewStartHome from "@/components/authorization/crew-start-home";
import { Authorized } from "@/libraries/auth/authorized";
import Head from "next/head";
import { useRouter } from "next/router";

// http://localhost:3000/ko/authorization/crew/[userId]/start
export default function CrewStartRegisterPage() {
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
          <CrewStartHome />
        </Authorized>
      )}
    </>
  );
}
