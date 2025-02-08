import { checkRole } from "@/lib/roles";
import { redirect } from "next/navigation";

const StudioPage = async function () {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <>
      <div className="h-[640px] w-full flex flex-col align-middle shadow-sm justify-center">
        Studio PAGE
      </div>
    </>
  );
};

export default StudioPage;
