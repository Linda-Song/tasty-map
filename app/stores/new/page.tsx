"use client";

import axios from "axios";
import { CATEGORY_ARR } from "@/type/categories";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AddressSearch from "@/components/address/AddressSearch";
import { StoreType } from "@/type";

export default function StoreNewPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue, 
    formState: { errors, isSubmitting },
  } = useForm<StoreType>({
    defaultValues: {
      title: "",
      category: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip:"",
      lat:"",
      lng:"",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // 1. data를 그대로 보내되, DB 필드명인 title에 name 값을 넣어줍니다.
      // 2. id가 혹시 섞여 들어가지 않도록 구조 분해 할당을 사용합니다.
      const { id, ...rest } = data; 

      const result = await axios.post("/api/stores", {
        ...rest,
        title: data.name, // DB의 title 필드에 name 값 할당
      });
      
      if (result.status === 200 || result.status === 201) {
        toast.success("맛집을 등록했습니다. 🎉");
        router.replace(`/stores/${result.data.id}`);
      }
    } catch (e) {
      console.error(e);
      toast.error("등록에 실패했습니다. 다시 시도해 주세요.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 md:max-w-4xl mx-auto py-8">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-gray-900">My Gourmet Place</h2>
          <p className="mt-1 text-sm text-gray-600">Register your Gourmet Place.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Store Title */}
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">Store Title</label>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  {...register("title", { required: "Store title is required" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
              </div>
            </div>

            {/* Category */}
            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium text-gray-900">Category</label>
              <div className="mt-2">
                <select
                  id="category"
                  {...register("category", { required: "Category is required" })}
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option value="">Categories</option>
                  {CATEGORY_ARR?.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone */}
            <div className="sm:col-span-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900">Phone Number</label>
              <div className="mt-2">
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Address */}
            <AddressSearch register={register} setValue={setValue} errors={errors}/>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" onClick={() => router.back()} className="text-sm font-semibold text-gray-900">Back</button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-gray-400"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}