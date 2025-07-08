"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Kakao() {
  const { kakao } = window;

  useEffect(() => {
    kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new kakao.maps.Map(container, options);
      const markerPosition = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
    });
  }, []);
  return <div id="map" style={{ width: "100%", height: "350px", marginTop: "10px" }}></div>;
}
