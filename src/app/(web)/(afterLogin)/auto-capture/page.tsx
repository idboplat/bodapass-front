"use client";

import AutoCapture from "@/components/auto-capture";
import { Button } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [images, setImages] = useState<string[]>([]);

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

      while (prev.length >= 4) {
        URL.revokeObjectURL(prev.shift()!);
      }

      return newImages;
    });
  };

  return (
    <>
      <AutoCapture onFaceDetected={set} />
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
      <div>
        <Button onClick={reset}>Reset</Button>
      </div>
    </>
  );
}
