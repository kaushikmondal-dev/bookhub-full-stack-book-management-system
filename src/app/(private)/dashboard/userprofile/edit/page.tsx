import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import UpadateUserAvatar from "@/components/UpadateUserAvatar";
import UpdateUserDetails from "@/components/UpdateUserDetails";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit User Profile | BookHub ",
  description: "Edit User Page of BookHub App",
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/login");
  }
  const { name, email, image } = session.user;

  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl">
            Update User Avatar
          </CardTitle>
        </CardHeader>
        <UpadateUserAvatar prevImageUrl={image} />
      </Card>

      <Card>
        <CardHeader className="w-sm">
          <CardTitle>Update User Details</CardTitle>
        </CardHeader>
        <UpdateUserDetails />
      </Card>
    </section>
  );
};

export default page;
