import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NavbarMain = () => {
  return (
    <header className="border-b flex flex-shrink-0 items-center shadow-sm px-5 h-[75px] fixed top-0 z-20 py-1 bg-white w-full gap-x-1">
      <div className="h-full w-[360px] relative pl-0 flex flex-shrink-0 items-center">
        <h1>My App</h1>
      </div>
      <div className="flex gap-x-2 ml-auto">
        <SignedIn>
          <Link href="/">
            <Button>Featured Posts</Button>
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default NavbarMain;