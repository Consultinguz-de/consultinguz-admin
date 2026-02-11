import { CandidatesList } from "./candidates-list";

export default function CandidatesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Barcha nomzodlar</h1>
      <CandidatesList />
    </div>
  );
}
