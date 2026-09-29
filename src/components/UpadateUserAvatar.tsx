"use client";

import updateUserAvatar from "@/server/updateUserAvatar";
import { ImageUp, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcnui/avatar";
import { Button } from "./shadcnui/button";
import { CardContent, CardFooter } from "./shadcnui/card";
import { toast } from "./shadcnui/toast";

type UpadateUserAvatarProps = {
  prevImageUrl: string | null | undefined;
};

const UpadateUserAvatar = ({ prevImageUrl }: UpadateUserAvatarProps) => {
  const [isFile, setIsFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { refresh } = useRouter();

  const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",

    onFilesSuccessfullySelected: () => setIsFile(true),
    onClear: () => setIsFile(false),

    validators: [
      new FileSizeValidator({ maxFileSize: 4 * 1024 * 1024 /*1MB*/ }),
    ],
  });

  const UpadateUserAvatarHandler = async () => {
    setIsLoading(true);

    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    const { isSuccess, msg } = await updateUserAvatar(
      prevImageUrl,
      plainFiles[0],
    );

    if (isSuccess) {
      toast.add({
        title: msg,
      });
      refresh();
    } else {
      toast.add({
        title: msg,
      });
    }

    clear();
    setIsLoading(false);

    setIsLoading(false);
  };

  return (
    <>
      <CardContent className="items-center">
        <button
          type="button"
          onClick={openFilePicker}
          className="grid place-items-center">
          {!isFile && (
            <Avatar className={"size-64"}>
              {prevImageUrl && <AvatarImage src={`/${prevImageUrl}`} />}
              <AvatarFallback className={`text-3xl`}>No Image</AvatarFallback>
            </Avatar>
          )}

          {filesContent.map(({ size, content, name }) => (
            <Avatar
              key={size}
              className="size-64">
              <AvatarImage src={content} />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
          ))}
        </button>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          onClick={UpadateUserAvatarHandler}
          disabled={!isFile || isLoading}
          size={"lg"}
          className={"w-full"}>
          {isLoading ?
            <>
              <Loader2Icon className="animate-spin" />
              Updaiong Avatar
            </>
          : <>
              <ImageUp />
              Update
            </>
          }
        </Button>
      </CardFooter>
    </>
  );
};

export default UpadateUserAvatar;
