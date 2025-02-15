import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type tParams = Promise<{ memberId: string }>;

export async function PATCH(
  req: Request,
  { params }: { params: tParams }
) {
  try {
    const { userId } = await auth();
    const { memberId } = await params;
    const {
      userId: _userId,
      ...values
    } = await req.json();

    if (!userId && userId !== _userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const post = await db.member.update({
      where: {
        id: memberId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(post);
  } catch {
    console.log("[MEMBERS/{MEMBERID}]::PATCH");
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
