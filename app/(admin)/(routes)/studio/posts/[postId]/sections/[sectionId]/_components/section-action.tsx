"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface SectionActionsProps {
  disabled: boolean;
  postId: string;
  sectionId: string;
  isPublished: boolean;
}

const SectionActions = ({
  disabled,
  postId,
  sectionId,
  isPublished,
}: SectionActionsProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/posts/${postId}/sections/${sectionId}`);
      toast.success("Section deleted");
      router.push(`/dashboard/myposts/${postId}`);
      router.refresh();
    } catch {
      toast.error("Failed to delete section");
    } finally {
      setIsLoading(false);
    }
  };

  const onPublish = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/posts/${postId}/sections/${sectionId}/unpublish`
        );
        toast.success("Section unpublished");
      } else {
        await axios.patch(`/api/posts/${postId}/sections/${sectionId}/publish`);
        toast.success("Section published");
      }

      router.refresh();
    } catch {
      toast.error("Failed to publish section");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onPublish}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default SectionActions;
