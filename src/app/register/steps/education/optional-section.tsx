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
import { Label } from "@/components/ui/label";
import { type FormErrors } from "../../register-context";

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
  errors?: FormErrors;
  onClearError?: (field: string) => void;
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
  errors = {},
  onClearError,
}: OptionalSectionProps) {
  const handleUpdate = (
    field: keyof EducationData,
    value: string | boolean | Date | File | undefined,
  ) => {
    if (errors[`${type}_${field}`]) onClearError?.(`${type}_${field}`);
    onUpdate(field, value);
  };
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
              id={`${type}_startDate`}
              label="O'qishni boshlagan sana"
              placeholder="Tanlang"
              value={data.startDate}
              onChange={(date) => handleUpdate("startDate", date)}
              toYear={new Date().getFullYear()}
              error={errors[`${type}_startDate`]}
              onClearError={() => onClearError?.(`${type}_startDate`)}
            />
            <DatePicker
              id={`${type}_endDate`}
              label="O'qishni tugatgan sana"
              placeholder="Tanlang"
              value={data.endDate}
              onChange={(date) => handleUpdate("endDate", date)}
              toYear={new Date().getFullYear()}
              error={errors[`${type}_endDate`]}
              onClearError={() => onClearError?.(`${type}_endDate`)}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor={`${type}_institutionName`}
              className={
                errors[`${type}_institutionName`] ? "text-destructive" : ""
              }
            >
              {LABELS[type]}
            </Label>
            <Input
              id={`${type}_institutionName`}
              placeholder={PLACEHOLDERS[type]}
              value={data.institutionName}
              onChange={(e) => handleUpdate("institutionName", e.target.value)}
              disabled={!data.enabled}
              className={
                errors[`${type}_institutionName`]
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors[`${type}_institutionName`] && (
              <p className="text-xs text-destructive">
                {errors[`${type}_institutionName`]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor={`${type}_direction`}
              className={errors[`${type}_direction`] ? "text-destructive" : ""}
            >
              Yo'nalish nomi
            </Label>
            <Input
              id={`${type}_direction`}
              placeholder="Qaysi yo'nalishda o'qigansiz"
              value={data.direction}
              onChange={(e) => handleUpdate("direction", e.target.value)}
              disabled={!data.enabled}
              className={
                errors[`${type}_direction`]
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors[`${type}_direction`] && (
              <p className="text-xs text-destructive">
                {errors[`${type}_direction`]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor={`${type}_document`}
              className={errors[`${type}_document`] ? "text-destructive" : ""}
            >
              Diplom (PDF)
            </Label>
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
                id={`${type}_document`}
                type="file"
                accept=".pdf"
                disabled={!data.enabled}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  handleUpdate("document", file);
                }}
                className={
                  errors[`${type}_document`]
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
            )}
            {errors[`${type}_document`] && (
              <p className="text-xs text-destructive">
                {errors[`${type}_document`]}
              </p>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
