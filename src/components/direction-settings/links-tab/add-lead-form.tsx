"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DirectionLeadLink } from "@/types/direction";

interface AddLeadFormProps {
  directionId: string;
  directionUuid: string;
  onLeadAdded: (lead: DirectionLeadLink) => void;
}

export function AddLeadForm({
  directionId,
  directionUuid,
  onLeadAdded,
}: AddLeadFormProps) {
  const [leadName, setLeadName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const trimmedLead = leadName.trim();
    if (!trimmedLead) {
      toast.error("Lead nomi kiritilmagan");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(
        `/api/directions/${directionUuid || directionId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leadName: trimmedLead }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error("Lead saqlanmadi", {
          description: data?.message || "Saqlashda xatolik yuz berdi.",
        });
        return;
      }

      const newLead = data?.lead;
      if (newLead) {
        onLeadAdded(newLead);
      }

      setLeadName("");
      router.refresh();
      toast.success("Lead qo'shildi", {
        description: newLead?.name || trimmedLead,
      });
    } catch {
      toast.error("Lead saqlanmadi", {
        description: "Server bilan bog'lanishda xatolik.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={`lead-${directionId}`}>Yangi lead qo'shish</Label>
      <div className="flex gap-2">
        <Input
          id={`lead-${directionId}`}
          placeholder="Masalan: 12345"
          value={leadName}
          onChange={(e) => setLeadName(e.target.value)}
          disabled={isSaving}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isSaving) {
              handleSubmit();
            }
          }}
        />
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving || !leadName.trim()}
          className="shrink-0"
        >
          {isSaving ? "Saqlanmoqda..." : "Qo'shish"}
        </Button>
      </div>
    </div>
  );
}
