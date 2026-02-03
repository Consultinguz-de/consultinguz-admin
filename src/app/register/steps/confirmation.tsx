"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PrivacyPolicyContent } from "./privacy-policy-content";

export function ConfirmationStep() {
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Tasdiqlash</h3>

      <div className="flex items-start space-x-3 p-4 border rounded-lg">
        <Checkbox
          id="privacy-policy"
          checked={privacyAccepted}
          onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
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
    </div>
  );
}
