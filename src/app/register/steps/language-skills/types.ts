export interface LanguageSkill {
  id: string;
  language: string;
  level: string;
  noCertificate: boolean;
  certificate?: File;
}

export interface SelectOption {
  value: string;
  label: string;
}

export const LANGUAGES: SelectOption[] = [
  { value: "uzbek", label: "O'zbek" },
  { value: "german", label: "Nemis" },
  { value: "english", label: "Ingliz" },
  { value: "russian", label: "Rus" },
];

export const LEVELS: SelectOption[] = [
  { value: "a1", label: "A1" },
  { value: "a2", label: "A2" },
  { value: "b1", label: "B1" },
  { value: "b2", label: "B2" },
  { value: "c1", label: "C1" },
  { value: "c2", label: "C2" },
  { value: "native", label: "Ona tili" },
];

export const generateId = () => Math.random().toString(36).substring(2, 15);
