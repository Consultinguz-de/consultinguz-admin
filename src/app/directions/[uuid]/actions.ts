/**
 * Candidate Actions
 *
 * This file re-exports all candidate-related server actions from organized modules.
 * Import from this file to maintain backward compatibility.
 *
 * Structure:
 * - actions/types.ts     → Type definitions
 * - actions/queries.ts   → Read operations (getCandidatesByDirection, getAllCandidates, getCandidateById)
 * - actions/mutations.ts → Write operations (updateCandidateStatus, updateCandidatePersonalInfo, deleteCandidate)
 */

export * from "./actions/index";
