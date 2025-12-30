import { useTCM200101SSQ01 } from "@/hooks/tms/use-attendance";
import { useSession } from "@/libraries/auth/use-session";
import ClapIcon from "/public/assets/svg/clap.svg";
import css from "./complete-home.module.scss";
import clsx from "clsx";
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
    <div className={clsx("mobileLayout", css.container)}>
      <div className={css.header}>
        <div className={css.title}>{session.userNm} 반장님 고생하셨어요. :&#41;</div>
        <div className={css.subtitle}>{TCM200101SSQ01.data?.corpNm} 현장</div>
      </div>
      <ClapIcon className={css.clapIcon} />
      <div className={css.content}>
        <div className={css.description}>{attendanceCount}명의 출근이 완료되었습니다.</div>
        <div className={css.description}>안전하게 근무 하세요.</div>
      </div>
    </div>
  );
}
