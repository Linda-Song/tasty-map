'use client'; // 1. 클라이언트 컴포넌트로 선언

import Image from "next/image";
import { fetchStores } from "../api/store";
import { useQuery } from "@tanstack/react-query";
import { StoreResponse } from "@/type";
import Loading from "@/components/common/Loading";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const MENU_CATEGORIES = ['croissant','cake','donut','sourdough','macaron','muffin','lamington','pie','tart']


export default function StoreListPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const currentPage = Number(page);  
  
  // 2. useQuery를 사용하여 데이터 가져오기
  //data:원하는 이름 으로 데이터 가져올 수 있음
  const { data, isLoading, isError } = useQuery<StoreResponse>({
    queryKey: ["stores", page],
    queryFn: () => fetchStores(page),
  });
//   if (stores) {
//   console.log(stores);
// }

  const stores = data?.data || [];
  const totalPages = data?.totalPages || 0;

  // 3. 로딩 및 에러 상태 처리
  if (isError) return <div className="p-8 text-center text-red-500">에러가 발생했습니다.</div>;
  

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading
        ?(<Loading/>)
        :(
          stores?.map((store) => (
          <li className="flex justify-between gap-x-6 py-5" key={store.id} >
            <div className="flex gap-x-4">
              
              <Image
                src={
                  store?.category && MENU_CATEGORIES.includes(store.category)
                    ? `/images/markers/${store.category}.png`
                    : "/images/markers/bread.png"
                    
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
                {store?.phone|| "none"} | {store?.web} 
              </div>
            </div>
          </li>
        )))}
      </ul>
      <div className="flex justify-center items-center gap-5">
        {currentPage > 1 && (
          <Link href={`/stores?page=${currentPage - 1}`}>
            <span className="px-3 py-2 rounded border shadow-sm bg-white">
              이전</span></Link>
        )}
        
        <Link href={`/stores?page=${currentPage}`}>
          <span className="px-3 py-2 rounded border shadow-sm text-blue-600 bg-white">
            {currentPage}
            </span>
        </Link>
        {currentPage < totalPages && (
          <Link href={`/stores?page=${currentPage+ 1}`}>
            <span className="px-3 py-2 rounded border shadow-sm bg-white">
            다음
            </span>
            </Link>
        )}
        

      </div>

    </div>
  );
}


