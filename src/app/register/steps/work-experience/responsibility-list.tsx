"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResponsibilityListProps {
  responsibilities: string[];
  onRemove: (index: number) => void;
}

export function ResponsibilityList({
  responsibilities,
  onRemove,
}: ResponsibilityListProps) {
  if (responsibilities.length === 0) return null;

  return (
    <div className="space-y-2 mb-2">
      {responsibilities.map((resp, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-2 bg-muted rounded-md"
        >
          <span className="flex-1 text-sm">{resp}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-destructive"
            onClick={() => onRemove(index)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}
