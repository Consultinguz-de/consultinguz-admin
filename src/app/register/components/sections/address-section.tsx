"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { FormField } from "../form-field";
import { RegionPicker } from "../region-picker";
import { CountryPicker } from "../country-picker";
import { type RegionValue } from "@/constants/regions";
import { type CountryValue } from "@/constants/countries";

export function AddressSection() {
  const [region, setRegion] = useState<RegionValue>();
  const [country, setCountry] = useState<CountryValue>("uzbekistan");

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Manzil</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField id="street" label="Ko'cha" placeholder="Ko'cha nomi" />
        <FormField id="houseNumber" label="Uy raqami" placeholder="Uy raqami" />
        <RegionPicker value={region} onValueChange={setRegion} />
        <CountryPicker value={country} onValueChange={setCountry} />
      </div>
    </div>
  );
}
