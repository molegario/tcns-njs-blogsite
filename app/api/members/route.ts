import { db } from "@/lib/db";
import { checkRole } from "@/lib/roles";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const isAdmin = await checkRole("admin");
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
        Privileges: isAdmin ? ["admin"] : [],
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
