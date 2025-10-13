import { TOCR, TScannedResult } from "./dto";
import { useState } from "react";
import IdcardCamera from "./id-card-camera";
import IdCardForm from "./id-card-form";
import { useSession } from "@/libraries/auth/use-session";
import { useCamera } from "@/hooks/use-camera";
import { useRouter } from "next/router";
import { nativeAlert } from "@/hooks/use-device-api";
import { useWCW000001SSP02, useWCW000002SSQ01 } from "@/hooks/tms/use-authorization";

export default function LeaderIdcardHome() {
  const router = useRouter();
  const locale = router.query.locale;

  const [scannedResult, setScannedResult] = useState<TScannedResult | null>(null);
  const [type, setType] = useState<TOCR>("idcard");

  const camera = useCamera();
  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");

  const WCW000002SSQ01 = useWCW000002SSQ01();
  const WCW000001SSP02 = useWCW000001SSP02();

  const resetScanned = () => setScannedResult(null);
  const setScanned = (result: TScannedResult) => setScannedResult(() => result);

  const onClickCapture = async () => {
    try {
      if (WCW000002SSQ01.isPending) return;

      const image = await camera.capture();
      if (!image) throw new Error("이미지 캡쳐 실패");

      let tp: "1" | "2" | "3";

      switch (type) {
        case "idcard":
          tp = "1";
          break;
        case "driver":
          tp = "2";
          break;
        // case "passport":
        //   endpoint = "passport";
        //   break;
        // case "passport-overseas":
        //   endpoint = "passport-overseas";
        //   break;
        case "alien":
          tp = "3";
          break;
        // case "alien-back":
        //   endpoint = "alien-back";
        //   break;
        default:
          throw new Error("존재하지 않는 타입");
      }

      WCW000002SSQ01.mutate(
        { image, brkrId: "", tp, session },
        {
          onSuccess: (data) => setScanned(data),
        },
      );
    } catch (error) {
      console.log("error", error);
      nativeAlert("이미지 캡쳐 실패");
    }
  };

  const onSubmit = (arg: {
    id1: string;
    id2: string;
    name: string;
    addr: string;
    addrDtil: string;
    tel: string;
    type: "1" | "2" | "3";
    image: Blob;
  }) => {
    if (WCW000001SSP02.isPending) return;
    WCW000001SSP02.mutate(
      { ...arg, session },
      {
        onSuccess: (data) => {
          router.replace(`/${locale}/authorization/leader/face`);
        },
        onError: (error) => {
          console.log("error", error);
        },
      },
    );
  };

  return (
    <div className={"mobileLayout"}>
      {!!scannedResult ? (
        <IdCardForm
          resetScanned={resetScanned}
          scannedResult={scannedResult}
          onSubmit={onSubmit}
          isLoading={WCW000001SSP02.isPending}
        />
      ) : (
        <IdcardCamera
          camera={camera}
          type={type}
          isLoading={WCW000002SSQ01.isPending}
          setType={setType}
          onClickCapture={onClickCapture}
        />
      )}
    </div>
  );
}
