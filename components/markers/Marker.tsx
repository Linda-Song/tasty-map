import { StoreResponse, StoreType } from "@/type/index";
import { useEffect} from "react";

interface MarkerProps {
  map: google.maps.Map | null;
  store: StoreType;
}

const MENU_CATEGORIES = ['croissant','cake','donut','sourdough','macaron','muffin','lamington','pie','tart']

export default function Markers({map, store}: MarkerProps) {

  useEffect(()=> {
    if(!map || !store|| !window.google) return;
    const { AdvancedMarkerElement } = window.google.maps.marker;

    const storeImage = store.category && MENU_CATEGORIES.includes(store.category);
    const imageSrc = storeImage
        ? `/images/markers/${store.category}.png`
        : "/images/markers/bread.png";

    const markerPosition: google.maps.LatLngLiteral = { 
      lat: Number(store.lat), 
      lng: Number(store.lng)   
    }
    // 1. 마커 컨테이너 생성 
      const container = document.createElement("div");
      container.className = "marker-container";

      // 2. HTML 구조 작성 
      container.innerHTML = `
        <div class ="custom-infowindow">
          <div class = "infowindow-content">${store.title}</div>
        </div>

        <img 
          src="${imageSrc}" 
          alt="${store.title}" 
          width="40" 
          height="40"
          class="marker-image"
        />
      `;
      // 3. 최신 고급 마커 생성
      const marker = new AdvancedMarkerElement({
        position: markerPosition,
        map: map,
        title: store.title,
        content: container, 
      });

      const listener = marker.addListener("click", () => {
      map.panTo(markerPosition);
    });
    // Clean-up: 마커 제거 및 리스너 해제
    return () => {
      marker.map = null;
      listener.remove();
    };
  }, [map, store]);

    return null;  
  }