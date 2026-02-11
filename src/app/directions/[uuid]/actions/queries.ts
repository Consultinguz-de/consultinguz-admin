"use server";

import { getDb } from "@/lib/mongodb";
import { ObjectId, WithId, Document } from "mongodb";
import type {
  CandidateListItem,
  PaginatedCandidates,
  CandidateDetail,
} from "./types";

/* ============================= */
/* ========= HELPERS =========== */
/* ============================= */

function mapCandidateListItem(doc: WithId<Document>): CandidateListItem {
  const personal = doc.personalInfo ?? {};
  const firstName = personal.firstName ?? "";
  const lastName = personal.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim() || "—";

  return {
    id: doc._id.toString(),
    fullName,
    phone: personal.phone ?? null,
    email: personal.email ?? null,
    photoUrl: personal.photo?.url ?? null,
    documentReady:
      typeof doc.documentReady === "boolean" ? doc.documentReady : null,
    stage: typeof doc.stage === "number" ? doc.stage : null,
    comment: typeof doc.comment === "string" ? doc.comment : null,
    lead: typeof doc.lead === "string" ? doc.lead : null,
    telegramId: typeof doc.telegramId === "string" ? doc.telegramId : null,
    approved: typeof doc.approved === "boolean" ? doc.approved : null,
    createdAt: doc.createdAt ? doc.createdAt.toISOString() : null,
    directionId: doc.directionId ?? null,
    directionTitle: doc.directionTitle ?? null,
  };
}

function getPagination(page: number, limit: number) {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), 100);
  return {
    skip: (safePage - 1) * safeLimit,
    page: safePage,
    limit: safeLimit,
  };
}

const LIST_PROJECTION = {
  personalInfo: 1,
  documentReady: 1,
  stage: 1,
  comment: 1,
  lead: 1,
  telegramId: 1,
  approved: 1,
  createdAt: 1,
  directionId: 1,
  directionTitle: 1,
};

/* ============================= */
/* ===== GET BY DIRECTION ====== */
/* ============================= */

export async function getCandidatesByDirection(
  directionId: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedCandidates> {
  try {
    const db = await getDb();
    const collection = db.collection("candidates");

    const {
      skip,
      page: safePage,
      limit: safeLimit,
    } = getPagination(page, limit);

    const filter = { directionId };

    const [docs, total] = await Promise.all([
      collection
        .find(filter, { projection: LIST_PROJECTION })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(safeLimit)
        .toArray(),
      collection.countDocuments(filter),
    ]);

    return {
      items: docs.map(mapCandidateListItem),
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    };
  } catch (error) {
    console.error("getCandidatesByDirection error:", error);
    return { items: [], total: 0, page: 1, limit, totalPages: 0 };
  }
}

/* ============================= */
/* ===== GET ALL CANDIDATES ==== */
/* ============================= */

export async function getAllCandidates(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedCandidates> {
  try {
    const db = await getDb();
    const collection = db.collection("candidates");

    const {
      skip,
      page: safePage,
      limit: safeLimit,
    } = getPagination(page, limit);

    const [docs, total] = await Promise.all([
      collection
        .find({}, { projection: LIST_PROJECTION })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(safeLimit)
        .toArray(),
      collection.estimatedDocumentCount(),
    ]);

    return {
      items: docs.map(mapCandidateListItem),
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    };
  } catch (error) {
    console.error("getAllCandidates error:", error);
    return { items: [], total: 0, page: 1, limit, totalPages: 0 };
  }
}

/* ============================= */
/* ===== GET BY ID ============= */
/* ============================= */

export async function getCandidateById(
  id: string
): Promise<CandidateDetail | null> {
  if (!ObjectId.isValid(id)) return null;

  try {
    const db = await getDb();
    const collection = db.collection("candidates");

    const doc = await collection.findOne({ _id: new ObjectId(id) });
    if (!doc) return null;

    return {
      id: doc._id.toString(),
      directionId: doc.directionId,
      personalInfo: doc.personalInfo,
      workExperience: doc.workExperience,
      education: doc.education,
      languageSkills: doc.languageSkills,
      skills: doc.skills,
      documentReady:
        typeof doc.documentReady === "boolean" ? doc.documentReady : null,
      stage: typeof doc.stage === "number" ? doc.stage : null,
      comment: typeof doc.comment === "string" ? doc.comment : null,
      lead: typeof doc.lead === "string" ? doc.lead : null,
      telegramId: typeof doc.telegramId === "string" ? doc.telegramId : null,
      approved: typeof doc.approved === "boolean" ? doc.approved : null,
      createdAt: doc.createdAt ? doc.createdAt.toISOString() : null,
    };
  } catch (error) {
    console.error("getCandidateById error:", error);
    return null;
  }
}
