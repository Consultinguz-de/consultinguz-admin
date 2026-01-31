import { z } from "zod";
import { VALIDATION_MESSAGES } from "@/constants/messages";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.EMAIL_REQUIRED)
    .email(VALIDATION_MESSAGES.EMAIL_INVALID)
    .refine((email) => email.endsWith("@gmail.com"), {
      message: VALIDATION_MESSAGES.EMAIL_NOT_GMAIL,
    }),
  password: z
    .string()
    .min(1, VALIDATION_MESSAGES.PASSWORD_REQUIRED)
    .min(6, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH),
});

export type LoginFormData = z.infer<typeof loginSchema>;
