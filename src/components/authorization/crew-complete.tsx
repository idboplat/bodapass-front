import { sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { DEVICE_API } from "@/types/common";
import clsx from "clsx";
import { useRouter } from "next/router";
import css from "./crew-start-home.module.scss";
import CompletedIcon from "/public/assets/svg/completed-check.svg";
import CustomButton from "../common/custom-button";

export default function CrewComplete() {
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";

  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const end = () => {
    if (!!window.ReactNativeWebView) {
      sendMessageToDevice({
        type: DEVICE_API.crewAuthorizationEnd,
        payload: null,
      });
    } else {
      router.back();
    }
  };
  /** 근로자의 유저 ID */
  const userId = router.query.userId?.toString() || "";
  const userNm = router.query.userNm?.toString() || "";

  return (
    <div className={clsx("mobileLayout", css.container)}>
      <div className={css.completeBox}>
        <CompletedIcon />

        <div className={css.messageBox}>
          <p className={css.userNm}>{userNm} 팀원님</p>
          <p className={css.message}>등록이 완료되었습니다.</p>
        </div>

        <CustomButton onClick={end} fullWidth>
          완료
        </CustomButton>
      </div>
    </div>
  );
}
