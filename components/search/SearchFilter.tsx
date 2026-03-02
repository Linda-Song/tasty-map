'use client'
import { useEffect } from "react"; 
import { useSetRecoilState } from "recoil"; 
import { searchState } from "@/atoms/mapState"; 
import { CATEGORY_ARR } from "@/type/categories";
import { useRouter, useSearchParams, usePathname } from "next/navigation";


export default function SearchFilter () {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearch = useSetRecoilState(searchState);
  const currentQ = searchParams.get("q") || "";
  const currentCategory = searchParams.get("category") || "";

  useEffect(() => {
    setSearch({
      q: currentQ,
      category: currentCategory,
    });
  },[currentQ, currentCategory, setSearch])
  
  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "Categories") {
     params.set(key, value) ;
    } else {
      params.delete(key);
    }
    params.set("page" , "1");
    router.push(`${pathname}?${params.toString()}`);

  }


  return (
  <div className="flex flex-col md:flex-row gap-2 my-4">
    <div className="flex items-center justify-center w-full  ">
      <input type="search" 
      defaultValue={currentQ}
      placeholder= "🔍 Search" 
      onKeyDown={(e) => {
        if(e.key === "Enter") updateParams("q", e.currentTarget.value);
      }}
      className="block w-full p-3 text-sm border border-gray-300 outline-none rounded-lg bg-gray-50 focus:border-blue-500 focus:border-2"/>
    </div>
    <select 
      value={currentCategory}
      onChange={(e) => updateParams("category", e.target.value)}
      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm md:max-w-50 rounded-lg focus:border-blue-500
    block w-full p-3 outline-none ">
      <option>Categories</option>
      {CATEGORY_ARR.map((data) => (
        <option value={data} key={data}>
          {data}
        </option>
      ))}
    </select>

  </div>
 
  );
}