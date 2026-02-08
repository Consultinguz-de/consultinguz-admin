"use client";

import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField } from "../form-field";
import { PassportInput } from "../passport-input";
import { useRegister, type PersonalInfo } from "../../register-context";
import {
  MAX_PDF_SIZE_BYTES,
  MAX_PHOTO_SIZE_BYTES,
  PDF_SIZE_ERROR,
  PHOTO_SIZE_ERROR,
  isFileTooLarge,
} from "../../utils/file-constraints";

export function DocumentsSection() {
  const {
    formData,
    updateFormData,
    errors,
    clearFieldError,
    setFieldError,
  } = useRegister();
  const personalInfo = formData.personalInfo;

  const updatePersonalInfo = (
    field: keyof PersonalInfo,
    value: PersonalInfo[keyof PersonalInfo],
  ) => {
    updateFormData("personalInfo", { ...personalInfo, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PassportInput
          value={personalInfo.passport}
          onChange={(value) => updatePersonalInfo("passport", value)}
          error={errors.passport}
          onClearError={() => clearFieldError("passport")}
        />
        <FormField
          id="photo"
          label="Rasm"
          type="file"
          accept="image/*"
          onFileChange={(file) => {
            if (!file) {
              updatePersonalInfo("photo", undefined);
              return;
            }
            if (file.size > MAX_PHOTO_SIZE_BYTES) {
              setFieldError("photo", PHOTO_SIZE_ERROR);
              updatePersonalInfo("photo", undefined);
              return;
            }
            if (errors.photo) clearFieldError("photo");
            updatePersonalInfo("photo", file);
          }}
          error={errors.photo}
          onClearError={() => clearFieldError("photo")}
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="passportFile"
          className={errors.passportFile ? "text-destructive" : ""}
        >
          Passport nusxasi (PDF)
        </Label>
        {personalInfo.passportFile ? (
          <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
            <span className="text-sm flex-1 truncate">
              {personalInfo.passportFile.name}
            </span>
            <button
              type="button"
              onClick={() => updatePersonalInfo("passportFile", undefined)}
              className="p-1 hover:bg-destructive/10 rounded text-destructive"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <Input
            id="passportFile"
            type="file"
            accept=".pdf"
            className={
              errors.passportFile
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
            onChange={(e) => {
              if (errors.passportFile) clearFieldError("passportFile");
              const file = e.target.files?.[0];
              if (!file) {
                updatePersonalInfo("passportFile", undefined);
                return;
              }
              if (isFileTooLarge(file, MAX_PDF_SIZE_BYTES)) {
                setFieldError("passportFile", PDF_SIZE_ERROR);
                updatePersonalInfo("passportFile", undefined);
                e.currentTarget.value = "";
                return;
              }
              updatePersonalInfo("passportFile", file);
            }}
          />
        )}
        {errors.passportFile && (
          <p className="text-xs text-destructive">{errors.passportFile}</p>
        )}
      </div>
    </div>
  );
}
