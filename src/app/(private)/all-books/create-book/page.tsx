import CreateBook from "@/components/Books/CreateBook";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Book | BookHub",
  description: "Create Book page of BookHub App",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Book</CardTitle>
        </CardHeader>
        <CreateBook />
      </Card>
    </section>
  );
};

export default page;
