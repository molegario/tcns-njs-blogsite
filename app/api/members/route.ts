import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { 
      userId: _userId,
      ...values
     } = await req.json();

    if (!userId || userId !== _userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const post = await db.member.create({
      data: {
        userId,
        ...values,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[MEMBERS]::POST", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
