import { getDb } from "@/lib/mongodb";
import { ObjectId, ClientSession } from "mongodb";

const CANDIDATES_COLLECTION = "candidates";
const DIRECTIONS_COLLECTION = "directions";

/**
 * Atomically increment candidatesCount for a direction.
 * Uses $inc for atomic operation - safe for concurrent access.
 */
export async function incrementDirectionCandidatesCount(
  directionId: string,
  session?: ClientSession
): Promise<boolean> {
  if (!directionId) return false;

  try {
    const db = await getDb();
    const result = await db.collection(DIRECTIONS_COLLECTION).updateOne(
      { $or: [{ uuid: directionId }, { id: directionId }] },
      { $inc: { candidatesCount: 1 } },
      { session }
    );

    return result.matchedCount > 0;
  } catch (error) {
    console.error("Failed to increment candidatesCount:", error);
    return false;
  }
}

/**
 * Atomically decrement candidatesCount for a direction.
 * Uses $inc with -1 for atomic operation.
 * Ensures count doesn't go below 0 using $max.
 */
export async function decrementDirectionCandidatesCount(
  directionId: string,
  session?: ClientSession
): Promise<boolean> {
  if (!directionId) return false;

  try {
    const db = await getDb();
    
    // First decrement
    await db.collection(DIRECTIONS_COLLECTION).updateOne(
      { $or: [{ uuid: directionId }, { id: directionId }] },
      { $inc: { candidatesCount: -1 } },
      { session }
    );

    // Ensure count doesn't go below 0 (safety net)
    await db.collection(DIRECTIONS_COLLECTION).updateOne(
      { 
        $or: [{ uuid: directionId }, { id: directionId }],
        candidatesCount: { $lt: 0 }
      },
      { $set: { candidatesCount: 0 } },
      { session }
    );

    return true;
  } catch (error) {
    console.error("Failed to decrement candidatesCount:", error);
    return false;
  }
}

/**
 * Validate that a direction exists before creating a candidate.
 */
export async function directionExists(directionId: string): Promise<boolean> {
  if (!directionId) return false;

  try {
    const db = await getDb();
    const direction = await db.collection(DIRECTIONS_COLLECTION).findOne({
      $or: [{ uuid: directionId }, { id: directionId }]
    });

    return direction !== null;
  } catch (error) {
    console.error("Failed to check direction existence:", error);
    return false;
  }
}

/**
 * Delete a candidate and decrement the direction's candidatesCount atomically.
 */
export async function deleteCandidate(
  candidateId: string
): Promise<{ success: boolean; error?: string }> {
  if (!ObjectId.isValid(candidateId)) {
    return { success: false, error: "Invalid candidate ID" };
  }

  try {
    const db = await getDb();
    const candidatesCollection = db.collection(CANDIDATES_COLLECTION);

    // First, get the candidate to find its directionId
    const candidate = await candidatesCollection.findOne({
      _id: new ObjectId(candidateId)
    });

    if (!candidate) {
      return { success: false, error: "Candidate not found" };
    }

    const directionId = candidate.directionId;

    // Delete the candidate
    const deleteResult = await candidatesCollection.deleteOne({
      _id: new ObjectId(candidateId)
    });

    if (deleteResult.deletedCount === 0) {
      return { success: false, error: "Failed to delete candidate" };
    }

    // Decrement the direction's candidatesCount
    if (directionId) {
      await decrementDirectionCandidatesCount(directionId);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to delete candidate:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

/**
 * Recalculate candidatesCount for all directions.
 * Useful for data migration or fixing inconsistencies.
 */
export async function recalculateAllCandidatesCounts(): Promise<{
  success: boolean;
  updated: number;
  error?: string;
}> {
  try {
    const db = await getDb();
    
    // Aggregate candidates count per directionId
    const pipeline = [
      {
        $group: {
          _id: "$directionId",
          count: { $sum: 1 }
        }
      }
    ];

    const counts = await db
      .collection(CANDIDATES_COLLECTION)
      .aggregate(pipeline)
      .toArray();

    // Create a map of directionId -> count
    const countMap = new Map<string, number>();
    for (const item of counts) {
      if (item._id) {
        countMap.set(item._id, item.count);
      }
    }

    // Get all directions
    const directions = await db
      .collection(DIRECTIONS_COLLECTION)
      .find({})
      .toArray();

    let updated = 0;

    // Update each direction with the correct count
    for (const direction of directions) {
      const directionId = direction.uuid || direction.id;
      const correctCount = countMap.get(directionId) || 0;

      if (direction.candidatesCount !== correctCount) {
        await db.collection(DIRECTIONS_COLLECTION).updateOne(
          { _id: direction._id },
          { $set: { candidatesCount: correctCount } }
        );
        updated++;
      }
    }

    return { success: true, updated };
  } catch (error) {
    console.error("Failed to recalculate candidates counts:", error);
    return {
      success: false,
      updated: 0,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
