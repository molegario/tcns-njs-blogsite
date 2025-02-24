import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { BookHeart, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import DisplayNameForm from "./_components/displayname-form";
import FullNameForm from "./_components/fullname-form";
import EmailForm from "./_components/email-form";
import ProfileForm from "./_components/profile-form";
import ProfileImageForm from "./_components/profile-image-form";
import { checkRole } from "@/lib/roles";
import AcknowledgeAdminForm from "./_components/acknowledge-admin-form";


const memberPage = async () => {
  const { userId } = await auth();

  const isAdmin = await checkRole("admin");

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
              <div className="flex flex-col gap-y-2 text-slate-200">
                <h1 className="text-2xl font-medium">Member Settings Page</h1>
              </div>
            </div>
            <div className="grid grid-col-1 md:grid-cols-6 gap-6 mt-16">
              <div className="md:col-span-2">
                <div className="flex items-center gap-x-2 text-slate-200">
                  <IconBadge icon={ListChecks} />
                  <h3 className="text-xl">Member Details</h3>
                </div>
                {isAdmin && (
                  <AcknowledgeAdminForm
                    userId={userId}
                    memberId={Member?.id ?? null}
                    initialData={Member}
                  />
                )}
                <FullNameForm
                  userId={userId}
                  memberId={Member?.id ?? null}
                  initialData={Member}
                />
                <DisplayNameForm
                  userId={userId}
                  memberId={Member?.id ?? null}
                  initialData={Member}
                />
                <EmailForm
                  userId={userId}
                  memberId={Member?.id ?? null}
                  initialData={Member}
                />
              </div>
              <div className="md:col-span-4">
                <div className="flex items-center gap-x-2 text-slate-200">
                  <IconBadge icon={BookHeart} />
                  <h3 className="text-xl">Profile Content</h3>
                </div>
                <ProfileForm
                  userId={userId}
                  memberId={Member?.id ?? null}
                  initialData={Member}
                />
                <ProfileImageForm
                  userId={userId}
                  memberId={Member?.id ?? null}
                  initialData={Member}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memberPage;