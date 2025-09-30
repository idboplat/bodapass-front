import { useCamera } from "@/hooks/use-camera";
import Camera from "../camera";
import BackHeader from "../common/back-header";
import { useRouter } from "next/router";
import { ActionIcon, LoadingOverlay, Select } from "@mantine/core";
import { useState } from "react";
import { TOCR, TScannedResult } from "./dto";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import css from "./id-card-camera.module.scss";
import { Camera as IconCamera } from "lucide-react";
import IdcardFrame from "./camera-frame";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { callWas, StringRspnData } from "@/libraries/call-tms";
import { useSession } from "@/libraries/auth/use-session";

interface Props {
  brkrId: string;
  scanned: (result: TScannedResult) => void;
}

export default function IdcardCamera({ scanned, brkrId }: Props) {
  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");

  const router = useRouter();
  const camera = useCamera();

  const [type, setType] = useState<TOCR>("idcard");

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("mutationFn");
      const blob = await camera.capture();
      if (!blob) throw new Error("이미지 캡쳐 실패");

      let tp: "1" | "2" | "3";

      switch (type) {
        case "idcard":
          tp = "1";
          break;
        case "driver":
          tp = "2";
          break;
        // case "passport":
        //   endpoint = "passport";
        //   break;
        // case "passport-overseas":
        //   endpoint = "passport-overseas";
        //   break;
        case "alien":
          tp = "3";
          break;
        // case "alien-back":
        //   endpoint = "alien-back";
        //   break;
        default:
          throw new Error("존재하지 않는 타입");
      }

      const result = await callWas<StringRspnData<3>>({
        svcId: "WCW000002SSQ01", // 매칭되는 svcId 없음
        locale: "ko",
        session,
        data: [brkrId, tp],
        formData: [blob],
        apiPathName: "WCW000002SSQ01",
      });

      const data = result.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      // return json.data;
      return {
        name: data.F01,
        id1: data.F02,
        id2: data.F03,
        image: blob,
        type: tp,
      };
    },
    onSuccess: (data) => {
      scanned(data);
    },
  });

  const onClickBack = () => {
    if (window.ReactNativeWebView) {
      sendMessageToDevice({
        type: "authorizationEnd",
        payload: null,
      });
    }
  };

  const onClickCapture = () => {
    if (mutation.isPending) return;
    mutation.mutate();
  };

  return (
    <>
      <BackHeader title="신분증" onClickBack={onClickBack} />
      <div>반장 ID: {brkrId}</div>
      <div className={css.nav}>
        <Select
          data={[
            { value: "idcard", label: "주민등록증" },
            { value: "driver", label: "운전면허증" },
            { value: "alien", label: "외국인등록증" },
            // { value: "passport", label: "국내여권" },
            // { value: "passport-overseas", label: "해외여권" },
            // { value: "alien-back", label: "외국인등록증 뒷면" },
          ]}
          value={type}
          onChange={(value) => setType(value as TOCR)}
        />
      </div>

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
    </>
  );
}
