import {useEffect, useState} from 'react';

export type TUserLocation = {
  lat: number;
  lng: number;
}

type TGeolocationErrorCode = ReturnType<typeof defineErrorCode> | "NOT_SUPPORTED";


const defineErrorCode = (error: GeolocationPositionError) => {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      return 'PERMISSION_DENIED';
    case error.POSITION_UNAVAILABLE:
      return 'POSITION_UNAVAILABLE';
    case error.TIMEOUT:
      return 'TIMEOUT';
    default:
      return 'UNKNOWN_ERROR';
  }
}

export const getDistanceFromLatLonInMeter = (localtion1: TUserLocation, localtion2: TUserLocation) => {
  function deg2rad(deg: number) {
      return deg * (Math.PI/180)
  }
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(localtion2.lat - localtion1.lat);  // deg2rad below
  const dLon = deg2rad(localtion2.lng - localtion1.lng);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(localtion1.lat)) * Math.cos(deg2rad(localtion2.lat)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in km
  return d * 1000; // km -> m
}

export const useUserLocation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<TUserLocation | null>(null);
  const [errorCode, setErrorCode] = useState<TGeolocationErrorCode | null>(null);
  const [nonce, setNonce] = useState(Date.now());

  const refresh = () => {
    setNonce(() => Date.now());
  }

  useEffect(() => {
    setIsLoading(() => true);
    setErrorCode(() => null);

    if(!navigator.geolocation){
      setErrorCode(() => "NOT_SUPPORTED");
      setIsLoading(() => false);
      return;
    }

    const id = navigator.geolocation.watchPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })

      setIsLoading(() => false);
    }, (error) => {
      setErrorCode(() => defineErrorCode(error));
      setIsLoading(() => false);
    }, {
      enableHighAccuracy: true,
      maximumAge: 1000 * 5, // 5초 이내의 위치 정보 사용
    })

    return () => {
      navigator.geolocation.clearWatch(id);
    }
  }, [nonce])


  return {
    isLoading,
    userLocation,
    errorCode,
    refresh,
  }
}