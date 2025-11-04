// import Capture from "@/components/capture";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import css from "./index.module.scss";
import { useEffect, useState } from "react";
import { callTms, FillerRspnData } from "@/libraries/call-tms";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { Authorized } from "@/libraries/auth/authorized";
import { useSession } from "@/libraries/auth/use-session";
import { nativeAlert } from "@/hooks/use-device-api";

type TImageBlob = { image: Blob; score: number; url: string };

export default function Page() {
  const router = useRouter();

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  return (
    <Authorized>
      <Home />
    </Authorized>
  );
}

function Home() {
  const [cameraMode, setCameraMode] = useState<"front" | "back">("front");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<TImageBlob[]>([]);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  if (!session) throw new Error("FCM401");

  const mutation = useMutation({
    mutationFn: async ({ userId, blob }: { userId: string; blob: Blob }) => {
      const base64 = await blob
        .arrayBuffer()
        .then((buffer) => Buffer.from(buffer).toString("base64"));

      const json2 = await callTms<FillerRspnData>({
        svcId: "TCW000001SSP01",
        session: null,
        locale: "ko",
        data: [userId, base64],
      });

      console.log("TCW000001SSP01", json2);

      const data = json2.svcRspnData?.[0];

      if (!data) {
        throw new Error("FCM999");
      }

      return data;
    },
    onSuccess: (data) => {
      setData(() => data);
      nativeAlert("이미지 업로드 성공");
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

      while (newBlobs.length > 1) {
        const removed = newBlobs.shift();
        if (removed) {
          URL.revokeObjectURL(removed.url);
        }
      }

      return newBlobs;
    });
  };

  const onMessage = (message: string) => {
    setMessage(() => message);
  };

  useEffect(() => {
    if (data || error) return;

    if (images.length === 1) {
      const mostImages = images.sort((a, b) => b.score - a.score);

      mutation.mutate({
        userId: session.userId,
        blob: mostImages[0].image,
      });
    }
  }, [images, session.userId]);

  return (
    <div className={"mobileLayout"}>
      <div className={css.captureBox}>
        {/* <Capture onFaceDetected={set} setMessage={onMessage} cameraMode={cameraMode} /> */}
      </div>
    </div>
  );
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
