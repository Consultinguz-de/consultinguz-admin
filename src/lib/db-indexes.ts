import { getDb } from "@/lib/mongodb";

/**
 * Initialize database indexes for optimal query performance.
 * Should be called once during application startup or deployment.
 */
export async function initializeIndexes(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const db = await getDb();

    // Index on candidates.directionId for efficient lookups and aggregations
    await db.collection("candidates").createIndex(
      { directionId: 1 },
      { 
        name: "idx_candidates_directionId",
        background: true 
      }
    );

    // Compound index for candidates sorted by createdAt within a direction
    await db.collection("candidates").createIndex(
      { directionId: 1, createdAt: -1 },
      { 
        name: "idx_candidates_directionId_createdAt",
        background: true 
      }
    );

    // Index on directions.uuid for fast lookups
    await db.collection("directions").createIndex(
      { uuid: 1 },
      { 
        name: "idx_directions_uuid",
        unique: true,
        background: true 
      }
    );

    // Index on directions.slug for unique constraint
    await db.collection("directions").createIndex(
      { slug: 1 },
      { 
        name: "idx_directions_slug",
        unique: true,
        background: true 
      }
    );

    console.log("✅ Database indexes initialized successfully");
    return { success: true };
  } catch (error) {
    console.error("Failed to initialize indexes:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

/**
 * List all indexes for debugging purposes.
 */
export async function listIndexes(): Promise<{
  candidates: object[];
  directions: object[];
}> {
  const db = await getDb();
  
  const candidatesIndexes = await db.collection("candidates").indexes();
  const directionsIndexes = await db.collection("directions").indexes();

  return {
    candidates: candidatesIndexes,
    directions: directionsIndexes
  };
}
