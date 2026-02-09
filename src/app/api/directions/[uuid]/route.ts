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
    const leadLinksActive =
      typeof body?.leadLinksActive === "boolean"
        ? body.leadLinksActive
        : undefined;
    const linkActive =
      typeof body?.linkActive === "boolean" ? body.linkActive : undefined;
    const leadId =
      typeof body?.leadId === "string" ? body.leadId.trim() : "";
    const leadActive =
      typeof body?.leadActive === "boolean" ? body.leadActive : undefined;

    if (
      !leadName &&
      !removeLeadId &&
      !leadId &&
      typeof leadLinksActive !== "boolean" &&
      typeof linkActive !== "boolean"
    ) {
      return NextResponse.json(
        { ok: false, message: "Yangilash uchun ma'lumot kerak." },
        { status: 400 },
      );
    }
    if (leadId && typeof leadActive !== "boolean") {
      return NextResponse.json(
        { ok: false, message: "Lead aktivligi noto'g'ri." },
        { status: 400 },
      );
    }

    const db = await getDb();
    const update: Record<string, any> = {
      $set: { updatedAt: Date.now() },
    };

    if (typeof leadLinksActive === "boolean") {
      update.$set.leadLinksActive = leadLinksActive;
    }
    if (typeof linkActive === "boolean") {
      update.$set.linkActive = linkActive;
    }

    if (removeLeadId) {
      update.$pull = { leadLinks: { id: removeLeadId } };
    }
    if (leadName) {
      update.$push = {
        leadLinks: {
          id: crypto.randomUUID(),
          name: leadName,
          active: true,
        },
      };
    }
    let arrayFilters: Record<string, any>[] | undefined;
    if (leadId && typeof leadActive === "boolean") {
      update.$set["leadLinks.$[lead].active"] = leadActive;
      arrayFilters = [{ "lead.id": leadId }];
    }

    const result = await db
      .collection("directions")
      .findOneAndUpdate(
        { $or: [{ uuid }, { id: uuid }] },
        update as any,
        { returnDocument: "after", arrayFilters },
      );

    const doc = (result as any)?.value ?? result;
    if (!doc) {
      return NextResponse.json(
        { ok: false, message: "Yo'nalish topilmadi." },
        { status: 404 },
      );
    }

    const { _id, ...rest } = doc as any;
    if (removeLeadId) {
      return NextResponse.json({
        ok: true,
        removedLeadId: removeLeadId,
        direction: rest,
      });
    }

    if (leadName) {
      const lead = rest.leadLinks?.[rest.leadLinks.length - 1];
      return NextResponse.json({ ok: true, lead, direction: rest });
    }

    return NextResponse.json({ ok: true, direction: rest });
  } catch (error) {
    console.error("Update direction error:", error);
    return NextResponse.json(
      { ok: false, message: "Server xatosi." },
      { status: 500 },
    );
  }
}
