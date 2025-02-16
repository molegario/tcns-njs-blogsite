"use client";

import { LayoutGrid, PencilRuler, PersonStanding, Star } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const adminRoutes = [
  {
    icon: PencilRuler,
    label: "Studio",
    href: "/studio",
  },
];

const guestRoutes = [
  {
    icon: Star,
    label: "Featured Posts",
    href: "/",
  },
  {
    icon: LayoutGrid,
    label: "Dashboard",
    href: "/allposts",
  },
  {
    icon: PersonStanding,
    label: "Member Settings",
    href: "/member",
  },
];

interface SidebarRoutesProps {
  isAdmin: boolean;
};

export const SidebarRoutes = ({
  isAdmin,
}: SidebarRoutesProps) => {
  
  const routes = isAdmin ? 
    adminRoutes.concat(guestRoutes) : 
    guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
        />
      ))}
    </div>
  );
};
