import { getDistanceFromLatLonInMeter, TUserLocation } from "@/hooks/use-user-location";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AbstractOverlay,
  Circle,
  CustomOverlayMap,
  Map,
  MapMarker,
  useKakaoLoader,
  useMap,
} from "react-kakao-maps-sdk";
import css from "./render-map.module.scss";
interface RenderMapProps {
  lat: number;
  lng: number;
  siteNm: string;
  siteTelNo: string;
  /**
   * 현장과의 거리 반경 (미터 단위)
   */
  rad: string;
  deviceLocation: TUserLocation;
}

// https://findlatlng.org/
// https://generalcoder.tistory.com/4
// http://localhost:3000/demo/map/dynamic?lng=127.04329080111161&lat=37.54910909586898
export default function RenderMap({
  lat,
  lng,
  siteNm,
  siteTelNo,
  rad,
  deviceLocation,
}: RenderMapProps) {
  // 좌표 유효성 검사
  const isValidCoordinate = lat && lng && !isNaN(lat) && !isNaN(lng);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
  });

  const distance = useMemo(() => {
    if (!deviceLocation) return 0;
    return getDistanceFromLatLonInMeter(deviceLocation, { lat, lng });
  }, [deviceLocation, lat, lng]);

  // return (
  //   <div className={css.container}>
  //     <div className={css.errorContainer}>
  //       <div className={css.errorText}>ERROR</div>
  //       <div className={css.errorText}>위치 정보를 가져오는데 실패했습니다.</div>
  //       <button className={css.retryButton} onClick={() => {}}>
  //         다시 시도
  //       </button>
  //     </div>
  //   </div>
  // );

  return (
    <div className={css.container}>
      <Map
        onCreate={(map) => {
          setMap(() => map);
        }}
        key={`${lat}-${lng}`}
        center={{ lat, lng }}
        level={3}
        style={{ width: "100%", height: "100%" }}
      >
        <MapMarker
          position={{ lat: deviceLocation.lat, lng: deviceLocation.lng }}
          image={{ src: "/assets/svg/user-marker.svg", size: { width: 32, height: 32 } }}
        />

        {isValidCoordinate && (
          <MapMarker
            position={{ lat, lng }}
            image={{ src: "/assets/svg/site-marker.svg", size: { width: 32, height: 32 } }}
          />
        )}

        {/* <CustomOverlayMap position={{ lat, lng }}>
            <div
              style={{
                padding: "10px",
                backgroundColor: "#fff",
                color: "#000",
                transform: "translateY(-120%)",
                border: "1px solid #ccc",
                wordBreak: "keep-all",
              }}
            >
              <div className={css.siteNm}>{siteNm}</div>
              {siteTelNo && (
                <a className={css.siteTelNo} href={`tel:${siteTelNo}`}>
                  ☎️ {siteTelNo}
                </a>
              )}
            </div>
          </CustomOverlayMap> */}

        {isValidCoordinate && rad && Number(rad) > 0 && (
          <Circle
            center={{ lat, lng }}
            radius={Number(rad)}
            //
            strokeStyle={"dash"} // 선의 스타일 입니다
            strokeWeight={1} // 선의 두께입니다
            strokeColor={"#EA4335"} // 선의 색깔입니다
            strokeOpacity={0} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            //
            fillColor={"#EA4335"} // 채우기 색깔입니다
            fillOpacity={0.15} // 채우기 불투명도 입니다
          />
        )}
      </Map>

      <div className={css.infoSection}>
        <div className={css.infoSectionInner}>
          <div className={css.siteName}>현장명: {siteNm}</div>
          <div className={css.distance}>현장과의 거리: {distance.toLocaleString()}m</div>
          <div className={css.buttonBox}>
            <MoveToUserLocationButton map={map} location={deviceLocation} />
            <div className={css.buttonSeparator} />
            <MoveToSiteLocationButton map={map} location={{ lat, lng }} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface MoveToUserLocationButtonProps {
  location: { lat: number; lng: number } | null;
  map: kakao.maps.Map | null;
}

interface MoveToSiteLocationButtonProps {
  location: { lat: number; lng: number } | null;
  map: kakao.maps.Map | null;
}

function MoveToUserLocationButton({ map, location }: MoveToUserLocationButtonProps) {
  const handleMoveToUserLocation = () => {
    if (map && location) {
      map.panTo(new window.kakao.maps.LatLng(location.lat, location.lng));
    }
  };

  return (
    <button className={css.button} onClick={handleMoveToUserLocation} disabled={!location}>
      내 위치로 이동
    </button>
  );
}

function MoveToSiteLocationButton({ map, location }: MoveToSiteLocationButtonProps) {
  const handleMoveToSiteLocation = () => {
    if (map && location) {
      map.panTo(new window.kakao.maps.LatLng(location.lat, location.lng));
    }
  };

  return (
    <button className={css.button} onClick={handleMoveToSiteLocation} disabled={!location}>
      현장으로 이동
    </button>
  );
}
