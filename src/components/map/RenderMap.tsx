"use client";

import { Circle, Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

interface RenderMapProps {
  lat: number;
  lng: number;
}

export default function RenderMap({ lat, lng }: RenderMapProps) {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
  });

  return (
    <div>
      <Map center={{ lat, lng }} style={{ width: "100%", height: "360px" }}>
        <MapMarker position={{ lat, lng }}>
          <div style={{ color: "#000" }}>로건현장</div>
          <a href="tel:010-0000-0000">전화하기</a>
        </MapMarker>
        <Circle
          center={{ lat, lng }}
          radius={100}
          strokeWeight={5} // 선의 두께입니다
          strokeColor={"#75B8FA"} // 선의 색깔입니다
          strokeOpacity={2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle={"dash"} // 선의 스타일 입니다
          fillColor={"#CFE7FF"} // 채우기 색깔입니다
          fillOpacity={0.7} // 채우기 불투명도 입니다
        />
      </Map>
    </div>
  );
}
