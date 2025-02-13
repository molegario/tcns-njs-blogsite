import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type tParams = Promise<{ postId: string }>;

export async function PUT(
  req: Request,
  { params }: { params: tParams }
) {
  try {
    const { userId } = await auth();
    const { postId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const { list } = await req.json();

    const postOwner = await db.post.findUnique({
      where: {
        id: postId,
        userId: userId,
      },
    });

    if (!postOwner) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    for (const item of list) {
      await db.section.update({
        where: {
          id: item.id,
          postId: postId,
        },
        data: {
          position: item.position,
        },
      });
    }

    return new NextResponse("Success reording sections", {
      status: 200,
      statusText: "OK",
    });
  } catch {
    console.error(
      "POSTS/[POSTID]/SECTIONS/REORDER::PUT::ERROR::",
      "POSTS/[POSTID]/SECTIONS/REORDER API DB ACTION FAIL"
    );

    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}
