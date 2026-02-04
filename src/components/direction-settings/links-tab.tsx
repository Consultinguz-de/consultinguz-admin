"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Direction } from "@/types/direction";

interface LinksTabProps {
  direction: Direction;
}

export function LinksTab({ direction }: LinksTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Linklar</h3>
      <p className="text-sm text-muted-foreground">
        Bu yerda yo'nalish uchun linklar sozlanadi.
      </p>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`title-${direction.id}`}>Yo'nalish nomi</Label>
          <Input
            id={`title-${direction.id}`}
            defaultValue={direction.title}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`slug-${direction.id}`}>Slug</Label>
          <Input id={`slug-${direction.id}`} defaultValue={direction.slug} />
        </div>
      </div>
    </div>
  );
}
