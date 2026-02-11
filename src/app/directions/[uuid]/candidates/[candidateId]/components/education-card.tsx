import type { Education } from "./types";
import { formatDate } from "./utils";

interface EducationCardProps {
  education?: Education;
}

export function EducationCard({ education }: EducationCardProps) {
  const items = [
    { key: "school", label: "Maktab", data: education?.school },
    { key: "college", label: "Kollej/Litsey", data: education?.college },
    { key: "university", label: "Universitet", data: education?.university },
  ];

  return (
    <div className="rounded-lg border p-4">
      <h2 className="font-semibold mb-2">Ta'lim</h2>
      {education ? (
        <div className="space-y-3 text-sm text-muted-foreground">
          {items.map((item) => {
            const hasData =
              item.data?.enabled ||
              item.data?.institutionName ||
              item.data?.direction ||
              item.data?.startDate ||
              item.data?.endDate;
            return (
              <div key={item.key}>
                <div className="font-medium text-foreground">{item.label}</div>
                {hasData ? (
                  <div className="mt-1 space-y-1">
                    <div>{item.data?.institutionName || "—"}</div>
                    <div>{item.data?.direction || "—"}</div>
                    <div>
                      {formatDate(item.data?.startDate)} —{" "}
                      {formatDate(item.data?.endDate)}
                    </div>
                  </div>
                ) : (
                  <div className="mt-1 text-xs">Kiritilmagan</div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Ta'lim ma'lumoti yo'q.</p>
      )}
    </div>
  );
}
