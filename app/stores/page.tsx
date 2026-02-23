'use client'; // 1. 클라이언트 컴포넌트로 선언

import Image from "next/image";
import { fetchStores } from "../api/store";
import { useQuery } from "@tanstack/react-query";
import { StoreType } from "@/type";
import Loading from "@/components/common/Loading";


export default function StoreListPage() {
  // 2. useQuery를 사용하여 데이터 가져오기
  //data:원하는 이름 으로 데이터 가져올 수 있음
  const { data: stores, isLoading, isError } = useQuery<StoreType[]>({
    queryKey: ["stores"],
    queryFn: fetchStores,
  });
  if (stores) {
  console.log(stores);
}
  // 3. 로딩 및 에러 상태 처리
  if (isError) return <div className="p-8 text-center text-red-500">에러가 발생했습니다.</div>;
  
  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading
        ?(<Loading/>)
        :(
          stores?.map((store, index) => (
          <li className="flex justify-between gap-x-6 py-5" key={store.id || index}>
            <div className="flex gap-x-4">
              <Image
                src={
                  store?.category 
                    ? `/images/markers/${store.category}.png`
                    : "/images/markers/default.png"
                }
                width={48}
                height={48}
                alt="icon"
                className="object-contain"
              />
              <div>
                <div className="text-sm font-semibold leading-6 text-gray-900">
                  {store?.title}
                </div>
                <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                  {store?.state}
                </div>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <div className="text-sm font-semibold leading-6 text-gray-900">
                {store?.address}
              </div>
              <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                {store?.tel_no || "none"} | {store?.web} 
              </div>
            </div>
          </li>
        )))}
      </ul>
    </div>
  );
}


