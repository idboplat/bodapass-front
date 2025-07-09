"use client";
import {sendMessageToDevice} from '@/hooks/use-device-api';
import { StaticMap } from "react-kakao-maps-sdk";

export default function RenderStaticMap() {

  const LAT = 33.450701;
  const LNG = 126.570667;
  
  return (
    <div>
      <h2>RenderStaticMap</h2>
      <StaticMap // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: LAT,
          lng: LNG,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "20rem",
        }}
        level={3} // 지도의 확대 레벨
        marker={{
          position: {
            lat: LAT,
            lng: LNG,
          },
          text: "로건현장",
        }}
        onClick={async (e) => {
          console.log("e === ", e);
          e.preventDefault();
          await sendMessageToDevice({
            type: "navigateMapScreen",
            payload: {
              lat: LAT,
              lng: LNG,
            }
          })
        }}
      />
    </div>
  );
}
