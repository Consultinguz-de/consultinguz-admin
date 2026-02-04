"use client";

import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DirectionSettingsDialog } from "@/components/direction-settings-dialog";
import { Direction } from "@/types/direction";
import { format } from "date-fns";

interface DirectionCardProps {
  direction: Direction;
}

export function DirectionCard({ direction }: DirectionCardProps) {
  const createdAt =
    typeof direction.createdAt === "number"
      ? format(new Date(direction.createdAt), "yyyy-MM-dd")
      : direction.createdAt;
  const candidatesCount = direction.candidatesCount ?? 0;
  const directionId = direction.uuid || direction.id;

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Link href={`/directions/${directionId}`} className="flex-1">
          <CardTitle className="text-lg hover:underline cursor-pointer">
            {direction.title}
          </CardTitle>
        </Link>
        <DirectionSettingsDialog direction={direction} />
      </CardHeader>
      <Link href={`/directions/${directionId}`} className="cursor-pointer">
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Ochilgan: {createdAt}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Nomzodlar: {candidatesCount} ta</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
