import Image from "next/image";
import { StoreType } from "@/type"; 


export default async function StoreListPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, {
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch stores in StoreListPage");
  }

  const stores: StoreType[] = await res.json();
  // const MENU_CATEGORIES = ['croissant', 'cake', 'donut', 'sourdough', 'macaron', 'muffin', 'lamington', 'pie', 'tart'];

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {stores?.map((store, index) => (
          <li className="flex justify-between gap-x-6 py-5" key={index}>
            <div className="flex gap-x-4">
              <Image
                src={
                  store?.category 
                    ? `/images/markers/${store?.category}.png`
                    : "/images/markers/default.png"
                }
                width={48}
                height={48}
                alt="아이콘 이미지"
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
                {store?.tel_no|| "none"} | {store?.web} 
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}