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

interface MapProps {
  setMap:Dispatch<SetStateAction<google.maps.Map | null>>;
}


export default function GoogleMap({setMap} : MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const initGoogleMap = () => {
    if (mapRef.current && window.google) {
      const map = new window.google.maps.Map(mapRef.current,{
        // Sydney CBD 
        center: { lat: DEFAULT_LAT, lng: DEFAULT_LNG }, 
        zoom: 15,
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

