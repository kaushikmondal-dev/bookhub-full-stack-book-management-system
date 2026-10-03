import BookCard from "@/components/Books/BookCard";
import Header from "@/components/Layout/Header";
import { Card, CardContent } from "@/components/shadcnui/card";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | BookHub",
  description: "Home Page of BookHub App",
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
    <>
      <Header />

      <main className="pt-15">
        <section className="grid place-items-center gap-6 pt-8 sm:grid-cols-1 md:grid-cols-4 xl:grid-cols-5">
          {allBooks.map((item) => (
            <BookCard
              key={item.id}
              books={item}
              // showAction (if show buttons)
            />
          ))}

          {/* <ToastButton /> */}
        </section>
      </main>
    </>
  );
};

export default page;
