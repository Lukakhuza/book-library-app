import { z } from "zod";
import { Buffer } from "buffer";

// keep in sync with the front end.
export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .email("Enter a valid email")
  .max(254);

// keep in sync with the front end.
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .refine((p) => Buffer.byteLength(p) <= 72, "Password too long");

export const signupSchema = z.object({
  email: emailSchema,
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  password: passwordSchema,
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number")
    .or(z.literal(""))
    .optional(),
});

export const signupFormSchema = signupSchema
  .extend({
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
