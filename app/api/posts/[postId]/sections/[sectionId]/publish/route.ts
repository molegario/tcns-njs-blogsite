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

    const Section = await db.section.findUnique({
      where: {
        id: sectionId,
        postId: postId,
      },
    });

    if (
      !Section ||
      !Section.title ||
      !Section.description ||
      !Section.imageUrl
    ) {
      return new NextResponse("Missing required fields", { status: 404 });
    }

    const sectionpatch = await db.section.update({
      where: {
        id: sectionId,
        postId: postId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(sectionpatch);
  } catch {
    console.error(
      "POSTS/[POSTID]/SECTIONS/[SECTIONID]/PUBLISH API DB ACTION FAIL"
    );
    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}
