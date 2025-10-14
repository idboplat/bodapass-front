import CrewPrivacyHome from "@/components/authorization/crew-privacy-home";
import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";

export default function CrewPrivacyPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <CrewPrivacyHome />
    </Authorized>
  );
}
