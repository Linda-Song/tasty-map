'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { LikeInterface, StoreResponse, StoreType } from "@/type"
import Like from "@/components/like/Like"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Loading from "@/components/common/Loading"
import StoreListBox from "@/components/store/StoreListBox"

export default function LikesPage() {
  const searchParmas = useSearchParams();
  const page = searchParmas.get("page" ) || "1"

  const { data, isLoading, isError } = useQuery({
      queryKey: ["user-likes",page ],
      queryFn: async() => {
        const {data} = await axios.get(`/api/likes?page=${page}`);
        return data;
      },
    });

    const likes = data?.data || [];
    const totalPages = data?.totalPages || 0;
 
    // 3. 로딩 및 에러 상태 처리
    if (isError) return <div className="p-8 text-center text-red-500">에러가 발생했습니다.</div>;
    

  
  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      {/* 1. 헤더 영역 */}
      <h3 className="text-lg font-semibold">Likes Page</h3>
      <div className="mt-1 text-gray-500 text-sm">My Liked Store List</div>

      {/* 2. 리스트 영역 */}
      <ul role="list" className="divide-y divide-gray-100 mt-10">
        {isLoading ? (
          <Loading />
        ) : likes && likes.length > 0 ? (
          likes.map((like: LikeInterface, index: number) => (
            <StoreListBox 
              i={index} 
              store={like.store} 
              key={like.id || index} 
            />
          ))
        ) : (
          <div className="py-20 text-center text-gray-400">
            찜한 상점이 없습니다.
          </div>
        )}
      </ul>

      {/* 3. 페이지네이션 버튼 영역 */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-5 mt-10">
          {/* 이전 페이지 버튼 */}
          {Number(page) > 1 ? (
            <Link 
              href={`/users/likes?page=${Number(page) - 1}`}
              className="px-3 py-2 rounded border shadow-sm bg-white hover:bg-gray-50 text-sm"
            >
              이전
            </Link>
          ) : (
            <div className="w-[58px]" /> // 레이아웃 유지를 위한 빈 공간
          )}

          {/* 현재 페이지 번호 */}
          <span className="px-4 py-2 rounded border shadow-sm text-blue-600 bg-white font-semibold text-sm">
            {page}
          </span>

          {/* 다음 페이지 버튼 */}
          {Number(page) < totalPages ? (
            <Link 
              href={`/users/likes?page=${Number(page) + 1}`}
              className="px-3 py-2 rounded border shadow-sm bg-white hover:bg-gray-50 text-sm"
            >
              다음
            </Link>
          ) : (
            <div className="w-[58px]" /> // 레이아웃 유지를 위한 빈 공간
          )}
        </div>
      )}
    </div>
  );
}