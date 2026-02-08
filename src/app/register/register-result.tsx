"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { useRegister, type FormData } from "./register-context";
import { UZBEKISTAN_REGIONS } from "@/constants/regions";
import { COUNTRIES } from "@/constants/countries";
import { cn } from "@/lib/utils";

interface RegisterResultViewProps {
  data: FormData;
  className?: string;
}

const maritalStatusMap: Record<string, string> = {
  single: "ledig",
  married: "verheiratet",
  divorced: "geschieden",
  widowed: "verwitwet",
};

function formatDate(value?: Date) {
  if (!value) return "-";
  return format(value, "dd.MM.yyyy");
}

function formatMonthYear(value?: Date) {
  if (!value) return "";
  return format(value, "MM.yyyy");
}

function getRegionLabel(value?: string) {
  if (!value) return "";
  return UZBEKISTAN_REGIONS.find((r) => r.value === value)?.label || value;
}

function getCountryLabel(value?: string) {
  if (!value) return "";
  return COUNTRIES.find((c) => c.value === value)?.label || value;
}

function buildAddress(data: FormData) {
  const { street, houseNumber, region, country } = data.personalInfo;
  const parts = [
    [street, houseNumber].filter(Boolean).join(" ").trim(),
    getRegionLabel(region),
    getCountryLabel(country),
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : "-";
}

function getFullName(data: FormData) {
  const { firstName, lastName } = data.personalInfo;
  const name = [firstName, lastName].filter(Boolean).join(" ").trim();
  return name || "—";
}

function isEducationFilled(entry: FormData["education"]["school"]) {
  return Boolean(
    entry.institutionName || entry.direction || entry.startDate || entry.endDate,
  );
}

export function RegisterResultView({ data, className }: RegisterResultViewProps) {
  const personal = data.personalInfo;
  const work = data.workExperience;
  const education = data.education;

  const birthPlace = getRegionLabel(personal.birthPlace);
  const marital = maritalStatusMap[personal.maritalStatus] || "-";

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!personal.photo) {
      setPhotoUrl(null);
      return;
    }
    const url = URL.createObjectURL(personal.photo);
    setPhotoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [personal.photo]);

  const address = useMemo(() => buildAddress(data), [data]);

  return (
    <div className={cn("flex-1 overflow-y-auto p-6", className)}>
      <div className="rounded-xl border bg-card p-6">
        <div className="pb-4 border-b">
          <h2 className="text-2xl font-semibold text-foreground">
            {getFullName(data)}
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-[140px_1fr] gap-3 text-sm">
              <span className="font-semibold text-muted-foreground">Name</span>
              <span className="text-foreground">{getFullName(data)}</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-3 text-sm">
              <span className="font-semibold text-muted-foreground">
                Anschrift
              </span>
              <span className="text-foreground">{address}</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-3 text-sm">
              <span className="font-semibold text-muted-foreground">
                Geburtsdatum
              </span>
              <span className="text-foreground">
                {formatDate(personal.birthDate)}
              </span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-3 text-sm">
              <span className="font-semibold text-muted-foreground">
                Geburtsort
              </span>
              <span className="text-foreground">{birthPlace}</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-3 text-sm">
              <span className="font-semibold text-muted-foreground">
                Familienstand
              </span>
              <span className="text-foreground">{marital}</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-3 text-sm">
              <span className="font-semibold text-muted-foreground">
                Kinder
              </span>
              <span className="text-foreground">—</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-3 text-sm">
              <span className="font-semibold text-muted-foreground">Tel</span>
              <span className="text-foreground">{personal.phone || "-"}</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-3 text-sm">
              <span className="font-semibold text-muted-foreground">E-Mail</span>
              <span className="text-foreground">{personal.email || "-"}</span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="h-40 w-32 rounded-lg border bg-muted/40 overflow-hidden">
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                  Rasm yo'q
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold tracking-wide">
            BERUFLICHE LAUFBAHN
          </h3>
          <div className="mt-3 border-t pt-4 space-y-6">
            {work.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Ish tajribasi kiritilmagan.
              </p>
            ) : (
              work.map((item) => {
                const start = formatMonthYear(item.startDate);
                const end = item.endDate ? formatMonthYear(item.endDate) : "";
                const dateRange = start
                  ? `${start} – ${end || "bis heute"}`
                  : "—";
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4"
                  >
                    <div className="text-sm font-semibold text-muted-foreground">
                      {dateRange}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {item.position || "—"}
                        {item.employer ? `, ${item.employer}` : ""}
                      </div>
                      {item.responsibilities.length > 0 && (
                        <ul className="mt-2 list-disc pl-5 text-sm text-foreground space-y-1">
                          {item.responsibilities.map((task, idx) => (
                            <li key={`${item.id}-task-${idx}`}>{task}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold tracking-wide">AUSBILDUNG</h3>
          <div className="mt-3 border-t pt-4 space-y-6">
            {[
              { key: "school", label: "Maktab", data: education.school },
              { key: "college", label: "Kollej/Litsey", data: education.college },
              { key: "university", label: "Universitet", data: education.university },
            ]
              .filter((item) => item.data.enabled)
              .filter((item) => isEducationFilled(item.data)).length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Ta'lim ma'lumotlari kiritilmagan.
              </p>
            ) : (
              [
                { key: "school", label: "Maktab", data: education.school },
                { key: "college", label: "Kollej/Litsey", data: education.college },
                { key: "university", label: "Universitet", data: education.university },
              ]
                .filter((item) => item.data.enabled)
                .filter((item) => isEducationFilled(item.data))
                .map((item) => {
                  const start = formatMonthYear(item.data.startDate);
                  const end = item.data.endDate
                    ? formatMonthYear(item.data.endDate)
                    : "";
                  const dateRange = start
                    ? `${start} – ${end || "bis heute"}`
                    : "—";
                  return (
                    <div
                      key={item.key}
                      className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4"
                    >
                      <div className="text-sm font-semibold text-muted-foreground">
                        {dateRange}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {item.data.institutionName || item.label}
                        </div>
                        <div className="text-sm text-muted-foreground italic">
                          {item.data.direction || "—"}
                        </div>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RegisterResult() {
  const { formData } = useRegister();
  return <RegisterResultView data={formData} />;
}
