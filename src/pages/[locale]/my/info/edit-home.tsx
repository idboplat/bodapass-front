import { useWCM200801SSQ01 } from "@/hooks/tms/use-worker";
import { useSession } from "@/libraries/auth/use-session";
import InfoEditForm from "./edit-form";
import { Authorized } from "@/libraries/auth/authorized";

export default function InfoEditHome() {
  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const WCM200801SSQ01 = useWCM200801SSQ01({
    session,
    userId: session.userId,
    extnUserId: session.extnUserId,
    loginTp: session.loginTp,
  });

  if (WCM200801SSQ01.isPending) {
    return (
      <div className={"mobileLayout"}>
        <div>사용자 기본 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (!WCM200801SSQ01.data) {
    return (
      <div className={"mobileLayout"}>
        <div>사용자 기본 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <Authorized>
      <div className={"mobileLayout"}>
        <InfoEditForm session={session} userData={WCM200801SSQ01.data} />
      </div>
    </Authorized>
  );
}
