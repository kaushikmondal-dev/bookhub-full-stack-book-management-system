"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";
import sharp from "sharp";

const updateUserAvatar = async (
  prevImageUrl: string | null | undefined,
  newImgFile: File,
) => {
  try {
    if (prevImageUrl !== null) {
      await rm(`./public/${prevImageUrl}`);

      const imageName = `${crypto.randomUUID()}.jpeg`;
      const imageArrayBuffer = await newImgFile.arrayBuffer();

      await sharp(imageArrayBuffer)
        .resize({ width: 256, height: 256 })
        .jpeg({ mozjpeg: true, quality: 97 })
        .toFile(`./public/uploads/${imageName}`);

      const imageUrl = `uploads/${imageName}`;

      await auth.api.updateUser({
        headers: await headers(),
        body: { image: imageUrl },
      });

      revalidatePath("/", "layout");
      return { isSuccess: true, msg: "Avatar Update" };
    }

    return { isSuccess: false, msg: "Avater Not Updated" };
  } catch (error) {
    if (error instanceof Error) {
      return {
        isSuccess: false,
        msg: "Update Failed try later !!",
      };
    }
    return {
      isSuccess: false,
      msg: "Creation Failed server  error !!",
    };
  }
};

export default updateUserAvatar;
