import { useSession } from "@/libraries/auth/use-session";
import CrewConclude from "./crew-conclude";
import { useRouter } from "next/router";

export function CrewContractHome() {
  const router = useRouter();
  const mastCorpCd = router.query.mastCorpCd?.toString() || "";
  const corpCd = router.query.corpCd?.toString() || "";
  const userId = router.query.userId?.toString() || "";

  const { data: session } = useSession();
  if (!session) throw new Error("FW999");

  return (
    <div className={"mobileLayout"}>
      <CrewConclude session={session} mastCorpCd={mastCorpCd} corpCd={corpCd} userId={userId} />
    </div>
  );
}
