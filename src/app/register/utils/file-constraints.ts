export const MAX_PHOTO_SIZE_BYTES = 500 * 1024;
export const MAX_PDF_SIZE_BYTES = 2 * 1024 * 1024;

export const PHOTO_SIZE_ERROR = "Rasm hajmi 500 KB dan oshmasligi kerak";
export const PDF_SIZE_ERROR = "PDF hajmi 2 MB dan oshmasligi kerak";

export const isFileTooLarge = (file: File, maxBytes: number) =>
  file.size > maxBytes;
