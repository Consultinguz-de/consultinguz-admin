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

interface RegisterLinkProps {
  directionId: string;
  registerLink: string;
}

export function RegisterLink({ directionId, registerLink }: RegisterLinkProps) {
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
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {copied ? "Nusxa olindi" : "Linkni nusxalash"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
