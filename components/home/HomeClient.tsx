'use client'

import dynamic from 'next/dynamic'; // 1. dynamic 추가
import { StoreResponse } from "@/type/index";


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
  return (
    <>
      <main> 
        {/* 이제 GoogleMap은 브라우저에서만 렌더링됩니다. */}
        <GoogleMap /> 
        <Markers stores={stores} />
        <StoreBox />
      </main>
    </>
  );
}
