"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExperienceItem } from "./experience-item";
import { WorkExperience } from "./types";
import { useRegister } from "../../register-context";

export function WorkExperienceStep() {
  const { formData, updateFormData } = useRegister();
  const experiences = formData.workExperience;
  const [openItems, setOpenItems] = useState<string[]>([]);

  const setExperiences = (newExperiences: WorkExperience[]) => {
    updateFormData("workExperience", newExperiences);
  };

  const addExperience = () => {
    const newId = Date.now().toString();
    setExperiences([
      ...experiences,
      {
        id: newId,
        position: "",
        employer: "",
        responsibilities: [],
      },
    ]);
    setOpenItems([newId]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
    setOpenItems(openItems.filter((item) => item !== id));
  };

  const updateExperience = (
    id: string,
    field: keyof WorkExperience,
    value: unknown,
  ) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    );
  };

  const addResponsibility = (id: string, responsibility: string) => {
    if (!responsibility.trim()) return;
    setExperiences(
      experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              responsibilities: [
                ...exp.responsibilities,
                responsibility.trim(),
              ],
            }
          : exp,
      ),
    );
  };

  const removeResponsibility = (expId: string, index: number) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              responsibilities: exp.responsibilities.filter(
                (_, i) => i !== index,
              ),
            }
          : exp,
      ),
    );
  };

  const toggleItem = (id: string) => {
    setOpenItems(
      openItems.includes(id)
        ? openItems.filter((item) => item !== id)
        : [...openItems, id],
    );
  };

  return (
    <div className="space-y-4">
      {experiences.map((exp, index) => (
        <ExperienceItem
          key={exp.id}
          experience={exp}
          index={index}
          isOpen={openItems.includes(exp.id)}
          onToggle={() => toggleItem(exp.id)}
          onRemove={() => removeExperience(exp.id)}
          onUpdate={(field, value) => updateExperience(exp.id, field, value)}
          onAddResponsibility={(value) => addResponsibility(exp.id, value)}
          onRemoveResponsibility={(idx) => removeResponsibility(exp.id, idx)}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={addExperience}
      >
        <Plus className="h-4 w-4 mr-2" />
        Ish tajribasi qo'shish
      </Button>
    </div>
  );
}
