"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  // FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { EyeIcon, Pencil, EyeClosed } from "lucide-react";
import { useState } from "react";
// import { cn } from "@/lib/utils";
// import { Textarea } from "@/components/ui/textarea";
import { Post } from "@prisma/client";
// import Editor from "@/components/editor";
// import Preview from "@/components/preview";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface IsFeaturedFormProps {
  initialData: Post;
  postId: string;
}

const formSchema = z.object({
  isFeatured: z.boolean().default(false),
});

const IsFeaturedForm = ({ initialData, postId }: IsFeaturedFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((edit) => !edit);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFeatured: !!initialData?.isFeatured,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/posts/${postId}`, values);
      toast.success("Purveyor flag was updated successfully.");
      toggleEdit();
      router.refresh(); //refresh view
    } catch {
      toast.error("failed to update purveyor form");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Featured status
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit featured status
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.isFeatured && "text-slate-500 italic"
          )}
        >
          {initialData?.isFeatured ? (
            <div className="flex flex-row items-center">
              <EyeIcon className="mr-2" />
              <div className="flex flex-row items-center">
                Post is featured.
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center">
              <EyeClosed className="mr-2" />
              <div className="flex flex-row items-center">
                Post is not featured.
              </div>
            </div>
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
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Check this box if you want the post featured.
                  </FormDescription>
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

export default IsFeaturedForm;
// OLEGARIO PROGRESS TIMESTAMP REF: 2:52:42 https://youtu.be/Big_aFLmekI?t=10362
