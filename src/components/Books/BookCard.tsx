import { RefreshCw, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../shadcnui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcnui/card";

const BookCard = () => {
  return (
    <Card className="w-sm">
      <CardHeader className="place-items-center text-center">
        <CardTitle className="text-2xl">Book Name</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
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
