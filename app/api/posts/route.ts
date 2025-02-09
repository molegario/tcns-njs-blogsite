import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const { userId } = await auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse(
        "Unauthorized",
        {
          status: 401,
        }
      );
    }

    const post = await db.post.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POSTS]", error);
    return new NextResponse(
      "Internal Error",
      {
        status: 500,
      }
    );
  }
}