"use client";

import { ChevronDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DatePicker } from "../../components/date-picker";
import { cn } from "@/lib/utils";
import { EducationData } from "./types";

interface SchoolSectionProps {
  data: EducationData;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (
    field: keyof EducationData,
    value: string | Date | File | undefined,
  ) => void;
}

export function SchoolSection({
  data,
  isOpen,
  onToggle,
  onUpdate,
}: SchoolSectionProps) {
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onToggle}
      className="border rounded-lg"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
          <span className="font-medium">Maktab</span>
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="px-4 pb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              label="O'qishni boshlagan sana"
              placeholder="Tanlang"
              value={data.startDate}
              onChange={(date) => onUpdate("startDate", date)}
              toYear={new Date().getFullYear()}
            />
            <DatePicker
              label="O'qishni tugatgan sana"
              placeholder="Tanlang"
              value={data.endDate}
              onChange={(date) => onUpdate("endDate", date)}
              toYear={new Date().getFullYear()}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Maktab nomi</label>
            <Input
              placeholder="Masalan: 1-sonli maktab"
              value={data.institutionName}
              onChange={(e) => onUpdate("institutionName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Maktab shahodatnomasi (PDF)
            </label>
            {data.document ? (
              <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                <span className="text-sm flex-1 truncate">
                  {data.document.name}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdate("document", undefined)}
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
                  onUpdate("document", file);
                }}
              />
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
