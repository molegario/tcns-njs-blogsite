import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type tParams = Promise<{ postId: string, sectionId: string }>;

export async function DELETE(
  req: Request,
  { params }: { params: tParams }
) {
  try {
    const { userId } = await auth();
    const { postId, sectionId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const postOwner = await db.post.findUnique({
      where: {
        id: postId,
        userId: userId,
      },
    });

    if (!postOwner) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const Section = await db.section.findUnique({
      where: {
        id: sectionId,
        postId: postId,
      },
    });

    if (!Section) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedSection = await db.section.delete({
      where: {
        id: sectionId,
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

    return NextResponse.json(deletedSection);
  } catch {
    console.error(
      "POSTS/[POSTID]/SECTIONS/[SECTIONID]::DELETE API DB ACTION FAIL"
    );

    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}

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

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { isPublished, ...values } = await req.json();
    /* eslint-enable @typescript-eslint/no-unused-vars */

    const postOwner = await db.post.findUnique({
      where: {
        id: postId,
        userId: userId,
      },
    });

    if (!postOwner) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const section = await db.section.update({
      where: {
        id: sectionId,
        postId: postId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(section);
  } catch {
    console.error(
      "POSTS/[POSTID]/SECTIONS/[SECTIONID]::PATCH API DB ACTION FAIL"
    );

    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}
