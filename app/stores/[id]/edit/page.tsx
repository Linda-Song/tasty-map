"use client";

import axios from "axios";
import { CATEGORY_ARR } from "@/type/categories";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import AddressSearch from "@/components/address/AddressSearch";
import { StoreType } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


export default function StoreEditPage() {
  const router = useRouter();
  const {id} = useParams();

  const {data: store, isSuccess} = useQuery({
    queryKey: ["store", id],
    queryFn: async () => {
      const {data} = await axios.get(`/api/stores?id=${id}`);
      return data as StoreType;
    },
    enabled: !!id,
  })

  const {
    register,
    handleSubmit,
    setValue, 
    reset,
    formState: { errors, isSubmitting },
    } = useForm<StoreType>();

    useEffect(() => {
      if(isSuccess && store) {
        reset(store);
      }
    }, [isSuccess, store, reset]);
 
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const result = await axios.put("/api/stores", {
        ...data,
      });
      
      if (result.status === 200 || result.status === 201) {
        toast.success("Changes saved successfully!");
        router.replace(`/stores/${id}`);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to update. Please try again.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 md:max-w-4xl mx-auto py-8">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-gray-900">Edit Gourmet Place</h2>
          <p className="mt-1 text-sm text-gray-600">Update the information of your place.</p>

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