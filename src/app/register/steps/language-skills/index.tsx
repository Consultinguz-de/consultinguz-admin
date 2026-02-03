"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkillItem } from "./skill-item";
import { LANGUAGES, generateId } from "./types";
import { useRegister, type LanguageSkill } from "../../register-context";

export function LanguageSkillsStep() {
  const { formData, updateFormData } = useRegister();
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
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill,
      ),
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
