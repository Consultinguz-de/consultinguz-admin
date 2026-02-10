"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { type RegisterContextType } from "./types";
import { STEPS } from "./constants";
import { useFormState, useFormValidation, useFormSubmission } from "./hooks";

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

export function RegisterProvider({
  children,
  directionTitle,
  directionId,
  leadName,
}: {
  children: ReactNode;
  directionTitle?: string;
  directionId?: string;
  leadName?: string;
}) {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    formData,
    errors,
    setErrors,
    updateFormData,
    setFieldError,
    clearFieldError,
    clearAllErrors,
  } = useFormState();

  const { validateCurrentStep } = useFormValidation({
    formData,
    setErrors,
    updateFormData,
  });

  const { isSubmitting, submitForm } = useFormSubmission({
    formData,
    directionTitle,
    directionId,
    leadName,
  });

  const currentStepData = STEPS.find((s) => s.id === currentStep);
  const currentStepTitle = currentStepData?.title || "";
  const currentStepDescription = currentStepData?.description || "";

  return (
    <RegisterContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        currentStepTitle,
        currentStepDescription,
        directionTitle,
        directionId,
        leadName,
        formData,
        updateFormData,
        errors,
        setFieldError,
        clearFieldError,
        clearAllErrors,
        validateCurrentStep: () => validateCurrentStep(currentStep),
        submitForm,
        isSubmitting,
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
