"use client";

import { Controller, useForm } from "react-hook-form";

import { BookFromType, bookSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, UserPenIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../shadcnui/button";
import { CardContent, CardFooter } from "../shadcnui/card";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const CreateBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      image: "",
      name: "",
      author: "",
      language: "",
      publishedYear: "",
      pages: "",
      price: "",
    },

    mode: "all",
  });

  const CreateBookHandler = async (bookData: BookFromType) => {
    console.log(bookData);
    setIsLoading(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 500));

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(CreateBookHandler)}
      className=""
      noValidate>
      <CardContent>
        {/* Book Name */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Book Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder="Atomic Habits"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Author */}
        <Controller
          name="author"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Author</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder="James Clear"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Cover Image */}
        <Controller
          name="image"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Cover Image URL</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="https://example.com/cover.jpg"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Price / Year / Pages */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Controller
            name="price"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                <Input
                  {...field}
                  value={field.value as number | string}
                  id={field.name}

                  type="number"
                  step="0.01"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="publishedYear"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Published Year</FieldLabel>
                <Input
                  {...field}
                  value={field.value as number | string}
                  id={field.name}
                  type="number"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="pages"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Pages</FieldLabel>
                <Input
                  {...field}
                  value={field.value as number | string}
                  id={field.name}
                  type="number"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Language */}
        <Controller
          name="language"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Language</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder="English"
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
              <Loader2Icon className="animate-spin" /> Creating Book .....
            </>
          : <>
              <UserPenIcon />
              Create
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default CreateBook;
