"use client";
import Editor from "@/components/md-editor";
import Preview from "@/components/md-preview";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SectionContentFormProps {
  initialData: {
    description: string | null;
  } | null;
  postId: string;
  sectionId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "A description of more than 1 character is required.",
  }),
});

const SectionContentForm = ({
  initialData,
  postId,
  sectionId,
}: SectionContentFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((edit) => !edit);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description ?? undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/posts/${postId}/sections/${sectionId}`, values);
      toast.success("Section content was updated successfully.");
      toggleEdit();
      router.refresh(); // Refresh view
    } catch {
      toast.error("Failed to update section content");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Section content
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit section content
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.description && "text-slate-500 italic"
          )}
        >
          {!initialData?.description ? (
            "No content has been set."
          ) : (
            <Preview value={initialData?.description} />
          )}
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default SectionContentForm;
