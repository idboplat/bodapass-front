import CrewBankHome from "@/components/authorization/crew-bank-home";
import { useRouter } from "next/router";
import { Authorized } from "@/libraries/auth/authorized";

// http://localhost:3000/ko/authorization/crew/[userId]/bank
export default function CrewBankRegisterPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <CrewBankHome />
    </Authorized>
  );
}
