import { notFound } from "next/navigation";
import { directions } from "@/data/directions";

interface DirectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DirectionPage({ params }: DirectionPageProps) {
  const { slug } = await params;
  const direction = directions.find((d) => d.slug === slug);

  if (!direction) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{direction.title}</h1>
      <div className="mt-4 space-y-2 text-muted-foreground">
        <p>Ochilgan sana: {direction.createdAt}</p>
        <p>Kim tomonidan: {direction.createdBy}</p>
      </div>
      <div className="mt-8">
        <p className="text-lg">
          Bu {direction.title} yo'nalishi sahifasi. Bu yerda yo'nalishga oid
          barcha ma'lumotlar ko'rsatiladi.
        </p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return directions.map((direction) => ({
    slug: direction.slug,
  }));
}
