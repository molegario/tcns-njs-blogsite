import { db } from "@/lib/db";
import { checkRole } from "@/lib/roles";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, LayoutDashboard, SquareCheckBig } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import SectionActions from "./_components/section-action";
import { IconBadge } from "@/components/icon-badge";
import SectionTitleForm from "./_components/section-title-form";
import SectionTagsForm from "./_components/section-tags-form";
import SectionContentForm from "./_components/section-content-form";
import SectionImageForm from "./_components/section-image-form";

type tParams = Promise<{ postId: string; sectionId: string; }>;

const SectionEditorPage = async (
  { params }: { params: tParams }
) => {
  const isAdmin = await checkRole("admin");

  //must be admin to edit sections
  if (!isAdmin) {
    redirect("/");
  }

  const { userId } = await auth();
  const { postId, sectionId } = await params;

  //must be logged in and identified to edit sections
  if (!userId) {
    return redirect("/");
  }

  //must have a postid and sectionid to edit
  if (!postId || !sectionId) {
    return redirect("/studio");
  }

  const Post = await db.post.findUnique({
    where: {
      id: postId,
      userId,
    },
  });

  //must be the owner of the post to edit
  if (!Post) {
    return redirect("/studio");
  }

  const Section = await db.section.findUnique({
    where: {
      id: sectionId,
      postId: postId,
    },
  });

  const requiredFields = [
    Section?.title,
    Section?.description,
    Section?.imageUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter((field) => field).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isCompleted = totalFields === completedFields;

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/studio/posts/${postId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6 text-slate-200"
            >
              <ArrowLeft className="h-6 w-6 mr-2 text-sm" />
              Back to post:{" "}
              <h2 className="font-bold italic">&quot;{Post.title}&quot;</h2>
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2 text-slate-200">
                <h1 className="text-2xl font-medium">Edit Post Section</h1>
                <span className="text-sm">
                  Complete all fields {completionText}
                </span>
              </div>
              <SectionActions
                disabled={!isCompleted}
                postId={postId}
                sectionId={sectionId}
                isPublished={Section?.isPublished ? true : false}
              />
            </div>
            <div className="grid grid-col-1 md:grid-cols-6 gap-6 mt-16">
              <div className="md:col-span-2">
                <div className="flex items-center gap-x-2 text-slate-200">
                  <IconBadge icon={SquareCheckBig} />
                  <h3 className="text-xl">Section Details</h3>
                </div>
                <SectionTitleForm
                  postId={postId}
                  sectionId={sectionId}
                  initialData={Section}
                />
                <SectionTagsForm
                  postId={postId}
                  sectionId={sectionId}
                  initialData={Section}
                />
              </div>
              <div className="md:col-span-4">
                <div className="flex items-center gap-x-2 text-slate-200">
                  <IconBadge icon={LayoutDashboard} />
                  <h3 className="text-xl">Section Content</h3>
                </div>
                <SectionContentForm
                  postId={postId}
                  sectionId={sectionId}
                  initialData={Section}
                />
                <SectionImageForm
                  postId={postId}
                  sectionId={sectionId}
                  initialData={Section}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionEditorPage;