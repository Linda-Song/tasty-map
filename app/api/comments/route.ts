import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { parse } from "path";



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
export async function Get (req: Request) {
  const {searchParams} = new URL(req.url);
  const storeId = searchParams.get("storeId");
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  if(!storeId) {
    return NextResponse.json({error: "Missing storeId"}, {status: 400});
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [comments, count] = await Promise.all([
    prisma.comment.findMany({
      where: {storeId: parseInt(storeId)},
      orderBy: {createdAt: "desc"},
      take: parseInt(limit),
      skip: skip,
      include: {
        user: true,
      },
    }),
    prisma.comment.count({
      where:{storeId: parseInt(storeId)},
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