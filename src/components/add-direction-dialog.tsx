"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddDirectionDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const resetForm = () => {
    setName("");
    setOpen(false);
  };

  const handleSubmit = async () => {
    const title = name.trim();
    if (!title) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/directions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Yo'nalish saqlanmadi", {
          description: data?.message || "Saqlashda xatolik yuz berdi.",
        });
        return;
      }

      toast.success("Yo'nalish qo'shildi", {
        description: data?.direction?.title || title,
      });
      resetForm();
      router.refresh();
    } catch {
      toast.error("Yo'nalish saqlanmadi", {
        description: "Server bilan bog'lanishda xatolik.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSaving && name.trim()) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Yangi yo'nalish
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yangi yo'nalish qo'shish</DialogTitle>
          <DialogDescription>
            Yangi yo'nalish nomini kiriting.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="direction-name">Yo'nalish nomi</Label>
            <Input
              id="direction-name"
              placeholder="Masalan: IT"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSaving}
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={resetForm} disabled={isSaving}>
            Bekor qilish
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim() || isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saqlanmoqda
              </>
            ) : (
              "Saqlash"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
