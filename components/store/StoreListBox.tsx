import { useRouter } from 'next/navigation';
import Image from "next/image";
import { StoreType } from "@/type";

interface StoreListProps {
  store:  StoreType;
  i:number;
}

export default function StoreListBox({store,i}: StoreListProps){
  const router = useRouter();
  const MENU_CATEGORIES = ['croissant','cake','donut','sourdough','macaron','muffin','lamington','pie','tart']


  return(
    <li className="flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-gray-50" key={store.id} onClick={() => router.push(`/stores/${store.id}`)} >
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

  )

}
