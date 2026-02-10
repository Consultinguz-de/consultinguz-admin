"use client";
import { useState } from "react";
import { type FormData, type FormErrors } from "../types";
import { initialFormData } from "../constants";

export function useFormState() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const updateFormData = <K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const setFieldError = (field: string, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const clearFieldError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    updateFormData,
    setFieldError,
    clearFieldError,
    clearAllErrors,
  };
}
