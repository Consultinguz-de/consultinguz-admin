"use client";

import { FormField } from "../form-field";
import { PassportInput } from "../passport-input";
import { useRegister, type PersonalInfo } from "../../register-context";

export function DocumentsSection() {
  const { formData, updateFormData, errors, clearFieldError } = useRegister();
  const personalInfo = formData.personalInfo;

  const updatePersonalInfo = (
    field: keyof PersonalInfo,
    value: PersonalInfo[keyof PersonalInfo],
  ) => {
    updateFormData("personalInfo", { ...personalInfo, [field]: value });
  };

  return (
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
        onFileChange={(file) => updatePersonalInfo("photo", file)}
        error={errors.photo}
        onClearError={() => clearFieldError("photo")}
      />
    </div>
  );
}
