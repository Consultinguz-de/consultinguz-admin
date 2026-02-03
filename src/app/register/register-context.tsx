"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import {
  type FormData,
  type FormErrors,
  type RegisterContextType,
} from "./types";
import { STEPS, initialFormData } from "./constants";
import {
  validatePersonalInfo as validatePersonalInfoFn,
  validateEducation as validateEducationFn,
  validateLanguageSkills as validateLanguageSkillsFn,
  focusFirstError,
} from "./validators";

export type {
  PersonalInfo,
  WorkExperience,
  EducationData,
  Education,
  LanguageSkill,
  FormData,
  FormErrors,
} from "./types";

export { STEPS } from "./constants";

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined,
);

export function RegisterProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const currentStepData = STEPS.find((s) => s.id === currentStep);
  const currentStepTitle = currentStepData?.title || "";
  const currentStepDescription = currentStepData?.description || "";

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

  const validateCurrentStep = (): boolean => {
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

  const submitForm = () => {
    console.log("Form Data:", formData);
  };

  return (
    <RegisterContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        currentStepTitle,
        currentStepDescription,
        formData,
        updateFormData,
        errors,
        setFieldError,
        clearFieldError,
        clearAllErrors,
        validateCurrentStep,
        submitForm,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegister() {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }
  return context;
}
