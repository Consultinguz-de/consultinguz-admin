import { type RegionValue } from "@/constants/regions";
import { type CountryValue } from "@/constants/countries";

// Personal Info Types
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate?: Date;
  birthPlace?: RegionValue;
  maritalStatus: string;
  phone: string;
  email: string;
  passport: string;
  passportFile?: File;
  photo?: File;
  street: string;
  houseNumber: string;
  region?: RegionValue;
  country?: CountryValue;
}

// Work Experience Types
export interface WorkExperience {
  id: string;
  startDate?: Date;
  endDate?: Date;
  position: string;
  employer: string;
  responsibilities: string[];
}

// Education Types
export interface EducationData {
  enabled: boolean;
  startDate?: Date;
  endDate?: Date;
  institutionName: string;
  direction: string;
  document?: File;
}

export interface Education {
  school: EducationData;
  college: EducationData;
  university: EducationData;
}

// Language Skills Types
export interface LanguageSkill {
  id: string;
  language: string;
  level: string;
  noCertificate: boolean;
  certificate?: File;
}

// Form Data Type
export interface FormData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education;
  languageSkills: LanguageSkill[];
  skills: string[];
  privacyAccepted: boolean;
}

// Form Errors Type
export interface FormErrors {
  [key: string]: string;
}

// Context Type
export interface RegisterContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  currentStepTitle: string;
  currentStepDescription: string;
  formData: FormData;
  updateFormData: <K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) => void;
  errors: FormErrors;
  setFieldError: (field: string, error: string) => void;
  clearFieldError: (field: string) => void;
  clearAllErrors: () => void;
  validateCurrentStep: () => boolean;
  submitForm: () => void;
}

// Step Type
export interface Step {
  id: number;
  title: string;
  description: string;
}
