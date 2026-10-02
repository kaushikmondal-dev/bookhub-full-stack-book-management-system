-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "publishedYear" INTEGER NOT NULL DEFAULT 0,
    "pages" INTEGER NOT NULL DEFAULT 1,
    "language" TEXT NOT NULL DEFAULT 'English'
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_image_key" ON "Book"("image");
