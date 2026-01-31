"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
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
import { useAuth } from "@/contexts/auth-context";

export function LogoutDialog() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    setOpen(false);
    await signOut();
    router.push("/login");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Chiqish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Tizimdan chiqish</DialogTitle>
          <DialogDescription>
            Haqiqatan ham tizimdan chiqmoqchimisiz?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Bekor qilish
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="text-white"
          >
            Ha, chiqish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
