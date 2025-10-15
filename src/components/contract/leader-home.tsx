import { useSession } from "@/libraries/auth/use-session";
import { LeaderConclude } from "./leader-conclude";
import { useRouter } from "next/router";
import { useTCM200201SMQ01 } from "@/hooks/tms/use-contract";

export function LeaderContractHome() {
  const router = useRouter();
  const mastCorpCd = router.query.mastCorpCd?.toString() || "";
  const corpCd = router.query.corpCd?.toString() || "";

  const { data: session } = useSession();
  if (!session) throw new Error("FW999");

  const TCM200201SMQ01 = useTCM200201SMQ01({
    session,
    cntrStatTp: "",
    mastCorpCd,
    corpCd,
    pageNm: 1,
  });

  const contractData = TCM200201SMQ01.data?.rows[0];

  if (TCM200201SMQ01.isPending) {
    return (
      <div className={"mobileLayout"}>
        <div>계약을 불러오는 중...</div>
      </div>
    );
  }

  if (!contractData) {
    return (
      <div className={"mobileLayout"}>
        <div>계약을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={"mobileLayout"}>
      <LeaderConclude contractData={contractData} session={session} />
    </div>
  );
}
