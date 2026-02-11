import type { PersonalInfo } from "./types";
import { formatDate, buildAddress } from "./utils";

interface PersonalInfoCardProps {
  personalInfo?: PersonalInfo;
  stage?: number | null;
}

export function PersonalInfoCard({
  personalInfo,
  stage,
}: PersonalInfoCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="font-semibold mb-2">Shaxsiy ma'lumotlar</h2>
      <div className="text-sm space-y-1 text-muted-foreground">
        <div>Telefon: {personalInfo?.phone || "—"}</div>
        <div>Email: {personalInfo?.email || "—"}</div>
        <div>Jins: {personalInfo?.gender || "—"}</div>
        <div>Tug'ilgan sana: {formatDate(personalInfo?.birthDate)}</div>
        <div>Tug'ilgan joy: {personalInfo?.birthPlace || "—"}</div>
        <div>Oilaviy holat: {personalInfo?.maritalStatus || "—"}</div>
        <div>Passport: {personalInfo?.passport || "—"}</div>
        <div>Manzil: {buildAddress(personalInfo)}</div>
        <div className="pt-1">Bosqich: {stage ?? "—"}</div>
      </div>
    </div>
  );
}
