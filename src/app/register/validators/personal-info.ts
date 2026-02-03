import { type PersonalInfo, type FormErrors } from "../types";
import { type ValidationResult } from "./types";

export const validatePersonalInfo = (
  personalInfo: PersonalInfo,
): ValidationResult => {
  const errors: FormErrors = {};

  if (!personalInfo.firstName.trim()) {
    errors.firstName = "Ism kiritilishi shart";
  }
  if (!personalInfo.lastName.trim()) {
    errors.lastName = "Familya kiritilishi shart";
  }
  if (!personalInfo.gender) {
    errors.gender = "Jins tanlanishi shart";
  }
  if (!personalInfo.birthDate) {
    errors.birthDate = "Tug'ilgan sana kiritilishi shart";
  }
  if (!personalInfo.birthPlace) {
    errors.birthPlace = "Tug'ilgan joy tanlanishi shart";
  }
  if (!personalInfo.maritalStatus) {
    errors.maritalStatus = "Oilaviy holati tanlanishi shart";
  }
  if (
    !personalInfo.phone.trim() ||
    personalInfo.phone.replace(/\D/g, "").length !== 9
  ) {
    errors.phone = "Telefon raqam to'liq kiritilishi shart";
  }
  if (
    !personalInfo.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)
  ) {
    errors.email = "Email to'g'ri kiritilishi shart";
  }
  if (
    !personalInfo.passport.trim() ||
    !/^[A-Z]{2}\s\d{7}$/.test(personalInfo.passport)
  ) {
    errors.passport =
      "Passport raqam to'g'ri formatda kiritilishi shart (AB 1234567)";
  }
  if (!personalInfo.photo) {
    errors.photo = "Rasm yuklanishi shart";
  }
  if (!personalInfo.street.trim()) {
    errors.street = "Ko'cha kiritilishi shart";
  }
  if (!personalInfo.houseNumber.trim()) {
    errors.houseNumber = "Uy raqami kiritilishi shart";
  }
  if (!personalInfo.region) {
    errors.region = "Viloyat tanlanishi shart";
  }
  if (!personalInfo.country) {
    errors.country = "Davlat tanlanishi shart";
  }

  const errorKeys = Object.keys(errors);
  return {
    isValid: errorKeys.length === 0,
    errors,
    firstErrorField: errorKeys[0],
  };
};
