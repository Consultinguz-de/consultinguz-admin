"use server";

import { getDb } from "@/lib/mongodb";
import {
  incrementDirectionCandidatesCount,
  directionExists,
} from "@/lib/candidates";

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

export interface CandidatePayload {
  directionTitle: string | null;
  directionId: string | null;
  leadName: string | null;
  documentReady: boolean;
  stage: number;
  comment: Record<string, unknown>;
  lead: string;
  telegramId: string;
  approved: boolean | null;
  personalInfo: {
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string | null;
    birthPlace?: string;
    maritalStatus: string;
    phone: string;
    email: string;
    passport: string;
    passportFile: FileUpload | null;
    photo: FileUpload | null;
    street: string;
    houseNumber: string;
    region?: string;
    country?: string;
  };
  workExperience: Array<{
    id: string;
    startDate: string | null;
    endDate: string | null;
    position: string;
    employer: string;
    responsibilities: string[];
  }>;
  education: {
    school: EducationEntry;
    college: EducationEntry;
    university: EducationEntry;
  };
  languageSkills: Array<{
    id: string;
    language: string;
    level: string;
    noCertificate: boolean;
    certificate: FileUpload | null;
  }>;
  skills: string[];
  privacyAccepted: boolean;
}

export async function submitCandidate(payload: CandidatePayload): Promise<{
  success: boolean;
  candidateId?: string;
  error?: string;
}> {
  try {
    const { directionId } = payload;

    // Validate direction exists before creating candidate
    if (directionId) {
      const exists = await directionExists(directionId);
      if (!exists) {
        return {
          success: false,
          error: "Direction not found",
        };
      }
    }

    const db = await getDb();
    const candidatesCollection = db.collection("candidates");

    const result = await candidatesCollection.insertOne({
      ...payload,
      createdAt: new Date(),
    });

    // Increment candidatesCount in the direction document
    if (directionId) {
      const incremented = await incrementDirectionCandidatesCount(directionId);
      if (!incremented) {
        console.warn(
          `Failed to increment candidatesCount for direction: ${directionId}`,
        );
      }
    }

    return {
      success: true,
      candidateId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Failed to save candidate:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
