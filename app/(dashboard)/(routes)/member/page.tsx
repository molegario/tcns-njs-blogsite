import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import DisplayNameForm from "./_components/displayname-form";


const memberPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const Member = await db.member.findUnique({
    where: {
      userId: userId,
    },
  });

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1>Member Settings Page</h1>
              </div>
            </div>
            <div className="grid grid-col-1 md:grid-cols-6 gap-6 mt-16">
              <div className="md:col-span-3">
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={ListChecks} />
                  <h3 className="text-xl">Member Details</h3>
                </div>
                <DisplayNameForm userId={userId} memberId={Member?.id ?? null} initialData={Member}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memberPage;