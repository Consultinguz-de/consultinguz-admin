"use client";

import { ChevronDown, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DatePicker } from "../../components/date-picker";
import { cn } from "@/lib/utils";
import { EducationData } from "./types";

type OptionalType = "college" | "university";

interface OptionalSectionProps {
  type: OptionalType;
  title: string;
  data: EducationData;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onUpdate: (
    field: keyof EducationData,
    value: string | boolean | Date | File | undefined,
  ) => void;
}

const PLACEHOLDERS: Record<OptionalType, string> = {
  college: "Masalan: Toshkent axborot texnologiyalari kolleji",
  university: "Masalan: Toshkent davlat texnika universiteti",
};

const LABELS: Record<OptionalType, string> = {
  college: "Kollej/Litsey nomi",
  university: "Universitet nomi",
};

export function OptionalSection({
  type,
  title,
  data,
  isOpen,
  onToggle,
  onClose,
  onUpdate,
}: OptionalSectionProps) {
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onToggle}
      className="border rounded-lg"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={data.enabled}
            onCheckedChange={(checked) => {
              onUpdate("enabled", checked as boolean);
              if (!checked) onClose();
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <span
            className={cn(
              "font-medium",
              !data.enabled && "text-muted-foreground line-through",
            )}
          >
            {title}
          </span>
          {!data.enabled && (
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

      <CollapsibleContent>
        <div
          className={cn(
            "px-4 pb-4 space-y-4",
            !data.enabled && "opacity-50 pointer-events-none",
          )}
        >
          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              label="O'qishni boshlagan sana"
              placeholder="Tanlang"
              value={data.startDate}
              onChange={(date) => onUpdate("startDate", date)}
              toYear={new Date().getFullYear()}
            />
            <DatePicker
              label="O'qishni tugatgan sana"
              placeholder="Tanlang"
              value={data.endDate}
              onChange={(date) => onUpdate("endDate", date)}
              toYear={new Date().getFullYear()}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{LABELS[type]}</label>
            <Input
              placeholder={PLACEHOLDERS[type]}
              value={data.institutionName}
              onChange={(e) => onUpdate("institutionName", e.target.value)}
              disabled={!data.enabled}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Yo'nalish nomi</label>
            <Input
              placeholder="Qaysi yo'nalishda o'qigansiz"
              value={data.direction}
              onChange={(e) => onUpdate("direction", e.target.value)}
              disabled={!data.enabled}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Diplom (PDF)</label>
            {data.document ? (
              <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                <span className="text-sm flex-1 truncate">
                  {data.document.name}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdate("document", undefined)}
                  className="p-1 hover:bg-destructive/10 rounded text-destructive"
                  disabled={!data.enabled}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Input
                type="file"
                accept=".pdf"
                disabled={!data.enabled}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onUpdate("document", file);
                }}
              />
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
