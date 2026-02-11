import type { CandidateDetail } from "@/app/directions/[uuid]/actions";

export type { CandidateDetail };

export interface PersonalInfo {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  photo?: { url?: string | null };
  gender?: string;
  birthDate?: string | null;
  birthPlace?: string;
  maritalStatus?: string;
  passport?: string;
  street?: string;
  houseNumber?: string;
  region?: string;
  country?: string;
}

export interface EducationEntry {
  enabled?: boolean;
  startDate?: string | null;
  endDate?: string | null;
  institutionName?: string;
  direction?: string;
}

export interface Education {
  school?: EducationEntry;
  college?: EducationEntry;
  university?: EducationEntry;
}

export interface LanguageSkill {
  id?: string;
  language?: string;
  level?: string;
  noCertificate?: boolean;
  certificate?: { url: string } | null;
}

export interface WorkExperienceItem {
  id?: string;
  startDate?: string | null;
  endDate?: string | null;
  position?: string;
  employer?: string;
  responsibilities?: string[];
}
