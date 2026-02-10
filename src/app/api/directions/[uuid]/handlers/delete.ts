import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function handleDelete(uuid: string) {
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
}
