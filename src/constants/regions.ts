export const UZBEKISTAN_REGIONS = [
  { value: "tashkent_city", label: "Toshkent shahri" },
  { value: "tashkent", label: "Toshkent viloyati" },
  { value: "andijan", label: "Andijon viloyati" },
  { value: "bukhara", label: "Buxoro viloyati" },
  { value: "fergana", label: "Farg'ona viloyati" },
  { value: "jizzakh", label: "Jizzax viloyati" },
  { value: "karakalpakstan", label: "Qoraqalpog'iston Respublikasi" },
  { value: "kashkadarya", label: "Qashqadaryo viloyati" },
  { value: "khorezm", label: "Xorazm viloyati" },
  { value: "namangan", label: "Namangan viloyati" },
  { value: "navoi", label: "Navoiy viloyati" },
  { value: "samarkand", label: "Samarqand viloyati" },
  { value: "sirdarya", label: "Sirdaryo viloyati" },
  { value: "surkhandarya", label: "Surxondaryo viloyati" },
] as const;

export type RegionValue = (typeof UZBEKISTAN_REGIONS)[number]["value"];
