import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Yo'nalish topilmadi</h1>
      <p className="mt-2 text-muted-foreground">
        Berilgan `uuid` bo'yicha yo'nalish topilmadi.
      </p>
      <div className="mt-6 flex justify-center">
        <Button asChild>
          <Link href="/">Bosh sahifaga qaytish</Link>
        </Button>
      </div>
    </div>
  );
}
