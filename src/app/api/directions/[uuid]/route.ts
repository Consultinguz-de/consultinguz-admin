import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

interface RouteParams {
  params: Promise<{
    uuid: string;
  }>;
}

export async function DELETE(request: Request, props: RouteParams) {
  try {
    const params = await props.params;
    const { uuid } = params;

    if (!uuid) {
      return NextResponse.json(
        { ok: false, message: "UUID kerak." },
        { status: 400 },
      );
    }

    const db = await getDb();
    const result = await db.collection("directions").deleteOne({
      $or: [{ uuid }, { id: uuid }],
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { ok: false, message: "Yo'nalish topilmadi." },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, message: "Yo'nalish o'chirildi." });
  } catch (error) {
    console.error("Delete direction error:", error);
    return NextResponse.json(
      { ok: false, message: "Server xatosi." },
      { status: 500 },
    );
  }
}
