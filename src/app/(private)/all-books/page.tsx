import BookCard from "@/components/Books/BookCard";
import { buttonVariants } from "@/components/shadcnui/button";
import { Card, CardContent } from "@/components/shadcnui/card";
import prisma from "@/lib/dbClient/prisma";
import { UserPenIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Books | BookHub",
  description: "All Books page of BookHub App",
};

const page = async () => {
  const allBooks = await prisma.book.findMany();

  if (allBooks.length === 0) {
    return (
      <section className="grid h-dvh place-items-center">
        <Card>
          <CardContent className="text-6xl">No Books Found </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="">
      <header className="to-[#2447e0 relative flex h-15 items-center justify-center bg-linear-to-r from-[#262730] via-[#474e7d] to-[#7b82ae] px-4 shadow-lg shadow-black/30 sm:px-10">
        <Link
          href={"/"}
          className="absolute left-10 flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl from-blue-500 to-blue-700 shadow-sm">
            <Image
              src="/bookHub.png"
              alt="bookHub"
              height={100}
              width={100}
              sizes="40px"
            />
          </span>
          <h1
            className="text-2xl font-semibold"
            aria-label="App Name">
            <span className="">Book</span>
            <span className="text-blue-600">Hub</span>
          </h1>
        </Link>

        <h1 className="text-center text-3xl font-semibold text-white">
          Create Update And Delete Any Books
        </h1>

        <Link
          href={"/all-books/create-book"}
          className={buttonVariants({
            variant: "secondary",
            size: "sm",
            className: "absolute right-10 border-2 border-r-5 p-2",
          })}>
          <UserPenIcon />
          Create Book
        </Link>
      </header>
      <div className="pt-5">
        <section className="grid place-items-center gap-6 pt-8 sm:grid-cols-1 md:grid-cols-4 xl:grid-cols-5">
          {allBooks.map((item) => (
            <BookCard
              key={item.id}
              books={item}
              showAction
            />
          ))}
        </section>
      </div>
    </section>
  );
};

export default page;
