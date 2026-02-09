"use client";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegister } from "./register-context";

export function RegisterHeader() {
  const {
    currentStep,
    currentStepTitle,
    currentStepDescription,
    directionTitle,
  } = useRegister();

  return (
    <CardHeader className="text-center p-3 md:p-6">
      {currentStep === 1 && directionTitle ? (
        <div className="flex justify-center">
          <div className="rounded-full border border-border bg-muted/60 px-3 py-1 text-[11px] md:text-xs font-semibold uppercase tracking-wide text-foreground">
            {directionTitle}
          </div>
        </div>
      ) : null}
      <CardTitle className="text-lg md:text-2xl">
        {currentStep}. {currentStepTitle}
      </CardTitle>
      <CardDescription className="text-xs md:text-sm">
        {currentStepDescription}
      </CardDescription>
    </CardHeader>
  );
}
