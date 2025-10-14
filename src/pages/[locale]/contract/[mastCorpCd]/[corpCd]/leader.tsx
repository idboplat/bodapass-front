import { LeaderContractHome } from "@/components/contract/leader-home";
import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";

export default function LeaderContractPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <LeaderContractHome />
    </Authorized>
  );
}
