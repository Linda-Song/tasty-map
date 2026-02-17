import { Dispatch, SetStateAction } from "react"
import Image from "next/image";
import { StoreType } from "@/type";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";
import { GiCroissant } from "react-icons/gi";

interface StoreBoxProps {
    store: StoreType | null;
    setStore: Dispatch<SetStateAction<StoreType | null>>;
}
const MENU_CATEGORIES = ['croissant','cake','donut','sourdough','macaron','muffin','lamington','pie','tart'];

export default function StoreBox({store, setStore}: StoreBoxProps) {
    if(!store) return null;

    const storeImage = store.category && MENU_CATEGORIES.includes(store.category);
    const imageSrc = storeImage
        ? `/images/markers/${store.category}.png`
        : "/images/markers/default.png";

    return(
        <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm z-10 w-full bg-white">
            <div className="p-5">
                <div className="flex justify-between items-start">  
                    <div className="flex gap-4 items-center">
                        <Image 
                            src={imageSrc}
                            width={32} 
                            height={32}
                            alt="icon image"
                        />
                        <div>
                            <div className="font-semibold leading-tight">{store?.title}</div>
                            <div className="text-sm text-gray-500">{store?.state}</div>
                        </div>
                    </div>
                    <button type="button" onClick={() => setStore(null)}>
                        <AiOutlineClose/> 
                    </button>
                </div>
                
                {/* 정보 간격 최적화 */}
                <div className="mt-4 flex flex-col gap-2">
                    <div className="flex gap-2 items-center text-sm">
                        <HiOutlineMapPin className="text-gray-400"/>
                        <span className="truncate">{store?.address || "none"}</span>
                    </div>
                    
                    <div className="flex gap-2 items-center text-sm">
                        <HiOutlinePhone className="text-gray-400"/>
                        {store?.tel_no || "none"}
                    </div>

                    <div className="flex gap-2 items-center text-sm">
                        <AiOutlineInfoCircle className="text-gray-400"/>
                        {store.web ? (
                            <a href={store.web} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate">
                                {store.web}
                            </a>
                        ) : ("none")}
                    </div>
                    <div className="flex gap-2 items-center text-sm">
                        <GiCroissant className="text-gray-400"/>
                        Signature: {store?.category || "none"} 
                    </div>
                    
            </div>
            </div>

            <button type="button" onClick={() => window.alert("상세보기 작업중")}
                className="w-full bg-blue-700 hover:bg-blue-600 py-3 text-white rounded-b-lg text-sm font-medium">
                More info
            </button>
        </div>
    )
}