"use client";
import BackHeader from "@/components/common/header/BackHeader";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCamera } from "@/hooks/useCamera";
import Result from "@/components/ocr/Result";
import Capture from "@/components/ocr/Capture";
import { LoadingOverlay } from "@mantine/core";
import { TNHNValidationReturn } from "@/types/api/nhn";
import ky from "ky";
import { GROUP_ID, FACE_ID } from "@/constants";

export default function Client({ isMobile }: { isMobile: boolean }) {
  const router = useRouter();
  const camera = useCamera();
  const [data, setData] = useState<TNHNValidationReturn | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const blob = await camera.capture();
      if (!blob) throw new Error("이미지 캡쳐 실패");

      const formData = new FormData();
      formData.append("image", blob, "capture.png");

      const json = await ky
        .post<TNHNValidationReturn>(`/api/nhn/${GROUP_ID}/faces/${FACE_ID}/validation`, {
          body: formData, // FormData 그대로 전송
        })
        .json();

      return json;
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
      <BackHeader title="NHN 단독인증" onClickBack={onClickBack} />
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
