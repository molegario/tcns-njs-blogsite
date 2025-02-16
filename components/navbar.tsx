import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { checkRole } from "@/lib/roles";
import { Logo } from "./logo";

const NavbarMain = async function () {
  const isAdmin = await checkRole("admin");

  return (
    <header className="border-b flex flex-shrink-0 items-center shadow-sm px-5 h-[75px] fixed top-0 z-20 py-1 bg-white w-full gap-x-1">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex gap-x-2 ml-auto">
        <SignedIn>
          <Link href="/allposts">
            <Button>Dashboard</Button>
          </Link>

          {isAdmin && (
            <Link href="/studio">
              <Button>Studio</Button>
            </Link>
          )}

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
