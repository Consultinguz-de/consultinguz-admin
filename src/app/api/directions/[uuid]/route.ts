import { NextResponse } from "next/server";
import crypto from "crypto";
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

export async function PATCH(request: Request, props: RouteParams) {
  try {
    const params = await props.params;
    const { uuid } = params;

    if (!uuid) {
      return NextResponse.json(
        { ok: false, message: "UUID kerak." },
        { status: 400 },
      );
    }

    const body = await request.json();
    const leadName =
      typeof body?.leadName === "string" ? body.leadName.trim() : "";
    const removeLeadId =
      typeof body?.removeLeadId === "string" ? body.removeLeadId.trim() : "";

    if (!leadName && !removeLeadId) {
      return NextResponse.json(
        { ok: false, message: "Lead nomi yoki lead ID kerak." },
        { status: 400 },
      );
    }

    const db = await getDb();
    const update = removeLeadId
      ? {
          $pull: { leadLinks: { id: removeLeadId } },
          $set: { updatedAt: Date.now() },
        }
      : {
          $push: {
            leadLinks: {
              id: crypto.randomUUID(),
              name: leadName,
              active: true,
            },
          },
          $set: { updatedAt: Date.now() },
        };

    const result = await db
      .collection("directions")
      .findOneAndUpdate({ $or: [{ uuid }, { id: uuid }] }, update as any, {
        returnDocument: "after",
      });

    if (!result) {
      return NextResponse.json(
        { ok: false, message: "Yo'nalish topilmadi." },
        { status: 404 },
      );
    }

    const { _id, ...rest } = result as any;
    if (removeLeadId) {
      return NextResponse.json({
        ok: true,
        removedLeadId: removeLeadId,
        direction: rest,
      });
    }

    const lead = rest.leadLinks?.[rest.leadLinks.length - 1];
    return NextResponse.json({ ok: true, lead, direction: rest });
  } catch (error) {
    console.error("Update direction error:", error);
    return NextResponse.json(
      { ok: false, message: "Server xatosi." },
      { status: 500 },
    );
  }
}
