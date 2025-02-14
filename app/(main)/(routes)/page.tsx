import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Common Nonsense - Featured Posts",
  description: "The Common Nonsense blog is an online magazine that covers a wide range of topics, from politics to pop culture.",
  keywords: "featured, posts, blog, politics, pop culture",
};

const FeaturedPosts = async function () {
  return (
    <>
      <div className="h-[640px] w-full flex flex-col align-middle shadow-sm justify-center">
        FEATURED POSTS
      </div>
    </>
  );
};

export default FeaturedPosts;
