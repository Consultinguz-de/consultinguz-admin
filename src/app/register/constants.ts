import { type FormData, type EducationData, type Step } from "./types";

export const initialEducationData: EducationData = {
  enabled: true,
  startDate: undefined,
  endDate: undefined,
  institutionName: "",
  direction: "",
};

export const initialFormData: FormData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: undefined,
    birthPlace: undefined,
    maritalStatus: "",
    phone: "",
    email: "",
    passport: "",
    photo: undefined,
    street: "",
    houseNumber: "",
    region: undefined,
    country: undefined,
  },
  workExperience: [],
  education: {
    school: { ...initialEducationData },
    college: { ...initialEducationData, enabled: false },
    university: { ...initialEducationData, enabled: false },
  },
  languageSkills: [],
  skills: [],
  documents: [],
  privacyAccepted: false,
};

export const STEPS: Step[] = [
  {
    id: 1,
    title: "Shaxsiy ma'lumotlar",
    description:
      "Ismingiz, tug'ilgan sanangiz va boshqa shaxsiy ma'lumotlarni kiriting",
  },
  {
    id: 2,
    title: "Ish tajribasi",
    description: "Oldingi ish joylaringiz va lavozimlaringiz haqida ma'lumot",
  },
  {
    id: 3,
    title: "Ta'lim",
    description: "Ta'lim muassasalari va olgan darajalaringiz",
  },
  {
    id: 4,
    title: "Til bilish darajasi",
    description: "Qaysi tillarni bilishingiz va darajangizni belgilang",
  },
  {
    id: 5,
    title: "Qobilyatlar",
    description: "Texnik va boshqa ko'nikmalaringizni kiriting",
  },
  { id: 6, title: "Xujjatlar", description: "Kerakli hujjatlarni yuklang" },
  {
    id: 7,
    title: "Tasdiqlash",
    description: "Barcha ma'lumotlarni tekshirib, tasdiqlang",
  },
];
