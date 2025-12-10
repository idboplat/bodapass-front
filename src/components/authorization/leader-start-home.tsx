import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { DEVICE_API } from "@/types/common";
import { Button } from "@mantine/core";
import css from "./leader-start-home.module.scss";
import userDetectImage from "/public/assets/images/user-detect.png";
import clsx from "clsx";
import Image from "next/image";

export default function LeaderStartHome() {
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

  return (
    <div className={clsx("mobileLayout", css.container)}>
      <div className={css.checkIconBox}>
        <Image
          src={userDetectImage}
          alt="user-avatar"
          width={150}
          height={150}
          placeholder="blur"
          quality={100}
        />

        <div className={css.description}>
          <h2>추가 인증이 필요합니다.</h2>
          <p>신분증 사진과 얼굴이 일치하는지 확인합니다.</p>
          <p>임금 지급을 위한 통장을 등록합니다.</p>
        </div>
      </div>

      <div className={css.buttonBox}>
        <Button variant="outline" onClick={end}>
          나중에
        </Button>
        <Button
          variant="filled"
          onClick={() => {
            router.push(`/${locale}/authorization/leader/face?next=true`);
          }}
        >
          인증하기
        </Button>
      </div>
    </div>
  );
}
