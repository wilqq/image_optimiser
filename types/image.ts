// Image upload and processing types

/**
 * Supported image MIME types
 */
export const SUPPORTED_IMAGE_TYPES = {
  JPEG: "image/jpeg",
  PNG: "image/png",
  WEBP: "image/webp",
} as const;

/**
 * Type guard for supported image types
 */
export type SupportedImageType =
  (typeof SUPPORTED_IMAGE_TYPES)[keyof typeof SUPPORTED_IMAGE_TYPES];

/**
 * File extensions mapped to MIME types
 */
export const IMAGE_EXTENSIONS = {
  ".jpg": SUPPORTED_IMAGE_TYPES.JPEG,
  ".jpeg": SUPPORTED_IMAGE_TYPES.JPEG,
  ".png": SUPPORTED_IMAGE_TYPES.PNG,
  ".webp": SUPPORTED_IMAGE_TYPES.WEBP,
} as const;

/**
 * Image metadata extracted from uploaded file
 */
export interface ImageMetadata {
  /** Original file name */
  fileName: string;
  /** File size in bytes */
  fileSize: number;
  /** File size formatted for display (e.g., "2.5 MB") */
  fileSizeFormatted: string;
  /** Image width in pixels */
  width: number;
  /** Image height in pixels */
  height: number;
  /** MIME type */
  mimeType: string;
  /** File extension */
  extension: string;
  /** Data URL for preview */
  previewUrl: string;
  /** Original File object */
  file: File;
}

/**
 * Validation error types
 */
export enum ValidationErrorType {
  FILE_TOO_LARGE = "FILE_TOO_LARGE",
  INVALID_FILE_TYPE = "INVALID_FILE_TYPE",
  INVALID_DIMENSIONS = "INVALID_DIMENSIONS",
  FAILED_TO_LOAD = "FAILED_TO_LOAD",
}

/**
 * Validation error interface
 */
export interface ValidationError {
  type: ValidationErrorType;
  message: string;
  fileName: string;
}

/**
 * Validation result for uploaded files
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  metadata?: ImageMetadata;
}

/**
 * Configuration for image upload validation
 */
export interface ImageUploadConfig {
  /** Maximum file size in bytes */
  maxFileSize: number;
  /** Maximum image width in pixels */
  maxWidth?: number;
  /** Maximum image height in pixels */
  maxHeight?: number;
  /** Allowed MIME types */
  allowedTypes: SupportedImageType[];
}
