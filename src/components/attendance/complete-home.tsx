import { useTCM200101SSQ01 } from "@/hooks/tms/use-attendance";
import { useSession } from "@/libraries/auth/use-session";

interface Props {
  attendanceCount: number;
  mastCorpCd: string;
  corpCd: string;
}

export default function CompleteHome({ attendanceCount, mastCorpCd, corpCd }: Props) {
  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const TCM200101SSQ01 = useTCM200101SSQ01({ session, mastCorpCd, corpCd, userId: session.userId });

  return (
    <div className={"mobileLayout"}>
      <div>출석 완료</div>

      <div>{session.userNm} 반장님 고생하셨어요 :)</div>
      <div>{TCM200101SSQ01.data?.corpNm} 현장</div>
      <div>{attendanceCount}명의 출근이 완료되었습니다.</div>
      <div>안전하게 근무 하세요.</div>
    </div>
  );
}
