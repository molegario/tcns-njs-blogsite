import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type tParams = Promise<{ postId: string }>;

export async function POST(
  req: Request,
  { params }: { params: tParams }
) {
  try {
    const { userId } = await auth();
    const { postId } = await params;
    const { title }: { title: string } = await req.json();

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

    const lastSection = await db.section.findFirst({
      where: {
        postId: postId,
      },
      orderBy: {
        id: "desc",
      },
    });

    const newPosition = lastSection?.position ? lastSection.position + 1 : 1;

    const section = await db.section.create({
      data: {
        title,
        postId: postId,
        position: newPosition,
      },
    });

    return NextResponse.json(section);
  } catch {
    console.error(
      "POSTS/[POSTID]/SECTIONS API DB ACTION FAIL"
    );

    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}
