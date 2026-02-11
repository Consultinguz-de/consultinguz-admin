import { NextResponse } from "next/server";
import { deleteCandidate } from "@/lib/candidates";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(request: Request, props: RouteParams) {
  try {
    const params = await props.params;
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { ok: false, message: "Candidate ID is required" },
        { status: 400 }
      );
    }

    const result = await deleteCandidate(id);

    if (!result.success) {
      return NextResponse.json(
        { ok: false, message: result.error || "Failed to delete candidate" },
        { status: result.error === "Candidate not found" ? 404 : 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Delete candidate error:", error);
    return NextResponse.json(
      { ok: false, message: "Server xatosi." },
      { status: 500 }
    );
  }
}
