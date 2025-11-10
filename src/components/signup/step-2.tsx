import { useWCW000002SSQ01 } from "@/hooks/tms/use-auth";
import { useCamera } from "@/hooks/use-camera";
import { nativeAlert } from "@/hooks/use-device-api";
import { TOCR, TScannedResult } from "@/libraries/auth/auth.dto";
import { ActionIcon, Box, Button, Select } from "@mantine/core";
import { useState } from "react";
import css from "./step-2.module.scss";
import IdcardFrame from "../common/camera-frame";
import clsx from "clsx";
import { Camera as IconCamera } from "lucide-react";
import Camera from "../camera";

export default function Step2({
  onClickNext,
  onClickPrev,
}: {
  onClickPrev: () => void;
  onClickNext: (args: TScannedResult) => void;
}) {
  const [type, setType] = useState<TOCR>("idcard");
  const camera = useCamera();

  const WCW000002SSQ01 = useWCW000002SSQ01();

  const onClickCapture = async () => {
    try {
      if (WCW000002SSQ01.isPending) return;

      const image = await camera.capture();
      if (!image) throw new Error("이미지 캡쳐 실패");

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

      WCW000002SSQ01.mutate(
        { image, brkrId: "", tp, session: null },
        {
          onSuccess: onClickNext,
        },
      );
    } catch (error) {
      console.log("error", error);
      nativeAlert("이미지 캡쳐 실패");
    }
  };

  return (
    <div>
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
          type="button"
          w="5rem"
          h="5rem"
          onClick={onClickCapture}
          radius={9999}
          loading={WCW000002SSQ01.isPending}
        >
          <IconCamera width="2.5rem" height="2.5rem" />
        </ActionIcon>
      </div>

      {/* <Box mt={28} style={{ textAlign: "right" }}>
        <Button variant="outline" type="button" onClick={onClickPrev} mr={12}>
          이전
        </Button>
      </Box> */}
    </div>
  );
}
