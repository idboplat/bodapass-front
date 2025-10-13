import LeaderBankHome from "@/components/authorization/leader-bank-home";
import { useRouter } from "next/router";
import { Authorized } from "@/libraries/auth/authorized";

// http://localhost:3000/ko/authorization/leader/bank
export default function LeaderBankRegisterPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <LeaderBankHome />
    </Authorized>
  );
}
