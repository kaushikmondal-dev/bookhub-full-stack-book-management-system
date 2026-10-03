"use server";

import { BookFromType } from "@/lib/zodSchema";
import sharp from "sharp";

export const createBook = async (bookData: BookFromType, imgFile: File) => {
  try {
    const imageName = `${crypto.randomUUID()}.jpeg`;

    const imageArrayBuffer = await imgFile.arrayBuffer();

    await sharp(imageArrayBuffer)
      .resize({
        width: 256,
        height: 256,
      })
      .jpeg({
        mozjpeg: true,
        quality: 97,
      })
      .toFile(`./public/uploads/${imageName}`);
    // await prisma.book.create({
    //   data: bookData,
    // });

    // revalidatePath("/");

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
