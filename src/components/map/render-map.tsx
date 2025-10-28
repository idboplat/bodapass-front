import { getDistanceFromLatLonInMeter, useUserLocation } from "@/hooks/use-user-location";
import { Button, LoadingOverlay } from "@mantine/core";
import { useMemo, useState } from "react";
import { Circle, Map, MapMarker, useKakaoLoader, useMap } from "react-kakao-maps-sdk";
import css from "./render-map.module.scss";
interface RenderMapProps {
  lat: number;
  lng: number;
  siteNm: string;
  siteTelNo: string;
}

interface MoveToUserLocationButtonProps {
  userLocation: { lat: number; lng: number } | null;
}

interface MoveToSiteLocationButtonProps {
  lat: number;
  lng: number;
  siteNm: string;
}

function MoveToUserLocationButton({ userLocation }: MoveToUserLocationButtonProps) {
  const map = useMap();

  const handleMoveToUserLocation = () => {
    if (map && userLocation) {
      map.setCenter(new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng));
    }
  };

  return (
    <button className={css.button} onClick={handleMoveToUserLocation} disabled={!userLocation}>
      내 위치로 이동
    </button>
  );
}

function MoveToSiteLocationButton({ lat, lng, siteNm }: MoveToSiteLocationButtonProps) {
  const map = useMap();

  const handleMoveToSiteLocation = () => {
    if (map) {
      map.setCenter(new window.kakao.maps.LatLng(lat, lng));
    }
  };

  return (
    <button className={css.button} onClick={handleMoveToSiteLocation}>
      현장으로 이동
    </button>
  );
}

// https://findlatlng.org/
// https://generalcoder.tistory.com/4
// http://localhost:3000/demo/map/dynamic?lng=127.04329080111161&lat=37.54910909586898
export default function RenderMap({ lat, lng, siteNm, siteTelNo }: RenderMapProps) {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
  });

  const { isLoading, userLocation, errorCode, refresh } = useUserLocation();

  const [points] = useState<
    {
      lat: number;
      lng: number;
    }[]
  >([
    { lat, lng },
    { lat: userLocation?.lat || 0, lng: userLocation?.lng || 0 },
  ]);

  console.log("userLocation", userLocation);
  console.log("errorCode", errorCode);
  console.log("isLoading", isLoading);

  const distance = useMemo(() => {
    if (!userLocation) return 0;
    return getDistanceFromLatLonInMeter(userLocation, { lat, lng });
  }, [userLocation, lat, lng]);

  return (
    <div className={css.container}>
      <div className={css.infoSection}>
        <div className={css.distance}>거리: {distance}m</div>
        <div className={css.coordinates}>
          <div>위도: {lat}</div>
          <div>경도: {lng}</div>
        </div>
        <div className={css.siteName}>현장명: {siteNm}</div>
      </div>
      {errorCode ? (
        <div className={css.errorContainer}>
          <div className={css.errorText}>{errorCode}</div>
          <div className={css.errorText}>위치 정보를 가져오는데 실패했습니다.</div>
          <button className={css.retryButton} onClick={refresh}>
            다시 시도
          </button>
        </div>
      ) : (
        <>
          <div className={css.mapContainer}>
            <Map center={{ lat, lng }} style={{ width: "100%", height: "360px" }}>
              <MapMarker position={{ lat, lng }}>
                <div style={{ color: "#000", textAlign: "center" }}>{siteNm}</div>
                {siteTelNo && <a href={`tel:${siteTelNo}`}>{siteTelNo}</a>}
              </MapMarker>
              {userLocation && (
                <MapMarker position={{ lat: userLocation.lat, lng: userLocation.lng }}>
                  <div style={{ color: "#000", textAlign: "center" }}>내 위치</div>
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
              <div className={css.buttonContainer}>
                <MoveToUserLocationButton userLocation={userLocation} />
                <MoveToSiteLocationButton lat={lat} lng={lng} siteNm={siteNm} />
              </div>
            </Map>
          </div>
        </>
      )}
      <LoadingOverlay visible={isLoading} />
    </div>
  );
}
