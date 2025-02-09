import { SidebarRoutes } from "./sidebar-routes";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { checkRole } from "@/lib/roles";

export const Sidebar = async function () {
  const isAdmin = await checkRole("admin");

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes isAdmin={isAdmin} />
      </div>
    </div>
  );
};
