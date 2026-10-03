-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "publishedYear" INTEGER NOT NULL DEFAULT 0,
    "pages" INTEGER NOT NULL DEFAULT 1,
    "language" TEXT NOT NULL DEFAULT 'English',
    "color" TEXT NOT NULL DEFAULT '#ffffff'
);
INSERT INTO "new_Book" ("author", "id", "image", "language", "name", "pages", "price", "publishedYear") SELECT "author", "id", "image", "language", "name", "pages", "price", "publishedYear" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_image_key" ON "Book"("image");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
