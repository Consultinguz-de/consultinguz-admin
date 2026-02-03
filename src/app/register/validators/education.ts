import { type Education, type FormErrors } from "../types";
import { type ValidationResult } from "./types";

export const validateEducation = (education: Education): ValidationResult => {
  const errors: FormErrors = {};
  const { school, college, university } = education;

  // School validation (required)
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
  }

  // College validation (only if has partial data)
  if (college.enabled) {
    const hasCollegeData =
      college.startDate ||
      college.endDate ||
      college.institutionName.trim() ||
      college.direction.trim() ||
      college.document;

    if (hasCollegeData) {
      if (!college.startDate) {
        errors.college_startDate = "Boshlangan sana kiritilishi shart";
      }
      if (!college.endDate) {
        errors.college_endDate = "Tugatilgan sana kiritilishi shart";
      }
      if (!college.institutionName.trim()) {
        errors.college_institutionName = "Kollej nomi kiritilishi shart";
      }
      if (!college.direction.trim()) {
        errors.college_direction = "Yo'nalish kiritilishi shart";
      }
      if (!college.document) {
        errors.college_document = "Diplom yuklanishi shart";
      }
    }
  }

  // University validation (only if has partial data)
  if (university.enabled) {
    const hasUniversityData =
      university.startDate ||
      university.endDate ||
      university.institutionName.trim() ||
      university.direction.trim() ||
      university.document;

    if (hasUniversityData) {
      if (!university.startDate) {
        errors.university_startDate = "Boshlangan sana kiritilishi shart";
      }
      if (!university.endDate) {
        errors.university_endDate = "Tugatilgan sana kiritilishi shart";
      }
      if (!university.institutionName.trim()) {
        errors.university_institutionName = "Universitet nomi kiritilishi shart";
      }
      if (!university.direction.trim()) {
        errors.university_direction = "Yo'nalish kiritilishi shart";
      }
      if (!university.document) {
        errors.university_document = "Diplom yuklanishi shart";
      }
    }
  }

  const errorKeys = Object.keys(errors);
  return {
    isValid: errorKeys.length === 0,
    errors,
    firstErrorField: errorKeys[0],
  };
};
