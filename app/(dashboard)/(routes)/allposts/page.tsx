// import { auth, currentUser } from "@clerk/nextjs/server";
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import NavbarMain from "../_components/navbar";

// import {
//   Protect
// } from '@clerk/nextjs';

import { checkRole } from '@/utils/roles';
const AllPosts = async function () {
  const isAdmin = await checkRole('admin');
  return (
    <>
      {
        isAdmin && (
          <p>Admin is logged in.</p>
        )
      }
      <div className="h-[640px] w-full flex flex-col align-middle shadow-sm justify-center">
        ALL POSTS
      </div>
    </>
  );
}

export default AllPosts;