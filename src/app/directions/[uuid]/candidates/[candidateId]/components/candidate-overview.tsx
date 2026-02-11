"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { toast } from "sonner";
import { updateCandidatePersonalInfo } from "../../../actions";
import {
  PersonalInfoForm,
  type PersonalInfoFormState,
} from "./personal-info-form";
import type { PersonalInfo } from "./types";

interface CandidateOverviewProps {
  candidateId: string;
  personalInfo?: PersonalInfo;
  stage?: number | null;
  isEditing?: boolean;
  onEditingChange?: (editing: boolean) => void;
}

function toDateInput(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export function CandidateOverview({
  candidateId,
  personalInfo,
  stage,
  isEditing: externalIsEditing,
  onEditingChange,
}: CandidateOverviewProps) {
  const [internalIsEditing, setInternalIsEditing] = useState(false);
  const isEditing = externalIsEditing ?? internalIsEditing;
  const setIsEditing = onEditingChange ?? setInternalIsEditing;
  const [isPending, startTransition] = useTransition();

  const initialState = useMemo(
    (): PersonalInfoFormState => ({
      firstName: personalInfo?.firstName || "",
      lastName: personalInfo?.lastName || "",
      gender: personalInfo?.gender || "",
      birthDate: toDateInput(personalInfo?.birthDate) || "",
      birthPlace: personalInfo?.birthPlace || "",
      maritalStatus: personalInfo?.maritalStatus || "",
      phone: personalInfo?.phone || "",
      email: personalInfo?.email || "",
      passport: personalInfo?.passport || "",
      street: personalInfo?.street || "",
      houseNumber: personalInfo?.houseNumber || "",
      region: personalInfo?.region || "",
      country: personalInfo?.country || "",
    }),
    [personalInfo],
  );

  const [baseline, setBaseline] = useState(initialState);
  const [form, setForm] = useState(initialState);
  useEffect(() => {
    setBaseline(initialState);
    setForm(initialState);
  }, [initialState]);

  const isDirty = Object.keys(baseline).some(
    (key) =>
      form[key as keyof PersonalInfoFormState] !==
      baseline[key as keyof PersonalInfoFormState],
  );

  const handleChange =
    (key: keyof PersonalInfoFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleCancelEdit = () => {
    setForm(baseline);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!isDirty) {
      setIsEditing(false);
      return;
    }

    startTransition(async () => {
      const result = await updateCandidatePersonalInfo(candidateId, {
        ...form,
        birthDate: form.birthDate
          ? new Date(form.birthDate).toISOString()
          : null,
      });

      if (!result.success) {
        toast.error("Shaxsiy ma'lumotlarni yangilashda xatolik", {
          description: result.error || "Qayta urinib ko'ring.",
        });
        return;
      }

      toast.success("Shaxsiy ma'lumotlar yangilandi");
      setBaseline(form);
      setIsEditing(false);
    });
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Shaxsiy ma'lumotlar</h2>
        {isEditing && (
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleCancelEdit}
              disabled={isPending}
              title="Bekor qilish"
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
            {isDirty && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleSave}
                disabled={isPending}
                title="Saqlash"
                className="h-8 w-8"
              >
                <Save className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
      <PersonalInfoForm
        form={form}
        isEditing={isEditing}
        stage={stage}
        onChange={handleChange}
      />
    </div>
  );
}
