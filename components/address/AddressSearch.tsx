import React from "react";
import Autocomplete from "react-google-autocomplete";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { StoreType } from "@/type";

interface AddressProps {
  register: UseFormRegister<StoreType>;
  setValue: UseFormSetValue<StoreType>;
  errors: FieldErrors<StoreType>;
}

export default function AddressSearch({ register, setValue, errors }: AddressProps) {
  return (
    <div className="col-span-full">
      <label htmlFor="address" className="block text-sm font-medium text-gray-900">
        Store Address
      </label>
      <div className="mt-2">
        {/* 핵심: Autocomplete가 직접 input 역할을 합니다. 
            기존의 readOnly input과 Search 버튼은 삭제했습니다.
        */}
        <Autocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          onPlaceSelected={(place) => {
            // 1. 전체 주소 설정
            if (place.formatted_address) {
              setValue("address", place.formatted_address);
            }

            // 2. 우편번호(Postcode) 추출 및 설정
            const postCode = place.address_components?.find((c) =>
              c.types.includes("postal_code")
            )?.long_name;

            if (postCode) {
              setValue("zip", postCode);
            }

            // 3. 위도(lat), 경도(lng) 추출 및 설정
            if (place.geometry && place.geometry.location) {
              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();

              setValue("lat", lat.toString());
              setValue("lng", lng.toString());

              console.log("좌표 자동 입력 완료:", lat, lng);
            }
          }}
          options={{
            types: ["address"],
            componentRestrictions: { country: "au" },
            fields: ["address_components", "geometry", "formatted_address"],
          }}
          // react-hook-form의 validation을 위해 register 적용
          {...register("address", { required: "Address is required" })}
          // 기존 input 스타일을 그대로 적용
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
            errors.address ? "ring-red-500" : "ring-gray-300"
          } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm p-2`}
          placeholder="Find your address"
        />
        
        {/* 에러 메시지 표시 */}
        {errors.address && (
          <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>
        )}
      </div>

      {/* 숨겨진 필드들: lat, lng, zip 데이터가 폼 제출 시 함께 날아가도록 보장 */}
      <input type="hidden" {...register("lat")} />
      <input type="hidden" {...register("lng")} />
      <input type="hidden" {...register("zip")} />
    </div>
  );
}