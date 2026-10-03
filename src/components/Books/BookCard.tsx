import { RefreshCw, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "../shadcnui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../shadcnui/card";

const BookCard = () => {
  return (
    <Card className="w-sm">
      <CardHeader className="place-items-center text-center">
        <Image
          src={"/"}
          alt={"/"}
          width={100}
          height={200}
          className="rounded-md object-cover"
        />
      </CardHeader>
      <CardContent className="text-center">
        <span className="text-xl">Book Name</span>
        <span className="text-xl">Author Name</span>
      </CardContent>
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
    </Card>
  );
};

export default BookCard;
