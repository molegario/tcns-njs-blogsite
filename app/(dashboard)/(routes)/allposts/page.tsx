import { checkRole } from '@/utils/roles';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AllPosts = async function () {
  const isAdmin = await checkRole('admin');
  return (
    <>
      <div className="h-[640px] w-full flex flex-col align-middle shadow-sm justify-center">
        ALL POSTS
      </div>
    </>
  );
}

export default AllPosts;