import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard, ListChecks, SquareCheckBig } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import CategoryForm from "./_components/category-form";
import ImageForm from "./_components/image-form";
import IsFeaturedForm from "./_components/isfeatured-form";
import SectionsForm from "./_components/section-form";
import PostAction from "./_components/post-action";
import TagsForm from "./_components/tags-form";
import { checkRole } from "@/lib/roles";

type tParams = Promise<{ postId: string; }>;

const PostsEditorPage = async (
  { params }: { params: tParams }
) => {
  const isAdmin = await checkRole("admin");

  //must be admin to edit posts
  if (!isAdmin) {
    redirect("/");
  }

  const { userId } = await auth();
  const { postId } = await params;

  //must be logged in and identified to edit posts
  if (!userId) {
    return redirect("/");
  }

  //must have a postid to edit
  if (!postId) {
    return redirect("/studio");
  }

  const Post = await db.post.findUnique({
    where: {
      id: postId,
      userId,
    },
    include: {
      sections: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  //must be the owner of the post to edit
  if(!Post) {
    return redirect("/studio");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFields = [
    Post.title,
    Post.description,
    Post.imageUrl,
    Post.categoryId,
    Post.sections.some(section=>section.isPublished),
  ];
  const totalFields = requiredFields.length;
  const filledFields = requiredFields.filter((field) => field).length;
  const completedFields = `(${filledFields}/${totalFields})`;
  const isComplete = requiredFields.every((field) => field);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium text-slate-200">Edit Post</h1>
          <span className="text-sm text-slate-200">
            Complete all fields {completedFields}
          </span>
        </div>
        <PostAction
          disabled={!isComplete}
          postId={postId}
          isPublished={Post.isPublished}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl text-slate-200">Post details</h2>
          </div>
          <TitleForm initialData={Post} postId={Post.id} />
          <CategoryForm
            initialData={Post}
            postId={Post.id}
            options={categories.map(({ name, id }) => ({
              label: name,
              value: id,
            }))}
          />
          <DescriptionForm initialData={Post} postId={Post.id} />
          <ImageForm initialData={Post} postId={Post.id} />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl text-slate-200">Post sections</h2>
            </div>
            <SectionsForm initialData={Post} postId={Post.id} />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={SquareCheckBig} />
              <h2 className="text-xl text-slate-200">Post visibility</h2>
            </div>
            <TagsForm initialData={Post} postId={Post.id} />
            <IsFeaturedForm initialData={Post} postId={Post.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsEditorPage;