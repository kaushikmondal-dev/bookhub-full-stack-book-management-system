import LogoutButton from "@/components/Auth/LogoutButton";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcnui/avatar";
import { buttonVariants } from "@/components/shadcnui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/shadcnui/card";
import { auth } from "@/lib/auth";
import { UserPenIcon } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "User Profile | BookHub",
  description: "User Profile page of BookHub App",
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/login");
  }

  const { email, name, image } = session.user;
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="place-items-center">
          <Avatar className={"size-64"}>
            {image && <AvatarImage src={`/${image}`} />}

            <AvatarFallback className={`text-2xl`}>No Image</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="items-center">
          <div className="text-3xl">Welcome,{name}</div>
          <div className="text-2xl">{email}</div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-1">
          <Link
            href={`/`}
            className={buttonVariants({
              size: "sm",
            })}>
            <UserPenIcon />
            Edit
          </Link>
          <LogoutButton />
        </CardFooter>
      </Card>
    </section>
  );
};

export default page;
