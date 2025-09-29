import { useCamera } from "@/hooks/use-camera";
import Camera from "../camera";
import BackHeader from "../common/back-header";
import { useRouter } from "next/router";
import { ActionIcon, Select } from "@mantine/core";
import { useState } from "react";
import { TOCR, TScannedResult } from "./dto";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import css from "./id-card-camera.module.scss";
import { Camera as IconCamera } from "lucide-react";
import IdcardFrame from "./camera-frame";
import { sendMessageToDevice } from "@/hooks/use-device-api";

interface Props {
  brkrId: string;
  scanned: (result: TScannedResult) => void;
}

export default function IdcardCamera({ scanned, brkrId }: Props) {
  const router = useRouter();
  const camera = useCamera();

  const [type, setType] = useState<TOCR>("idcard");

  const mutation = useMutation({
    mutationFn: async () => {
      const blob = await camera.capture();
      if (!blob) throw new Error("이미지 캡쳐 실패");

      // const formData = new FormData();
      // formData.append("image", blob, "capture.png");

      // const arrayBuffer = await blob.arrayBuffer();
      // const base64 = Buffer.from(arrayBuffer).toString("base64");

      let endpoint: string;

      switch (type) {
        case "idcard":
        case "driver":
          endpoint = "idcard-driver";
          break;
        case "passport":
          endpoint = "passport";
          break;
        case "passport-overseas":
          endpoint = "passport-overseas";
          break;
        case "alien":
          endpoint = "alien";
          break;
        case "alien-back":
          endpoint = "alien-back";
          break;
      }

      const formData = new FormData();
      formData.append("F01", blob);

      // const json = await ky
      //   .post<{ data: TOCRReturn }>("/middleware/apiUseb/ocr", {
      //     json: {
      //       type: endpoint,
      //       ssa_mode: true,
      //       image_base64: base64,
      //     },
      //   })
      //   .json();

      // return json.data;
      return {
        id1: "951228",
        id2: "1000000",
        name: "홍길동",
        addr: "서울시 강남구 역삼동",
        image: blob,
      };
    },
    onSuccess: (data) => scanned(data),
  });

  const onClickBack = () =>
    sendMessageToDevice({
      type: "authorizationEnd",
      payload: null,
    });

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
        <ActionIcon variant="touch" w="5rem" h="5rem" onClick={onClickCapture} radius={9999}>
          <IconCamera width="2.5rem" height="2.5rem" />
        </ActionIcon>
      </div>
    </>
  );
}
