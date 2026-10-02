"use server";

import prisma from "@/lib/dbClient/prisma";
import { BookFromType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";

export const createBook = async (bookData: BookFromType) => {
  try {
    await prisma.book.create({
      data: bookData,
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      msg: "Book Created ",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        isSuccess: false,
        msg: "Somthing Want to Worng, try later !!",
      };
    }

    return {
      isSuccess: false,
      msg: "Server Error, Creation Failed !!",
    };
  }
};
