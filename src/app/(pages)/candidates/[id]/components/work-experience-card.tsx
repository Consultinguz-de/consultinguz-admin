import type { WorkExperienceItem } from "./types";
import { formatDate } from "./utils";

interface WorkExperienceCardProps {
  workExperience?: WorkExperienceItem[];
}

export function WorkExperienceCard({ workExperience }: WorkExperienceCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="font-semibold mb-2">Ish tajribasi</h2>
      {workExperience && workExperience.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {workExperience.map((item, idx) => {
            const start = formatDate(item.startDate);
            const end = item.endDate ? formatDate(item.endDate) : "—";
            return (
              <div key={item.id || idx} className="rounded-md border p-3">
                <div className="text-sm font-medium">
                  {item.position || "—"}
                  {item.employer ? `, ${item.employer}` : ""}
                </div>
                <div className="text-xs text-muted-foreground">
                  {start} — {end}
                </div>
                {item.responsibilities && item.responsibilities.length > 0 ? (
                  <div className="text-xs text-muted-foreground mt-2">
                    {item.responsibilities.filter(Boolean).join(", ")}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Ish tajribasi kiritilmagan.
        </p>
      )}
    </div>
  );
}
