"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Check,
  HelpCircle,
  MessageCircle,
  MessageCircleOff,
  X,
} from "lucide-react";
import { getCandidatesByDirection, type CandidateListItem } from "./actions";

function hasComment(value: unknown) {
  if (!value) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "object") {
    return Object.keys(value as Record<string, unknown>).length > 0;
  }
  return true;
}
import { Skeleton } from "@/components/ui/skeleton";

export function CandidatesList({ directionId }: { directionId: string }) {
  const [items, setItems] = useState<CandidateListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const candidates = await getCandidatesByDirection(directionId);
        if (isMounted) setItems(candidates);
      } catch (err: unknown) {
        if (isMounted) {
          const message =
            err instanceof Error
              ? err.message
              : "Ma'lumotlarni olishda xatolik";
          setError(message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [directionId]);

  if (loading) {
    return (
      <div className="mt-4 space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-destructive">Xatolik: {error}</p>;
  }

  if (items.length === 0) {
    return (
      <p className="text-muted-foreground">
        Hozircha ushbu yo'nalishda nomzodlar yo'q.
      </p>
    );
  }

  return (
    <div className="mt-4 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th className="px-3 py-2 text-left font-medium w-12 border-r">#</th>
            <th className="px-3 py-2 text-left font-medium w-16">Rasm</th>
            <th className="px-3 py-2 text-left font-medium">F.I.Sh</th>
            <th className="px-3 py-2 text-left font-medium">Email</th>
            <th className="px-3 py-2 text-left font-medium">Tasdiq</th>
            <th className="px-3 py-2 text-left font-medium">Hujjat</th>
            <th className="px-3 py-2 text-left font-medium">Bosqich</th>
            <th className="px-3 py-2 text-left font-medium">Izoh</th>
            <th className="px-3 py-2 text-left font-medium">Sana</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {items.map((item, index) => {
            const href = `/directions/${directionId}/candidates/${item.id}`;
            return (
              <tr
                key={item.id}
                className="hover:bg-muted/80 cursor-pointer"
                onClick={() => router.push(href)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(href);
                  }
                }}
                role="link"
                tabIndex={0}
              >
              <td className="px-3 py-2 align-middle border-r">
                {index + 1}
              </td>
                <td className="px-3 py-2 align-middle">
                  <div className="h-10 w-10 rounded-full bg-muted/50 overflow-hidden border">
                    {item.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.photoUrl}
                        alt={item.fullName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
                        —
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-3 py-2 align-middle font-medium">
                  {item.fullName}
                </td>
                <td className="px-3 py-2 align-middle">{item.email || "—"}</td>
                <td className="px-3 py-2 align-middle">
                  {item.approved === true ? (
                    <span title="Tasdiqlangan">
                      <Check className="h-4 w-4 text-green-600" />
                    </span>
                  ) : item.approved === false ? (
                    <span title="Rad etilgan">
                      <X className="h-4 w-4 text-red-600" />
                    </span>
                  ) : (
                    <span title="Kutilmoqda">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 align-middle">
                  {item.documentReady === true ? (
                    <span title="Hujjatlar tayyor">
                      <Check className="h-4 w-4 text-green-600" />
                    </span>
                  ) : item.documentReady === false ? (
                    <span title="Hujjatlar tayyor emas">
                      <X className="h-4 w-4 text-red-600" />
                    </span>
                  ) : (
                    <span title="Noma'lum">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 align-middle">{item.stage ?? "—"}</td>
              <td className="px-3 py-2 align-middle">
                {hasComment(item.comment) ? (
                  <MessageCircle className="h-4 w-4" />
                ) : (
                  <MessageCircleOff className="h-4 w-4 text-muted-foreground" />
                )}
              </td>
                <td className="px-3 py-2 align-middle">
                  {item.createdAt
                    ? format(new Date(item.createdAt), "dd.MM.yy HH:mm")
                    : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
