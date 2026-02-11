import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getDirectionByUuid } from "@/lib/directions";
import { getCandidateById } from "../../actions";
import { CandidatePageContent } from "./components";

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
      <CandidatePageContent candidate={candidate} fullName={fullName} />
    </div>
  );
}
