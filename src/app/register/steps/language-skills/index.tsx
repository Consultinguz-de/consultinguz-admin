"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkillItem } from "./skill-item";
import { LANGUAGES, generateId } from "./types";
import { useRegister, type LanguageSkill } from "../../register-context";

export function LanguageSkillsStep() {
  const {
    formData,
    updateFormData,
    errors,
    clearFieldError,
    setFieldError,
  } = useRegister();
  const skills = formData.languageSkills;

  useEffect(() => {
    if (skills.length === 0) {
      updateFormData("languageSkills", [
        { id: generateId(), language: "", level: "", noCertificate: false },
      ]);
    }
  }, []);

  const setSkills = (newSkills: LanguageSkill[]) => {
    updateFormData("languageSkills", newSkills);
  };

  const addSkill = () => {
    setSkills([
      ...skills,
      { id: generateId(), language: "", level: "", noCertificate: false },
    ]);
  };

  const removeSkill = (id: string) => {
    if (skills.length > 1) {
      setSkills(skills.filter((skill) => skill.id !== id));
    }
  };

  const updateSkill = (
    id: string,
    field: keyof LanguageSkill,
    value: string | File | boolean | undefined,
  ) => {
    const errorKey = `language_${id}_${field}`;
    if (errors[errorKey]) {
      clearFieldError(errorKey);
    }
    if (field === "certificate" || field === "noCertificate") {
      const certificateErrorKey = `language_${id}_certificate`;
      if (errors[certificateErrorKey]) {
        clearFieldError(certificateErrorKey);
      }
    }
    if (field === "level") {
      const levelErrorKey = `language_${id}_level`;
      if (errors[levelErrorKey]) {
        clearFieldError(levelErrorKey);
      }
    }
    if (field === "language") {
      const languageErrorKey = `language_${id}_language`;
      if (errors[languageErrorKey]) {
        clearFieldError(languageErrorKey);
      }
      const certificateErrorKey = `language_${id}_certificate`;
      if (errors[certificateErrorKey]) {
        clearFieldError(certificateErrorKey);
      }
    }
    if (field === "language" && (value as string) !== "german") {
      const levelErrorKey = `language_${id}_level`;
      if (errors[levelErrorKey]) {
        clearFieldError(levelErrorKey);
      }
    }
    setSkills(
      skills.map((skill) => {
        if (skill.id !== id) return skill;
        if (field === "language") {
          const languageValue = value as string;
          const requiresCertificate =
            languageValue === "german" || languageValue === "english";
          return requiresCertificate
            ? { ...skill, language: languageValue }
            : {
                ...skill,
                language: languageValue,
                noCertificate: false,
                certificate: undefined,
              };
        }
        if (field === "noCertificate" && value === true) {
          return { ...skill, noCertificate: true, certificate: undefined };
        }
        return { ...skill, [field]: value };
      }),
    );
  };

  const getAvailableLanguages = (currentId: string) => {
    const usedLanguages = skills
      .filter((s) => s.id !== currentId && s.language)
      .map((s) => s.language);
    return LANGUAGES.filter((lang) => !usedLanguages.includes(lang.value));
  };

  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <SkillItem
          key={skill.id}
          skill={skill}
          index={index}
          canRemove={skills.length > 1}
          availableLanguages={getAvailableLanguages(skill.id)}
          onRemove={() => removeSkill(skill.id)}
          onUpdate={(field, value) => updateSkill(skill.id, field, value)}
          errors={errors}
          onFileError={setFieldError}
        />
      ))}

      {skills.length < LANGUAGES.length && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={addSkill}
        >
          <Plus className="h-4 w-4 mr-2" />
          Til qo'shish
        </Button>
      )}
    </div>
  );
}
