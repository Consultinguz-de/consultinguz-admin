import { AddDirectionDialog } from "@/components/add-direction-dialog";
import { DirectionsTable } from "@/components/directions-table";
import { getDirections } from "@/lib/directions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const directions = await getDirections();

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">Bosh sahifa</h1>
        <p className="text-muted-foreground mt-2">
          Yo'nalishlarni tanlang va boshqaring
        </p>
      </div>

      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Yo'nalishlar</h2>
          <AddDirectionDialog directions={directions} />
        </div>
        {directions.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
            Hozircha yo'nalishlar yo'q. Yangi yo'nalish qo'shing.
          </div>
        ) : (
          <DirectionsTable directions={directions} />
        )}
      </section>
    </div>
  );
}
