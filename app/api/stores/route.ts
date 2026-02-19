import { NextResponse } from "next/server";
import { StoreType } from "@/type";
import storeData from "@/data/store_data.json";

export async function GET() {
    const stores = storeData.DATA as StoreType[];
    return NextResponse.json(stores);
}