import Capture from "@/components/capture";
import { Button, LoadingOverlay } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import css from "./index.module.scss";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { TUsebFaceCompareReturn, TUsebFaceMatchReturn } from "@/types/api/useb";
import { COMPARE_IMAGE_URL, PHOTO_COUNT } from "@/constants";

type TImageBlob = { image: Blob; score: number; url: string };

export default function Page() {
  const [images, setImages] = useState<TImageBlob[]>([]);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<TUsebFaceCompareReturn | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraMode, setCameraMode] = useState<"front" | "back">("front");

  const mutation = useMutation({
    mutationFn: async (images: TImageBlob[]) => {
      const mostImages = images.sort((a, b) => b.score - a.score);

      const formData = new FormData();
      formData.append("image", mostImages[0].image, "capture1.png");
      // formData.append("image1", mostImages[0].image, "capture1.png");
      // formData.append("image2", mostImages[1].image, "capture2.png");
      // formData.append("image3", mostImages[2].image, "capture3.png");
      // formData.append("image4", mostImages[3].image, "capture4.png");

      const json = await ky
        .post<TUsebFaceCompareReturn>(`/api/useb/liveness2`, {
          body: formData,
        })
        .json();

      console.log("json", json);

      return json;
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

    setImages((prev) => {
      prev.forEach((blob) => {
        URL.revokeObjectURL(blob.url);
      });

      return [];
    });
  };

  const set = (args: { image: Blob; score: number }) => {
    if (mutation.isPending) return;

    setImages((prev) => {
      const newBlobs = [...prev, { ...args, url: URL.createObjectURL(args.image) }];

      while (newBlobs.length > PHOTO_COUNT) {
        const removed = newBlobs.shift();
        if (removed) {
          URL.revokeObjectURL(removed.url);
        }
      }

      return newBlobs;
    });
  };

  useEffect(() => {
    if (data || error) return;

    if (images.length === PHOTO_COUNT) {
      mutation.mutate(images);
    }
  }, [images]);

  const onMessage = (message: string) => {
    setMessage(() => message);
  };

  return (
    <div className={"mobileLayout"}>
      <div className={css.captureBox}>
        {images.length < PHOTO_COUNT && (
          <Capture onFaceDetected={set} setMessage={onMessage} cameraMode={cameraMode} />
        )}
        {images.length >= PHOTO_COUNT && (
          <div>
            <p>모든 촬영이 종료되었습니다.</p>
          </div>
        )}
        {message !== "" && <p className={css.message}>{message}</p>}
      </div>

      <div>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={() => setCameraMode((prev) => (prev === "front" ? "back" : "front"))}>
          {cameraMode === "front" ? "Back" : "Front"}
        </Button>
      </div>

      <div>
        {images.map((blob, index) => (
          <Image
            key={index}
            src={blob.url}
            alt={`capture${index + 1}`}
            width={320}
            height={240}
            unoptimized
            style={{ border: "1px solid red" }}
          />
        ))}
      </div>
      {error && <div>Error: {error}</div>}

      {data && JSON.stringify(data, null, 2)}

      <LoadingOverlay visible={mutation.isPending} />
    </div>
  );
}
