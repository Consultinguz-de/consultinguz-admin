import { type FormErrors } from "../types";

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
  firstErrorField?: string;
}

export const focusFirstError = (fieldId: string) => {
  const element = document.getElementById(fieldId);
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
};
