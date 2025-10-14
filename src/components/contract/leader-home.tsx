import { useSession } from "@/libraries/auth/use-session";
import { LeaderConclude } from "./leader-conclude";
import { useRouter } from "next/router";

export function LeaderContractHome() {
  const router = useRouter();
  const mastCorpCd = router.query.mastCorpCd?.toString() || "";
  const corpCd = router.query.corpCd?.toString() || "";

  const { data: session } = useSession();
  if (!session) throw new Error("FW999");

  const userId = session.userId;

  return (
    <div className={"mobileLayout"}>
      <LeaderConclude session={session} mastCorpCd={mastCorpCd} corpCd={corpCd} userId={userId} />
    </div>
  );
}
