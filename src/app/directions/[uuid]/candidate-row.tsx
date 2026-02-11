"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Check,
  HelpCircle,
  MessageCircle,
  MessageCircleOff,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { CandidateListItem } from "./actions";

interface CandidateRowProps {
  item: CandidateListItem;
  index: number;
  href: string;
  isDeleting: boolean;
  onDelete: (candidateId: string, fullName: string) => void;
}

function hasComment(value: unknown) {
  if (!value) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "object") {
    return Object.keys(value as Record<string, unknown>).length > 0;
  }
  return true;
}

export function CandidateRow({
  item,
  index,
  href,
  isDeleting,
  onDelete,
}: CandidateRowProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();

  return (
    <tr
      className="hover:bg-muted/80 cursor-pointer"
      onClick={() => router.push(href)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(href);
        }
      }}
      role="link"
      tabIndex={0}
    >
      <td className="px-3 py-2 align-middle border-r">{index + 1}</td>
      <td className="px-3 py-2 align-middle">
        <div className="h-10 w-10 rounded-full bg-muted/50 overflow-hidden border">
          {item.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.photoUrl}
              alt={item.fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
              —
            </div>
          )}
        </div>
      </td>
      <td className="px-3 py-2 align-middle font-medium">{item.fullName}</td>
      <td className="px-3 py-2 align-middle">{item.email || "—"}</td>
      <td className="px-3 py-2 align-middle">
        {item.approved === true ? (
          <span title="Tasdiqlangan">
            <Check className="h-4 w-4 text-green-600" />
          </span>
        ) : item.approved === false ? (
          <span title="Rad etilgan">
            <X className="h-4 w-4 text-red-600" />
          </span>
        ) : (
          <span title="Kutilmoqda">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </span>
        )}
      </td>
      <td className="px-3 py-2 align-middle">
        {item.documentReady === true ? (
          <span title="Hujjatlar tayyor">
            <Check className="h-4 w-4 text-green-600" />
          </span>
        ) : item.documentReady === false ? (
          <span title="Hujjatlar tayyor emas">
            <X className="h-4 w-4 text-red-600" />
          </span>
        ) : (
          <span title="Noma'lum">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </span>
        )}
      </td>
      <td className="px-3 py-2 align-middle">{item.stage ?? "—"}</td>
      <td className="px-3 py-2 align-middle">
        {hasComment(item.comment) ? (
          <MessageCircle className="h-4 w-4" />
        ) : (
          <MessageCircleOff className="h-4 w-4 text-muted-foreground" />
        )}
      </td>
      <td className="px-3 py-2 align-middle">
        {item.createdAt
          ? format(new Date(item.createdAt), "dd.MM.yy HH:mm")
          : "—"}
      </td>
      <td
        className="px-3 py-2 align-middle text-right"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Popover open={confirmOpen} onOpenChange={setConfirmOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={isDeleting}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>O'chirish</TooltipContent>
          </Tooltip>
          <PopoverContent
            className="w-auto p-3"
            side="bottom"
            align="end"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <p className="text-sm mb-3">O'chirishni tasdiqlaysizmi?</p>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmOpen(false);
                }}
              >
                Yo'q
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id, item.fullName);
                }}
              >
                Ha
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );
}
