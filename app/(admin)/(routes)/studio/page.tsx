import { IconBadge } from "@/components/icon-badge";
import { checkRole } from "@/lib/roles";
import { BookHeart, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";

const StudioPage = async function () {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Creator Studio</h1>
              </div>
            </div>
            <div className="grid grid-col-1 md:grid-cols-6 gap-6 mt-16">
              <div className="md:col-span-2">
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={ListChecks} />
                  <h3 className="text-xl">Content Statistics</h3>
                </div>
              </div>
              <div className="md:col-span-4">
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={BookHeart} />
                  <h3 className="text-xl">Content Management</h3>
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
