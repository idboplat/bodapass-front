"use client";
import BackHeader from "@/components/common/header/BackHeader";
import { useRouter } from "next/navigation";
import { useCamera } from "@/hooks/useCamera";
import { useMutation } from "@tanstack/react-query";
import Capture from "@/components/ocr/Capture";
import { useState } from "react";
import Result from "@/components/ocr/Result";
import { LoadingOverlay } from "@mantine/core";
import { OCRResponseData } from "@/types/api/clova";

type Props = {
  isMobile: boolean;
};

export default function Client({ isMobile }: Props) {
  const router = useRouter();
  const camera = useCamera();
  const [data, setData] = useState<OCRResponseData | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const blob = await camera.capture();
      if (!blob) throw new Error("이미지 캡쳐 실패");

      const formData = new FormData();
      formData.append("image", blob, "capture.jpg");

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
      <div></div>
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
