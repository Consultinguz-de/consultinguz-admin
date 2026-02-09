"use client";

import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
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

  const registerLink = useMemo(
    () => `http://localhost:3000/register?directionId=${direction.id}`,
    [direction.id],
  );

  const handleLeadAdded = (lead: DirectionLeadLink) => {
    setLeadLinks((prev) => [lead, ...prev]);
  };
  const handleLeadDeleted = (leadId: string) => {
    setLeadLinks((prev) => prev.filter((lead) => lead.id !== leadId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Linklar</h3>
        <p className="text-sm text-muted-foreground">
          Bu yerda yo'nalish uchun linklar sozlanadi.
        </p>
      </div>

      <RegisterLink directionId={direction.id} registerLink={registerLink} />

      <AddLeadForm
        directionId={direction.id}
        directionUuid={direction.uuid}
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
                directionId={direction.id}
                directionUuid={direction.uuid}
                onLeadDeleted={handleLeadDeleted}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
