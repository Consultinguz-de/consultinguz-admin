"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function UserMenu() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const userInitials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all">
            <AvatarImage
              src={user?.photoURL || ""}
              alt={user?.displayName || "User"}
            />
            <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <User className="h-4 w-4 mr-2" />
            Profil
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setLogoutDialogOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Chiqish
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="sm:max-w-100">
          <DialogHeader>
            <DialogTitle>Tizimdan chiqish</DialogTitle>
            <DialogDescription>
              Haqiqatan ham tizimdan chiqmoqchimisiz?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-4">
            <Button
              variant="outline"
              onClick={() => setLogoutDialogOpen(false)}
            >
              Bekor qilish
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                setLogoutDialogOpen(false);
                await signOut();
                router.push("/login");
              }}
              className="text-white"
            >
              Ha, chiqish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
