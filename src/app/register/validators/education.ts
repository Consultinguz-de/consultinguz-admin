import { type Education, type EducationData, type FormErrors } from "../types";
import { type ValidationResult } from "./types";
import {
  MAX_PDF_SIZE_BYTES,
  PDF_SIZE_ERROR,
  isFileTooLarge,
} from "../utils/file-constraints";

const hasPartialData = (data: EducationData): boolean =>
  !!(
    data.startDate ||
    data.endDate ||
    data.institutionName.trim() ||
    data.direction.trim() ||
    data.document
  );

const validateSchool = (school: EducationData): FormErrors => {
  const errors: FormErrors = {};

  if (!school.startDate) {
    errors.school_startDate = "Boshlangan sana kiritilishi shart";
  }
  if (!school.endDate) {
    errors.school_endDate = "Tugatilgan sana kiritilishi shart";
  }
  if (!school.institutionName.trim()) {
    errors.school_institutionName = "Maktab nomi kiritilishi shart";
  }
  if (!school.document) {
    errors.school_document = "Maktab shahodatnomasi yuklanishi shart";
  } else if (isFileTooLarge(school.document, MAX_PDF_SIZE_BYTES)) {
    errors.school_document = PDF_SIZE_ERROR;
  }

  return errors;
};

const validateOptionalSection = (
  data: EducationData,
  prefix: "college" | "university",
  institutionLabel: string,
): FormErrors => {
  const errors: FormErrors = {};

  if (!data.enabled || !hasPartialData(data)) {
    return errors;
  }

  if (!data.startDate) {
    errors[`${prefix}_startDate`] = "Boshlangan sana kiritilishi shart";
  }
  if (!data.endDate) {
    errors[`${prefix}_endDate`] = "Tugatilgan sana kiritilishi shart";
  }
  if (!data.institutionName.trim()) {
    errors[`${prefix}_institutionName`] =
      `${institutionLabel} nomi kiritilishi shart`;
  }
  if (!data.direction.trim()) {
    errors[`${prefix}_direction`] = "Yo'nalish kiritilishi shart";
  }
  if (!data.document) {
    errors[`${prefix}_document`] = "Diplom yuklanishi shart";
  } else if (isFileTooLarge(data.document, MAX_PDF_SIZE_BYTES)) {
    errors[`${prefix}_document`] = PDF_SIZE_ERROR;
  }

  return errors;
};

export const validateEducation = (education: Education): ValidationResult => {
  const { school, college, university } = education;

  const errors: FormErrors = {
    ...validateSchool(school),
    ...validateOptionalSection(college, "college", "Kollej"),
    ...validateOptionalSection(university, "university", "Universitet"),
  };

  const errorKeys = Object.keys(errors);
  return {
    isValid: errorKeys.length === 0,
    errors,
    firstErrorField: errorKeys[0],
  };
};
