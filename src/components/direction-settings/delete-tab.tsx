"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Direction } from "@/types/direction";

interface DeleteTabProps {
  direction: Direction;
}

export function DeleteTab({ direction }: DeleteTabProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `/api/directions/${direction.uuid || direction.id}`,
        { method: "DELETE" },
      );

      if (!res.ok) {
        const data = await res.json();
        toast.error("Yo'nalish o'chirilmadi", {
          description: data?.message || "O'chirishda xatolik yuz berdi.",
        });
        return;
      }

      toast.success("Yo'nalish o'chirildi", {
        description: direction.title,
      });
      setShowConfirm(false);
      router.refresh();
    } catch {
      toast.error("Yo'nalish o'chirilmadi", {
        description: "Server bilan bog'lanishda xatolik.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-destructive">
        Yo'nalishni o'chirish
      </h3>
      <p className="text-sm text-muted-foreground">
        Bu amalni qaytarib bo'lmaydi. Yo'nalish va unga tegishli barcha
        ma'lumotlar butunlay o'chiriladi.
      </p>
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <h4 className="font-medium text-destructive mb-2">Ogohlantirish</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Barcha nomzodlar ma'lumotlari o'chiriladi</li>
          <li>Barcha suhbatlar o'chiriladi</li>
          <li>Barcha linklar o'chiriladi</li>
          <li>Bu amalni qaytarib bo'lmaydi</li>
        </ul>
      </div>
      {!showConfirm ? (
        <Button
          variant="destructive"
          onClick={() => setShowConfirm(true)}
          className="w-full"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Yo'nalishni o'chirish
        </Button>
      ) : (
        <div className="space-y-3">
          <p className="text-sm font-medium">Rostdan ham o'chirmoqchimisiz?</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              disabled={isDeleting}
              className="flex-1"
            >
              Bekor qilish
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  O'chirilmoqda
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Ha, o'chirish
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
