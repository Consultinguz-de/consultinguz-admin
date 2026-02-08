"use client";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { type OptionalSectionProps } from "./optional-section.types";
import { OptionalSectionFields } from "./optional-section-fields";
import { OptionalSectionHeader } from "./optional-section-header";

export function OptionalSection({
  type,
  title,
  data,
  isOpen,
  onToggle,
  onClose,
  onUpdate,
  errors = {},
  onClearError,
  onFileError,
}: OptionalSectionProps) {
  const handleUpdate: OptionalSectionProps["onUpdate"] = (field, value) => {
    if (errors[`${type}_${field}`]) onClearError?.(`${type}_${field}`);
    onUpdate(field, value);
  };

  const handleEnabledChange = (checked: boolean) => {
    onUpdate("enabled", checked);
    if (!checked) onClose();
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onToggle}
      className="border rounded-lg"
    >
      <OptionalSectionHeader
        title={title}
        enabled={data.enabled}
        isOpen={isOpen}
        onEnabledChange={handleEnabledChange}
      />

      <CollapsibleContent>
        <OptionalSectionFields
          type={type}
          data={data}
          errors={errors}
          onFieldChange={handleUpdate}
          onClearError={onClearError}
          onFileError={onFileError}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
