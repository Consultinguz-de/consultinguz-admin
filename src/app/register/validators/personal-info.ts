import { z } from "zod";
import { type PersonalInfo, type FormErrors } from "../types";
import { type ValidationResult } from "./types";
import {
  MAX_PDF_SIZE_BYTES,
  MAX_PHOTO_SIZE_BYTES,
  PDF_SIZE_ERROR,
  PHOTO_SIZE_ERROR,
} from "../utils/file-constraints";

const personalInfoSchema = z.object({
  firstName: z
    .string({ error: "Ism kiritilishi shart" })
    .min(1, "Ism kiritilishi shart")
    .refine((val) => val.trim().length > 0, "Ism kiritilishi shart"),
  lastName: z
    .string({ error: "Familya kiritilishi shart" })
    .min(1, "Familya kiritilishi shart")
    .refine((val) => val.trim().length > 0, "Familya kiritilishi shart"),
  gender: z
    .string({ error: "Jins tanlanishi shart" })
    .min(1, "Jins tanlanishi shart"),
  birthDate: z
    .date({ error: "Tug'ilgan sana kiritilishi shart" })
    .optional()
    .refine((val) => val !== undefined, "Tug'ilgan sana kiritilishi shart"),
  birthPlace: z
    .string({ error: "Tug'ilgan joy tanlanishi shart" })
    .optional()
    .refine((val) => val !== undefined, "Tug'ilgan joy tanlanishi shart"),
  maritalStatus: z
    .string({ error: "Oilaviy holati tanlanishi shart" })
    .min(1, "Oilaviy holati tanlanishi shart"),
  phone: z
    .string({ error: "Telefon raqam to'liq kiritilishi shart" })
    .min(1, "Telefon raqam to'liq kiritilishi shart")
    .refine(
      (val) => val.replace(/\D/g, "").length === 9,
      "Telefon raqam to'liq kiritilishi shart",
    ),
  email: z
    .string({ error: "Email to'g'ri kiritilishi shart" })
    .min(1, "Email to'g'ri kiritilishi shart")
    .email("Email to'g'ri kiritilishi shart"),
  passport: z
    .string({
      error: "Passport raqam to'g'ri formatda kiritilishi shart (AB 1234567)",
    })
    .min(1, "Passport raqam to'g'ri formatda kiritilishi shart (AB 1234567)")
    .regex(
      /^[A-Z]{2}\s\d{7}$/,
      "Passport raqam to'g'ri formatda kiritilishi shart (AB 1234567)",
    ),
  photo: z
    .instanceof(File, { message: "Rasm yuklanishi shart" })
    .optional()
    .refine((val) => val !== undefined, "Rasm yuklanishi shart")
    .refine(
      (val) => !val || val.size <= MAX_PHOTO_SIZE_BYTES,
      PHOTO_SIZE_ERROR,
    ),
  passportFile: z
    .instanceof(File, { message: "Passport nusxasi yuklanishi shart" })
    .optional()
    .refine((val) => val !== undefined, "Passport nusxasi yuklanishi shart")
    .refine(
      (val) => !val || val.size <= MAX_PDF_SIZE_BYTES,
      PDF_SIZE_ERROR,
    ),
  street: z
    .string({ error: "Ko'cha kiritilishi shart" })
    .min(1, "Ko'cha kiritilishi shart")
    .refine((val) => val.trim().length > 0, "Ko'cha kiritilishi shart"),
  houseNumber: z
    .string({ error: "Uy raqami kiritilishi shart" })
    .min(1, "Uy raqami kiritilishi shart")
    .refine((val) => val.trim().length > 0, "Uy raqami kiritilishi shart"),
  region: z
    .string({ error: "Viloyat tanlanishi shart" })
    .optional()
    .refine((val) => val !== undefined, "Viloyat tanlanishi shart"),
  country: z
    .string({ error: "Davlat tanlanishi shart" })
    .optional()
    .refine((val) => val !== undefined, "Davlat tanlanishi shart"),
});

export const validatePersonalInfo = (
  personalInfo: PersonalInfo,
): ValidationResult => {
  const result = personalInfoSchema.safeParse(personalInfo);

  if (result.success) {
    return {
      isValid: true,
      errors: {},
    };
  }

  const errors: FormErrors = {};
  result.error.issues.forEach((issue) => {
    const field = issue.path[0] as string;
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  });

  const errorKeys = Object.keys(errors);
  return {
    isValid: false,
    errors,
    firstErrorField: errorKeys[0],
  };
};
