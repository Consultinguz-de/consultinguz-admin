"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

interface RegisterLinkProps {
  directionId: string;
  registerLink: string;
  linkActive: boolean;
  isUpdatingLink: boolean;
  onToggleLink: (checked: boolean) => void;
}

export function RegisterLink({
  directionId,
  registerLink,
  linkActive,
  isUpdatingLink,
  onToggleLink,
}: RegisterLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(registerLink);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className="space-y-2">
        <Label htmlFor={`register-link-${directionId}`}>
          Ro'yxatdan o'tish linki
        </Label>
        <div className="flex gap-2">
          <Input
            id={`register-link-${directionId}`}
            value={registerLink}
            readOnly
            disabled={!linkActive}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                onClick={handleCopy}
                className="shrink-0"
                disabled={!linkActive}
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {!linkActive
                ? "Link o'chirilgan"
                : copied
                  ? "Nusxa olindi"
                  : "Linkni nusxalash"}
            </TooltipContent>
          </Tooltip>
          <Switch
            checked={linkActive}
            disabled={isUpdatingLink}
            onCheckedChange={onToggleLink}
            aria-label="Asosiy link aktivligi"
            className="self-center"
          />
        </div>
        {!linkActive ? (
          <p className="text-xs text-muted-foreground">
            Link o'chirilgan, nusxa olish o'chirilgan.
          </p>
        ) : null}
      </div>
    </TooltipProvider>
  );
}
