// import type { NextApiRequest, NextApiResponse } from "next";
// import { StoreType} from "@/type";

// export default async function handler (
//     req: NextApiRequest,
//     res: NextApiResponse<StoreType[]>
// ) {
//     const stores = (await import("@/data/store_data.json"))[
//         "DATA"
//     ] as StoreType[];

//     res.status(200).json(stores);
// }

import { NextResponse } from "next/server";
import { StoreType } from "@/type";
import storeData from "@/data/store_data.json";

export async function GET() {
    const stores = storeData.DATA as StoreType[];
    return NextResponse.json(stores);
}