import { type FormErrors } from "../../register-context";
import { type EducationData } from "./types";

export type OptionalType = "college" | "university";

export type OptionalFieldValue =
  | string
  | boolean
  | Date
  | File
  | undefined;

export interface OptionalSectionProps {
  type: OptionalType;
  title: string;
  data: EducationData;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onUpdate: (field: keyof EducationData, value: OptionalFieldValue) => void;
  errors?: FormErrors;
  onClearError?: (field: string) => void;
  onFileError?: (field: string, message: string) => void;
}
