"use client";

import { Input } from "@/components/ui/input";
import { buildAddress } from "./utils";

export interface PersonalInfoFormState {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  birthPlace: string;
  maritalStatus: string;
  phone: string;
  email: string;
  passport: string;
  street: string;
  houseNumber: string;
  region: string;
  country: string;
}

interface PersonalInfoFormProps {
  form: PersonalInfoFormState;
  isEditing: boolean;
  stage?: number | null;
  onChange: (
    key: keyof PersonalInfoFormState,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InfoField({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="space-y-1">
      <span className="text-muted-foreground text-xs">{label}</span>
      <div className="rounded-md border bg-muted/30 px-3 py-2 text-sm min-h-[38px]">
        {value || "—"}
      </div>
    </div>
  );
}

function EditableField({
  label,
  value,
  onChange,
  isEditing,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  type?: string;
}) {
  if (!isEditing) {
    return <InfoField label={label} value={value} />;
  }
  return (
    <label className="space-y-1">
      <span className="text-muted-foreground text-xs">{label}</span>
      <Input type={type} value={value} onChange={onChange} />
    </label>
  );
}

export function PersonalInfoForm({
  form,
  isEditing,
  stage,
  onChange,
}: PersonalInfoFormProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
          Asosiy ma'lumotlar
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <EditableField
            label="Ism"
            value={form.firstName}
            onChange={onChange("firstName")}
            isEditing={isEditing}
          />
          <EditableField
            label="Familiya"
            value={form.lastName}
            onChange={onChange("lastName")}
            isEditing={isEditing}
          />
          <EditableField
            label="Telefon"
            value={form.phone}
            onChange={onChange("phone")}
            isEditing={isEditing}
          />
          <EditableField
            label="Email"
            value={form.email}
            onChange={onChange("email")}
            isEditing={isEditing}
          />
          <EditableField
            label="Passport"
            value={form.passport}
            onChange={onChange("passport")}
            isEditing={isEditing}
          />
          <InfoField label="Bosqich" value={stage} />
        </div>
      </div>

      <div className="pt-4 border-t">
        <h3 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
          Shaxsiy ma'lumotlar
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <EditableField
            label="Jins"
            value={form.gender}
            onChange={onChange("gender")}
            isEditing={isEditing}
          />
          <EditableField
            label="Tug'ilgan sana"
            value={form.birthDate}
            onChange={onChange("birthDate")}
            isEditing={isEditing}
            type="date"
          />
          <EditableField
            label="Tug'ilgan joy"
            value={form.birthPlace}
            onChange={onChange("birthPlace")}
            isEditing={isEditing}
          />
          <EditableField
            label="Oilaviy holat"
            value={form.maritalStatus}
            onChange={onChange("maritalStatus")}
            isEditing={isEditing}
          />
        </div>
      </div>

      <div className="pt-4 border-t">
        <h3 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
          Manzil
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <EditableField
            label="Ko'cha"
            value={form.street}
            onChange={onChange("street")}
            isEditing={isEditing}
          />
          <EditableField
            label="Uy raqami"
            value={form.houseNumber}
            onChange={onChange("houseNumber")}
            isEditing={isEditing}
          />
          <EditableField
            label="Viloyat"
            value={form.region}
            onChange={onChange("region")}
            isEditing={isEditing}
          />
          <EditableField
            label="Mamlakat"
            value={form.country}
            onChange={onChange("country")}
            isEditing={isEditing}
          />
        </div>
        {!isEditing && (
          <div className="mt-3">
            <InfoField label="To'liq manzil" value={buildAddress(form)} />
          </div>
        )}
      </div>
    </div>
  );
}
