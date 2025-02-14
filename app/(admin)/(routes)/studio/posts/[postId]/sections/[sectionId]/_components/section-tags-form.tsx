"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Hash, Pencil } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface TagsFormProps {
  postId: string;
  sectionId: string;
  initialData: {
    tags: string | null;
  } | null;
}

const formSchema = z.object({
  tags: z.string().min(3, {
    message: "Tag string must be at least 3 characters long",
  }),
});

const SectionTagsForm = ({ initialData, postId, sectionId }: TagsFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: initialData?.tags ?? undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/posts/${postId}/sections/${sectionId}`, values);
      toast.success("Section tags updated successfully");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Failed to update section tags");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Section tags
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil size={16} />
              Edit tags
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <>
          {!initialData?.tags || initialData?.tags?.length === 0 ? (
            <p className="text-sm mt-2 text-slate-500 italic">
              No tags provided
            </p>
          ) : (
            <div className="flex flex-wrap pt-2 gap-1">
              {initialData?.tags?.split(",")?.map((tag, idx) => (
                <Badge
                  key={`keyword-${idx}`}
                >
                  <Hash size={10} />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="e.g. 'poutine, canada, food, restaurants'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
        </>
      )}
    </div>
  );
};

export default SectionTagsForm;
