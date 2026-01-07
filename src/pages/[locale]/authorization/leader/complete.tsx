import LeaderComplete from "@/components/authorization/leader-complete";
import { Authorized } from "@/libraries/auth/authorized";
import Head from "next/head";
import { useRouter } from "next/router";

export default function LeaderCompletePage() {
  const router = useRouter();

  return (
    <>
      {/* SSR */}
      <Head>
        <title>등록완료</title>
      </Head>

      {!router.isReady ? (
        <div>Loading...</div>
      ) : (
        <Authorized>
          <LeaderComplete />
        </Authorized>
      )}
    </>
  );
}
