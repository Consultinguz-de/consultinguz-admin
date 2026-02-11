import { NextResponse } from "next/server";
import { recalculateAllCandidatesCounts } from "@/lib/candidates";

/**
 * Admin endpoint to recalculate candidatesCounts for all directions.
 * Useful for data migration or fixing inconsistencies.
 * 
 * POST /api/admin/recalculate-counts
 */
export async function POST() {
  try {
    const result = await recalculateAllCandidatesCounts();

    if (!result.success) {
      return NextResponse.json(
        { ok: false, message: result.error || "Failed to recalculate counts" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: `Successfully recalculated counts for ${result.updated} direction(s)`,
      updated: result.updated
    });
  } catch (error) {
    console.error("Recalculate counts error:", error);
    return NextResponse.json(
      { ok: false, message: "Server xatosi." },
      { status: 500 }
    );
  }
}
