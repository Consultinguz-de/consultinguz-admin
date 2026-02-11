import type { PersonalInfo } from "./types";

interface CandidateHeaderProps {
  personalInfo?: PersonalInfo;
  fullName: string;
}

export function CandidateHeader({ personalInfo, fullName }: CandidateHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-16 w-16 rounded-full bg-muted/50 overflow-hidden border">
        {personalInfo?.photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={personalInfo.photo.url}
            alt={fullName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
            —
          </div>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold">{fullName}</h1>
        <div className="text-sm text-muted-foreground">
          {personalInfo?.email || "—"}
        </div>
      </div>
    </div>
  );
}
