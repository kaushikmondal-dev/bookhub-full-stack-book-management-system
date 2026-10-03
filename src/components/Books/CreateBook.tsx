"use client";

import { Controller, useForm } from "react-hook-form";

import { BookFromType, bookSchema } from "@/lib/zodSchema";
import { createBook } from "@/server/createBook";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2Icon, UserPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Button } from "../shadcnui/button";
import { CardContent, CardFooter } from "../shadcnui/card";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { toast } from "../shadcnui/toast";

const CreateBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFile, setIsFile] = useState(false);

  const { replace } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      name: "",
      author: "",
      language: "",
      pages: "" as unknown as number,
      price: "" as unknown as number,
      publishedYear: "" as unknown as number,
    },

    mode: "all",
  });

  const { openFilePicker, filesContent, plainFiles } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",

    onFilesSuccessfullySelected: () => setIsFile(true),
    onClear: () => setIsFile(false),
    validators: [
      new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 /*5 MB*/ }),
    ],
  });

  const CreateBookHandler = async (bookData: BookFromType) => {
    setIsLoading(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 500));

    const { isSuccess, msg } = await createBook(bookData, plainFiles[0]);

    if (isSuccess) {
      toast.add({ title: msg, type: "success" });

      reset();

      replace("/all-books");
    } else {
      toast.add({ title: msg, type: "error" });
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(CreateBookHandler)}
      className="grid gap-4"
      noValidate>
      <CardContent className="grid gap-4">
        {/* Cover Image */}
        <div className="flex justify-center">
          {!isFile && (
            <button
              type="button"
              onClick={openFilePicker}

              className="rounded-md border-2 focus-visible:ring-2">
              <Avatar className="aspect-2/3 h-auto w-28 cursor-pointer rounded-none after:hidden">
                <AvatarImage
                  src="https://placehold.co/256.jpeg"
                  alt="Cover preview"
                  className="rounded-none object-cover"
                />
                <AvatarFallback className="rounded-none">
                  <ImageIcon className="size-6 opacity-60" />
                </AvatarFallback>
              </Avatar>
            </button>
          )}

          {filesContent.map(({ size, content, name }) => (
            <button
              key={size}
              type="button"
              onClick={openFilePicker}

              className="rounded-md border-2 focus-visible:ring-2">
              <Avatar className="aspect-2/3 h-auto w-28 cursor-pointer rounded-none after:hidden">
                <AvatarImage
                  src={content}
                  alt="Cover preview"
                  className="rounded-none object-cover"
                />
                <AvatarFallback className="rounded-none">{name}</AvatarFallback>
              </Avatar>
            </button>
          ))}
        </div>

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
                placeholder="Book Name"
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
                placeholder="Author Name"
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
                placeholder="Book Language"
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
          disabled={isSubmitting || !isFile}>
          {isLoading ?
            <>
              <Loader2Icon className="animate-spin" /> Creating Book .....
            </>
          : <>
              <UserPlusIcon />
              Create Book
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default CreateBook;
