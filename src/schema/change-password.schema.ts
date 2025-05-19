import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .trim()
      .min(1, { message: "Old password is required" }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(16, {
        message: "Password is too long",
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters",
      })
      .max(16, {
        message: "Password is too long",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords doesn't match",
    path: ["confirmPassword"],
  });

export type TChangePassword = z.infer<typeof changePasswordSchema>;
