import { TOCR, TScannedResult } from "./dto";
import { useState } from "react";
import IdcardCamera from "./id-card-camera";
import IdCardForm from "./id-card-form";
import { useSession } from "@/libraries/auth/use-session";
import { useCamera } from "@/hooks/use-camera";
import { useRouter } from "next/router";
import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import { useWCW000001SSP02, useWCW000002SSQ01 } from "@/hooks/tms/use-authorization";
import BackHeader from "../common/back-header";
import { useQueryClient } from "@tanstack/react-query";

export default function LeaderIdcardHome() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const locale = router.query.locale;
  const next = (router.query.next?.toString() || "") as "" | "true" | "webview";

  const [scannedResult, setScannedResult] = useState<TScannedResult | null>(null);
  const [type, setType] = useState<TOCR>("idcard");

  const camera = useCamera();
  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");

  const WCW000002SSQ01 = useWCW000002SSQ01();
  const WCW000001SSP02 = useWCW000001SSP02();

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

  const end = () => {
    if (!!window.ReactNativeWebView) {
      sendMessageToDevice({
        type: "authorizationEnd",
        payload: null,
      });
    } else {
      router.back();
    }
  };

  const onClickBack = () => {
    if (scannedResult) {
      setScannedResult(() => null);
    } else {
      end();
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
    zipCd: string;
    image: Blob;
  }) => {
    if (WCW000001SSP02.isPending) return;
    WCW000001SSP02.mutate(
      { ...arg, session },
      {
        onSuccess: async (data) => {
          if (next === "true") {
            router.replace(`/${locale}/authorization/leader/face?next=true`);
          } else if (next === "webview") {
            await queryClient.invalidateQueries({ queryKey: ["TCM200801SSQ01"] });
            router.back();
          } else {
            end();
          }
        },
        onError: (error) => {
          console.log("error", error);
        },
      },
    );
  };

  return (
    <div className={"mobileLayout"}>
      <BackHeader title="신분증" onClickBack={onClickBack} />

      {!!scannedResult ? (
        <IdCardForm
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
