"use client";
import { useState } from "react";
import { toast } from "sonner";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { type FormData } from "../types";
import { storage } from "@/lib/firebase";
import { submitCandidate } from "../actions";

interface UseFormSubmissionProps {
  formData: FormData;
  directionTitle?: string;
  directionId?: string;
  leadName?: string;
}

export function useFormSubmission({
  formData,
  directionTitle,
  directionId,
  leadName,
}: UseFormSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // Generate unique ID for file paths
      const candidateId = crypto.randomUUID();
      const basePath = `candidates/${candidateId}`;

      const toIso = (value?: Date) => (value ? value.toISOString() : null);
      const safeName = (value: string) =>
        value.replace(/[^a-zA-Z0-9._-]/g, "_");

      const uploadFile = async (file: File, path: string) => {
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file, {
          contentType: file.type || undefined,
        });
        const url = await getDownloadURL(storageRef);
        return {
          url,
          path,
          name: file.name,
          size: file.size,
          contentType: file.type || null,
        };
      };

      const personal = formData.personalInfo;
      const passportFile = personal.passportFile
        ? await uploadFile(
            personal.passportFile,
            `${basePath}/passport/${safeName(personal.passportFile.name)}`,
          )
        : null;
      const photo = personal.photo
        ? await uploadFile(
            personal.photo,
            `${basePath}/photo/${safeName(personal.photo.name)}`,
          )
        : null;

      const education = formData.education;
      const educationUploads = await Promise.all(
        ["school", "college", "university"].map(async (key) => {
          const entry = education[key as keyof typeof education];
          if (!entry.document) return [key, null] as const;
          const uploaded = await uploadFile(
            entry.document,
            `${basePath}/education/${key}/${safeName(entry.document.name)}`,
          );
          return [key, uploaded] as const;
        }),
      );
      const educationDocuments = Object.fromEntries(educationUploads) as Record<
        string,
        Awaited<ReturnType<typeof uploadFile>> | null
      >;

      const languageUploads = await Promise.all(
        formData.languageSkills.map(async (skill) => {
          if (!skill.certificate) {
            return { id: skill.id, certificate: null };
          }
          const uploaded = await uploadFile(
            skill.certificate,
            `${basePath}/language/${skill.id}/${safeName(
              skill.certificate.name,
            )}`,
          );
          return { id: skill.id, certificate: uploaded };
        }),
      );
      const languageCertificates = Object.fromEntries(
        languageUploads.map((item) => [item.id, item.certificate]),
      );

      const payload = {
        directionTitle: directionTitle || null,
        directionId: directionId || null,
        leadName: leadName || null,
        documentReady: false,
        stage: 0,
        comment: {},
        lead: leadName || "",
        telegramId: "",
        approved: null,
        personalInfo: {
          firstName: personal.firstName,
          lastName: personal.lastName,
          gender: personal.gender,
          birthDate: toIso(personal.birthDate),
          birthPlace: personal.birthPlace,
          maritalStatus: personal.maritalStatus,
          phone: personal.phone,
          email: personal.email,
          passport: personal.passport,
          passportFile: passportFile,
          photo: photo,
          street: personal.street,
          houseNumber: personal.houseNumber,
          region: personal.region,
          country: personal.country,
        },
        workExperience: formData.workExperience.map((item) => ({
          id: item.id,
          startDate: toIso(item.startDate),
          endDate: toIso(item.endDate),
          position: item.position,
          employer: item.employer,
          responsibilities: item.responsibilities,
        })),
        education: {
          school: {
            enabled: education.school.enabled,
            startDate: toIso(education.school.startDate),
            endDate: toIso(education.school.endDate),
            institutionName: education.school.institutionName,
            direction: education.school.direction,
            document: educationDocuments.school || null,
          },
          college: {
            enabled: education.college.enabled,
            startDate: toIso(education.college.startDate),
            endDate: toIso(education.college.endDate),
            institutionName: education.college.institutionName,
            direction: education.college.direction,
            document: educationDocuments.college || null,
          },
          university: {
            enabled: education.university.enabled,
            startDate: toIso(education.university.startDate),
            endDate: toIso(education.university.endDate),
            institutionName: education.university.institutionName,
            direction: education.university.direction,
            document: educationDocuments.university || null,
          },
        },
        languageSkills: formData.languageSkills.map((skill) => ({
          id: skill.id,
          language: skill.language,
          level: skill.level,
          noCertificate: skill.noCertificate,
          certificate: languageCertificates[skill.id] || null,
        })),
        skills: formData.skills,
        privacyAccepted: formData.privacyAccepted,
      };

      // Save to MongoDB via Server Action
      const result = await submitCandidate(payload);

      if (result.success) {
        toast.success("Ma'lumotlar yuborildi", {
          description: "Arizangiz muvaffaqiyatli saqlandi.",
        });
      } else {
        throw new Error(result.error || "Failed to save candidate");
      }
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error("Yuborishda xatolik", {
        description: "Iltimos, qayta urinib ko'ring.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitForm,
  };
}
