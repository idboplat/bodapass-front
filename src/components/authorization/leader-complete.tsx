import { sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { DEVICE_API } from "@/types/common";
import clsx from "clsx";
import { useRouter } from "next/router";
import css from "./leader-complete.module.scss";
import CompletedIcon from "/public/assets/svg/completed-check.svg";
import CustomButton from "../common/custom-button";
import CrewAllWhiteIcon from "/public/assets/svg/crew-all-white.svg";

export default function LeaderComplete() {
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";

  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const end = () => {
    if (!!window.ReactNativeWebView) {
      sendMessageToDevice({
        type: DEVICE_API.leaderAuthorizationEnd,
        payload: null,
      });
    } else {
      router.back();
    }
  };

  const onClickTeamMemberRegistration = () => {
    router.push(`/${locale}/signup/crew/`);
  };

  return (
    <div className={clsx("mobileLayout", css.container)}>
      <div className={css.completeBox}>
        <CompletedIcon />

        <div className={css.messageBox}>
          <p className={css.userNm}>{session.userNm} 반장님</p>
          <p className={css.message}>등록이 완료되었습니다.</p>
        </div>
      </div>
      <div className={css.buttonBox}>
        <CustomButton
          onClick={onClickTeamMemberRegistration}
          fullWidth
          leftIcon={<CrewAllWhiteIcon />}
        >
          팀원 등록
        </CustomButton>
        <CustomButton onClick={end} fullWidth>
          나중에 하기
        </CustomButton>
      </div>
    </div>
  );
}
