'use client';
import dynamic from 'next/dynamic';
import { StoreResponse, StoreType } from "@/type/index";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { mapState, currentStoreState } from "@/atoms/mapState";

// 1. Props에서 map과 setCurrentStore를 제거했습니다. (Recoil에서 가져옴)
interface MarkersProps {
  stores: StoreResponse;
  map: google.maps.Map | null;
}

const MENU_CATEGORIES = ['croissant','cake','donut','sourdough','macaron','muffin','lamington','pie','tart'];

export default function Markers({ stores, map }: MarkersProps) {
  // 2. Recoil 상태 구독
  const setCurrentStore = useSetRecoilState(currentStoreState);


  useEffect(() => {
    // 필수 조건 체크 (지도가 로드되었는지, 데이터가 있는지)
    if (!map || !stores?.data || !window.google) return;
    
    const { AdvancedMarkerElement } = window.google.maps.marker;

    // 3. 모든 상점 데이터를 돌면서 마커 생성
    const markers = stores.data.map((store: StoreType) => {     
      const storeImage = store.category && MENU_CATEGORIES.includes(store.category);
      const imageSrc = storeImage
        ? `/images/markers/${store.category}.png`
        : "/images/markers/bread.png";

      const markerPosition: google.maps.LatLngLiteral = { 
        lat: Number(store.lat), 
        lng: Number(store.lng)  
      };

      const container = document.createElement("div");
      container.className = "marker-container";
      container.innerHTML = `
        <div class="custom-infowindow">
          <div class="infowindow-content">${store.title}</div>
        </div>
        <img src="${imageSrc}" alt="${store.title}" width="40" height="40" class="marker-image" />
      `;

      const marker = new AdvancedMarkerElement({
        position: markerPosition,
        map: map,
        title: store.title,
        content: container, 
      });

      // 4. 마커 클릭 이벤트: 지도 이동 + 전역 상태(StoreBox 노출) 업데이트
      marker.addListener("click", () => {
        map.panTo(markerPosition); // 부드럽게 이동
        setCurrentStore(store);    // StoreBox에 데이터 전달
      });

      return marker;
    });

    // Clean-up: 데이터가 바뀌거나 컴포넌트 언마운트 시 마커 싹 지우기
    return () => {
      markers.forEach((marker) => {
        marker.map = null;
      });
    };
  }, [map, stores, setCurrentStore]);

  return null;  
}