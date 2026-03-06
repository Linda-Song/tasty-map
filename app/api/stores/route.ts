import { NextResponse } from "next/server";
import prisma  from "@/lib/prismadb"; 
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    
    const id = searchParams.get("id");
    const page = searchParams.get("page");
    const q = searchParams.get("q") || ""; 
    const category = searchParams.get("category") || "";
    const take = 10; // 한 페이지에 가져올 개수

    try {
        if(id) {
            const session = await getServerSession(authOptions);
            const store = await prisma.store.findUnique({
                where: {
                    id: Number(id)
                 },  
                 include: {
                    likes: {
                        where: {
                            userId: session?.user?Number(session.user.id) : -1
                        }
                    }
                 }
            });
            if(!store) {
                return NextResponse.json({error: "Can not find the Details."}, { status: 404 })
            }
            const result = {
                ...store,
                isLiked: store.likes && store.likes.length > 0,
            };
          
            return NextResponse.json(result);
        }

        
        if (page) {
            const pageNum = parseInt(page, 10);
            const skip = (pageNum - 1) * take;

            const whereCondition = {
                AND:[
                    q?{
                        OR: [
                            { title: { contains: q, mode: 'insensitive' as const } },
                        ]
                    } : {},
                    category ? {category: {equals: category}} : {},
                ]
            };

            const [stores, totalCount] = await Promise.all([
            prisma.store.findMany({
                where: whereCondition,
                skip: skip,
                take: take,
                orderBy: { id: 'asc' }
            }),
            prisma.store.count({
                where: whereCondition
            })
        ]);

            return NextResponse.json({
                data: stores,
                totalPages: Math.ceil(totalCount / take),
                page: pageNum,
                totalCount: totalCount
            });
        }

        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "데이터를 불러오지 못했습니다." }, { status: 500 });
    }
}

// POST
export async function POST(request : Request)  {
    try {
        const data = await request.json();
        const result = await prisma.store.create({
            data: {
            title: data.title,     
            address: data.address,
            category: data.category,
            city: data.city || "",
            state: data.state|| "",
            
          },
        });
    return NextResponse.json(result, { status: 201 });
    } catch(error){
        console.error("POST ERROR:", error);
        return NextResponse.json({error: "Failed register new store"},{ status: 500 });
    }
}

    // PUT
    export async function PUT (request: Request) {
        try {
            const data = await request.json();
            if(!data.id) {
              return NextResponse.json({error: "Missing store ID"}, {status: 400});
            }
            const result = await prisma.store.update({
              where: {
                id: Number(data.id),
              },
              data: {
                title: data.title,
                address: data.address,
                category: data.category,
                phone: data.phone,
                web: data.web,
                city: data.city || "",
                state: data.state || "",
                lat: data.lat ? String(data.lat) : "", // 데이터 타입에 맞춰 조정 필요
                lng: data.lng ? String(data.lng) : "",
              },
            });
         return NextResponse.json(result, { status: 201 });
        } catch(error){
            console.error("PUT ERROR:", error);
            return NextResponse.json({error: "Failed to update store"},{ status: 500 });
        }
     }

     export  async function DELETE(request: Request) {
      const {searchParams} = new URL(request.url);
      const id = searchParams.get("id");

      if(!id) {
        return NextResponse.json({error: "Missing store ID"}, {status: 400});
      }
      try {
        await prisma.store.delete({
          where: {
            id: Number(id),
          },
        });
        return NextResponse.json({message: "Deleted successfully"}, {status: 200});
      }catch(error) {
         console.error("DELETE ERROR:", error);
          return NextResponse.json({error: "Failed to delete store"},{ status: 500 });
        }
      }
      


    


