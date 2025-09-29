import { ActionIcon, Button, LoadingOverlay } from "@mantine/core";
import BackHeader from "../common/back-header";
import Capture from "../capture";
import { TFaceDto } from "./dto";
import { useRouter } from "next/router";
import { useDto } from "@/hooks/use-dto";
import { useMutation } from "@tanstack/react-query";
import Redirect from "../common/redirect";
import { useState } from "react";
import { callWas } from "@/libraries/call-tms";
import css from "./face-home.module.scss";
import { StringRspn } from "@/types/api";
import { sendMessageToDevice } from "@/hooks/use-device-api";

export default function FaceHome() {
  const router = useRouter();
  const dto = useDto<TFaceDto>();

  const [cameraMode, setCameraMode] = useState<"front" | "back">("front");

  const mutation = useMutation({
    mutationFn: async (args: { image: Blob; userId: string }) => {
      const result = await callWas<StringRspn<1>>({
        svcId: "TCW000002SSP01",
        apiPathName: "WCW000002SSP01",
        data: [args.userId, "jpeg", ""],
        locale: "ko",
        session: null,
        formData: [args.image],
      });

      const data = result.svcRspnData?.[0];

      if (!data) throw new Error("FCM999");

      return { faceId: data.F01, userId: args.userId };
    },
    onSuccess: (data) => router.replace(`/authorization/${data.userId}/bank`),
  });

  const onClickBack = () =>
    sendMessageToDevice({
      type: "authorizationEnd",
      payload: null,
    });

  const setImage = (args: { image: Blob; score: number }) => {
    if (!dto.userId) return;
    if (mutation.isPending) return;

    mutation.mutate({ image: args.image, userId: dto.userId });
  };

  if (!dto.userId) return <Redirect to="/not-found" />;

  return (
    <div className={"mobileLayout"}>
      <BackHeader title="얼굴등록" onClickBack={onClickBack} />
      <div>유저 ID: {dto.userId}</div>

      <div className={css.captureBox}>
        <Capture onFaceDetected={setImage} cameraMode={cameraMode} setMessage={() => {}} />
      </div>

      <div>
        <Button onClick={() => setCameraMode((prev) => (prev === "front" ? "back" : "front"))}>
          {cameraMode === "front" ? "Back" : "Front"}
        </Button>
      </div>

      <LoadingOverlay visible={mutation.isPending} />
    </div>
  );
}
