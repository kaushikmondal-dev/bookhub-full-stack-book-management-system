"use server";

import prisma from "@/lib/dbClient/prisma";
import { BookFromType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";
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

    const imageUrl = `uploads/${imageName}`;

    await prisma.book.create({
      data: {
        name: bookData.name,
        image: imageUrl,
        author: bookData.author,
        price: bookData.price,
        publishedYear: bookData.publishedYear,
        pages: bookData.pages,
        language: bookData.language,
        // color: bookData.color,
      },
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
