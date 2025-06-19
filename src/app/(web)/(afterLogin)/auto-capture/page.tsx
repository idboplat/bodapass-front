"use client";

import AutoCapture from "@/components/auto-capture";
import { Button, LoadingOverlay } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import css from "./page.module.scss";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { SearchFacesCommandOutput } from "@aws-sdk/client-rekognition";
import { GROUP_ID } from "@/constants";

export default function Page() {
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<SearchFacesCommandOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (images: Blob[]) => {
      const formData = new FormData();
      formData.append("image", images[0], "capture1.png");
      const json = await ky
        .post<{
          message: string;
          data: SearchFacesCommandOutput;
        }>(`/api/aws/collections/${GROUP_ID}/faces/search_by_image`, {
          body: formData,
        })
        .json();

      console.log("json", json);

      return json.data;
    },
    onSuccess: (data) => {
      setData(() => data);
    },
    onError: (error) => {
      setError(() => error.message);
    },
  });

  const reset = () => {
    setError(null);
    setData(null);

    setBlobs(() => []);
    setImages((prev) => {
      prev.forEach((image) => {
        URL.revokeObjectURL(image);
      });

      return [];
    });
  };

  const set = (blob: Blob) => {
    if (mutation.isPending) return;

    setBlobs((prev) => {
      const newBlobs = [...prev, blob];

      while (newBlobs.length > 4) {
        newBlobs.shift();
      }

      return newBlobs;
    });

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

  useEffect(() => {
    if (data || error) return;

    if (blobs.length === 4) {
      mutation.mutate(blobs);
    }
  }, [blobs]);

  const onMessage = (message: string) => {
    setMessage(() => message);
  };

  return (
    <>
      <div className={css.captureBox}>
        {images.length < 4 && <AutoCapture onFaceDetected={set} setMessage={onMessage} />}
        {images.length >= 4 && (
          <div>
            <p>모든 촬영이 종료되었습니다.</p>
          </div>
        )}
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
      {error && <div>Error: {error}</div>}

      {data &&
        data.FaceMatches?.map((face, index) => (
          <div key={`face_${index}`}>
            <div>Similarity: {face.Similarity}</div>
            <div>Confidence: {face.Face?.Confidence}</div>
            <div>FaceId: {face.Face?.FaceId}</div>
            <div>ExternalImageId: {face.Face?.ExternalImageId}</div>
            <div>ImageId: {face.Face?.ImageId}</div>
            <div>IndexFacesModelVersion: {face.Face?.IndexFacesModelVersion}</div>
          </div>
        ))}

      <LoadingOverlay visible={mutation.isPending} />
    </>
  );
}
