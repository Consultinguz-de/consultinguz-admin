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
import { COUNTRIES, type CountryValue } from "@/constants/countries";

interface CountryPickerProps {
  id?: string;
  label?: string;
  value?: CountryValue;
  onValueChange?: (value: CountryValue) => void;
  placeholder?: string;
  error?: string;
  onClearError?: () => void;
}

export function CountryPicker({
  id,
  label = "Davlat",
  value,
  onValueChange,
  placeholder = "Davlatni tanlang",
  error,
  onClearError,
}: CountryPickerProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedCountry = COUNTRIES.find((c) => c.value === value);

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

  const handleDrawerSelect = (countryValue: CountryValue) => {
    if (error) onClearError?.();
    onValueChange?.(countryValue);
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
            onValueChange?.(v as CountryValue);
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
            {COUNTRIES.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
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
              {selectedCountry?.label || placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{label}</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto">
              {COUNTRIES.map((country) => (
                <DrawerClose asChild key={country.value}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-normal mb-1",
                      value === country.value && "bg-accent",
                    )}
                    onClick={() => handleDrawerSelect(country.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === country.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {country.label}
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
