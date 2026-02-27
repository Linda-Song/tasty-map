'use client'

import { StoreType } from "@/type";
import {  useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios from "axios";
import Loading from "@/components/common/Loading";
import Map from "@/components/map/Map";
import { useState } from "react";
import Marker from "@/components/markers/Marker";

export default function StoreDetailPage() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const params = useParams();
  const id = params?.id;

  const fetchStore = async () => {
    const {data} = await axios.get(`/api/stores?id=${id}`);
    return data as StoreType
  };

  const {data: store, isLoading, isError,isSuccess} 
  = useQuery({
    queryKey: ["store", id],
    queryFn: fetchStore,
    enabled:!!id,
    refetchOnWindowFocus: false,
  });

  if(isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        Please Try again!
      </div>
    );
  }

  if(isLoading) {
    return <Loading className="mt-[20%]"/>
  }

 
  return(
    <div className="max-w-3xl mx-auto p-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold  text-gray-800">
          {store?.title || "상점 이름이 없습니다."}
        </h1>
      </div>

      {store && (
        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">상세 정보</h2>
            <p className="text-gray-700 font-medium">📍Address</p>
            <p className="text-gray-600 mb-3">{store.address}</p>
            <p className="text-gray-700 font-medium">📍Phone</p>
            <p className="text-gray-600 mb-3">{store.phone || null}</p>
            <p className="text-gray-700 font-medium">📍Website</p>
            <p className="text-gray-600 mb-3">{store.web || null}</p>
            
            {/* 추가 데이터가 있다면 여기에 출력 */}
            {store.category && (
              <>
                <p className="text-gray-700 font-medium">📂 카테고리</p>
                <p className="text-gray-600">{store.category}</p>
              </>
            )}
          </div>
          {isSuccess && (
            <div className="overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-150">
              <Map setMap={setMap} lat={store.lat} lng={store?.lng} zoom={16} />
              <Marker map={map} store={store}/>
            </div>
          )}

        </div>
      )}
    </div>
  );
}