import { ActionIcon, LoadingOverlay } from "@mantine/core";
import BackHeader from "../common/back-header";
import Camera from "../camera";
import { useDto } from "@/hooks/use-dto";
import { TBankDto } from "./dto";
import Redirect from "../common/redirect";
import { useRouter } from "next/router";
import clsx from "clsx";
import IdcardFrame from "./camera-frame";
import { Camera as IconCamera } from "lucide-react";
import css from "./bank-home.module.scss";
import { useCamera } from "@/hooks/use-camera";
import { useMutation } from "@tanstack/react-query";
import { callWas, StringRspnData } from "@/libraries/call-tms";
import { sendMessageToDevice } from "@/hooks/use-device-api";

interface Props {}

export default function BankHome({}: Props) {
  const router = useRouter();
  const dto = useDto<TBankDto>();
  const camera = useCamera();

  const mutation = useMutation({
    mutationFn: async (args: { userId: string }) => {
      const blob = await camera.capture();
      if (!blob) throw new Error("이미지 캡쳐 실패");

      const result = await callWas<StringRspnData<3>>({
        svcId: "TCW000001SSP03",
        apiPathName: "WCW000002SSQ01",
        locale: "ko",
        session: null,
        data: [args.userId, "jpeg", ""],
        formData: [blob],
      });

      const data = result.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return { bankImageSrc: data.F01 };
    },
    onSuccess: () =>
      sendMessageToDevice({
        type: "authorizationEnd",
        payload: null,
      }),
  });

  const onClickBack = () =>
    sendMessageToDevice({
      type: "authorizationEnd",
      payload: null,
    });

  const onClickCapture = () => {
    if (!dto.userId) return;
    if (mutation.isPending) return;
    mutation.mutate({ userId: dto.userId });
  };

  if (!dto.userId) return <Redirect to="/not-found" />;

  return (
    <div className={"mobileLayout"}>
      <BackHeader title="통장등록" onClickBack={onClickBack} />
      <div>유저 ID: {dto.userId}</div>

      <div className={clsx(css.cameraBox)}>
        <Camera videoRef={camera.videoRef} canvasRef={camera.canvasRef} isMobile={true} />
        <IdcardFrame />
      </div>

      <div className={css.shutterBox}>
        <ActionIcon
          variant="touch"
          w="5rem"
          h="5rem"
          onClick={onClickCapture}
          radius={9999}
          loading={mutation.isPending}
        >
          <IconCamera width="2.5rem" height="2.5rem" />
        </ActionIcon>
      </div>

      <LoadingOverlay visible={mutation.isPending} />
    </div>
  );
}
