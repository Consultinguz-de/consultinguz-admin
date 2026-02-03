export interface EducationData {
  enabled: boolean;
  startDate?: Date;
  endDate?: Date;
  institutionName: string;
  direction: string;
  document?: File;
}

export interface EducationState {
  school: EducationData;
  college: EducationData;
  university: EducationData;
}

export const initialEducationData: EducationData = {
  enabled: true,
  startDate: undefined,
  endDate: undefined,
  institutionName: "",
  direction: "",
};
