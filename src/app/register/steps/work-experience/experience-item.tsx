"use client";

import { ChevronDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DatePicker } from "../../components/date-picker";
import { ResponsibilityInput } from "./responsibility-input";
import { ResponsibilityList } from "./responsibility-list";
import { WorkExperience } from "./types";

interface ExperienceItemProps {
  experience: WorkExperience;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onRemove: () => void;
  onUpdate: (field: keyof WorkExperience, value: unknown) => void;
  onAddResponsibility: (value: string) => void;
  onRemoveResponsibility: (index: number) => void;
}

export function ExperienceItem({
  experience,
  index,
  isOpen,
  onToggle,
  onRemove,
  onUpdate,
  onAddResponsibility,
  onRemoveResponsibility,
}: ExperienceItemProps) {
  const title =
    experience.position || experience.employer
      ? `${experience.position}${experience.position && experience.employer ? " - " : ""}${experience.employer}`
      : `Ish tajribasi #${index + 1}`;

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <div className="border rounded-lg">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
              <span className="font-medium">{title}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-3 pt-0 space-y-4">
            {/* Vaqt oralig'i */}
            <div className="grid grid-cols-2 gap-3">
              <DatePicker
                label="Boshlangan sana"
                placeholder="Tanlang"
                value={experience.startDate}
                onChange={(date) => onUpdate("startDate", date)}
                toYear={new Date().getFullYear()}
              />
              <DatePicker
                label="Tugagan sana"
                placeholder="Tanlang"
                value={experience.endDate}
                onChange={(date) => onUpdate("endDate", date)}
                toYear={new Date().getFullYear()}
              />
            </div>

            {/* Pozitsiya */}
            <div className="space-y-2">
              <Label>Pozitsiya</Label>
              <Input
                placeholder="Masalan: Dasturchi"
                value={experience.position}
                onChange={(e) => onUpdate("position", e.target.value)}
              />
            </div>

            {/* Ish beruvchi */}
            <div className="space-y-2">
              <Label>Ish beruvchi</Label>
              <Input
                placeholder="Kompaniya nomi"
                value={experience.employer}
                onChange={(e) => onUpdate("employer", e.target.value)}
              />
            </div>

            {/* Vazifalar */}
            <div className="space-y-2">
              <Label>Bajargan vazifalar</Label>
              <ResponsibilityList
                responsibilities={experience.responsibilities}
                onRemove={onRemoveResponsibility}
              />
              <ResponsibilityInput onAdd={onAddResponsibility} />
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
