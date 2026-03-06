'use client'
import { StoreType } from "@/type";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil"; // 추가
import { currentStoreState } from "@/atoms/mapState"; // 추가

interface LikeProps {
  storeId: number;
}

export default function Like({ storeId }: LikeProps) {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  
  // ✅ Recoil 상태 가져오기
  const [currentStore, setCurrentStore] = useRecoilState(currentStoreState);

  const toggleLike = useMutation({
    mutationFn: async () => {
      return await axios.post("/api/likes", {
        storeId: storeId,
      });
    },
    onSuccess: () => {
      // 1. 상세 페이지 데이터 동기화 (React Query 캐시 무효화)
      queryClient.invalidateQueries({ queryKey: ["store", String(storeId)] });

      // 2. ✅ StoreBox 데이터 동기화 (Recoil 상태 직접 수정)
      // 현재 StoreBox에 열려있는 상점이 찜 누른 상점과 같다면 상태 업데이트
      if (currentStore && currentStore.id === storeId) {
        setCurrentStore({
          ...currentStore,
          // likes 배열을 직접 조작하거나, 
          // 간단하게 length 체크용으로 likes 배열의 유무를 토글
          likes: currentStore.likes && currentStore.likes.length > 0 ? [] : [{ id: 0, storeId, userId: 0 }]
        });
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("다시 시도해주세요.");
    }
  });

  const fetchStore = async () => {
    const { data } = await axios.get(`/api/stores?id=${storeId}`);
    return data as StoreType;
  };

  const { data: store, isLoading } = useQuery<StoreType>({
    queryKey: ["store", String(storeId)],
    queryFn: fetchStore,
    enabled: !!storeId,
    refetchOnWindowFocus: false,
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // StoreBox 클릭 이벤트 전파 방지
    
    if (status !== "authenticated") {
      return toast.warn("로그인이 필요합니다.");
    }
    toggleLike.mutate();
  };

  if (isLoading) return <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />;

  // ✅ StoreBox에서도 상태를 즉시 반영하기 위해 
  // API 결과(store)뿐만 아니라 Recoil 상태(currentStore)도 참고하도록 설정 가능하지만,
  // 위에서 onSuccess 로직을 짰다면 store?.likes 만으로도 충분합니다.
  return (
    <button 
      type="button" 
      onClick={handleLikeClick}
      disabled={toggleLike.isPending}
      className="transition-transform active:scale-90 flex items-center"
    >
      {store?.likes && store.likes.length > 0 ? (
        <AiFillHeart className="text-red-500 hover:text-red-600 text-2xl" />
      ) : (
        <AiOutlineHeart className="text-gray-400 hover:text-red-400 text-2xl" />
      )}
    </button>
  );
}