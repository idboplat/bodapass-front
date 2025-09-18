import BackHeader from "@/components/common/back-header";
import { useRouter } from "next/router";
import { useCamera } from "@/hooks/use-camera";
import { useMutation } from "@tanstack/react-query";
import Capture from "@/components/ocr/Capture";
import { useState } from "react";
import Result from "@/components/ocr/Result";
import { Anchor, Breadcrumbs, LoadingOverlay, Select } from "@mantine/core";
import Link from "next/link";
import { TOCRReturn } from "@/types/api/useb";
import ky from "ky";

type Props = {
  isMobile: boolean;
};

type TOCR = "idcard" | "driver" | "passport" | "passport-overseas" | "alien" | "alien-back";

export default function UsdBHome({ isMobile }: Props) {
  const router = useRouter();
  const camera = useCamera();
  const [data, setData] = useState<TOCRReturn | null>(null);
  const [type, setType] = useState<TOCR>("idcard");

  const mutation = useMutation({
    mutationFn: async () => {
      const blob = await camera.capture();
      if (!blob) throw new Error("이미지 캡쳐 실패");

      // const formData = new FormData();
      // formData.append("image", blob, "capture.png");

      const arrayBuffer = await blob.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");

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

      const json = await ky
        .post<{ data: TOCRReturn }>("/middleware/apiUseb/ocr", {
          json: {
            type: endpoint,
            ssa_mode: true,
            image_base64: base64,
          },
        })
        .json();

      return json.data;
    },
    onSuccess: (data) => setData(() => data),
  });

  const resetData = () => {
    setData(() => null);
  };

  const onClickBack = () => {
    if (data) {
      resetData();
      return;
    }

    router.back();
  };

  const onClickCapture = () => {
    if (mutation.isPending) return;
    mutation.mutate();
  };

  return (
    <>
      <BackHeader title="신분증" onClickBack={onClickBack} />
      <Breadcrumbs separator="→" separatorMargin="md" p="1rem">
        <Anchor component={Link} href="/ocr">
          OCR
        </Anchor>
      </Breadcrumbs>
      <div>
        <Select
          data={[
            { value: "idcard", label: "주민등록증" },
            { value: "driver", label: "운전면허증" },
            { value: "passport", label: "국내여권" },
            { value: "passport-overseas", label: "해외여권" },
            { value: "alien", label: "외국인등록증" },
            { value: "alien-back", label: "외국인등록증 뒷면" },
          ]}
          value={type}
          onChange={(value) => setType(value as TOCR)}
        />
      </div>
      {data ? (
        <Result data={data} />
      ) : (
        <Capture
          videoRef={camera.videoRef}
          canvasRef={camera.canvasRef}
          onClickCapture={onClickCapture}
          isMobile={isMobile}
        />
      )}
      <LoadingOverlay visible={mutation.isPending} />
    </>
  );
}
