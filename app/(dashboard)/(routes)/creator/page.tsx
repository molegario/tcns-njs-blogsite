import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

const CreatorPage = async function () {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <>
      <div className="h-[640px] w-full flex flex-col align-middle shadow-sm justify-center">
        CREATOR PAGE
      </div>
    </>
  );
};

export default CreatorPage;
