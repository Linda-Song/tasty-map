'use client';

import { StoreType } from "@/type/index";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { mapState, currentStoreState } from "@/atoms/mapState";

interface MarkerProps {
  store: StoreType;
}

const MENU_CATEGORIES = ['croissant','cake','donut','sourdough','macaron','muffin','lamington','pie','tart'];

export default function Marker({ store }: MarkerProps) {
  // 1. Recoil에서 지도 객체와 상태 변경 함수 가져오기
  const map = useRecoilValue(mapState); 
  const setCurrentStore = useSetRecoilState(currentStoreState);

  useEffect(() => {
    // 지도가 로드되지 않았거나 상점 데이터가 없으면 중단
    if (!map || !store || !window.google) return;

    const { AdvancedMarkerElement } = window.google.maps.marker;

    const storeImage = store.category && MENU_CATEGORIES.includes(store.category);
    const imageSrc = storeImage
        ? `/images/markers/${store.category}.png`
        : "/images/markers/bread.png";

    const markerPosition: google.maps.LatLngLiteral = { 
      lat: Number(store.lat), 
      lng: Number(store.lng)   
    };

    // 마커 컨테이너 및 HTML 구조 생성
    const container = document.createElement("div");
    container.className = "marker-container";
    container.innerHTML = `
      <div class="custom-infowindow">
        <div class="infowindow-content">${store.title}</div>
      </div>
      <img 
        src="${imageSrc}" 
        alt="${store.title}" 
        width="40" 
        height="40"
        class="marker-image"
      />
    `;

    // 2. 최신 고급 마커 생성 (Props로 받은 map 사용 대신 Recoil의 map 사용)
    const marker = new AdvancedMarkerElement({
      position: markerPosition,
      map: map,
      title: store.title,
      content: container, 
    });

    // 3. 마커 클릭 이벤트
    const listener = marker.addListener("click", () => {
      map.panTo(markerPosition); // 지도 이동
      setCurrentStore(store);    // 전역 상태 업데이트 (StoreBox 띄우기)
    });

    // Clean-up: 컴포넌트가 사라질 때 마커 제거 및 리스너 해제
    return () => {
      marker.map = null;
      listener.remove();
    };
  }, [map, store, setCurrentStore]); // 의존성 배열 관리

  return null;  
}