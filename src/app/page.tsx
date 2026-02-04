import { AddDirectionDialog } from "@/components/add-direction-dialog";
import { DirectionCard } from "@/components/direction-card";
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
          <AddDirectionDialog />
        </div>
        {directions.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
            Hozircha yo'nalishlar yo'q. Yangi yo'nalish qo'shing.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {directions.map((direction) => (
              <DirectionCard key={direction.id} direction={direction} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
