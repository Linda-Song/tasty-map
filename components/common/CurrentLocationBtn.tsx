'use client'

import { useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import { toast } from "react-toastify";
import MapLoader from "./MapLoader";

interface CurrentLocationBtnProps {
  map: google.maps.Map | null;
}

export default function CurrentLocationBtn({map} : CurrentLocationBtnProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const handleCurrentPosition = () => {
    setLoading(true)

    // geolocation
    const options = {
      enableHighAccuracy:false,
      timeout: 5000,
      maximumAge: Infinity,
    };

    if(navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition (
        (position) => {
          const {latitude, longitude} = position.coords;
          if(map) {
            const pos = {
              lat: latitude,
              lng: longitude,
            };
            map.panTo(pos);
            map.setZoom(16);
            setLoading(false);
          }
        },
        () => {
          toast.error("Unable to retrieve your location. Please check permissions.")
          setLoading(false);
        },
        options
      );  
    }else {
      toast.error("Geolocation is not supported or Map is not ready.");
      setLoading(false);
    }
  };


  return (
    <>
      {loading && <MapLoader/>}
      <button
        type="button"
        onClick={handleCurrentPosition}
        disabled={loading}
        className="fixed z-10 p-2 shadow right-10 bottom-20 bg-blue-100 rounded-md hover:shadow-lg focus:shadow-lg  hover:bg-blue-200"
      >
        <MdOutlineMyLocation className="w-5 h-5"/>
      </button>
    </>
    
  );
}