"use client";

import { FormField } from "../form-field";
import { PhoneInput } from "../phone-input";
import { useRegister, type PersonalInfo } from "../../register-context";

export function ContactSection() {
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
      <PhoneInput
        value={personalInfo.phone}
        onChange={(value) => updatePersonalInfo("phone", value)}
        error={errors.phone}
        onClearError={() => clearFieldError("phone")}
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="email@example.com"
        value={personalInfo.email}
        onChange={(value) => updatePersonalInfo("email", value)}
        error={errors.email}
        onClearError={() => clearFieldError("email")}
      />
    </div>
  );
}
