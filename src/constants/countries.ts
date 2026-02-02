export const COUNTRIES = [
  { value: "uzbekistan", label: "O'zbekiston" },
  { value: "germany", label: "Germaniya" },
  { value: "russia", label: "Rossiya" },
  { value: "turkey", label: "Turkiya" },
  { value: "kazakhstan", label: "Qozog'iston" },
  { value: "tajikistan", label: "Tojikiston" },
  { value: "kyrgyzstan", label: "Qirg'iziston" },
  { value: "south_korea", label: "Janubiy Koreya" },
  { value: "japan", label: "Yaponiya" },
  { value: "poland", label: "Polsha" },
  { value: "czech_republic", label: "Chexiya" },
  { value: "italy", label: "Italiya" },
  { value: "spain", label: "Ispaniya" },
  { value: "france", label: "Fransiya" },
  { value: "uk", label: "Buyuk Britaniya" },
  { value: "usa", label: "AQSH" },
  { value: "uae", label: "BAA" },
] as const;

export type CountryValue = (typeof COUNTRIES)[number]["value"];
