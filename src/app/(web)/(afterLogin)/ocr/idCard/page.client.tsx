"use client";
import BackHeader from "@/components/common/header/BackHeader";
import Camera from "@/components/Camera";
import { useRouter } from "next/navigation";
import css from "./../page.module.scss";
import Link from "next/link";
import { ActionIcon } from "@mantine/core";
import { IconBrandLoom } from "@tabler/icons-react";
import { useRef } from "react";

export default function Client() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const onClickBack = () => {
    router.back();
  };

  const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const capture = () => {
    const ctx = canvasRef.current.getContext("2d")!;

    clearCanvas(ctx);
    const { width, height } = videoRef.current.getBoundingClientRect();
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      const formData = new FormData();
      formData.append("image", blob, "capture.jpg");

      try {
        // 5) fetch로 POST 전송
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData, // FormData 그대로 전송
        });

        if (!response.ok) {
          throw new Error("이미지 업로드 실패");
        }

        const data = await response.json();
        console.log("서버 응답:", data);
      } catch (err) {
        console.error("업로드 에러:", err);
      } finally {
        clearCanvas(ctx);
      }
    });
  };

  return (
    <>
      <BackHeader title="신분증" onClickBack={onClickBack} />
      <div className={css.cameraBox}>
        <Camera videoRef={videoRef} canvasRef={canvasRef} />
        <div className={css.descBox}>
          <div className={css.desc}>
            <Link href="">
              <p className={css.help}>
                <u>화면이 보이지 않을때</u>
              </p>
            </Link>

            <p>신원정보가 명확히 보여야 합니다.</p>

            <p>신분증의 내 모서리가 모두 나와야 합니다.</p>

            <p>신분증이 가려지지 안항야 합니다.</p>
            <div className={css.shutterBox}>
              <ActionIcon variant="transparent" w="6rem" h="6rem" onClick={capture}>
                <IconBrandLoom width="5rem" height="5rem" />
              </ActionIcon>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
