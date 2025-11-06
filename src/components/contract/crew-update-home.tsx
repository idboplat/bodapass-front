import { useWCM200801SSQ01 } from "@/hooks/tms/use-worker";
import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import CrewUpdateForm from "./crew-update-form";
import { useTCM200201SSQ01 } from "@/hooks/tms/use-contract";

export default function CrewUpdateHome() {
  const router = useRouter();
  const mastCorpCd = router.query.mastCorpCd?.toString() || "";
  const corpCd = router.query.corpCd?.toString() || "";
  const userId = router.query.userId?.toString() || "";
  const cntrDd = router.query.cntrDd?.toString() || "";
  const cntrSn = router.query.cntrSn?.toString() || "";

  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const TCM200201SSQ01 = useTCM200201SSQ01({
    session,
    mastCorpCd,
    corpCd,
    userId,
    cntrDd,
    cntrSn,
  });

  if (TCM200201SSQ01.isPending) {
    return (
      <div className={"mobileLayout"}>
        <div>사용자 계약 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (!TCM200201SSQ01.data) {
    return (
      <div className={"mobileLayout"}>
        <div>사용자 계약 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={"mobileLayout"}>
      <CrewUpdateForm contractData={TCM200201SSQ01.data} session={session} />
    </div>
  );
}
