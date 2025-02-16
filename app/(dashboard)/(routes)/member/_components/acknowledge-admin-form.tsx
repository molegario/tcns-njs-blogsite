"use client";

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";

interface AcknowledgeAdminFormProps {
  userId: string;
  memberId: string | null;
  initialData: {
    Privileges: string[];
  } | null;
}

const AcknowledgeAdminForm = ({
  userId,
  memberId,
  initialData,
}: AcknowledgeAdminFormProps) => {
  const Privileges = initialData?.Privileges ?? [];
  const isAdmin = Privileges.map((privilege) =>
    privilege.toLowerCase()
  ).includes("admin");

  const onSubmit = async () => {
    try {
      if (!memberId) {
        await axios.post("/api/members", {
          userId: userId,
          Privileges: ["admin"],
        });
        toast.success("New member entry created successfully");
      } else {
        await axios.patch("/api/members/[memberId]", initialData);
        toast.success("Admin status acknowledged successfully");
      }
    } catch {
      toast.error("Failed to acknowledge admin status");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Acknowledge Admin Status
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-4 mt-4"
      >
        {isAdmin ? (
          <p className="text-sm mt-2">
            You have acknowleged your status as a content creator for this site.
          </p>
        ) : (
          <p className="text-sm mt-2">
            You have been recently been granted content creator status on this
            site but have not acknowledged this privilege. You can either press
            the button below or update any item on this page to do so.
          </p>
        )}
        <div className="flex items-center gap-x-2">
          <Button type="submit" disabled={isAdmin}>
            Acknowledge Admin
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AcknowledgeAdminForm;
