"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  FileText,
  FileCheck2,
  HelpCircle,
  Pencil,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { updateCandidateStatus } from "../../actions";
import { toast } from "sonner";

interface CandidateStatusProps {
  candidateId: string;
  initialApproved: boolean | null | undefined;
  initialDocumentReady: boolean | null | undefined;
  onEditClick?: () => void;
  isEditing?: boolean;
}

function nextToggle(value: boolean | null | undefined) {
  if (value === true) return false;
  if (value === false) return true;
  return true;
}

export function CandidateStatus({
  candidateId,
  initialApproved,
  initialDocumentReady,
  onEditClick,
  isEditing,
}: CandidateStatusProps) {
  const [approved, setApproved] = useState<boolean | null | undefined>(
    initialApproved ?? null,
  );
  const [documentReady, setDocumentReady] = useState<
    boolean | null | undefined
  >(initialDocumentReady ?? null);
  const [isPending, startTransition] = useTransition();

  const toggleApproved = () => {
    const prev = approved ?? null;
    const next = nextToggle(approved);
    setApproved(next);
    startTransition(async () => {
      const result = await updateCandidateStatus(candidateId, {
        approved: next,
      });
      if (!result.success) {
        setApproved(prev);
        toast.error("Tasdiq holatini yangilashda xatolik", {
          description: result.error || "Qayta urinib ko'ring.",
        });
        return;
      }
      toast.success("Tasdiq holati yangilandi", {
        description:
          next === true
            ? "Tasdiqlangan"
            : next === false
              ? "Rad etilgan"
              : "Kutilmoqda",
      });
    });
  };

  const toggleDocumentReady = () => {
    const prev = documentReady ?? null;
    const next = nextToggle(documentReady);
    setDocumentReady(next);
    startTransition(async () => {
      const result = await updateCandidateStatus(candidateId, {
        documentReady: next,
      });
      if (!result.success) {
        setDocumentReady(prev);
        toast.error("Hujjat holatini yangilashda xatolik", {
          description: result.error || "Qayta urinib ko'ring.",
        });
        return;
      }
      toast.success("Hujjat holati yangilandi", {
        description:
          next === true
            ? "Tayyor"
            : next === false
              ? "Tayyor emas"
              : "Noma'lum",
      });
    });
  };

  const renderApproveIcon = (value: boolean | null | undefined) => {
    if (value === true) return <ThumbsUp className="h-4 w-4 text-green-600" />;
    if (value === false) return <ThumbsDown className="h-4 w-4 text-red-600" />;
    return <HelpCircle className="h-4 w-4 text-muted-foreground" />;
  };

  const renderDocumentIcon = (value: boolean | null | undefined) => {
    if (value === true)
      return <FileCheck2 className="h-4 w-4 text-green-600" />;
    if (value === false) return <FileText className="h-4 w-4 text-red-600" />;
    return <HelpCircle className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={toggleApproved}
        disabled={isPending}
        className="h-9 w-9"
        aria-label="Tasdiq holati"
        title={
          approved === true
            ? "Tasdiqlangan"
            : approved === false
              ? "Rad etilgan"
              : "Kutilmoqda"
        }
      >
        {renderApproveIcon(approved)}
      </Button>
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={toggleDocumentReady}
        disabled={isPending}
        className="h-9 w-9"
        aria-label="Hujjat holati"
        title={
          documentReady === true
            ? "Tayyor"
            : documentReady === false
              ? "Tayyor emas"
              : "Noma'lum"
        }
      >
        {renderDocumentIcon(documentReady)}
      </Button>
      {onEditClick && (
        <Button
          type="button"
          size="icon"
          variant={isEditing ? "default" : "outline"}
          onClick={onEditClick}
          disabled={isPending}
          className="h-9 w-9"
          aria-label="Tahrirlash"
          title="Tahrirlash"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
