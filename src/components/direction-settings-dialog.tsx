"use client";

import { useState } from "react";
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
import { Direction } from "@/types/direction";
import { cn } from "@/lib/utils";
import { tabs, TabType } from "./direction-settings/tabs-config";
import { LinksTab } from "./direction-settings/links-tab";
import { DeleteTab } from "./direction-settings/delete-tab";

interface DirectionSettingsDialogProps {
  direction: Direction;
}

const PlaceholderTab = ({ title }: { title: string }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">
      {title} sozlamalari bu yerda joylashgan.
    </p>
  </div>
);

export function DirectionSettingsDialog({
  direction,
}: DirectionSettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<TabType>("links");

  const renderTabContent = () => {
    switch (activeTab) {
      case "links":
        return <LinksTab direction={direction} />;
      case "internal-chat":
        return <PlaceholderTab title="Ichki suhbat" />;
      case "additional-chat":
        return <PlaceholderTab title="Qo'shimcha suhbat" />;
      case "employer-chat":
        return <PlaceholderTab title="Ish beruvchi suhbati" />;
      case "delete":
        return <DeleteTab direction={direction} />;
      default:
        return null;
    }
  };

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
            {renderTabContent()}
            {activeTab !== "delete" && (
              <div className="mt-6 flex justify-end">
                <Button>Saqlash</Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
