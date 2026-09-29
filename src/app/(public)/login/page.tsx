import LoginForm from "@/components/LoginForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in | BookHub",
  description: "Sign in Page Of BookHub App",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <div className="flex justify-center gap-1">
            Don&apos;t have an account ?
            <Link
              href="/register"
              className="hover:underline">
              Create
            </Link>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default page;
