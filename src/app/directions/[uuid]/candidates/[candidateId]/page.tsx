import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getDirectionByUuid } from "@/lib/directions";
import { getCandidateById } from "../../actions";
import { CandidateStatus } from "./candidate-status";

interface CandidatePageProps {
  params: Promise<{
    uuid: string;
    candidateId: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function CandidatePage(props: CandidatePageProps) {
  const params = await props.params;
  const { uuid, candidateId } = params;

  const direction = await getDirectionByUuid(uuid);
  if (!direction) notFound();

  const candidate = await getCandidateById(candidateId);
  if (!candidate || candidate.directionId !== uuid) {
    notFound();
  }

  const firstName = candidate.personalInfo?.firstName ?? "";
  const lastName = candidate.personalInfo?.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim() || "—";

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        className="mb-4"
        items={[
          { label: "Bosh sahifa", href: "/" },
          { label: direction.title, href: `/directions/${direction.uuid}` },
          { label: fullName },
        ]}
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-muted/50 overflow-hidden border">
            {candidate.personalInfo?.photo?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={candidate.personalInfo.photo.url}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
                —
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <div className="text-sm text-muted-foreground">
              {candidate.personalInfo?.email || "—"}
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-4 w-full md:w-auto">
          <CandidateStatus
            candidateId={candidate.id}
            initialApproved={candidate.approved}
            initialDocumentReady={candidate.documentReady}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold mb-2">Asosiy ma'lumotlar</h2>
          <div className="text-sm space-y-1">
            <div>Telefon: {candidate.personalInfo?.phone || "—"}</div>
            <div>Lead: {candidate.lead || "—"}</div>
            <div>Telegram: {candidate.telegramId || "—"}</div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="font-semibold mb-2">Holat</h2>
          <div className="text-sm text-muted-foreground">
            Bosqich: {candidate.stage ?? "—"}
          </div>
        </div>

        <div className="rounded-lg border p-4 md:col-span-2">
          <h2 className="font-semibold mb-2">Izoh</h2>
          <p className="text-sm text-muted-foreground">
            {candidate.comment || "Izoh yo'q"}
          </p>
        </div>
      </div>
    </div>
  );
}
