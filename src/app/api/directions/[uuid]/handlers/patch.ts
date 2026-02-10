import { NextResponse } from "next/server";
import crypto from "crypto";
import { getDb } from "@/lib/mongodb";

interface PatchBody {
  leadName?: string;
  removeLeadId?: string;
  leadLinksActive?: boolean;
  linkActive?: boolean;
  leadId?: string;
  leadActive?: boolean;
}

function parseBody(body: any): PatchBody {
  return {
    leadName: typeof body?.leadName === "string" ? body.leadName.trim() : "",
    removeLeadId:
      typeof body?.removeLeadId === "string" ? body.removeLeadId.trim() : "",
    leadLinksActive:
      typeof body?.leadLinksActive === "boolean"
        ? body.leadLinksActive
        : undefined,
    linkActive:
      typeof body?.linkActive === "boolean" ? body.linkActive : undefined,
    leadId: typeof body?.leadId === "string" ? body.leadId.trim() : "",
    leadActive:
      typeof body?.leadActive === "boolean" ? body.leadActive : undefined,
  };
}

function validateBody(body: PatchBody): string | null {
  const { leadName, removeLeadId, leadLinksActive, linkActive, leadId, leadActive } = body;

  if (
    !leadName &&
    !removeLeadId &&
    !leadId &&
    typeof leadLinksActive !== "boolean" &&
    typeof linkActive !== "boolean"
  ) {
    return "Yangilash uchun ma'lumot kerak.";
  }

  if (leadId && typeof leadActive !== "boolean") {
    return "Lead aktivligi noto'g'ri.";
  }

  return null;
}

function buildUpdate(body: PatchBody) {
  const { leadName, removeLeadId, leadLinksActive, linkActive, leadId, leadActive } = body;

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

  return { update, arrayFilters };
}

function buildResponse(doc: any, body: PatchBody) {
  const { _id, ...rest } = doc;

  if (body.removeLeadId) {
    return NextResponse.json({
      ok: true,
      removedLeadId: body.removeLeadId,
      direction: rest,
    });
  }

  if (body.leadName) {
    const lead = rest.leadLinks?.[rest.leadLinks.length - 1];
    return NextResponse.json({ ok: true, lead, direction: rest });
  }

  return NextResponse.json({ ok: true, direction: rest });
}

export async function handlePatch(uuid: string, requestBody: any) {
  if (!uuid) {
    return NextResponse.json(
      { ok: false, message: "UUID kerak." },
      { status: 400 },
    );
  }

  const body = parseBody(requestBody);
  const validationError = validateBody(body);

  if (validationError) {
    return NextResponse.json(
      { ok: false, message: validationError },
      { status: 400 },
    );
  }

  const { update, arrayFilters } = buildUpdate(body);

  const db = await getDb();
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

  return buildResponse(doc, body);
}
