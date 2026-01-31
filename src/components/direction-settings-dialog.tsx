"use client";

import { useState } from "react";
import {
  Settings,
  Link,
  MessageSquare,
  MessageCirclePlus,
  Briefcase,
} from "lucide-react";
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
import { cn } from "@/lib/utils";

interface DirectionSettingsDialogProps {
  direction: Direction;
}

type TabType = "links" | "internal-chat" | "additional-chat" | "employer-chat";

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: "links", label: "Linklar", icon: <Link className="h-4 w-4" /> },
  {
    id: "internal-chat",
    label: "Ichki suhbat",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    id: "additional-chat",
    label: "Qo'shimcha suhbat",
    icon: <MessageCirclePlus className="h-4 w-4" />,
  },
  {
    id: "employer-chat",
    label: "Ish beruvchi suhbati",
    icon: <Briefcase className="h-4 w-4" />,
  },
];

export function DirectionSettingsDialog({
  direction,
}: DirectionSettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<TabType>("links");

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
      <DialogContent className="sm:max-w-3xl p-0">
        <div className="flex h-[500px]">
          {/* Sidebar */}
          <div className="w-56 border-r bg-muted/30 p-4">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-base">{direction.title}</DialogTitle>
              <DialogDescription className="text-xs">
                Sozlamalar
              </DialogDescription>
            </DialogHeader>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "cursor-pointer flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {activeTab === "links" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Linklar</h3>
                <p className="text-sm text-muted-foreground">
                  Bu yerda yo'nalish uchun linklar sozlanadi.
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${direction.id}`}>
                      Yo'nalish nomi
                    </Label>
                    <Input
                      id={`title-${direction.id}`}
                      defaultValue={direction.title}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`slug-${direction.id}`}>Slug</Label>
                    <Input
                      id={`slug-${direction.id}`}
                      defaultValue={direction.slug}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "internal-chat" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ichki suhbat</h3>
                <p className="text-sm text-muted-foreground">
                  Ichki suhbat sozlamalari bu yerda joylashgan.
                </p>
              </div>
            )}

            {activeTab === "additional-chat" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Qo'shimcha suhbat</h3>
                <p className="text-sm text-muted-foreground">
                  Qo'shimcha suhbat sozlamalari bu yerda joylashgan.
                </p>
              </div>
            )}

            {activeTab === "employer-chat" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ish beruvchi suhbati</h3>
                <p className="text-sm text-muted-foreground">
                  Ish beruvchi suhbati sozlamalari bu yerda joylashgan.
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <Button>Saqlash</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
