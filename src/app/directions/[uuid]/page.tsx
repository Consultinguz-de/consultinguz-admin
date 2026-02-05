import { notFound } from "next/navigation";
import { getDirectionByUuid } from "@/lib/directions";
import { format } from "date-fns";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface DirectionPageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function DirectionPage(props: DirectionPageProps) {
  const params = await props.params;
  const { uuid } = params;
  const direction = await getDirectionByUuid(uuid);

  if (!direction) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        className="mb-4"
        items={[
          { label: "Bosh sahifa", href: "/" },
          { label: direction.title },
        ]}
      />
      <h1 className="text-3xl font-bold">{direction.title}</h1>
      <div className="mt-4 space-y-2 text-muted-foreground">
        <p>
          Ochilgan sana: {format(new Date(direction.createdAt), "yyyy-MM-dd")}
        </p>
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
