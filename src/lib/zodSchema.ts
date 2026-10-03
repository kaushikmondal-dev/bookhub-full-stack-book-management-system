import { z } from "zod";

/* ---------- Auth: /register ---------- */
export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().trim().toLowerCase().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "Password didn't match",
    path: ["confirmPassword"],
  });

/* ---------- Auth: /login ---------- */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address")
    .max(64, { error: "Email must not exceed 64 characters" }),

  password: z
    .string()
    .min(8, "Password must be minium 8 characters")
    .max(128, { error: "Password must not be exceed 128 characters" }),

  rememberMe: z.boolean().optional(),
});

/* ---------- Types ---------- */
export type RegisterType = z.infer<typeof registerSchema>;
export type LoginType = z.infer<typeof loginSchema>;

/*------------Books -----------*/
export const bookSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Book name is required")
    .max(150, "Book name is too long"),

  author: z
    .string()
    .trim()
    .min(1, "Author name is required")
    .max(100, "Author name is too long"),

  price: z.coerce.number().min(0, "Price can't be negative"),

  publishedYear: z.coerce
    .number()
    .int("Year must be a whole number")
    .min(1000, "Invalid year")
    .max(new Date().getFullYear(), "Year can't be in the future"),

  pages: z.coerce
    .number()
    .int("Pages must be a whole number")
    .min(1, "Pages must be at least 1"),

  language: z
    .string()
    .trim()
    .min(1, "Language is required")
    .max(50, "Language name is too long"),

  color: z.string().default("#ffffff"),
});

export type BookFromType = z.infer<typeof bookSchema>;
