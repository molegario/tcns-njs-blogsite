import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type tParams = Promise<{ postId: string }>;

export async function PATCH(
  req: Request,
  { params }: { params: tParams }
) {
  try {
    const { userId } = await auth();
    const { postId } = await params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const post = await db.post.update({
      where: {
        id: postId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POSTS/{POSTID}]::PATCH", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
