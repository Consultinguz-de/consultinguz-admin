"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
import { SelectOption } from "./types";

interface ResponsiveSelectProps {
  label: string;
  placeholder: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export function ResponsiveSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
}: ResponsiveSelectProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="space-y-2 w-full">
      <Label>{label}</Label>

      {/* Desktop: Select */}
      <div className="hidden md:block w-full">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mobile: Drawer */}
      <div className="md:hidden w-full">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal"
            >
              <span className={!value ? "text-muted-foreground" : ""}>
                {selectedOption?.label || placeholder}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{label}</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4 space-y-2">
              {options.map((option) => (
                <DrawerClose key={option.value} asChild>
                  <Button
                    variant={value === option.value ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      onChange(option.value);
                      setDrawerOpen(false);
                    }}
                  >
                    {option.label}
                  </Button>
                </DrawerClose>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
