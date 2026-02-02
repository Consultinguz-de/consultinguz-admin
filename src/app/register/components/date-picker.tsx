"use client";

import { useState, useRef } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface DatePickerProps {
  label: string;
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  fromYear?: number;
  toYear?: number;
}

export function DatePicker({
  label,
  placeholder = "Sanani tanlang",
  value,
  onChange,
  fromYear = 1940,
  toYear = new Date().getFullYear(),
}: DatePickerProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToView = () => {
    setTimeout(() => {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handlePopoverOpenChange = (isOpen: boolean) => {
    setPopoverOpen(isOpen);
    if (isOpen) scrollToView();
  };

  const handleDrawerOpenChange = (isOpen: boolean) => {
    setDrawerOpen(isOpen);
    if (isOpen) scrollToView();
  };

  const handleSelectDesktop = (date: Date | undefined) => {
    onChange?.(date);
    setPopoverOpen(false);
  };

  const handleSelectMobile = (date: Date | undefined) => {
    onChange?.(date);
    setDrawerOpen(false);
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <Label>{label}</Label>

      {/* Desktop: Popover */}
      <div className="hidden md:block">
        <Popover open={popoverOpen} onOpenChange={handlePopoverOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !value && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "dd.MM.yyyy") : placeholder}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleSelectDesktop}
              captionLayout="dropdown"
              fromYear={fromYear}
              toYear={toYear}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Mobile: Drawer */}
      <div className="md:hidden">
        <Drawer open={drawerOpen} onOpenChange={handleDrawerOpenChange}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !value && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "dd.MM.yyyy") : placeholder}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{label}</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4 flex justify-center">
              <Calendar
                mode="single"
                selected={value}
                onSelect={handleSelectMobile}
                captionLayout="dropdown"
                fromYear={fromYear}
                toYear={toYear}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
