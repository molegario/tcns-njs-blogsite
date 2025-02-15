import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type tParams = Promise<{ postId: string; sectionId: string }>;

export async function PATCH(
  req: Request,
  { params }: { params: tParams }
) {
  try {
    const { userId } = await auth();
    const { postId, sectionId } = await params;

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

    const sectionpatch = await db.section.update({
      where: {
        id: sectionId,
        postId: postId,
      },
      data: {
        isPublished: false,
      },
    });

    const publishedSectionsInPost = await db.section.findMany({
      where: {
        postId: postId,
        isPublished: true,
      },
    });

    if (!publishedSectionsInPost?.length) {
      await db.post.update({
        where: {
          id: postId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(sectionpatch);
  } catch {
    console.error(
      "POSTS/[POSTID]/SECTIONS/[SECTIONID]/UNPUBLISH API DB ACTION FAIL"
    );
    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}
