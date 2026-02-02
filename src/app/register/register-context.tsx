"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export const STEPS = [
  {
    id: 1,
    title: "Shaxsiy ma'lumotlar",
    description:
      "Ismingiz, tug'ilgan sanangiz va boshqa shaxsiy ma'lumotlarni kiriting",
  },
  {
    id: 2,
    title: "Ish tajribasi",
    description: "Oldingi ish joylaringiz va lavozimlaringiz haqida ma'lumot",
  },
  {
    id: 3,
    title: "Ta'lim",
    description: "Ta'lim muassasalari va olgan darajalaringiz",
  },
  {
    id: 4,
    title: "Til bilish darajasi",
    description: "Qaysi tillarni bilishingiz va darajangizni belgilang",
  },
  {
    id: 5,
    title: "Qobilyatlar",
    description: "Texnik va boshqa ko'nikmalaringizni kiriting",
  },
  { id: 6, title: "Xujjatlar", description: "Kerakli hujjatlarni yuklang" },
  {
    id: 7,
    title: "Tasdiqlash",
    description: "Barcha ma'lumotlarni tekshirib, tasdiqlang",
  },
];

interface RegisterContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  currentStepTitle: string;
  currentStepDescription: string;
}

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined,
);

export function RegisterProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);

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
