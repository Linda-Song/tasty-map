'use client';

import Script from "next/script";
import { useRef } from "react";
import stores from "@/data/store_data.json";

declare global {
  interface Window {
    google: any;
  }
}

const DEFAULT_LAT = -33.8708464;
const DEFAULT_LNG = 151.20733;

export default function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  const initGoogleMap = () => {
    if (mapRef.current && window.google) {
      const mapOption = {
        // 시드니 CBD 좌표로 설정
        center: { lat: DEFAULT_LAT, lng: DEFAULT_LNG }, 
        zoom: 15, // 도심을 잘 볼 수 있는 확대 레벨
      };
      const map = new window.google.maps.Map(mapRef.current, mapOption);
      
      const bakeryList = stores.DATA;
      
      bakeryList?.forEach((store:any) => {
        var markerPosition = new window.google.maps.LatLng(
          store?.x_cnts,
          store?.y_dnts
        );

        var marker = new window.google.maps.Marker({
          position: markerPosition,
          map:map,
          title: store.title
        });
      }) ;
    }
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_CLIENT}&callback=console.debug&libraries=maps,marker&v=beta`}
        onReady={initGoogleMap}
      />
      <div ref={mapRef} className="w-full h-screen" />
    </>
  );
}

