"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Xatolik yuz berdi</h1>
      <p className="mt-2 text-muted-foreground">
        Sahifani yuklashda xatolik yuz berdi. Qayta urinib ko'ring.
      </p>
      <div className="mt-6 flex justify-center">
        <Button onClick={reset}>Qayta urinish</Button>
      </div>
    </div>
  );
}
