"use client";

import { deleteBook } from "@/server/deleteBook";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../shadcnui/button";
import { toast } from "../shadcnui/toast";

type DeleteBookButtonProps = {
  bookId: string;
  bookImage: string;
};

const DeleteBookButton = ({ bookId, bookImage }: DeleteBookButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { refresh } = useRouter();

  const deleteBookHandler = async () => {
    setIsLoading(true);

    await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    const { isSuccess, msg } = await deleteBook(bookId, bookImage);

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

    setIsLoading(false);
  };

  return (
    <Button
      className="w-full"
      type="button"
      onClick={deleteBookHandler}
      variant="destructive"
      disabled={isLoading}>
      {isLoading ?
        <>
          <Loader2Icon className="animate-spin" />
          Deleting....
        </>
      : <>
          <Trash2Icon />
          Delete
        </>
      }
    </Button>
  );
};

export default DeleteBookButton;
