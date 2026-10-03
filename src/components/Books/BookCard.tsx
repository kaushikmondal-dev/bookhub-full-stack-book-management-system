import { Book } from "@generated/prisma/client";
import {
  CalendarIcon,
  FileTextIcon,
  ImageIcon,
  LanguagesIcon,
  RefreshCw,
  TagIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Button, buttonVariants } from "../shadcnui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcnui/card";

type BookCardProps = {
  books: Book;
  showAction?: boolean;
};

const BookCard = ({ books, showAction = false }: BookCardProps) => {
  return (
    <Card className="w-64 gap-3 py-4 text-sm">
      <div className="flex justify-center">
        <div className="rounded-md border-2 focus-visible:ring-2">
          <Avatar className="aspect-2/3 h-auto w-28 cursor-pointer rounded-none after:hidden">
            <AvatarImage
              src={`/${books.image}`}
              alt="Cover preview"
              className="rounded-none object-cover"
            />
            <AvatarFallback className="rounded-none">
              <ImageIcon className="size-6 opacity-60" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardHeader className="place-items-center text-center">
        <CardTitle>
          <div className="text-2xl">{books.name}</div>
          <div className="text-xl"> {books.author}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center gap-0.5 rounded-md border p-1.5">
          <LanguagesIcon className="text-muted-foreground size-3" />
          <p className="text-muted-foreground text-[9px]">Language</p>
          <p className="text-[11px] font-medium">{books.language}</p>
        </div>

        <div className="gap-.5 flex flex-col items-center rounded-md border p-1.5">
          <TagIcon className="text-muted-foreground size-3" />
          <p className="text-muted-foreground text-9px">Price</p>
          <p className="text-11px font-medium">{books.price}</p>
        </div>

        <div className="flex flex-col items-center gap-0.5 rounded-md border p-1.5">
          <CalendarIcon className="text-muted-foreground size-3" />
          <p className="text-muted-foreground text-9px">Published</p>
          <p className="text-11px font-medium">{books.publishedYear}</p>
        </div>

        <div className="flex flex-col items-center gap-1 rounded-md border p-1.5">
          <FileTextIcon className="text-muted-foreground size-3" />
          <p className="text-muted-foreground text-9px">Pages</p>
          <p className="text-11px font-medium">{books.pages}</p>
        </div>
      </CardContent>

      {showAction && (
        <CardFooter className="grid grid-cols-2 gap-5">
          <Button variant="destructive">
            <Trash2Icon />
            Delete
          </Button>

          <Link
            href={"/all-books/update-book"}
            className={buttonVariants({ variant: "secondary" })}>
            <RefreshCw />
            Update
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default BookCard;
