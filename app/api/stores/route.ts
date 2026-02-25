import { NextResponse } from "next/server";
import { StoreType } from "@/type";
import storeData from "@/data/store_data.json";

// export async function GET() {
//     const stores = storeData.DATA as StoreType[];
//     return NextResponse.json(stores);
// }

export async function GET(request: Request){
    const {searchParams} = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const take = 10;
    const skip = (page - 1)* take

    const allStores = storeData.DATA;
    const totalCount = allStores.length;
    const totalPages = Math.ceil(totalCount / take);

    const paginatedStores = allStores.slice(skip, skip + take);
    return NextResponse.json({
        data: paginatedStores,
        totalPages: totalPages

    });

}


