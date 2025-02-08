"use client";


import { FileStack, Pencil, PencilRuler, Star } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: PencilRuler,
    label: "Studio",
    href: "/studio",
  },
  {
    icon: FileStack,
    label: "All Posts",
    href: "/allposts",
  },
  {
    icon: Star,
    label: "Featured Posts",
    href: "/",
  },
];

export const SidebarRoutes = () => {

  const routes = guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {
        routes.map((route)=>(
          <SidebarItem 
            key={route.href}
            label={route.label}
            icon={route.icon}
            href={route.href}
          />
        ))
      }
    </div>
  );
};