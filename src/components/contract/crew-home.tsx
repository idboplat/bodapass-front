import { useSession } from "@/libraries/auth/use-session";
import CrewConclude from "./crew-conclude";
import { useRouter } from "next/router";
import { useTCM200202SSQ01 } from "@/hooks/tms/use-contract";

export function CrewContractHome() {
  const router = useRouter();
  const mastCorpCd = router.query.mastCorpCd?.toString() || "";
  const corpCd = router.query.corpCd?.toString() || "";
  const userId = router.query.userId?.toString() || "";

  const { data: session } = useSession();
  if (!session) throw new Error("FW999");

  const TCM200202SSQ01 = useTCM200202SSQ01({
    session,
    mastCorpCd,
    corpCd,
    userId,
  });

  if (TCM200202SSQ01.isPending) {
    return (
      <div className={"mobileLayout"}>
        <div>계약을 불러오는 중...</div>
      </div>
    );
  }

  if (!TCM200202SSQ01.data) {
    return (
      <div className={"mobileLayout"}>
        <div>계약정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={"mobileLayout"}>
      <CrewConclude session={session} contractData={TCM200202SSQ01.data} />
    </div>
  );
}
