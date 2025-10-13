import CrewIdcardHome from "@/components/authorization/crew-id-card-home";
import { useRouter } from "next/router";
import { Authorized } from "@/libraries/auth/authorized";

// http://localhost:3000/ko/authorization/[brckId]/crew/id-card
export default function CrewIdCardRegisterPage() {
  const router = useRouter();
  const brkrId = router.query.brkrId?.toString() || "";

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <CrewIdcardHome brkrId={brkrId} />
    </Authorized>
  );
}
