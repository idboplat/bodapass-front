import LeaderPrivacyHome from "@/components/authorization/leader-privacy-home";
import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";

export default function LeaderPrivacyPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <LeaderPrivacyHome />
    </Authorized>
  );
}
