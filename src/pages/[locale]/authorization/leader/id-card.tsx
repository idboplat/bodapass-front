import LeaderIdcardHome from "@/components/authorization/leader-id-card-home";
import { useRouter } from "next/router";
import { Authorized } from "@/libraries/auth/authorized";

// http://localhost:3000/ko/authorization/leader/id-card
export default function LeaderIdRegisterCardPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <LeaderIdcardHome />
    </Authorized>
  );
}
