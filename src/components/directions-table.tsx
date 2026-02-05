"use client";

import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { DirectionSettingsDialog } from "@/components/direction-settings-dialog";
import { Direction } from "@/types/direction";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DirectionsTableProps {
  directions: Direction[];
}

export function DirectionsTable({ directions }: DirectionsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-15 border-r">#</TableHead>
            <TableHead>Yo'nalish nomi</TableHead>
            <TableHead className="w-45">Ochilgan vaqti</TableHead>
            <TableHead className="w-32">Qabul</TableHead>
            <TableHead className="w-40">Nomzodlar soni</TableHead>
            <TableHead className="w-25 text-right">Sozlamalar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {directions.map((direction, index) => {
            const createdAt =
              typeof direction.createdAt === "number"
                ? format(new Date(direction.createdAt), "yyyy-MM-dd")
                : direction.createdAt;
            const candidatesCount = direction.candidatesCount ?? 0;
            const directionId = direction.uuid || direction.id;
            const isOpen = direction.linkActive;

            return (
              <TableRow key={direction.id}>
                <TableCell className="font-medium text-muted-foreground border-r">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/directions/${directionId}`}
                    className="font-medium hover:underline"
                  >
                    {direction.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{createdAt}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      isOpen
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {isOpen ? "Ochiq" : "Yopiq"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{candidatesCount} ta</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DirectionSettingsDialog direction={direction} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
