"use client";

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Direction } from "@/types/direction";

interface DirectionSettingsDialogProps {
  direction: Direction;
}

export function DirectionSettingsDialog({
  direction,
}: DirectionSettingsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={(e) => e.stopPropagation()}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{direction.title} sozlamalari</DialogTitle>
          <DialogDescription>
            Bu yo'nalish uchun sozlamalarni o'zgartiring.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor={`title-${direction.id}`}>Yo'nalish nomi</Label>
            <Input
              id={`title-${direction.id}`}
              defaultValue={direction.title}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`slug-${direction.id}`}>Slug</Label>
            <Input id={`slug-${direction.id}`} defaultValue={direction.slug} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Saqlash</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
