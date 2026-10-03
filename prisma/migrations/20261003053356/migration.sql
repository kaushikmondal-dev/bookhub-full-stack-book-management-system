/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Book_image_key" ON "Book"("image");
