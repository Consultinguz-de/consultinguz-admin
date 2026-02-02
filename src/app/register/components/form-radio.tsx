"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioProps {
  label: string;
  options: RadioOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function FormRadio({
  label,
  options,
  defaultValue,
  value,
  onValueChange,
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

  return (
    <div className="space-y-2" ref={containerRef}>
      <Label>{label}</Label>
      <RadioGroup
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
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
    </div>
  );
}
