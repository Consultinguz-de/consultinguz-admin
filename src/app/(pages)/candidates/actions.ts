// Re-export types and functions from the main actions module
export type {
  CandidateListItem,
  PaginatedCandidates,
} from "@/app/directions/[uuid]/actions";

export { getAllCandidates } from "@/app/directions/[uuid]/actions";
