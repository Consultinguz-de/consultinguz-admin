"use client";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegister } from "./register-context";

export function RegisterHeader() {
  const { currentStep, currentStepTitle, currentStepDescription } =
    useRegister();

  return (
    <CardHeader className="text-center p-3 md:p-6">
      <CardTitle className="text-lg md:text-2xl">
        {currentStep}. {currentStepTitle}
      </CardTitle>
      <CardDescription className="text-xs md:text-sm">
        {currentStepDescription}
      </CardDescription>
    </CardHeader>
  );
}
