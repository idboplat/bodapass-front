// import Capture from "@/components/capture";
import { Button, LoadingOverlay } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import css from "./index.module.scss";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { SearchFacesCommandOutput } from "@aws-sdk/client-rekognition";
import { GROUP_ID, PHOTO_COUNT } from "@/constants";
import { TNHNAntiSpoofingReturn } from "@/temps/type/nhn";

type TImageBlob = { image: Blob; score: number; url: string };

export default function Page() {
  const [images, setImages] = useState<TImageBlob[]>([]);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<SearchFacesCommandOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraMode, setCameraMode] = useState<"front" | "back">("front");

  const mutation = useMutation({
    mutationFn: async (images: TImageBlob[]) => {
      const mostImages = images.sort((a, b) => b.score - a.score);

      const formData = new FormData();
      formData.append("image", mostImages[0].image, "capture.png");

      const json = await ky
        .post<TNHNAntiSpoofingReturn>(`/api/nhn/anti-spoofing`, {
          body: formData,
        })
        .json();

      console.log("json", json);

      json.data.faceDetails.forEach((r) => {
        if (r.spoofing !== false) {
          throw new Error("스푸핑 감지");
        }
      });

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
        {/* {images.length < PHOTO_COUNT && (
          <Capture onFaceDetected={set} setMessage={onMessage} cameraMode={cameraMode} />
        )} */}
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
    </div>
  );
}
