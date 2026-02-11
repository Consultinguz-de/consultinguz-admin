"use server";

import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { deleteCandidate as deleteCandidateService } from "@/lib/candidates";

/* ============================= */
/* ===== UPDATE STATUS ========= */
/* ============================= */

export async function updateCandidateStatus(
  id: string,
  updates: {
    approved?: boolean | null;
    documentReady?: boolean | null;
  }
): Promise<{ success: boolean; error?: string }> {
  if (!ObjectId.isValid(id))
    return { success: false, error: "Invalid candidate id" };

  try {
    const db = await getDb();
    const collection = db.collection("candidates");

    const setFields: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (updates.approved !== undefined) setFields.approved = updates.approved;

    if (updates.documentReady !== undefined)
      setFields.documentReady = updates.documentReady;

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: setFields });

    return { success: true };
  } catch (error) {
    console.error("updateCandidateStatus error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/* ============================= */
/* ===== UPDATE PERSONAL INFO == */
/* ============================= */

export async function updateCandidatePersonalInfo(
  id: string,
  updates: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  if (!ObjectId.isValid(id))
    return { success: false, error: "Invalid candidate id" };

  try {
    const db = await getDb();
    const collection = db.collection("candidates");

    const setFields: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        setFields[`personalInfo.${key}`] = value;
      }
    });

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: setFields });

    return { success: true };
  } catch (error) {
    console.error("updateCandidatePersonalInfo error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/* ============================= */
/* ===== DELETE ================ */
/* ============================= */

export async function deleteCandidate(
  candidateId: string
): Promise<{ success: boolean; error?: string }> {
  return deleteCandidateService(candidateId);
}
