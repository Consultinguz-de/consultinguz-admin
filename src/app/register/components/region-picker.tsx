"use client";

import { useState, useRef } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { UZBEKISTAN_REGIONS, type RegionValue } from "@/constants/regions";

interface RegionPickerProps {
  id?: string;
  label?: string;
  value?: RegionValue;
  onValueChange?: (value: RegionValue) => void;
  placeholder?: string;
  error?: string;
  onClearError?: () => void;
}

export function RegionPicker({
  id,
  label = "Viloyat",
  value,
  onValueChange,
  placeholder = "Viloyatni tanlang",
  error,
  onClearError,
}: RegionPickerProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedRegion = UZBEKISTAN_REGIONS.find((r) => r.value === value);

  const scrollToView = () => {
    setTimeout(() => {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleSelectOpenChange = (isOpen: boolean) => {
    if (isOpen) scrollToView();
  };

  const handleDrawerOpenChange = (isOpen: boolean) => {
    setDrawerOpen(isOpen);
    if (isOpen) scrollToView();
  };

  const handleDrawerSelect = (regionValue: RegionValue) => {
    if (error) onClearError?.();
    onValueChange?.(regionValue);
    setDrawerOpen(false);
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <Label className={error ? "text-destructive" : ""}>{label}</Label>

      {/* Desktop: Select */}
      <div className="hidden md:block">
        <Select
          value={value}
          onValueChange={(v) => {
            if (error) onClearError?.();
            onValueChange?.(v as RegionValue);
          }}
          onOpenChange={handleSelectOpenChange}
        >
          <SelectTrigger
            id={id}
            className={error ? "border-destructive focus:ring-destructive" : ""}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {UZBEKISTAN_REGIONS.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mobile: Drawer */}
      <div className="md:hidden">
        <Drawer open={drawerOpen} onOpenChange={handleDrawerOpenChange}>
          <DrawerTrigger asChild>
            <Button
              id={id}
              variant="outline"
              className={cn(
                "w-full justify-between font-normal",
                error && "border-destructive",
              )}
            >
              {selectedRegion?.label || placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{label}</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto">
              {UZBEKISTAN_REGIONS.map((region) => (
                <DrawerClose asChild key={region.value}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-normal mb-1",
                      value === region.value && "bg-accent",
                    )}
                    onClick={() => handleDrawerSelect(region.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === region.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {region.label}
                  </Button>
                </DrawerClose>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
