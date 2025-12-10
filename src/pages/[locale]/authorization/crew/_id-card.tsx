import CrewIdcardHome from "@/components/authorization/crew-id-card-home";
import { useRouter } from "next/router";
import { Authorized } from "@/libraries/auth/authorized";

// http://localhost:3000/ko/authorization/crew/id-card
export default function CrewIdCardRegisterPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <CrewIdcardHome />
    </Authorized>
  );
}
