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
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TitleFormProps {
  initialData: {
    title?: string;
  } | null;
  postId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "A title of more than 1 character is required.",
  }),
});

const SectionTitleForm = ({ initialData, postId }: TitleFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((edit) => !edit);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/posts/${postId}`, values);
      toast.success("Post was updated successfully.");
      toggleEdit();
      router.refresh(); //refresh view
    } catch {
      toast.error("failed to update title form");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Post title
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData?.title && "text-slate-500 italic"
          )}
        >
          {initialData?.title || "No section title provided"}
        </p>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. `Looking for a guy with a truck ...`"
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
      )}
    </div>
  );
};

export default SectionTitleForm;
// OLEGARIO PROGRESS TIMESTAMP REF:: https://youtu.be/Big_aFLmekI?t=9292
