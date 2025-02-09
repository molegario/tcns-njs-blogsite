import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";
import { checkRole } from "@/lib/roles";

export const Navbar = async () => {
  const isAdmin = await checkRole("admin");

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes isAdmin={isAdmin}/>
    </div>
  );
};