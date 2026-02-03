"use client";

import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveSelect } from "./responsive-select";
import { LanguageSkill, SelectOption, LEVELS } from "./types";

interface SkillItemProps {
  skill: LanguageSkill;
  index: number;
  canRemove: boolean;
  availableLanguages: SelectOption[];
  onRemove: () => void;
  onUpdate: (
    field: keyof LanguageSkill,
    value: string | File | boolean | undefined
  ) => void;
}

export function SkillItem({
  skill,
  index,
  canRemove,
  availableLanguages,
  onRemove,
  onUpdate,
}: SkillItemProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">Til #{index + 1}</span>
        {canRemove && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <ResponsiveSelect
          label="Til"
          placeholder="Tilni tanlang"
          options={availableLanguages}
          value={skill.language}
          onChange={(value) => onUpdate("language", value)}
        />
        <ResponsiveSelect
          label="Daraja"
          placeholder="Darajani tanlang"
          options={LEVELS}
          value={skill.level}
          onChange={(value) => onUpdate("level", value)}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`no-cert-${skill.id}`}
            checked={skill.noCertificate}
            onCheckedChange={(checked) => {
              onUpdate("noCertificate", checked as boolean);
              if (checked) {
                onUpdate("certificate", undefined);
              }
            }}
          />
          <Label
            htmlFor={`no-cert-${skill.id}`}
            className="text-sm font-normal cursor-pointer"
          >
            Til sertifikati yo'q
          </Label>
        </div>

        {!skill.noCertificate && (
          <div className="space-y-2">
            <Label>Til sertifikati (PDF)</Label>
            {skill.certificate ? (
              <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                <span className="text-sm flex-1 truncate">
                  {skill.certificate.name}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdate("certificate", undefined)}
                  className="p-1 hover:bg-destructive/10 rounded text-destructive"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onUpdate("certificate", file);
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
