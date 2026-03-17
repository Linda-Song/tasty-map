import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";




//Post
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if(!session?.user) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }
  const {storeId, body} = await req.json();
  if(!body || body.trim().length === 0) {
    return NextResponse.json({error: "empty body"}, {status: 401});
  }

  const comment = await prisma.comment.create({
    data: {
      storeId: parseInt(storeId),
      userId: session.user.id,
      body,
    },
  });
  return NextResponse.json(comment, {status: 200});
}
 
//Get
export async function GET (req: Request) {
  const {searchParams} = new URL(req.url);
  const storeId = searchParams.get("storeId");
  const userId = searchParams.get("userId") //filtering for myProfile page
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  const where: Prisma.CommentWhereInput = {};
  if (storeId) where.storeId = parseInt(storeId);
  if (userId) where.userId = parseInt(userId);

  if(!storeId && !userId) {
    return NextResponse.json({error: "Missing Id"}, {status: 400});
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [comments, count] = await Promise.all([
    prisma.comment.findMany({
      where: where,
      orderBy: {createdAt: "desc"},
      take: parseInt(limit),
      skip: skip,
      include: {
        user: true,
        store: true,
      },
    }),
    prisma.comment.count({
      where:where,
    }),
  ]);

  return NextResponse.json(
    {
      data: comments,
      totalCount: count,
      totalPages: Math.ceil(count / parseInt(limit)),
      page: parseInt(page),
    },
    {status: 200}
  ); 
}

//Delete
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const {searchParams} = new URL(req.url);
  const id = searchParams.get("id");

  if(!session?.user){
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }
  if(!id) {
    return NextResponse.json({error: "Unauthorized"}, {status: 400});
  }
  try {
    const result = await prisma.comment.delete({
      where:{
        id: Number(id),
        userId: Number(session.user.id),
      },
    });
    return NextResponse.json(result, {status: 200});
  } catch(e) {
    return NextResponse.json({error: "Error deleting comment"}, {status: 500});
  }
}