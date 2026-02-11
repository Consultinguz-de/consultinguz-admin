interface SkillsCardProps {
  skills?: string[];
}

export function SkillsCard({ skills }: SkillsCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="font-semibold mb-2">Qobilyatlar</h2>
      {skills && skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={`${skill}-${idx}`}
              className="rounded-full border px-2 py-1 text-xs text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Qobilyatlar kiritilmagan.
        </p>
      )}
    </div>
  );
}
