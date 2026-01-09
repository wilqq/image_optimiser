// Application constants
// These are hardcoded values that don't change between environments

/**
 * Supported image formats
 */
export const SUPPORTED_IMAGE_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

/**
 * Image format extensions
 */
export const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
] as const;

/**
 * Compression quality presets
 */
export const QUALITY_PRESETS = {
  low: 60,
  medium: 75,
  high: 85,
  maximum: 95,
} as const;

/**
 * File size limits (in bytes)
 */
export const FILE_SIZE = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
} as const;

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  upload: "/api/upload",
  optimize: "/api/optimize",
  download: "/api/download",
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  settings: "image-optimizer-settings",
  recentFiles: "image-optimizer-recent-files",
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  fileTooBig: "File size exceeds the maximum allowed size",
  invalidFormat: "Invalid file format. Please upload an image file",
  uploadFailed: "Failed to upload file. Please try again",
  optimizationFailed: "Failed to optimize image. Please try again",
  networkError: "Network error. Please check your connection",
} as const;
