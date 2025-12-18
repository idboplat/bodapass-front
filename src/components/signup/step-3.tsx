import { useWCW000002SSQ01 } from "@/hooks/tms/use-auth";
import { useCamera } from "@/hooks/use-camera";
import { nativeAlert } from "@/hooks/use-device-api";
import { TScannedResult } from "@/libraries/auth/auth.dto";
import { ActionIcon, Select } from "@mantine/core";
import css from "./step-3.module.scss";
import CameraFrame from "../common/camera-frame";
import clsx from "clsx";
import { Camera as IconCamera } from "lucide-react";
import Camera from "../camera";
import { TIdTp } from "@/types/common";
import { useRouter } from "next/router";

export default function Step3({
  idTp,
  locale,
  onClickNext,
  onClickPrev,
}: {
  idTp: TIdTp;
  locale: string;
  onClickPrev: () => void;
  onClickNext: (args: TScannedResult) => void;
}) {
  const router = useRouter();
  const camera = useCamera();

  const WCW000002SSQ01 = useWCW000002SSQ01();

  const onClickCapture = async () => {
    try {
      if (WCW000002SSQ01.isPending) return;

      const image = await camera.capture();
      if (!image) throw new Error("이미지 캡쳐 실패");

      WCW000002SSQ01.mutate(
        { image, brkrId: "", idTp, session: null },
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
            { value: "1", label: "주민등록증" },
            { value: "2", label: "운전면허증" },
            { value: "3", label: "외국인등록증" },
          ]}
          value={idTp}
          onChange={(value) => {
            if (!value) return;
            const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
            searchParams.set("idTp", value as TIdTp);
            router.replace(`/${locale}/signup/?${searchParams.toString()}`);
          }}
        />
      </div>

      <div className={clsx(css.cameraBox)}>
        <Camera videoRef={camera.videoRef} canvasRef={camera.canvasRef} isMobile={true} />
        <CameraFrame />
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
