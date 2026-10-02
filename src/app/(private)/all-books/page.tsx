import BookCard from "@/components/Books/BookCard";
import { Card, CardContent } from "@/components/shadcnui/card";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";

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
    <section className="grid place-items-center gap-8 pt-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {allBooks.map((item) => (
        <BookCard key={item.id} />
      ))}
    </section>
  );
};

export default page;
