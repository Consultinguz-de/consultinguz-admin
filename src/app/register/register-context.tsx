"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import {
  type FormData,
  type FormErrors,
  type RegisterContextType,
} from "./types";
import { STEPS, initialFormData } from "./constants";

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
    const newErrors: FormErrors = {};
    const p = formData.personalInfo;

    if (!p.firstName.trim()) newErrors.firstName = "Ism kiritilishi shart";
    if (!p.lastName.trim()) newErrors.lastName = "Familya kiritilishi shart";
    if (!p.gender) newErrors.gender = "Jins tanlanishi shart";
    if (!p.birthDate) newErrors.birthDate = "Tug'ilgan sana kiritilishi shart";
    if (!p.birthPlace) newErrors.birthPlace = "Tug'ilgan joy tanlanishi shart";
    if (!p.maritalStatus)
      newErrors.maritalStatus = "Oilaviy holati tanlanishi shart";
    if (!p.phone.trim() || p.phone.replace(/\D/g, "").length !== 9) {
      newErrors.phone = "Telefon raqam to'liq kiritilishi shart";
    }
    if (!p.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
      newErrors.email = "Email to'g'ri kiritilishi shart";
    }
    if (!p.passport.trim() || !/^[A-Z]{2}\s\d{7}$/.test(p.passport)) {
      newErrors.passport =
        "Passport raqam to'g'ri formatda kiritilishi shart (AB 1234567)";
    }
    if (!p.photo) newErrors.photo = "Rasm yuklanishi shart";
    if (!p.street.trim()) newErrors.street = "Ko'cha kiritilishi shart";
    if (!p.houseNumber.trim())
      newErrors.houseNumber = "Uy raqami kiritilishi shart";
    if (!p.region) newErrors.region = "Viloyat tanlanishi shart";
    if (!p.country) newErrors.country = "Davlat tanlanishi shart";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      element?.focus();
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }

    return true;
  };

  const validateEducation = (): boolean => {
    const { school, college, university } = formData.education;
    const newErrors: FormErrors = {};

    // School validation (required)
    if (!school.startDate) {
      newErrors.school_startDate = "Boshlangan sana kiritilishi shart";
    }
    if (!school.endDate) {
      newErrors.school_endDate = "Tugatilgan sana kiritilishi shart";
    }
    if (!school.institutionName.trim()) {
      newErrors.school_institutionName = "Maktab nomi kiritilishi shart";
    }
    if (!school.document) {
      newErrors.school_document = "Maktab shahodatnomasi yuklanishi shart";
    }

    // College validation (only if has partial data)
    if (college.enabled) {
      const hasCollegeData =
        college.startDate ||
        college.endDate ||
        college.institutionName.trim() ||
        college.direction.trim() ||
        college.document;

      if (hasCollegeData) {
        if (!college.startDate) {
          newErrors.college_startDate = "Boshlangan sana kiritilishi shart";
        }
        if (!college.endDate) {
          newErrors.college_endDate = "Tugatilgan sana kiritilishi shart";
        }
        if (!college.institutionName.trim()) {
          newErrors.college_institutionName = "Kollej nomi kiritilishi shart";
        }
        if (!college.direction.trim()) {
          newErrors.college_direction = "Yo'nalish kiritilishi shart";
        }
        if (!college.document) {
          newErrors.college_document = "Diplom yuklanishi shart";
        }
      }
    }

    // University validation (only if has partial data)
    if (university.enabled) {
      const hasUniversityData =
        university.startDate ||
        university.endDate ||
        university.institutionName.trim() ||
        university.direction.trim() ||
        university.document;

      if (hasUniversityData) {
        if (!university.startDate) {
          newErrors.university_startDate = "Boshlangan sana kiritilishi shart";
        }
        if (!university.endDate) {
          newErrors.university_endDate = "Tugatilgan sana kiritilishi shart";
        }
        if (!university.institutionName.trim()) {
          newErrors.university_institutionName =
            "Universitet nomi kiritilishi shart";
        }
        if (!university.direction.trim()) {
          newErrors.university_direction = "Yo'nalish kiritilishi shart";
        }
        if (!university.document) {
          newErrors.university_document = "Diplom yuklanishi shart";
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      toast.error("Ta'lim ma'lumotlari to'ldirilishi shart", {
        description:
          "Iltimos, barcha boshlangan bo'limlarni to'liq to'ldiring.",
      });
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      element?.focus();
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }

    return true;
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return validatePersonalInfo();
      case 3:
        return validateEducation();
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
