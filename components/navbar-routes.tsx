"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const NavbarRoutes = () => {

  return (
    <div className="flex gap-x-2 ml-auto">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignedIn />
      </SignedOut>
    </div>
  );
};