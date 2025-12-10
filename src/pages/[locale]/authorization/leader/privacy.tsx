import LeaderPrivacyHome from "@/components/authorization/leader-privacy-home";
import { Authorized } from "@/libraries/auth/authorized";
import Head from "next/head";
import { useRouter } from "next/router";

export default function LeaderPrivacyPage() {
  const router = useRouter();

  return (
    <>
      {/* SSR */}
      <Head>
        <title>개인정보이용동의</title>
      </Head>

      {!router.isReady ? (
        <div>Loading...</div>
      ) : (
        <Authorized>
          <LeaderPrivacyHome />
        </Authorized>
      )}
    </>
  );
}
