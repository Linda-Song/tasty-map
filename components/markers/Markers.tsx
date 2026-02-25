import { StoreType } from "@/type/index";
import { useEffect} from "react";

interface MarkerProps {
  map: google.maps.Map | null;
  stores: StoreType[];
  setCurrentStore: (store: StoreType | null) => void;
}

const MENU_CATEGORIES = ['croissant','cake','donut','sourdough','macaron','muffin','lamington','pie','tart']

export default function Markers({map, stores, setCurrentStore}: MarkerProps) {

  useEffect(()=> {
    if(!map || !stores || !window.google) return;
    
    const { AdvancedMarkerElement } = window.google.maps.marker;

    const markers = stores.map((store) => {     
      const storeImage = store.category && MENU_CATEGORIES.includes(store.category);
      const imageSrc = storeImage
        ? `/images/markers/${store.category}.png`
        : "/images/markers/bread.png";
    const markerPosition: google.maps.LatLngLiteral = { 
    lat: Number(store.x_cnts), 
    lng: Number(store.y_dnts)  
  };
      // const markerPosition = { lat: store.lat, lng: store.lng };

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

      marker.addListener("click", () => {
        setCurrentStore(store);
      });

      return marker; // 생성된 마커를 배열에 담기 위해 리턴
    });

    // Clean-up: 컴포넌트가 사라지거나 데이터가 바뀔 때 기존 마커 제거
    return () => {
        markers.forEach((marker) => {
          marker.map = null;
        });
      };
    }, [map, stores, setCurrentStore]);

    return null;  
  }