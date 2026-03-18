'use client'

import dynamic from 'next/dynamic'; // 1. dynamic 추가
import { StoreResponse } from "@/type/index";
import CurrentLocationBtn from '../common/CurrentLocationBtn';
import { useState } from 'react';


// 2. GoogleMap을 dynamic import로 불러오고 ssr을 false로 설정합니다.
const GoogleMap = dynamic(() => import("../map/Map"), { 
  ssr: false,
  loading: () => <div className="w-full h-screen bg-gray-100 animate-pulse" /> 
});

const Markers = dynamic(() => import("@/components/markers/Markers"), { 
  ssr: false 
});

const StoreBox = dynamic(() => import("@/components/store/StoreBox"), { 
  ssr: false 
});

interface HomeClientProps {
    stores: StoreResponse;
}

export default function HomeClient({ stores }: HomeClientProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  return (
    <>
      <main> 
        <GoogleMap onMapLoad={setMap} /> 
        <Markers stores={stores} map={map} />
        <StoreBox />
        <CurrentLocationBtn map={map}/>
      </main>
    </>
  );
}
