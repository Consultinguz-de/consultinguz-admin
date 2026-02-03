"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id?: string;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  error?: string;
  onClearError?: () => void;
}

export function FormSelect({
  id,
  label,
  placeholder = "Tanlang",
  options,
  value,
  onValueChange,
  error,
  onClearError,
}: FormSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <Label className={error ? "text-destructive" : ""}>{label}</Label>
      <Select
        value={value}
        onValueChange={(v) => {
          if (error) onClearError?.();
          onValueChange?.(v);
        }}
        onOpenChange={handleOpenChange}
      >
        <SelectTrigger
          id={id}
          className={error ? "border-destructive focus:ring-destructive" : ""}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
