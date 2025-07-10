"use client";
import {sendMessageToDevice} from '@/hooks/use-device-api';
import ky from 'ky';
import {useSearchParams} from 'next/navigation';
import {useEffect} from 'react';

// https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
export default function Page() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(()=> {
    if (!code) {
      throw new Error("No code provided");
    }

    const getSessionAndSaveDevice = async () => {
      const json = await ky.post<{ session : Session }>("/api/auth/token/kakao", {
        headers: { "X-CODE": code }
      }).json();

      console.log("json", json);

      await sendMessageToDevice({
        type: "updateDeviceSession",
        payload: { session: json.session }
      }) 
    }

    getSessionAndSaveDevice();
  }, [code])

  return (
    <div>
      카카오 로그인중 입니다.
    </div>
  )
}