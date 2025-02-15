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
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface EmailFormProps {
  userId: string;
  memberId: string | null;
  initialData: {
    email: string | null;
  } | null;
}

const formSchema = z.object({
  email: z.string().min(3, {
    message: "Email must be at least 3 characters long",
  }).email("Invalid email address"),
});

const EmailForm = ({
  userId,
  memberId,
  initialData,
}: EmailFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: initialData?.email ?? "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!memberId) {
        // create new member entry
        await axios.post(`/api/members`, {
          ...values,
          userId: userId,
        });
        toast.success("New member entry created successfully");
      } else {
        // update existing member entry
        await axios.patch(`/api/members/${memberId}`, values);
        toast.success("Member email updated successfully");
      }

      toggleEdit();
      router.refresh();
    } catch {
      if (!memberId) {
        toast.error("Failed to create new member entry");
      } else {
        toast.error("Failed to update email");
      }
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Your Contact Email
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit email
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData?.email && "text-slate-500 italic"
          )}
        >
          {initialData?.email || "No email provided"}
        </p>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g 'm.d.doe@gmail.com', 'mike@me.com', 'Lebouski@balls.edu'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
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

export default EmailForm;
