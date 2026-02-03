"use client";

import { FormField } from "../form-field";
import { FormRadio } from "../form-radio";
import { FormSelect } from "../form-select";
import { DatePicker } from "../date-picker";
import { RegionPicker } from "../region-picker";
import { useRegister, type PersonalInfo } from "../../register-context";

const GENDER_OPTIONS = [
  { value: "male", label: "Erkak" },
  { value: "female", label: "Ayol" },
];

const MARITAL_STATUS_OPTIONS = [
  { value: "single", label: "Turmush qurmagan" },
  { value: "married", label: "Turmush qurgan" },
  { value: "divorced", label: "Ajrashgan" },
  { value: "widowed", label: "Beva" },
];

export function BasicInfoSection() {
  const { formData, updateFormData, errors, clearFieldError } = useRegister();
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
        <FormField
          id="firstName"
          label="Ism"
          placeholder="Ismingiz"
          value={personalInfo.firstName}
          onChange={(value) => updatePersonalInfo("firstName", value)}
          error={errors.firstName}
          onClearError={() => clearFieldError("firstName")}
        />
        <FormField
          id="lastName"
          label="Familya"
          placeholder="Familyangiz"
          value={personalInfo.lastName}
          onChange={(value) => updatePersonalInfo("lastName", value)}
          error={errors.lastName}
          onClearError={() => clearFieldError("lastName")}
        />
      </div>

      <FormRadio
        id="gender"
        label="Jins"
        options={GENDER_OPTIONS}
        value={personalInfo.gender}
        onValueChange={(value) => updatePersonalInfo("gender", value)}
        error={errors.gender}
        onClearError={() => clearFieldError("gender")}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DatePicker
          id="birthDate"
          label="Tug'ilgan sana"
          value={personalInfo.birthDate}
          onChange={(value) => updatePersonalInfo("birthDate", value)}
          error={errors.birthDate}
          onClearError={() => clearFieldError("birthDate")}
        />
        <RegionPicker
          id="birthPlace"
          label="Tug'ilgan joy"
          value={personalInfo.birthPlace}
          onValueChange={(value) => updatePersonalInfo("birthPlace", value)}
          placeholder="Tug'ilgan joyni tanlang"
          error={errors.birthPlace}
          onClearError={() => clearFieldError("birthPlace")}
        />
        <FormSelect
          id="maritalStatus"
          label="Oilaviy holati"
          options={MARITAL_STATUS_OPTIONS}
          value={personalInfo.maritalStatus}
          onValueChange={(value) => updatePersonalInfo("maritalStatus", value)}
          error={errors.maritalStatus}
          onClearError={() => clearFieldError("maritalStatus")}
        />
      </div>
    </div>
  );
}
