import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { checkRole } from "@/lib/roles";
import { auth } from "@clerk/nextjs/server";
import { BookHeart, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { DataTable } from "../../_components/data-table";
import { columns, columnsRedux } from "../../_components/columns";
import ContentStats from "../../_components/content-stats";

const StudioPage = async function () {
  const { userId } = await auth();
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    redirect("/");
  }

  if(!userId) {
    return redirect("/");
  }

  const Posts = await db.post.findMany({
    where: {
      userId: userId,
    },
    include: {
      category: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium text-slate-200">Creator Studio</h1>
              </div>
            </div>
            <div className="grid grid-col-1 md:grid-cols-6 gap-6 mt-16">
              <div className="md:col-span-2">
                <div className="flex items-center gap-x-2 mb-2">
                  <IconBadge icon={ListChecks} />
                  <h3 className="text-xl text-slate-200">Content Statistics</h3>
                </div>
                <ContentStats Posts={Posts} />
              </div>
              <div className="md:col-span-4">
                <div className="flex items-center gap-x-2 mb-6">
                  <IconBadge icon={BookHeart} />
                  <h3 className="text-xl text-slate-200">Content Management</h3>
                </div>
                <div className="hidden md:block">
                  <DataTable columns={columns} data={Posts} />
                </div>
                <div className="block md:hidden">
                  <DataTable columns={columnsRedux} data={Posts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudioPage;
