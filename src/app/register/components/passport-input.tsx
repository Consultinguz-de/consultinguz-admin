"use client";

import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PassportInputProps {
  id?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  onClearError?: () => void;
}

export function PassportInput({
  id = "passport",
  label = "Passport raqam",
  value = "",
  onChange,
  error,
  onClearError,
}: PassportInputProps) {
  const [passportNumber, setPassportNumber] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  const formatPassport = (input: string): string => {
    // Remove all non-alphanumeric characters
    const cleaned = input.toUpperCase().replace(/[^A-Z0-9]/g, "");

    // Extract letters (first 2) and numbers (up to 7)
    const letters = cleaned.replace(/[0-9]/g, "").slice(0, 2);
    const numbers = cleaned.replace(/[A-Z]/g, "").slice(0, 7);

    // Format as "AB 1234567"
    if (letters && numbers) {
      return `${letters} ${numbers}`;
    } else if (letters) {
      return letters;
    } else if (numbers) {
      return numbers;
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) onClearError?.();
    const formatted = formatPassport(e.target.value);
    setPassportNumber(formatted);
    onChange?.(formatted);
  };

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
      <Label htmlFor={id} className={error ? "text-destructive" : ""}>
        {label}
      </Label>
      <Input
        id={id}
        type="text"
        value={passportNumber}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder="AB 1234567"
        maxLength={10}
        className={
          error ? "border-destructive focus-visible:ring-destructive" : ""
        }
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
