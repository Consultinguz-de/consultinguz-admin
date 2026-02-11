import type { LanguageSkill } from "./types";

interface LanguageSkillsCardProps {
  languageSkills?: LanguageSkill[];
}

export function LanguageSkillsCard({ languageSkills }: LanguageSkillsCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="font-semibold mb-2">Til</h2>
      {languageSkills && languageSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {languageSkills.map((lang, idx) => {
            const certLabel = lang.noCertificate
              ? "Sertifikat yo'q"
              : lang.certificate
                ? "Sertifikat bor"
                : "Sertifikat noma'lum";
            return (
              <div
                key={lang.id || idx}
                className="rounded-md border px-3 py-2 text-xs text-muted-foreground"
              >
                <div className="font-medium text-foreground">
                  {lang.language || "—"}
                </div>
                <div>{lang.level || "Daraja ko'rsatilmagan"}</div>
                <div>{certLabel}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Til ma'lumoti yo'q.</p>
      )}
    </div>
  );
}
