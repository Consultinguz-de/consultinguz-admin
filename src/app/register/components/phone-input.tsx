"use client";

import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PhoneInputProps {
  id?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function PhoneInput({
  id = "phone",
  label = "Telefon raqam",
  value = "",
  onChange,
}: PhoneInputProps) {
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [isValid, setIsValid] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const formatPhoneNumber = (input: string): string => {
    const digits = input.replace(/\D/g, "").slice(0, 9);
    
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    } else if (digits.length <= 7) {
      return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
    } else {
      return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`;
    }
  };

  const validatePhone = (input: string): boolean => {
    const digits = input.replace(/\D/g, "");
    return digits.length === 9;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    setIsValid(validatePhone(formatted) || formatted.length === 0);
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

  const handleBlur = () => {
    if (phoneNumber.length > 0) {
      setIsValid(validatePhone(phoneNumber));
    }
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <Label htmlFor={id}>{label}</Label>
      <div className="flex">
        <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground text-sm">
          +998
        </div>
        <Input
          id={id}
          type="tel"
          value={phoneNumber}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="90 123 45 67"
          className={`rounded-l-none ${!isValid ? "border-destructive focus-visible:ring-destructive" : ""}`}
        />
      </div>
      {!isValid && phoneNumber.length > 0 && (
        <p className="text-xs text-destructive">
          Telefon raqam to'liq kiritilmagan
        </p>
      )}
    </div>
  );
}
