"use client";

import { ChevronDown, X } from "lucide-react";
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

interface SchoolSectionProps {
  data: EducationData;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (
    field: keyof EducationData,
    value: string | Date | File | undefined,
  ) => void;
  errors?: FormErrors;
  onClearError?: (field: string) => void;
}

export function SchoolSection({
  data,
  isOpen,
  onToggle,
  onUpdate,
  errors = {},
  onClearError,
}: SchoolSectionProps) {
  const handleUpdate = (
    field: keyof EducationData,
    value: string | Date | File | undefined,
  ) => {
    if (errors[`school_${field}`]) onClearError?.(`school_${field}`);
    onUpdate(field, value);
  };
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onToggle}
      className="border rounded-lg"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
          <span className="font-medium">Maktab</span>
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="px-4 pb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              id="school_startDate"
              label="O'qishni boshlagan sana"
              placeholder="Tanlang"
              value={data.startDate}
              onChange={(date) => handleUpdate("startDate", date)}
              toYear={new Date().getFullYear()}
              error={errors.school_startDate}
              onClearError={() => onClearError?.("school_startDate")}
            />
            <DatePicker
              id="school_endDate"
              label="O'qishni tugatgan sana"
              placeholder="Tanlang"
              value={data.endDate}
              onChange={(date) => handleUpdate("endDate", date)}
              toYear={new Date().getFullYear()}
              error={errors.school_endDate}
              onClearError={() => onClearError?.("school_endDate")}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="school_institutionName"
              className={
                errors.school_institutionName ? "text-destructive" : ""
              }
            >
              Maktab nomi
            </Label>
            <Input
              id="school_institutionName"
              placeholder="Masalan: 1-sonli maktab"
              value={data.institutionName}
              onChange={(e) => handleUpdate("institutionName", e.target.value)}
              className={
                errors.school_institutionName
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors.school_institutionName && (
              <p className="text-xs text-destructive">
                {errors.school_institutionName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="school_document"
              className={errors.school_document ? "text-destructive" : ""}
            >
              Maktab shahodatnomasi (PDF)
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
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Input
                id="school_document"
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  handleUpdate("document", file);
                }}
                className={
                  errors.school_document
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
            )}
            {errors.school_document && (
              <p className="text-xs text-destructive">
                {errors.school_document}
              </p>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
