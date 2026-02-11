/**
 * Database initialization script.
 * Run this once during deployment or when setting up a new environment.
 * 
 * Usage: npx ts-node scripts/init-db.ts
 * Or add to package.json: "db:init": "ts-node scripts/init-db.ts"
 */

import { initializeIndexes, listIndexes } from "../src/lib/db-indexes";
import { recalculateAllCandidatesCounts } from "../src/lib/candidates";

async function main() {
  console.log("🚀 Starting database initialization...\n");

  // Step 1: Create indexes
  console.log("📊 Creating indexes...");
  const indexResult = await initializeIndexes();
  if (!indexResult.success) {
    console.error("❌ Failed to create indexes:", indexResult.error);
    process.exit(1);
  }
  console.log("✅ Indexes created successfully\n");

  // Step 2: List indexes for verification
  console.log("📋 Current indexes:");
  const indexes = await listIndexes();
  console.log("Candidates collection:", JSON.stringify(indexes.candidates, null, 2));
  console.log("Directions collection:", JSON.stringify(indexes.directions, null, 2));
  console.log();

  // Step 3: Recalculate candidatesCounts (for existing data)
  console.log("🔢 Recalculating candidatesCounts for all directions...");
  const countResult = await recalculateAllCandidatesCounts();
  if (!countResult.success) {
    console.error("❌ Failed to recalculate counts:", countResult.error);
    process.exit(1);
  }
  console.log(`✅ Updated ${countResult.updated} direction(s)\n`);

  console.log("🎉 Database initialization complete!");
  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Initialization failed:", error);
  process.exit(1);
});
