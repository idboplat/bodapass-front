import { getDistanceFromLatLonInMeter, useUserLocation } from "@/hooks/use-user-location";
import { Button, LoadingOverlay } from "@mantine/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { Circle, Map, MapMarker, useKakaoLoader, useMap } from "react-kakao-maps-sdk";
import css from "./render-map.module.scss";
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
  const { isLoading, userLocation, errorCode, refresh } = useUserLocation();

  // 좌표 유효성 검사
  const isValidCoordinate = lat && lng && !isNaN(lat) && !isNaN(lng);
  console.log("isValidCoordinate === ", isValidCoordinate);
  console.log("lat === ", lat);
  console.log("lng === ", lng);

  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
  });

  const distance = useMemo(() => {
    if (!userLocation) return 0;
    return getDistanceFromLatLonInMeter(userLocation, { lat, lng });
  }, [userLocation, lat, lng]);

  // 유효한 좌표가 없으면 기본값 사용
  // const mapCenter = { lat, lng };
  // const handleMapLoad = (map) => {
  //   if (isValidCoordinate) {
  //     const moveLatLon = new window.kakao.maps.LatLng(lat, lng);

  //     map.setCenter(moveLatLon);
  //     console.log("map", map);
  //     console.log("onLoad: 지도 중심점을 현장으로 이동", { lat, lng });
  //   }
  // };

  if (isLoading) return <LoadingOverlay visible={isLoading} />;

  return (
    <div className={css.container}>
      <div className={css.infoSection}>
        <div className={css.siteName}>현장명: {siteNm}</div>
        <div className={css.distance}>거리: {distance.toLocaleString()}m</div>
        <div className={css.coordinates}>
          <div>위도: {lat}</div>
          <div>경도: {lng}</div>
        </div>
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
            <Map
              key={`${lat}-${lng}`}
              center={{ lat, lng }}
              level={3}
              // onLoad={handleMapLoad}
              style={{ width: "100%", height: "360px" }}
            >
              {userLocation && (
                <MapMarker position={{ lat: userLocation.lat, lng: userLocation.lng }}>
                  <div className={css.siteNm}>현재 위치</div>
                </MapMarker>
              )}
              {isValidCoordinate && (
                <MapMarker position={{ lat, lng }}>
                  <div className={css.siteNm}>{siteNm}</div>
                  {siteTelNo && (
                    <a className={css.siteTelNo} href={`tel:${siteTelNo}`}>
                      ☎️ {siteTelNo}
                    </a>
                  )}
                </MapMarker>
              )}

              {isValidCoordinate && (
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
              )}
              <div className={css.buttonContainer}>
                <MoveToUserLocationButton userLocation={userLocation} />
                <MoveToSiteLocationButton lat={lat} lng={lng} />
              </div>
            </Map>
          </div>
        </>
      )}
      <LoadingOverlay visible={isLoading} />
    </div>
  );
}

interface MoveToUserLocationButtonProps {
  userLocation: { lat: number; lng: number } | null;
}

interface MoveToSiteLocationButtonProps {
  lat: number;
  lng: number;
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

function MoveToSiteLocationButton({ lat, lng }: MoveToSiteLocationButtonProps) {
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
