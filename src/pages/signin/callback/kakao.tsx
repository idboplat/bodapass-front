import { sendMessageToDevice } from "@/hooks/use-device-api";
import ky from "ky";
import { useRouter } from "next/router";
import { useEffect } from "react";

// https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
// 번역안함.
export default function Page() {
  const router = useRouter();
  const searchParams = router.query;
  const code = searchParams.code?.toString();

  useEffect(() => {
    if (!code) {
      throw new Error("No code provided");
    }

    const getSessionAndSaveDevice = async () => {
      const json = await ky
        .post<{ session: Session }>("/api/auth/token/kakao", {
          headers: { "X-CODE": code },
        })
        .json();

      console.log("json", json);

      await sendMessageToDevice({
        type: "updateDeviceSession",
        payload: { session: json.session },
      });
    };

    getSessionAndSaveDevice();
  }, [code]);

  return <div>Loading...</div>;
}
