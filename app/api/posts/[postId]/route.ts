import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type tParams = Promise<{ postId: string }>;

export async function DELETE(
  req: Request,
  { params }: { params: tParams }
) {
  try {
    const { userId } = await auth();
    const { postId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const post = await db.post.findUnique({
      where: {
        id: postId,
        userId: userId,
      },
      include: {
        sections: true,
      },
    });

    if (!post) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    // flush section and related content
    if (post?.sections?.length > 0) {
      for (const section of post.sections) {
        await db.section.delete({
          where: {
            id: section.id,
            postId: postId,
          },
        });
      }
    }

    // delete post
    const deletedcourse = await db.post.delete({
      where: {
        id: postId,
        userId: userId,
      },
    });

    return NextResponse.json(deletedcourse);
  } catch {
    console.error(
      "/POSTS/[POSTID]::DELETE::ERROR::",
      "/POSTS/[POSTID]::DELETE DB action Failure."
    );
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

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
  } catch {
    console.log("[POSTS/{POSTID}]::PATCH");
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
