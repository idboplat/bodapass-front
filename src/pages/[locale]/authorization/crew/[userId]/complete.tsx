import CrewComplete from "@/components/authorization/crew-complete";
import CrewPrivacyHome from "@/components/authorization/crew-privacy-home";
import { Authorized } from "@/libraries/auth/authorized";
import Head from "next/head";
import { useRouter } from "next/router";

export default function CrewCompletePage() {
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
          <CrewComplete />
        </Authorized>
      )}
    </>
  );
}
