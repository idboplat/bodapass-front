import { useSession } from "@/libraries/auth/use-session";
import { LeaderConclude } from "./leader-conclude";
import { useRouter } from "next/router";
import { useWCM200201SSQ01 } from "@/hooks/tms/use-contract";

export function LeaderContractHome() {
  const router = useRouter();
  const mastCorpCd = router.query.mastCorpCd?.toString() || "";
  const corpCd = router.query.corpCd?.toString() || "";
  const cntrDd = router.query.cntrDd?.toString() || "";
  const cntrSn = router.query.cntrSn?.toString() || "";

  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const WCM200201SSQ01 = useWCM200201SSQ01({
    session,
    mastCorpCd,
    corpCd,
    userId: session.userId, // 반장의 유저 ID
    cntrDd,
    cntrSn,
  });

  if (WCM200201SSQ01.isPending) {
    return (
      <div className={"mobileLayout"}>
        <div>계약을 불러오는 중...</div>
      </div>
    );
  }

  // 접수상태인지 확인
  if (!WCM200201SSQ01.data) {
    return (
      <div className={"mobileLayout"}>
        <div>계약을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={"mobileLayout"}>
      <LeaderConclude contractData={WCM200201SSQ01.data} session={session} />
    </div>
  );
}
