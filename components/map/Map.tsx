'use client';

import Script from "next/script";
import { Dispatch, SetStateAction, useRef } from "react";


declare global {
  interface Window {
    google: typeof google;
  }
}

const DEFAULT_LAT = -33.8708464;
const DEFAULT_LNG = 151.20733;
const DEFAULT_ZOOM = 15

interface MapProps {
  setMap: Dispatch <SetStateAction<google.maps.Map | null>>;
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export default function GoogleMap({ setMap, lat, lng, zoom }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const initGoogleMap = () => {
    if (mapRef.current && window.google) {
      const centerLat = lat ? parseFloat(lat) : DEFAULT_LAT;
      const centerLng = lng ? parseFloat(lng) : DEFAULT_LNG;

      const map = new window.google.maps.Map(mapRef.current,{
        // Sydney CBD 
        center: { 
          lat: centerLat, 
          lng: centerLng }, 
        zoom: zoom ?? DEFAULT_ZOOM,
        mapId: "DEMO_MAP_ID",
      });

      setMap(map);
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

