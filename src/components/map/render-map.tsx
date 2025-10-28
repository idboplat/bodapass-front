import { getDistanceFromLatLonInMeter, useUserLocation } from "@/hooks/use-user-location";
import { Button, LoadingOverlay } from "@mantine/core";
import { useMemo } from "react";
import { Circle, Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

interface RenderMapProps {
  lat: number;
  lng: number;
  siteNm: string;
  siteTelNo: string;
}

// https://findlatlng.org/
// https://generalcoder.tistory.com/4
// http://localhost:3000/demo/map/dynamic?lng=127.04329080111161&lat=37.54910909586898
export default function RenderMap({ lat, lng, siteNm, siteTelNo }: RenderMapProps) {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
  });

  const { isLoading, userLocation, errorCode, refresh } = useUserLocation();

  console.log("userLocation", userLocation);
  console.log("errorCode", errorCode);
  console.log("isLoading", isLoading);

  const distance = useMemo(() => {
    if (!userLocation) return 0;
    return getDistanceFromLatLonInMeter(userLocation, { lat, lng });
  }, [userLocation, lat, lng]);

  return (
    <div style={{ position: "relative" }}>
      <div>
        <p>거리: {distance}m</p>
        <div>lat: {lat}</div>
        <div>lng: {lng}</div>
        <div>현장명: {siteNm}</div>
      </div>
      {errorCode ? (
        <div>
          <p>{errorCode}</p>
          <p>위치 정보를 가져오는데 실패했습니다.</p>
          <Button onClick={refresh}>다시 시도</Button>
        </div>
      ) : (
        <Map center={{ lat, lng }} style={{ width: "100%", height: "360px" }}>
          <MapMarker position={{ lat, lng }}>
            <div style={{ color: "#000", textAlign: "center" }}>{siteNm}</div>
            {siteTelNo && <a href={`tel:${siteTelNo}`}>{siteTelNo}</a>}
          </MapMarker>
          {userLocation && (
            <MapMarker position={{ lat: userLocation.lat, lng: userLocation.lng }}>
              <div style={{}}>내 위치</div>
            </MapMarker>
          )}
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
      )}
      <LoadingOverlay visible={isLoading} />
    </div>
  );
}
