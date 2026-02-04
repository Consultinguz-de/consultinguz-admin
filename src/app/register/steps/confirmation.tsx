"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TurnstileWidget } from "@/components/turnstile-widget";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { PrivacyPolicyContent } from "./privacy-policy-content";
import { useRegister } from "../register-context";

export function ConfirmationStep() {
  const { formData, updateFormData, submitForm } = useRegister();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [resetTurnstile, setResetTurnstile] = useState<(() => void) | null>(
    null,
  );
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const handlePrivacyChange = (checked: boolean) => {
    updateFormData("privacyAccepted", checked);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Tasdiqlash</h3>

      <div className="flex items-start space-x-3 p-4 border rounded-lg">
        <Checkbox
          id="privacy-policy"
          checked={formData.privacyAccepted}
          onCheckedChange={(checked) => handlePrivacyChange(checked === true)}
        />
        <Label
          htmlFor="privacy-policy"
          className="text-sm leading-relaxed cursor-pointer"
        >
          Men{" "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            className="text-primary underline hover:no-underline"
          >
            Maxfiylik siyosati
          </button>
          ni o'qidim va unga roziman.
        </Label>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
              MAXFIYLIK SIYOSATI
            </DialogTitle>
          </DialogHeader>
          <PrivacyPolicyContent />
        </DialogContent>
      </Dialog>

      <TurnstileWidget
        siteKey={siteKey}
        onVerify={(token) => setTurnstileToken(token)}
        onExpire={() => setTurnstileToken(null)}
        onError={() => setTurnstileToken(null)}
        onReady={(reset) => setResetTurnstile(() => reset)}
        className="flex justify-center"
      />

      <Button
        type="button"
        className="w-full mt-4"
        disabled={!formData.privacyAccepted || !turnstileToken}
        onClick={async () => {
          const verifyResponse = await fetch("/api/turnstile/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: turnstileToken }),
          });
          if (!verifyResponse.ok) {
            toast.error("Turnstile tasdiqlanmadi", {
              description: "Iltimos, qayta urinib ko'ring.",
            });
            // Reset turnstile to get new token
            setTurnstileToken(null);
            resetTurnstile?.();
            return;
          }
          submitForm();
        }}
      >
        Jo'natish
      </Button>
    </div>
  );
}
