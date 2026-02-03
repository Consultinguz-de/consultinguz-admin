"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioProps {
  id?: string;
  label: string;
  options: RadioOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  error?: string;
  onClearError?: () => void;
}

export function FormRadio({
  id,
  label,
  options,
  defaultValue,
  value,
  onValueChange,
  error,
  onClearError,
}: FormRadioProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    setTimeout(() => {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleValueChange = (newValue: string) => {
    if (error) onClearError?.();
    onValueChange?.(newValue);
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <Label className={error ? "text-destructive" : ""}>{label}</Label>
      <RadioGroup
        id={id}
        defaultValue={defaultValue}
        value={value}
        onValueChange={handleValueChange}
        className="flex gap-4"
        onFocus={handleFocus}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value} className="font-normal">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
