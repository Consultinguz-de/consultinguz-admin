"use client";
import { useState } from "react";
import { FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RegisterResult } from "./register-result";

export function MobileResultFab() {
  const [isResultOpen, setIsResultOpen] = useState(false);

  return (
    <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="md:hidden fixed bottom-20 right-4 h-12 w-12 rounded-full shadow-lg z-50"
        >
          <FileText className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Natija</DialogTitle>
          <DialogDescription>Ro'yxatdan o'tish natijasi</DialogDescription>
        </DialogHeader>
        <RegisterResult />
      </DialogContent>
    </Dialog>
  );
}
