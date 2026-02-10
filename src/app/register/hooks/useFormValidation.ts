"use client";
import { toast } from "sonner";
import { type FormData, type FormErrors } from "../types";
import {
  validatePersonalInfo as validatePersonalInfoFn,
  validateEducation as validateEducationFn,
  validateLanguageSkills as validateLanguageSkillsFn,
  focusFirstError,
} from "../validators";

interface UseFormValidationProps {
  formData: FormData;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  updateFormData: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
}

export function useFormValidation({
  formData,
  setErrors,
  updateFormData,
}: UseFormValidationProps) {
  const validatePersonalInfo = (): boolean => {
    const result = validatePersonalInfoFn(formData.personalInfo);
    setErrors(result.errors);

    if (!result.isValid && result.firstErrorField) {
      focusFirstError(result.firstErrorField);
    }

    return result.isValid;
  };

  const validateEducation = (): boolean => {
    const result = validateEducationFn(formData.education);

    if (!result.isValid) {
      setErrors((prev) => ({ ...prev, ...result.errors }));
      toast.error("Ta'lim ma'lumotlari to'ldirilishi shart", {
        description:
          "Iltimos, barcha boshlangan bo'limlarni to'liq to'ldiring.",
      });
      if (result.firstErrorField) {
        focusFirstError(result.firstErrorField);
      }
    }

    return result.isValid;
  };

  const validateLanguageSkills = (): boolean => {
    const result = validateLanguageSkillsFn(formData.languageSkills);

    // Clean up empty skills if needed
    if (result.cleanedSkills) {
      updateFormData("languageSkills", result.cleanedSkills);
    }

    if (!result.isValid) {
      // Handle general validation errors
      if (Object.keys(result.errors).length > 0) {
        setErrors((prev) => ({ ...prev, ...result.errors }));
      }

      // Handle German-specific errors with appropriate toast messages
      if (result.germanError === "not_added") {
        toast.error("Nemis tili kiritilishi shart", {
          description:
            "Iltimos, nemis tilini qo'shing va darajasini belgilang.",
        });
      } else if (result.germanError === "no_level") {
        toast.error("Nemis tili darajasi kiritilishi shart", {
          description: "Iltimos, nemis tili darajasini tanlang.",
        });
      } else if (result.germanError === "no_certificate") {
        toast.error("Nemis tili sertifikati kiritilishi shart", {
          description:
            "Iltimos, nemis tili sertifikatini yuklang yoki 'Til sertifikati yo'q' ni belgilang.",
        });
      } else {
        toast.error("Til ma'lumotlari to'liq kiritilishi shart", {
          description:
            "Iltimos, tanlangan til va uning darajasini to'liq kiriting.",
        });
      }

      if (result.firstErrorField) {
        focusFirstError(result.firstErrorField);
      }
    }

    return result.isValid;
  };

  const validateCurrentStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return validatePersonalInfo();
      case 3:
        return validateEducation();
      case 4:
        return validateLanguageSkills();
      default:
        return true;
    }
  };

  return {
    validatePersonalInfo,
    validateEducation,
    validateLanguageSkills,
    validateCurrentStep,
  };
}
