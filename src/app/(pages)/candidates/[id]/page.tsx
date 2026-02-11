import { notFound } from "next/navigation";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/breadcrumbs";
import { getDirectionByUuid } from "@/lib/directions";
import { getCandidateById } from "@/app/directions/[uuid]/actions";
import { CandidatePageContent } from "./components/candidate-page-content";

interface CandidatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function CandidatePage(props: CandidatePageProps) {
  const params = await props.params;
  const { id } = params;

  const candidate = await getCandidateById(id);
  if (!candidate) {
    notFound();
  }

  const firstName = candidate.personalInfo?.firstName ?? "";
  const lastName = candidate.personalInfo?.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim() || "—";

  const direction = candidate.directionId
    ? await getDirectionByUuid(candidate.directionId)
    : null;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Bosh sahifa", href: "/" },
  ];

  if (direction) {
    breadcrumbItems.push({
      label: direction.title,
      href: `/directions/${direction.uuid}`,
    });
  } else {
    breadcrumbItems.push({
      label: "Barcha nomzodlar",
      href: "/candidates",
    });
  }

  breadcrumbItems.push({ label: fullName });

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs className="mb-4" items={breadcrumbItems} />
      <CandidatePageContent
        candidate={candidate}
        fullName={fullName}
        directionTitle={direction?.title}
      />
    </div>
  );
}
