"use client";

import { Badge } from "@/components/ui/badge";

interface ContentStatsProps {
  Posts: ({
    category: {
      name: string;
      id: string;
    } | null;
    comments: {
      text: string;
      name: string | null;
      id: string;
    }[];
  } & {
    id: string;
    title: string;
    isPublished: boolean;
    isFeatured: boolean;
  })[];
}

const ContentStats = ({ Posts }: ContentStatsProps) => {
  const CategoryCollector: string[] = [];
  const PublishedCollector: string[] = [];
  const FeaturedCollector: string[] = [];
  const CommentsCollector: string[] = [];

  Posts.forEach((post) => {
    if (post?.category?.name) {
      if (!CategoryCollector.includes(post?.category?.name)) {
        CategoryCollector.push(post.category.name);
      }
    }
    if (post?.isFeatured) {
      FeaturedCollector.push(post.title);
    }
    if (post?.isPublished) {
      PublishedCollector.push(post.title);
    }
    post.comments.forEach((comment) => {
      if (comment.text) {
        CommentsCollector.push(comment.text);
      }
    });
  });

  return (
    <>
      <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium text-lg flex items-center justify-between">
          Post categories ({CategoryCollector.length})
        </div>
        <div className="flex flex-wrap pt-2 pb-4 gap-1">
          {CategoryCollector.sort().map((category, idx) => (
            <Badge key={`keyword-${idx}`} className="bg-sky-700">
              {category}
            </Badge>
          ))}
        </div>
        <div className="font-medium text-lg flex items-center justify-between pb-4">
          Published posts: {PublishedCollector.length}
        </div>
        <div className="font-medium text-lg flex items-center justify-between pb-4">
          Featured posts: {FeaturedCollector.length}
        </div>
        <div className="font-medium text-lg flex items-center justify-between pb-4">
          Total comments: {CommentsCollector.length}
        </div>
      </div>
    </>
  );
};

export default ContentStats;


