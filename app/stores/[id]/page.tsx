'use client'
import { useSession } from "next-auth/react";
import { StoreType } from "@/type";
import {  useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/components/common/Loading";
import Map from "@/components/map/Map";
import { useState } from "react";
import Marker from "@/components/markers/Marker";
import Link from "next/link";
import { toast } from "react-toastify";
import Like from "@/components/like/Like";
import Comments from "@/components/comments";

export default function StoreDetailPage() {
  const {data: session, status} = useSession();
  const router = useRouter(); 
  const params = useParams();
  const id = params?.id;

  const [map, setMap] = useState<google.maps.Map | null>(null);

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

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this store?");
    if(confirm && store?.id) {
      try {
        const result = await axios.delete(`/api/stores?id=${store?.id}`);

        if(result.status === 200) {
          toast.success("Successfully deleted the store!");
          router.replace("/")
        }else {
          toast.error("Plase try again")
        }

      } catch(e) {
         console.log(e);
         toast.error ("Failed to delete. Please try again.")
      }
    }
  };


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
    {/* 제목과 버튼들을 감싸는 헤더 영역 */}
    <div className="border-b pb-4 flex items-center justify-between gap-4">
      
      {/* 왼쪽: 타이틀 */}
      <h1 className="text-3xl font-bold text-gray-800 truncate">
        {store?.title || "none"}
      </h1>

      {/* 오른쪽: 버튼 뭉치 (인증된 경우만 표시) */}
      {status === "authenticated" && store?.id && (
        <div className="flex items-center gap-4 shrink-0 ">
          <Like storeId={store.id} />
          
          <Link 
            href={`/stores/${store?.id}/edit`} 
            className="underline hover:text-gray-400 text-sm"
          >
            Edit
          </Link>
          
          <button 
            onClick={handleDelete}
            type="button" 
            className="underline hover:text-red-500 text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>

      {store && (
        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">상세 정보</h2>
            <p className="text-gray-700 font-medium">📍Address</p>
            <p className="text-gray-600 mb-3">{store.address}</p>
            <p className="text-gray-700 font-medium">📍Phone</p>
            <p className="text-gray-600 mb-3">{store.phone || "none"}</p>
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
            <>
            <div className="overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-150">
              <Map setMap={setMap} lat={store.lat} lng={store?.lng} zoom={16} />
              <Marker map={map} store={store}/>
            </div>
            <Comments storeId={store.id}/>
            </>  
          )}
        </div>   
          
      )}
    </div>
  );
}

