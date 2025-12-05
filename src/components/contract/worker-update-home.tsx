import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import WorkerUpdateForm from "./worker-update-form";
import { useWCM200201SSQ01 } from "@/hooks/tms/use-contract";

export default function WorkerUpdateHome() {
  const router = useRouter();
  const mastCorpCd = router.query.mastCorpCd?.toString() || "";
  const corpCd = router.query.corpCd?.toString() || "";
  const userId = router.query.userId?.toString() || "";
  const cntrDd = router.query.cntrDd?.toString() || "";
  const cntrSn = router.query.cntrSn?.toString() || "";

  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const WCM200201SSQ01 = useWCM200201SSQ01({
    session,
    mastCorpCd,
    corpCd,
    userId,
    cntrDd,
    cntrSn,
  });

  if (WCM200201SSQ01.isPending) {
    return (
      <div className={"mobileLayout"}>
        <div>사용자 계약 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (!WCM200201SSQ01.data) {
    return (
      <div className={"mobileLayout"}>
        <div>사용자 계약 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={"mobileLayout"}>
      <WorkerUpdateForm contractData={WCM200201SSQ01.data} session={session} />
    </div>
  );
}
