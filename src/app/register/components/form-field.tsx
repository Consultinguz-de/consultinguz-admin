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
  value?: string;
  onChange?: (value: string) => void;
  onFileChange?: (file: File | undefined) => void;
  accept?: string;
  error?: string;
  onClearError?: () => void;
}

export function FormField({
  id,
  label,
  placeholder,
  type = "text",
  defaultValue,
  value,
  onChange,
  onFileChange,
  accept,
  error,
  onClearError,
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
      <Label htmlFor={id} className={error ? "text-destructive" : ""}>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={type !== "file" ? value : undefined}
        onChange={(e) => {
          if (error) onClearError?.();
          if (type === "file") {
            onFileChange?.(e.target.files?.[0]);
          } else {
            onChange?.(e.target.value);
          }
        }}
        accept={accept}
        onFocus={handleFocus}
        className={
          error ? "border-destructive focus-visible:ring-destructive" : ""
        }
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
