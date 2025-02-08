import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { checkRole } from '@/utils/roles';

const NavbarMain = async function() {
  const isAdmin = await checkRole('admin');

  return (
    <header className="border-b flex flex-shrink-0 items-center shadow-sm px-5 h-[75px] fixed top-0 z-20 py-1 bg-white w-full gap-x-1">
      <div className="h-full w-[360px] relative pl-0 flex flex-shrink-0 items-center">
        <h1>My App</h1>
      </div>
      <div className="flex gap-x-2 ml-auto">
        <SignedIn>
          {
            isAdmin && (
              <Link href="/creator">
                <Button>Create Posts</Button>
              </Link>
            )
          }
          <Link href="/allposts">
            <Button>All Posts</Button>
          </Link>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
};

export default NavbarMain;
