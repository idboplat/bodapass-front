"use client";
import BackHeader from "@/components/common/header/BackHeader";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCamera } from "@/hooks/useCamera";
import Result from "@/components/ocr/Result";
import Capture from "@/components/ocr/Capture";
import { Button, LoadingOverlay } from "@mantine/core";
import { TNHNAntiSpoofingReturn } from "@/types/api/nhn";
import ky from "ky";
import { TUsebFaceMatchReturn } from "@/types/api/useb";
import Image from "next/image";

export default function Client({ isMobile }: { isMobile: boolean }) {
  const router = useRouter();
  const camera = useCamera();
  const [data, setData] = useState<TUsebFaceMatchReturn | null>(null);
  const [images, setImages] = useState<Blob[]>([]);

  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("image1", images[0], "capture1.png");
      formData.append("image2", images[1], "capture2.png");
      formData.append("image3", images[2], "capture3.png");
      formData.append("image4", images[3], "capture4.png");

      const json = await ky
        .post<TNHNAntiSpoofingReturn>(`/api/useb/liveness`, {
          body: formData, // FormData 그대로 전송
        })
        .json();

      console.log("json", json);

      if (json.data.faceDetailCount === 0) {
        throw new Error("얼굴이 인식되지 않았습니다.");
      }

      const formData2 = new FormData();
      formData2.append("image", images[0], "capture.png");

      const json2 = await ky
        .post<TUsebFaceMatchReturn>(`/api/useb/face`, {
          body: formData2,
        })
        .json();

      console.log("json2", json2);

      return json2;
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

  const onClickCapture = async () => {
    const blob = await camera.capture();
    if (!blob) throw new Error("이미지 캡쳐 실패");
    setImages((prev) => [...prev, blob]);
  };

  const onClickSend = () => {
    if (mutation.isPending) return;
    if (images.length < 4) {
      alert(`이미지 부족 ${images.length}`);
      return;
    }

    mutation.mutate();
  };

  const onClickReset = () => {
    setImages(() => []);
  };

  return (
    <>
      <BackHeader title="useB. 단독인증" onClickBack={onClickBack} />
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
      <div>
        {images.map((image, index) => (
          <Image
            key={index}
            // 메모리 해제 로직 필요
            src={URL.createObjectURL(image)}
            alt={`capture${index + 1}`}
            width={320}
            height={240}
            unoptimized
          />
        ))}
      </div>
      <Button onClick={onClickSend}>Send</Button>
      <Button onClick={onClickReset}>Reset</Button>
      <LoadingOverlay visible={mutation.isPending} />
    </>
  );
}
