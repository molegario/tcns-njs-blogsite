"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";


interface NavbarRoutesProps {
  isAdmin: boolean;
};

export const NavbarRoutes = ({
  isAdmin,
}: NavbarRoutesProps) => {

  return (
    <div className="flex gap-x-2 ml-auto">
      <SignedIn>
        {isAdmin && (
          <Link href="/createpost">
            <Button>Create Post</Button>
          </Link>
        )}
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignedIn />
      </SignedOut>
    </div>
  );
};