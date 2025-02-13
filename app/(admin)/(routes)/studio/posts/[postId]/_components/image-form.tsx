"use client";

// import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
  postId: string;
  initialData: { imageUrl: string | null; };
}

const ImageForm = ({ initialData, postId }: ImageFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  
  const toggleEdit = () => setIsEditing((edit) => !edit);
  
  const onSubmit = async (values: {
    imageUrl: string;
  }) => {
    try {
      await axios.patch(`/api/posts/${postId}`, values);
      toast.success("Post was updated successfully.");
      toggleEdit();
      router.refresh(); //refresh view
    } catch {
      toast.error("failed to update image form");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Post thumbnail image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2 " />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
              sizes="(max-width: 768px) 100vw"
              placeholder="blur"
              blurDataURL="background"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="postImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
// OLEGARIO PROGRESS TIMESTAMP REF: 2:52:42 https://youtu.be/Big_aFLmekI?t=10362
// imageuploader::completed::OLEGARIO PROGRESS TIMESTAMP REF: 3:16:46 https://youtu.be/Big_aFLmekI?t=11806
