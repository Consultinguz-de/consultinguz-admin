"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  accept?: string;
}

export function FormField({
  id,
  label,
  placeholder,
  type = "text",
  defaultValue,
  accept,
}: FormFieldProps) {
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
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        accept={accept}
        onFocus={handleFocus}
      />
    </div>
  );
}
