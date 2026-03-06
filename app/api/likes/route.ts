import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  // 1. 로그인 확인
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { storeId } = await req.json();

  // 2. 필수 데이터 확인
  if (!storeId) {
    return NextResponse.json({ error: "Missing storeId" }, { status: 400 });
  }

  try {
    // 3. 이미 찜했는지 확인
    const existingLike = await prisma.like.findFirst({
      where: {
        storeId: Number(storeId),
        userId: Number(session.user.id),
      },
    });

    if (existingLike) {
      // 4. 이미 있다면 -> 삭제 (찜 취소)
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json({ message: "Like removed" }, { status: 200 });
    } else {
      // 5. 없다면 -> 생성 (찜 하기)
      const newLike = await prisma.like.create({
        data: {
          storeId: Number(storeId),
          userId: Number(session.user.id),
        },
      });
      return NextResponse.json(newLike, { status: 201 });
    }
  } catch (error) {
    console.error("LIKE_TOGGLE_ERROR", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const {searchParams} = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = 10;
  const skip = (Number(page) -1) * limit;

  if (!session?.user) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }
  try{
    const totalCount = await prisma.like.count({
      where: {
        userId: Number(session.user.id),
      },
    });
    
    const likes = await prisma.like.findMany({
      where:{
        userId: Number(session.user.id),
      },
      include:{
        store: true,
      },
      orderBy:{
        createdAt: "desc",
      },
      skip: skip,
      take:limit,
    });

    return NextResponse.json({
      data: likes,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      page: Number(page),
    });
  } catch(error){
    return NextResponse.json({error:"Internal Server Error" }, {status: 500})
  }
}