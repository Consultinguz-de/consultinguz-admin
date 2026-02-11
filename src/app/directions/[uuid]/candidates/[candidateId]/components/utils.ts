import { format } from "date-fns";

export function formatDate(value?: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return format(date, "dd.MM.yyyy");
}

export function buildAddress(info?: {
  street?: string;
  houseNumber?: string;
  region?: string;
  country?: string;
}): string {
  if (!info) return "—";
  const parts = [
    [info.street, info.houseNumber].filter(Boolean).join(" ").trim(),
    info.region,
    info.country,
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : "—";
}
