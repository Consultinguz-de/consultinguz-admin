"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PersonalInfoStep,
  WorkExperienceStep,
  EducationStep,
  LanguageSkillsStep,
  SkillsStep,
  DocumentsStep,
  ConfirmationStep,
} from "./steps";
import { useRegister, STEPS } from "./register-context";

const STEP_COMPONENTS = [
  PersonalInfoStep,
  WorkExperienceStep,
  EducationStep,
  LanguageSkillsStep,
  SkillsStep,
  DocumentsStep,
  ConfirmationStep,
];

export function RegisterForm() {
  const { currentStep, setCurrentStep, validateCurrentStep, clearAllErrors } =
    useRegister();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleFocus = () => setIsKeyboardOpen(true);
    const handleBlur = () => setIsKeyboardOpen(false);

    const handleFocusIn = (e: Event) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        handleFocus();
      }
    };
    const handleFocusOut = (e: Event) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        handleBlur();
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      if (validateCurrentStep()) {
        clearAllErrors();
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    const StepComponent = STEP_COMPONENTS[currentStep - 1];
    if (!StepComponent) return null;
    return <StepComponent />;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Step Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {renderStepContent()}
      </div>

      {/* Done Button - shown when keyboard is open */}
      {isKeyboardOpen && (
        <div className="shrink-0 border-t pt-2 mt-2 bg-card md:hidden">
          <Button
            type="button"
            size="sm"
            className="w-full"
            onClick={() => {
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
              }
            }}
          >
            <Check className="w-4 h-4 mr-2" />
            Tayyor
          </Button>
        </div>
      )}

      {/* Sticky Footer */}
      <div
        className={`shrink-0 border-t pt-2 md:pt-4 mt-2 md:mt-4 bg-card transition-all duration-200 ${isKeyboardOpen ? "hidden md:block" : ""}`}
      >
        {/* Progress Bar */}
        <div className="h-1 bg-muted rounded-full mb-2 md:mb-4">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="text-xs md:text-sm"
          >
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 mr-1" />
            <span className="hidden sm:inline">Orqaga</span>
          </Button>
          <span className="text-xs md:text-sm text-muted-foreground">
            {currentStep} / {STEPS.length}
          </span>
          <Button
            type="button"
            size="sm"
            onClick={handleNext}
            disabled={currentStep === STEPS.length}
            className="text-xs md:text-sm"
          >
            <span className="hidden sm:inline">Oldinga</span>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
