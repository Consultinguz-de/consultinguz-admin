"use client";

import { useState } from "react";
import { CandidateStatus } from "./candidate-status";
import { CandidateOverview } from "./candidate-overview";
import { EducationCard } from "./education-card";
import { LanguageSkillsCard } from "./language-skills-card";
import { WorkExperienceCard } from "./work-experience-card";
import { SkillsCard } from "./skills-card";
import { CommentCard } from "./comment-card";
import type { CandidateDetail } from "@/app/directions/[uuid]/actions";

interface CandidatePageContentProps {
  candidate: CandidateDetail;
  fullName: string;
  directionTitle?: string;
}

export function CandidatePageContent({ 
  candidate, 
  fullName,
  directionTitle 
}: CandidatePageContentProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-muted/50 overflow-hidden border">
            {candidate.personalInfo?.photo?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={candidate.personalInfo.photo.url}
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
              {candidate.personalInfo?.email || "—"}
            </div>
            {directionTitle && (
              <div className="text-sm text-muted-foreground mt-1">
                Yo'nalish: {directionTitle}
              </div>
            )}
          </div>
        </div>
        <div className="rounded-lg border p-3">
          <CandidateStatus
            candidateId={candidate.id}
            initialApproved={candidate.approved}
            initialDocumentReady={candidate.documentReady}
            onEditClick={handleEditClick}
            isEditing={isEditing}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-4">
          <CandidateOverview
            candidateId={candidate.id}
            personalInfo={candidate.personalInfo}
            stage={candidate.stage}
            isEditing={isEditing}
            onEditingChange={setIsEditing}
          />
          <EducationCard education={candidate.education} />
          <LanguageSkillsCard languageSkills={candidate.languageSkills} />
          <WorkExperienceCard workExperience={candidate.workExperience} />
          <SkillsCard skills={candidate.skills} />
        </div>
        <div className="lg:sticky lg:top-4 h-fit">
          <CommentCard comment={candidate.comment} />
        </div>
      </div>
    </>
  );
}
