import { getDb } from "@/lib/mongodb";
import { slugify } from "@/lib/slugify";
import { Direction } from "@/types/direction";
import crypto from "crypto";

const COLLECTION = "directions";

export async function getDirections(): Promise<Direction[]> {
  const db = await getDb();
  const items = await db
    .collection<Direction>(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  // Remove _id (ObjectId) for Client Component serialization
  return items.map((item) => {
    const { _id, ...rest } = item as any;
    return {
      ...rest,
      id: rest.id ?? rest.uuid,
      uuid: rest.uuid ?? rest.id, // Ensure uuid is always present
    };
  });
}

export async function getDirectionBySlug(slug: string) {
  const db = await getDb();
  const item = await db.collection<Direction>(COLLECTION).findOne({ slug });

  if (!item) return null;

  // Remove _id (ObjectId) for Client Component serialization
  const { _id, ...rest } = item as any;
  return {
    ...rest,
    id: rest.id ?? rest.uuid,
    uuid: rest.uuid ?? rest.id, // Ensure uuid is always present
  };
}

export async function getDirectionByUuid(
  uuid: string,
): Promise<Direction | null> {
  const db = await getDb();

  const item = await db.collection<Direction>(COLLECTION).findOne({
    $or: [{ uuid }, { id: uuid }],
  });

  if (!item) return null;

  // Remove _id (ObjectId) for Client Component serialization
  const { _id, ...rest } = item as any;
  return {
    ...rest,
    id: rest.id ?? rest.uuid,
    uuid: rest.uuid ?? rest.id, // Ensure uuid is always present
  };
}

export function buildDirection(title: string, createdBy: string): Direction {
  const now = Date.now();
  const slug = slugify(title);
  const uuid = crypto.randomUUID();

  return {
    id: uuid,
    uuid,
    title: title.trim(),
    slug,
    name: slug,
    collectionName: slug,
    createdAt: now,
    updatedAt: now,
    createdBy,
    leadLinks: [],
    leadLinksActive: true,
    linkActive: true,
    candidatesCount: 0,
  };
}
