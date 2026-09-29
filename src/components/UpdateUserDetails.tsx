"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, UserPenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "./shadcnui/button";
import { CardContent, CardFooter } from "./shadcnui/card";
import { Field, FieldError, FieldLabel } from "./shadcnui/field";
import { Input } from "./shadcnui/input";
import { toast } from "./shadcnui/toast";

type UpdateNameFormProps = {
  prevName: string;
};

const nameSchema = z.object({
  name: z.string().min(5, { error: "Minimun 5 Characters" }),
});
const UpdateUserDetails = ({ prevName }: UpdateNameFormProps) => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: prevName,
    },
    mode: "all",
  });

  const updateNameHandler = async ({ name }: z.infer<typeof nameSchema>) => {
    setIsLoading(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    const { error } = await authClient.updateUser({
      name,
    });
    if (error) {
      toast.add({
        type: "error",
        title: error.message,
      });
    } else {
      toast.add({
        type: "success",
        title: "Name Updated ✅",
      });
    }
    reset();
    push("/");

    setIsLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit(updateNameHandler)}
      className="grid gap-4"
      noValidate>
      <CardContent>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder="Enter Your Name"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>
      <CardFooter>
        <Button
          type="submit"

          size="lg"

          className={"w-full"}
          disabled={isSubmitting || !isDirty}>
          {isLoading ?
            <>
              <Loader2Icon className="animate-spin" /> Updating Name .....
            </>
          : <>
              <UserPenIcon />
              Update
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default UpdateUserDetails;
