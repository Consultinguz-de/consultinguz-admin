"use client";

import { X } from "lucide-react";
import { DatePicker } from "../../components/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { type FormErrors } from "../../register-context";
import { type EducationData } from "./types";
import { OPTIONAL_LABELS, OPTIONAL_PLACEHOLDERS } from "./optional-section.constants";
import {
  type OptionalFieldValue,
  type OptionalType,
} from "./optional-section.types";
import {
  MAX_PDF_SIZE_BYTES,
  PDF_SIZE_ERROR,
  isFileTooLarge,
} from "../../utils/file-constraints";

interface OptionalSectionFieldsProps {
  type: OptionalType;
  data: EducationData;
  errors: FormErrors;
  onFieldChange: (field: keyof EducationData, value: OptionalFieldValue) => void;
  onClearError?: (field: string) => void;
  onFileError?: (field: string, message: string) => void;
}

export function OptionalSectionFields({
  type,
  data,
  errors,
  onFieldChange,
  onClearError,
  onFileError,
}: OptionalSectionFieldsProps) {
  const fieldKey = (field: keyof EducationData) => `${type}_${field}`;
  const fieldError = (field: keyof EducationData) => errors[fieldKey(field)];
  const clearError = (field: keyof EducationData) =>
    onClearError?.(fieldKey(field));

  return (
    <div
      className={cn(
        "px-4 pb-4 space-y-4",
        !data.enabled && "opacity-50 pointer-events-none",
      )}
    >
      <div className="grid grid-cols-2 gap-4">
        <DatePicker
          id={fieldKey("startDate")}
          label="O'qishni boshlagan sana"
          placeholder="Tanlang"
          value={data.startDate}
          onChange={(date) => onFieldChange("startDate", date)}
          toYear={new Date().getFullYear()}
          error={fieldError("startDate")}
          onClearError={() => clearError("startDate")}
        />
        <DatePicker
          id={fieldKey("endDate")}
          label="O'qishni tugatgan sana"
          placeholder="Tanlang"
          value={data.endDate}
          onChange={(date) => onFieldChange("endDate", date)}
          toYear={new Date().getFullYear()}
          error={fieldError("endDate")}
          onClearError={() => clearError("endDate")}
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor={fieldKey("institutionName")}
          className={fieldError("institutionName") ? "text-destructive" : ""}
        >
          {OPTIONAL_LABELS[type]}
        </Label>
        <Input
          id={fieldKey("institutionName")}
          placeholder={OPTIONAL_PLACEHOLDERS[type]}
          value={data.institutionName}
          onChange={(e) => onFieldChange("institutionName", e.target.value)}
          disabled={!data.enabled}
          className={
            fieldError("institutionName")
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          }
        />
        {fieldError("institutionName") && (
          <p className="text-xs text-destructive">
            {fieldError("institutionName")}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor={fieldKey("direction")}
          className={fieldError("direction") ? "text-destructive" : ""}
        >
          Yo'nalish nomi
        </Label>
        <Input
          id={fieldKey("direction")}
          placeholder="Qaysi yo'nalishda o'qigansiz"
          value={data.direction}
          onChange={(e) => onFieldChange("direction", e.target.value)}
          disabled={!data.enabled}
          className={
            fieldError("direction")
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          }
        />
        {fieldError("direction") && (
          <p className="text-xs text-destructive">
            {fieldError("direction")}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor={fieldKey("document")}
          className={fieldError("document") ? "text-destructive" : ""}
        >
          Diplom (PDF)
        </Label>
        {data.document ? (
          <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
            <span className="text-sm flex-1 truncate">{data.document.name}</span>
            <button
              type="button"
              onClick={() => onFieldChange("document", undefined)}
              className="p-1 hover:bg-destructive/10 rounded text-destructive"
              disabled={!data.enabled}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <Input
            id={fieldKey("document")}
            type="file"
            accept=".pdf"
            disabled={!data.enabled}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) {
                onFieldChange("document", undefined);
                return;
              }
              if (isFileTooLarge(file, MAX_PDF_SIZE_BYTES)) {
                onFileError?.(fieldKey("document"), PDF_SIZE_ERROR);
                e.currentTarget.value = "";
                return;
              }
              onFieldChange("document", file);
            }}
            className={
              fieldError("document")
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
        )}
        {fieldError("document") && (
          <p className="text-xs text-destructive">{fieldError("document")}</p>
        )}
      </div>
    </div>
  );
}
