import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb"; // 아까 만든 Prisma 인스턴스

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    
    const id = searchParams.get("id");
    const page = searchParams.get("page");
    const take = 10; // 한 페이지에 가져올 개수

    try {
        if(id) {
            const store = await prisma.store.findUnique({
                where: {
                    id: Number(id)
                 },  
            });
            if(!store) {
                return NextResponse.json({error: "Can not find the Details."}, { status: 404 })
            }
          
            return NextResponse.json(store);
        }

        
        if (page) {
            const pageNum = parseInt(page, 10);
            const skip = (pageNum - 1) * take;

            // 1. DB에서 전체 개수 가져오기
            const totalCount = await prisma.store.count();
            
            // 2. DB에서 해당 페이지 데이터만 가져오기
            const stores = await prisma.store.findMany({
                skip: skip,
                take: take,
                orderBy: { id: 'asc' } // 정렬 기준 추가 가능
            });

            return NextResponse.json({
                data: stores,
                totalPages: Math.ceil(totalCount / take),
                page: pageNum
            });
        }

        // 페이지 인자가 없을 경우 전체 데이터 반환 (데이터가 많으면 주의!)
        const allStores = await prisma.store.findMany();
        return NextResponse.json({
            data: allStores,
            totalPages: 1
        });
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "데이터를 불러오지 못했습니다." }, { status: 500 });
    }
}