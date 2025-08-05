import BackHeader from "@/components/common/header/BackHeader";
import { useRouter } from "next/router";
import { useCamera } from "@/hooks/useCamera";
import { useMutation } from "@tanstack/react-query";
import Capture from "@/components/ocr/Capture";
import { useState } from "react";
import Result from "@/components/ocr/Result";
import { Anchor, Breadcrumbs, LoadingOverlay } from "@mantine/core";
import { OCRResponseData } from "@/types/api/clova";
import Link from "next/link";
import { v1 as uuid } from "uuid";

type Props = {
  isMobile: boolean;
  type: "idCard" | "passport";
};

export default function ClovaHome({ isMobile, type }: Props) {
  const router = useRouter();
  const camera = useCamera();
  const [data, setData] = useState<OCRResponseData | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const blob = await camera.capture();
      if (!blob) throw new Error("이미지 캡쳐 실패");

      const formData = new FormData();
      formData.append("image", blob, "capture.png");
      formData.append("type", type);
      formData.append("requestId", uuid());
      formData.append("name", uuid());

      const response = await fetch("/api/clova", {
        method: "POST",
        body: formData, // FormData 그대로 전송
      });

      if (!response.ok) {
        throw new Error("이미지 업로드 실패");
      }

      const json: { data: OCRResponseData } = await response.json();
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
