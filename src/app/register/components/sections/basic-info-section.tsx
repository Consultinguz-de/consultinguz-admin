"use client";

import { useState } from "react";
import { FormField } from "../form-field";
import { FormRadio } from "../form-radio";
import { FormSelect } from "../form-select";
import { DatePicker } from "../date-picker";
import { RegionPicker } from "../region-picker";
import { type RegionValue } from "@/constants/regions";

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
  const [birthDate, setBirthDate] = useState<Date>();
  const [birthPlace, setBirthPlace] = useState<RegionValue>();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField id="firstName" label="Ism" placeholder="Ismingiz" />
        <FormField id="lastName" label="Familya" placeholder="Familyangiz" />
      </div>

      <FormRadio label="Jins" options={GENDER_OPTIONS} defaultValue="male" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DatePicker
          label="Tug'ilgan sana"
          value={birthDate}
          onChange={setBirthDate}
        />
        <RegionPicker
          label="Tug'ilgan joy"
          value={birthPlace}
          onValueChange={setBirthPlace}
          placeholder="Tug'ilgan joyni tanlang"
        />
        <FormSelect label="Oilaviy holati" options={MARITAL_STATUS_OPTIONS} />
      </div>
    </div>
  );
}
