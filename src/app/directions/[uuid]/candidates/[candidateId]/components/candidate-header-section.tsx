"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Save, X } from "lucide-react";
import { CandidateStatus } from "../candidate-status";
import type { PersonalInfo } from "./types";

interface CandidateHeaderSectionProps {
  candidateId: string;
  fullName: string;
  personalInfo?: PersonalInfo;
  approved?: boolean | null;
  documentReady?: boolean | null;
  isEditing: boolean;
  isDirty: boolean;
  isPending: boolean;
  onEditClick: () => void;
  onCancelEdit: () => void;
}

export function CandidateHeaderSection({
  candidateId,
  fullName,
  personalInfo,
  approved,
  documentReady,
  isEditing,
  isDirty,
  isPending,
  onEditClick,
  onCancelEdit,
}: CandidateHeaderSectionProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-muted/50 overflow-hidden border">
          {personalInfo?.photo?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={personalInfo.photo.url}
              alt={fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
              —
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{fullName}</h1>
          <div className="text-sm text-muted-foreground">
            {personalInfo?.email || "—"}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-lg border p-3">
          <CandidateStatus
            candidateId={candidateId}
            initialApproved={approved}
            initialDocumentReady={documentReady}
          />
        </div>
        {isEditing && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onCancelEdit}
            disabled={isPending}
            title="Bekor qilish"
            aria-label="Bekor qilish"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onEditClick}
          disabled={isPending}
          title={isEditing && isDirty ? "Saqlash" : "Tahrirlash"}
          aria-label={isEditing && isDirty ? "Saqlash" : "Tahrirlash"}
        >
          {isEditing && isDirty ? (
            <Save className="h-4 w-4" />
          ) : (
            <Pencil className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
