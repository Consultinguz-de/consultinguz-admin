export interface FileUpload {
  url: string;
  path: string;
  name: string;
  size: number;
  contentType: string | null;
}

export interface EducationEntry {
  enabled: boolean;
  startDate: string | null;
  endDate: string | null;
  institutionName: string;
  direction: string;
  document: FileUpload | null;
}

export interface CandidateListItem {
  id: string;
  fullName: string;
  phone?: string;
  email?: string;
  photoUrl?: string | null;
  documentReady?: boolean | null;
  stage?: number | null;
  comment?: string | null;
  lead?: string | null;
  telegramId?: string | null;
  approved?: boolean | null;
  createdAt: string | null;
  directionId?: string | null;
  directionTitle?: string | null;
}

export interface PaginatedCandidates {
  items: CandidateListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CandidateDetail {
  id: string;
  directionId?: string;
  personalInfo?: any;
  workExperience?: any[];
  education?: {
    school?: EducationEntry;
    college?: EducationEntry;
    university?: EducationEntry;
  };
  languageSkills?: any[];
  skills?: string[];
  documentReady?: boolean | null;
  stage?: number | null;
  comment?: string | null;
  lead?: string | null;
  telegramId?: string | null;
  approved?: boolean | null;
  createdAt?: string | null;
}
