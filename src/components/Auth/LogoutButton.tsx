"use client";

import { authClient } from "@/lib/auth-client";
import { Loader2Icon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../shadcnui/button";
import { toast } from "../shadcnui/toast";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { replace } = useRouter();
  const logoutHandler = async () => {
    setIsLoading(true);

    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    const { error } = await authClient.signOut();

    if (error) {
      toast.add({
        type: "error",
        title: error.message,
      });
    } else {
      toast.add({
        type: "success",
        title: "Logout Successful✅",
      });

      replace("/login");
    }
  };

  return (
    <Button
      onClick={logoutHandler}
      className="w-full"
      variant="destructive"
      type="submit"
      disabled={isLoading}>
      {isLoading ?
        <>
          <Loader2Icon className="animate-spin" />
          Logging Out...
        </>
      : <>
          <LogOut />
          Logout
        </>
      }
    </Button>
  );
};

export default LogoutButton;
