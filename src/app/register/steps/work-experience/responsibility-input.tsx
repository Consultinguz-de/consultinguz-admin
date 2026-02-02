"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ResponsibilityInputProps {
  onAdd: (value: string) => void;
}

export function ResponsibilityInput({ onAdd }: ResponsibilityInputProps) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (value.trim()) {
      onAdd(value);
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Vazifani kiriting va qo'shish tugmasini bosing"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
      />
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={handleAdd}
        disabled={!value.trim()}
      >
        <Plus className="h-4 w-4 mr-1" />
        Qo'shish
      </Button>
    </div>
  );
}
