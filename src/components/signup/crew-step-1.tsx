import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { DEVICE_API } from "@/types/common";
import css from "./crew-step-1.module.scss";
import userDetectImage from "/public/assets/images/user-detect.png";
import clsx from "clsx";
import Image from "next/image";
import CustomButton from "../common/custom-button";
import CrewAllIcon from "/public/assets/svg/crew-all-icon.svg";
import CustomStep from "../common/custom-step";

export default function CrewStep1() {
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";

  const onClickNext = () => {
    const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
    searchParams.set("step", "2");
    router.push(`/${locale}/signup/crew/?${searchParams.toString()}`);
  };

  return (
    <div className={css.wrapper}>
      <CustomStep totalSteps={4} currentStep={1} />
      <div className={css.container}>
        <div className={css.content}>
          <CrewAllIcon />

          <h2 className={css.title}>팀원 추가</h2>

          <div className={css.description}>
            <p>이제부터</p>
            <p>팀원추가를</p>
            <p>시작하겠습니다.</p>
          </div>
        </div>

        <div className={css.buttonBox}>
          <CustomButton onClick={onClickNext} className={css.button} fullWidth>
            대면등록
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
