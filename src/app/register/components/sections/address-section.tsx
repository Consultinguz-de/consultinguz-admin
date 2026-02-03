"use client";

import { Label } from "@/components/ui/label";
import { FormField } from "../form-field";
import { RegionPicker } from "../region-picker";
import { CountryPicker } from "../country-picker";
import { useRegister, type PersonalInfo } from "../../register-context";

export function AddressSection() {
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
      <Label className="text-base font-medium">Manzil</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="street"
          label="Ko'cha"
          placeholder="Ko'cha nomi"
          value={personalInfo.street}
          onChange={(value) => updatePersonalInfo("street", value)}
          error={errors.street}
          onClearError={() => clearFieldError("street")}
        />
        <FormField
          id="houseNumber"
          label="Uy raqami"
          placeholder="Uy raqami"
          value={personalInfo.houseNumber}
          onChange={(value) => updatePersonalInfo("houseNumber", value)}
          error={errors.houseNumber}
          onClearError={() => clearFieldError("houseNumber")}
        />
        <RegionPicker
          id="region"
          value={personalInfo.region}
          onValueChange={(value) => updatePersonalInfo("region", value)}
          error={errors.region}
          onClearError={() => clearFieldError("region")}
        />
        <CountryPicker
          id="country"
          value={personalInfo.country}
          onValueChange={(value) => updatePersonalInfo("country", value)}
          error={errors.country}
          onClearError={() => clearFieldError("country")}
        />
      </div>
    </div>
  );
}
