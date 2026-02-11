"use server";

import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

interface FileUpload {
  url: string;
  path: string;
  name: string;
  size: number;
  contentType: string | null;
}

interface EducationEntry {
  enabled: boolean;
  startDate: string | null;
  endDate: string | null;
  institutionName: string;
  direction: string;
  document: FileUpload | null;
}

export interface CandidateListItem {
  id: string;
  fullName: string;
  phone?: string;
  email?: string;
  photoUrl?: string | null;
  documentReady?: boolean | null;
  stage?: number | null;
  comment?: unknown;
  lead?: string | null;
  telegramId?: string | null;
  approved?: boolean | null;
  createdAt: string | null;
}

export async function getCandidatesByDirection(
  directionId: string
): Promise<CandidateListItem[]> {
  try {
    const db = await getDb();
    const candidatesCollection = db.collection("candidates");

    const candidates = await candidatesCollection
      .find({ directionId })
      .sort({ createdAt: -1 })
      .toArray();

    return candidates.map((doc) => {
      const firstName = doc.personalInfo?.firstName ?? "";
      const lastName = doc.personalInfo?.lastName ?? "";
      const fullName = `${firstName} ${lastName}`.trim() || "—";

      return {
        id: doc._id.toString(),
        fullName,
        phone: doc.personalInfo?.phone,
        email: doc.personalInfo?.email,
        photoUrl: doc.personalInfo?.photo?.url ?? null,
        documentReady:
          typeof doc.documentReady === "boolean" ? doc.documentReady : null,
        stage: typeof doc.stage === "number" ? doc.stage : null,
        comment: doc.comment ?? null,
        lead: typeof doc.lead === "string" ? doc.lead : null,
        telegramId:
          typeof doc.telegramId === "string" ? doc.telegramId : null,
        approved: typeof doc.approved === "boolean" ? doc.approved : null,
        createdAt: doc.createdAt ? doc.createdAt.toISOString() : null,
      };
    });
  } catch (error) {
    console.error("Failed to fetch candidates:", error);
    return [];
  }
}

export interface CandidateDetail {
  id: string;
  directionId?: string;
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    photo?: { url?: string | null };
    gender?: string;
    birthDate?: string | null;
    birthPlace?: string;
    maritalStatus?: string;
    passport?: string;
    street?: string;
    houseNumber?: string;
    region?: string;
    country?: string;
  };
  workExperience?: Array<{
    id?: string;
    startDate?: string | null;
    endDate?: string | null;
    position?: string;
    employer?: string;
    responsibilities?: string[];
  }>;
  education?: {
    school?: EducationEntry;
    college?: EducationEntry;
    university?: EducationEntry;
  };
  languageSkills?: Array<{
    id?: string;
    language?: string;
    level?: string;
    noCertificate?: boolean;
    certificate?: FileUpload | null;
  }>;
  skills?: string[];
  documentReady?: boolean | null;
  stage?: number | null;
  comment?: string | null;
  lead?: string | null;
  telegramId?: string | null;
  approved?: boolean | null;
  createdAt?: string | null;
}

export async function getCandidateById(
  id: string
): Promise<CandidateDetail | null> {
  if (!ObjectId.isValid(id)) return null;
  try {
    const db = await getDb();
    const candidatesCollection = db.collection("candidates");
    const doc = await candidatesCollection.findOne({ _id: new ObjectId(id) });
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
    console.error("Failed to fetch candidate:", error);
    return null;
  }
}

export async function updateCandidateStatus(
  id: string,
  updates: {
    approved?: boolean | null;
    documentReady?: boolean | null;
  }
): Promise<{ success: boolean; error?: string }> {
  if (!ObjectId.isValid(id)) {
    return { success: false, error: "Invalid candidate id" };
  }
  try {
    const db = await getDb();
    const candidatesCollection = db.collection("candidates");
    await candidatesCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(updates.approved !== undefined
            ? { approved: updates.approved }
            : {}),
          ...(updates.documentReady !== undefined
            ? { documentReady: updates.documentReady }
            : {}),
        },
      }
    );
    return { success: true };
  } catch (error) {
    console.error("Failed to update candidate:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateCandidatePersonalInfo(
  id: string,
  updates: {
    firstName?: string;
    lastName?: string;
    gender?: string;
    birthDate?: string | null;
    birthPlace?: string;
    maritalStatus?: string;
    phone?: string;
    email?: string;
    passport?: string;
    street?: string;
    houseNumber?: string;
    region?: string;
    country?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  if (!ObjectId.isValid(id)) {
    return { success: false, error: "Invalid candidate id" };
  }
  try {
    const db = await getDb();
    const candidatesCollection = db.collection("candidates");
    const setFields: Record<string, unknown> = {};

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        setFields[`personalInfo.${key}`] = value;
      }
    });

    if (Object.keys(setFields).length === 0) {
      return { success: true };
    }

    await candidatesCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...setFields,
          updatedAt: new Date(),
        },
      }
    );
    return { success: true };
  } catch (error) {
    console.error("Failed to update personal info:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
