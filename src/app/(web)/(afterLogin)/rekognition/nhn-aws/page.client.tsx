"use client";
import BackHeader from "@/components/common/header/BackHeader";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCamera } from "@/hooks/useCamera";
import Result from "@/components/ocr/Result";
import Capture from "@/components/ocr/Capture";
import { LoadingOverlay } from "@mantine/core";
import { TNHNAntiSpoofingReturn } from "@/types/api/nhn";
import ky from "ky";
import { SearchFacesCommandOutput } from "@aws-sdk/client-rekognition";
import { GROUP_ID } from "@/constants";

export default function Client({ isMobile }: { isMobile: boolean }) {
  const router = useRouter();
  const camera = useCamera();
  const [data, setData] = useState<SearchFacesCommandOutput | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const blob = await camera.capture();
      if (!blob) throw new Error("이미지 캡쳐 실패");

      const formData = new FormData();
      formData.append("image", blob, "capture.png");

      const json = await ky
        .post<TNHNAntiSpoofingReturn>(`/api/nhn/anti-spoofing`, {
          body: formData, // FormData 그대로 전송
        })
        .json();

      console.log("json", json);

      if (json.data.faceDetailCount === 0) {
        throw new Error("얼굴이 인식되지 않았습니다.");
      }

      const json2 = await ky
        .post<{
          message: string;
          data: SearchFacesCommandOutput;
        }>(`/api/aws/collections/${GROUP_ID}/faces/search_by_image`, {
          body: formData,
        })
        .json();

      console.log("json2", json2);

      return json2.data;
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
      <BackHeader title="NHN + AWS 인증" onClickBack={onClickBack} />
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
