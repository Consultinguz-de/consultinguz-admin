"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Direction, DirectionLeadLink } from "@/types/direction";
import { AddLeadForm } from "./add-lead-form";
import { LeadLinkItem } from "./lead-link-item";
import { RegisterLink } from "./register-link";

interface LinksTabProps {
  direction: Direction;
}

export function LinksTab({ direction }: LinksTabProps) {
  const [leadLinks, setLeadLinks] = useState<DirectionLeadLink[]>(
    direction.leadLinks || [],
  );
  const [linkActive, setLinkActive] = useState(
    direction.linkActive ?? true,
  );
  const [isUpdatingLink, setIsUpdatingLink] = useState(false);
  const router = useRouter();

  const registerLink = useMemo(
    () => `http://localhost:3000/register?directionId=${direction.id}`,
    [direction.id],
  );
  const directionKey = direction.uuid || direction.id;

  const handleLeadAdded = (lead: DirectionLeadLink) => {
    setLeadLinks((prev) => [lead, ...prev]);
  };
  const handleLeadDeleted = (leadId: string) => {
    setLeadLinks((prev) => prev.filter((lead) => lead.id !== leadId));
  };
  const updateDirectionSettings = async (
    payload: Record<string, unknown>,
    onError: () => void,
  ) => {
    try {
      const res = await fetch(`/api/directions/${directionKey}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error("Sozlamalar saqlanmadi", {
          description: data?.message || "Saqlashda xatolik yuz berdi.",
        });
        onError();
        return;
      }
      router.refresh();
    } catch {
      toast.error("Sozlamalar saqlanmadi", {
        description: "Server bilan bog'lanishda xatolik.",
      });
      onError();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Linklar</h3>
        <p className="text-sm text-muted-foreground">
          Bu yerda yo'nalish uchun linklar sozlanadi.
        </p>
      </div>

      <RegisterLink
        directionId={direction.id}
        registerLink={registerLink}
        linkActive={linkActive}
        isUpdatingLink={isUpdatingLink}
        onToggleLink={(checked) => {
          const prev = linkActive;
          setLinkActive(checked);
          setIsUpdatingLink(true);
          updateDirectionSettings(
            { linkActive: checked },
            () => setLinkActive(prev),
          ).finally(() => setIsUpdatingLink(false));
        }}
      />

      <AddLeadForm
        directionId={direction.id}
        directionUuid={direction.uuid}
        existingLeadNames={leadLinks.map((lead) => lead.name)}
        onLeadAdded={handleLeadAdded}
      />

      {leadLinks.length > 0 && (
        <div className="space-y-3">
          <Label>Lead linklari ({leadLinks.length})</Label>
          <div className="space-y-2">
            {leadLinks.map((lead) => (
              <LeadLinkItem
                key={lead.id}
                lead={lead}
                registerLink={registerLink}
                linkActive={linkActive}
                directionId={direction.id}
                directionUuid={direction.uuid}
                onLeadDeleted={handleLeadDeleted}
                onLeadActiveChange={(leadId, active) => {
                  setLeadLinks((prev) =>
                    prev.map((item) =>
                      item.id === leadId ? { ...item, active } : item,
                    ),
                  );
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
