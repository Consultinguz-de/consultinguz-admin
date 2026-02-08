import { type LanguageSkill, type FormErrors } from "../types";
import { type ValidationResult } from "./types";
import {
  MAX_PDF_SIZE_BYTES,
  PDF_SIZE_ERROR,
  isFileTooLarge,
} from "../utils/file-constraints";

export interface LanguageSkillsValidationResult extends ValidationResult {
  cleanedSkills?: LanguageSkill[];
  germanError?: "not_added" | "no_level" | "no_certificate";
}

const isEmptySkill = (skill: LanguageSkill): boolean =>
  !skill.language && !skill.level && !skill.noCertificate && !skill.certificate;

const validateSkillFields = (skill: LanguageSkill): FormErrors => {
  const errors: FormErrors = {};

  if (!skill.language) {
    errors[`language_${skill.id}_language`] = "Til tanlanishi shart";
  }
  if (!skill.level) {
    errors[`language_${skill.id}_level`] = "Til darajasi kiritilishi shart";
  }

  const requiresCertificate =
    skill.language === "german" || skill.language === "english";
  if (requiresCertificate && !skill.noCertificate && !skill.certificate) {
    errors[`language_${skill.id}_certificate`] =
      "Sertifikat yuklash yoki 'yo'q' ni belgilang";
  }
  if (
    skill.certificate &&
    isFileTooLarge(skill.certificate, MAX_PDF_SIZE_BYTES)
  ) {
    errors[`language_${skill.id}_certificate`] = PDF_SIZE_ERROR;
  }

  return errors;
};

const validateGermanSkill = (
  skills: LanguageSkill[],
  nonEmptySkills: LanguageSkill[],
  skillsChanged: boolean,
): LanguageSkillsValidationResult | null => {
  const germanSkill = skills.find((skill) => skill.language === "german");
  const cleanedSkills = skillsChanged ? nonEmptySkills : undefined;

  if (!germanSkill) {
    return {
      isValid: false,
      errors: {},
      germanError: "not_added",
      cleanedSkills,
    };
  }

  if (!germanSkill.level) {
    return {
      isValid: false,
      errors: {
        [`language_${germanSkill.id}_level`]:
          "Nemis tili darajasi kiritilishi shart",
      },
      firstErrorField: `language_${germanSkill.id}_level`,
      germanError: "no_level",
      cleanedSkills,
    };
  }

  if (!germanSkill.noCertificate && !germanSkill.certificate) {
    return {
      isValid: false,
      errors: {
        [`language_${germanSkill.id}_certificate`]:
          "Nemis tili sertifikati yuklanishi shart",
      },
      firstErrorField: `language_${germanSkill.id}_certificate`,
      germanError: "no_certificate",
      cleanedSkills,
    };
  }

  return null;
};

export const validateLanguageSkills = (
  skills: LanguageSkill[],
): LanguageSkillsValidationResult => {
  const nonEmptySkills = skills.filter((skill) => !isEmptySkill(skill));
  const skillsChanged = nonEmptySkills.length !== skills.length;

  // Validate each non-empty skill
  const errors: FormErrors = {};
  nonEmptySkills.forEach((skill) => {
    Object.assign(errors, validateSkillFields(skill));
  });

  const errorKeys = Object.keys(errors);
  if (errorKeys.length > 0) {
    return {
      isValid: false,
      errors,
      firstErrorField: errorKeys[0],
      cleanedSkills: skillsChanged ? nonEmptySkills : undefined,
    };
  }

  // Check German language requirement
  const germanValidation = validateGermanSkill(
    skills,
    nonEmptySkills,
    skillsChanged,
  );
  if (germanValidation) {
    return germanValidation;
  }

  return {
    isValid: true,
    errors: {},
    cleanedSkills: skillsChanged ? nonEmptySkills : undefined,
  };
};
