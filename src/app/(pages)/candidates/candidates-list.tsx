"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CandidatesTable } from "./candidates-table";
import { getAllCandidates, type PaginatedCandidates } from "./actions";

const ITEMS_PER_PAGE = 10;

export function CandidatesList() {
  const [data, setData] = useState<PaginatedCandidates>({
    items: [],
    total: 0,
    page: 1,
    limit: ITEMS_PER_PAGE,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const loadPage = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAllCandidates(page, ITEMS_PER_PAGE);
      setData(result);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Ma'lumotlarni olishda xatolik";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(1);
  }, []);

  if (loading && data.items.length === 0) {
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

  if (data.items.length === 0) {
    return (
      <p className="text-muted-foreground">Hozircha nomzodlar yo'q.</p>
    );
  }

  const handleDelete = async (candidateId: string, fullName: string) => {
    setDeletingId(candidateId);
    try {
      const res = await fetch(`/api/candidates/${candidateId}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error("Nomzod o'chirilmadi", {
          description: result?.message || "O'chirishda xatolik yuz berdi.",
        });
        return;
      }
      setData((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== candidateId),
        total: prev.total - 1,
      }));
      router.refresh();
      toast.success("Nomzod o'chirildi", {
        description: fullName,
      });
    } catch {
      toast.error("Nomzod o'chirilmadi", {
        description: "Server bilan bog'lanishda xatolik.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const { page, totalPages, total } = data;
  const startItem = (page - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(page * ITEMS_PER_PAGE, total);

  return (
    <div className="space-y-4">
      <CandidatesTable
        items={data.items}
        deletingId={deletingId}
        onDelete={handleDelete}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {startItem}-{endItem} / {total} ta nomzod
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPage(page - 1)}
              disabled={page <= 1 || loading}
            >
              <ChevronLeft className="h-4 w-4" />
              Oldingi
            </Button>
            <span className="text-sm text-muted-foreground">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPage(page + 1)}
              disabled={page >= totalPages || loading}
            >
              Keyingi
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
