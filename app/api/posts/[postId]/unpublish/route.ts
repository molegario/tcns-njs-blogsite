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

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const ownPost = await db.post.findUnique({
      where: {
        id: postId,
        userId: userId,
      },
    });

    if (!ownPost) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const postpatch = await db.post.update({
      where: {
        id: postId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(postpatch);
  } catch {
    console.error(
      "POSTS/[POSTID]/UNPUBLISH::PATCH API DB ACTION FAIL"
    );
    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}
