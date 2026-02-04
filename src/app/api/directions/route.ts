import { NextResponse } from "next/server";
import { buildDirection } from "@/lib/directions";
import { getDb } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const createdBy =
      typeof body?.createdBy === "string" && body.createdBy.trim()
        ? body.createdBy.trim()
        : "system";

    if (!title) {
      return NextResponse.json(
        { ok: false, message: "Yo'nalish nomi kerak." },
        { status: 400 },
      );
    }

    const direction = buildDirection(title, createdBy);
    const db = await getDb();
    const existing = await db
      .collection("directions")
      .findOne({ slug: direction.slug });
    if (existing) {
      return NextResponse.json(
        { ok: false, message: "Bunday yo'nalish (slug) allaqachon mavjud." },
        { status: 409 },
      );
    }

    await db.collection("directions").insertOne(direction);

    return NextResponse.json({ ok: true, direction });
  } catch (error) {
    if (error instanceof Error && "code" in error && (error as any).code === 11000) {
      return NextResponse.json(
        { ok: false, message: "Bunday yo'nalish (slug) allaqachon mavjud." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { ok: false, message: "Server xatosi." },
      { status: 500 },
    );
  }
}
