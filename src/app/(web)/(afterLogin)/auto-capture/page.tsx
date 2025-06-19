"use client";

import AutoCapture from "@/components/auto-capture";
import { Button } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import css from "./page.module.scss";

export default function Page() {
  const [images, setImages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const reset = () => {
    setImages((prev) => {
      prev.forEach((image) => {
        URL.revokeObjectURL(image);
      });

      return [];
    });
  };

  const set = (blob: Blob) => {
    setImages((prev) => {
      const newImages = [...prev, URL.createObjectURL(blob)];

      // 4장을 초과하는 경우 가장 오래된 이미지부터 제거
      while (newImages.length > 4) {
        const removedImage = newImages.shift();
        if (removedImage) URL.revokeObjectURL(removedImage);
      }

      return newImages;
    });
  };

  const onMessage = (message: string) => {
    setMessage(() => message);
  };

  return (
    <>
      <div className={css.captureBox}>
        <AutoCapture onFaceDetected={set} setMessage={onMessage} />
        {message !== "" && <p className={css.message}>{message}</p>}
      </div>
      <div>
        <Button onClick={reset}>Reset</Button>
      </div>
      <div>
        {images.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`capture${index + 1}`}
            width={320}
            height={240}
            unoptimized
            style={{ border: "1px solid red" }}
          />
        ))}
      </div>
    </>
  );
}
