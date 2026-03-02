'use client';

import Script from "next/script";
import { useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { mapState, locationState } from "@/atoms/mapState";

declare global {
  interface Window {
    google: typeof google;
  }
}

export default function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState); // 이제 숫자로 들어옵니다.
  
  const initGoogleMap = () => {
    if (mapRef.current && window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { 
          lat: location.lat, 
          lng: location.lng, 
        },
        zoom: location.zoom,
        mapId: "DEMO_MAP_ID",
      });

      setMap(map);
    }
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_CLIENT}&libraries=maps,marker&v=beta`}
        onReady={initGoogleMap}
      />
      <div ref={mapRef} className="w-full h-screen" />
    </>
  );
}