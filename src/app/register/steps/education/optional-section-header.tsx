"use client";

import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface OptionalSectionHeaderProps {
  title: string;
  enabled: boolean;
  isOpen: boolean;
  onEnabledChange: (checked: boolean) => void;
}

export function OptionalSectionHeader({
  title,
  enabled,
  isOpen,
  onEnabledChange,
}: OptionalSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={enabled}
          onCheckedChange={(checked) => onEnabledChange(checked as boolean)}
          onClick={(e) => e.stopPropagation()}
        />
        <span
          className={cn(
            "font-medium",
            !enabled && "text-muted-foreground line-through",
          )}
        >
          {title}
        </span>
        {!enabled && (
          <span className="text-xs text-muted-foreground">
            (bu ma'lumot yo'q)
          </span>
        )}
      </div>
      <CollapsibleTrigger asChild>
        <button className="p-1 hover:bg-muted rounded">
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </CollapsibleTrigger>
    </div>
  );
}
