"use client";

import { useState } from "react";
import { Copy, Check, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DirectionLeadLink } from "@/types/direction";

interface LeadLinkItemProps {
  lead: DirectionLeadLink;
  registerLink: string;
  linkActive: boolean;
  directionId: string;
  directionUuid: string;
  onLeadDeleted: (leadId: string) => void;
  onLeadActiveChange: (leadId: string, active: boolean) => void;
}

export function LeadLinkItem({
  lead,
  registerLink,
  linkActive,
  directionId,
  directionUuid,
  onLeadDeleted,
  onLeadActiveChange,
}: LeadLinkItemProps) {
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const router = useRouter();

  const leadLink = `${registerLink}&lead=${encodeURIComponent(lead.name)}`;
  const isInactive = !lead.active || !linkActive;

  const handleCopy = async () => {
    if (isInactive) {
      return;
    }
    await navigator.clipboard.writeText(leadLink);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    setConfirmOpen(false);
    setIsDeleting(true);
    try {
      const res = await fetch(
        `/api/directions/${directionUuid || directionId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ removeLeadId: lead.id }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error("Lead o'chirilmadi", {
          description: data?.message || "O'chirishda xatolik yuz berdi.",
        });
        return;
      }

      onLeadDeleted(lead.id);
      router.refresh();
      toast.success("Lead o'chirildi", {
        description: lead.name,
      });
    } catch {
      toast.error("Lead o'chirilmadi", {
        description: "Server bilan bog'lanishda xatolik.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleActive = async (checked: boolean) => {
    const prev = lead.active;
    onLeadActiveChange(lead.id, checked);
    setIsToggling(true);
    try {
      const res = await fetch(
        `/api/directions/${directionUuid || directionId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leadId: lead.id, leadActive: checked }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error("Lead yangilanmadi", {
          description: data?.message || "Saqlashda xatolik yuz berdi.",
        });
        onLeadActiveChange(lead.id, prev);
        return;
      }
      router.refresh();
    } catch {
      toast.error("Lead yangilanmadi", {
        description: "Server bilan bog'lanishda xatolik.",
      });
      onLeadActiveChange(lead.id, prev);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div
        className={
          isInactive
            ? "flex items-center justify-between gap-2 rounded-md border p-2 opacity-60"
            : "flex items-center justify-between gap-2 rounded-md border p-2"
        }
      >
        <p className="font-medium truncate">{lead.name}</p>

        <div className="flex items-center gap-2 shrink-0">
          <Switch
            checked={linkActive ? lead.active : false}
            disabled={isToggling || !linkActive}
            onCheckedChange={handleToggleActive}
            aria-label={`${lead.name} aktivligi`}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={isInactive}
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isInactive
                ? "Lead o'chirilgan"
                : copied
                  ? "Nusxa olindi"
                  : "Linkni nusxalash"}
            </TooltipContent>
          </Tooltip>

          <Popover open={confirmOpen} onOpenChange={setConfirmOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>O'chirish</TooltipContent>
            </Tooltip>
            <PopoverContent className="w-auto p-3" side="bottom" align="end">
              <p className="text-sm mb-3">O'chirishni tasdiqlaysizmi?</p>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmOpen(false)}
                >
                  Yo'q
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                >
                  Ha
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </TooltipProvider>
  );
}
