"use client";

import { useState } from "react";
import { SchoolSection } from "./school-section";
import { OptionalSection } from "./optional-section";
import { EducationData } from "./types";
import { useRegister, type Education } from "../../register-context";

export function EducationStep() {
  const { formData, updateFormData, errors, clearFieldError } = useRegister();
  const education = formData.education;

  const [openSections, setOpenSections] = useState({
    school: true,
    college: false,
    university: false,
  });

  const updateEducation = (
    type: keyof Education,
    field: keyof EducationData,
    value: string | boolean | Date | File | undefined,
  ) => {
    updateFormData("education", {
      ...education,
      [type]: {
        ...education[type],
        [field]: value,
      },
    });
  };

  const toggleSection = (type: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        Agar sizda kollej yoki universitet ta'limi bo'lmasa, checkbox ni olib
        tashlang
      </p>

      <div className="space-y-3">
        <SchoolSection
          data={education.school}
          isOpen={openSections.school}
          onToggle={() => toggleSection("school")}
          onUpdate={(field, value) => updateEducation("school", field, value)}
          errors={errors}
          onClearError={clearFieldError}
        />
        <OptionalSection
          type="college"
          title="Kollej/Litsey"
          data={education.college}
          isOpen={openSections.college}
          onToggle={() => toggleSection("college")}
          onClose={() =>
            setOpenSections((prev) => ({ ...prev, college: false }))
          }
          onUpdate={(field, value) => updateEducation("college", field, value)}
          errors={errors}
          onClearError={clearFieldError}
        />
        <OptionalSection
          type="university"
          title="Universitet"
          data={education.university}
          isOpen={openSections.university}
          onToggle={() => toggleSection("university")}
          onClose={() =>
            setOpenSections((prev) => ({ ...prev, university: false }))
          }
          onUpdate={(field, value) =>
            updateEducation("university", field, value)
          }
          errors={errors}
          onClearError={clearFieldError}
        />
      </div>
    </div>
  );
}
