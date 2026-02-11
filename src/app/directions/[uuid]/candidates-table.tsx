"use client";

import type { CandidateListItem } from "./actions";
import { CandidateRow } from "./candidate-row";
import { TooltipProvider } from "@/components/ui/tooltip";

interface CandidatesTableProps {
  items: CandidateListItem[];
  directionId: string;
  deletingId: string | null;
  onDelete: (candidateId: string, fullName: string) => void;
}

export function CandidatesTable({
  items,
  directionId,
  deletingId,
  onDelete,
}: CandidatesTableProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <div className="mt-4 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-3 py-2 text-left font-medium w-12 border-r">
                #
              </th>
              <th className="px-3 py-2 text-left font-medium w-16">Rasm</th>
              <th className="px-3 py-2 text-left font-medium">F.I.Sh</th>
              <th className="px-3 py-2 text-left font-medium">Email</th>
              <th className="px-3 py-2 text-left font-medium">Tasdiq</th>
              <th className="px-3 py-2 text-left font-medium">Hujjat</th>
              <th className="px-3 py-2 text-left font-medium">Bosqich</th>
              <th className="px-3 py-2 text-left font-medium">Izoh</th>
              <th className="px-3 py-2 text-left font-medium">Sana</th>
              <th className="px-3 py-2 text-right font-medium">Amal</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((item, index) => (
              <CandidateRow
                key={item.id}
                item={item}
                index={index}
                href={`/directions/${directionId}/candidates/${item.id}`}
                isDeleting={deletingId === item.id}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </TooltipProvider>
  );
}
