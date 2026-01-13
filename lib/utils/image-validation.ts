// Client-side image validation utilities

import {
  ImageMetadata,
  ImageUploadConfig,
  SUPPORTED_IMAGE_TYPES,
  ValidationError,
  ValidationErrorType,
  ValidationResult,
} from "@/types/image";

/**
 * Format bytes to human-readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Get file extension from filename
 */
export function getFileExtension(fileName: string): string {
  const lastDot = fileName.lastIndexOf(".");
  return lastDot !== -1 ? fileName.substring(lastDot).toLowerCase() : "";
}

/**
 * Check if file type is supported
 */
export function isSupportedImageType(type: string): boolean {
  return Object.values(SUPPORTED_IMAGE_TYPES).includes(
    type as (typeof SUPPORTED_IMAGE_TYPES)[keyof typeof SUPPORTED_IMAGE_TYPES]
  );
}

/**
 * Load image and extract dimensions
 */
export function loadImageDimensions(file: File): Promise<{
  width: number;
  height: number;
  previewUrl: string;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          previewUrl: e.target?.result as string,
        });
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Validate a single image file
 */
export async function validateImageFile(
  file: File,
  config: ImageUploadConfig
): Promise<ValidationResult> {
  const errors: ValidationError[] = [];

  // Check file size
  if (file.size > config.maxFileSize) {
    errors.push({
      type: ValidationErrorType.FILE_TOO_LARGE,
      message: `File size (${formatFileSize(file.size)}) exceeds maximum allowed size (${formatFileSize(config.maxFileSize)})`,
      fileName: file.name,
    });
  }

  // Check file type
  if (!isSupportedImageType(file.type)) {
    errors.push({
      type: ValidationErrorType.INVALID_FILE_TYPE,
      message: `File type "${file.type}" is not supported. Allowed types: JPEG, PNG, WebP`,
      fileName: file.name,
    });
    // Return early if file type is invalid - no point loading the image
    return { valid: false, errors };
  }

  // Try to load image and get dimensions
  try {
    const { width, height, previewUrl } = await loadImageDimensions(file);

    // Check dimensions if limits are set
    if (config.maxWidth && width > config.maxWidth) {
      errors.push({
        type: ValidationErrorType.INVALID_DIMENSIONS,
        message: `Image width (${width}px) exceeds maximum allowed width (${config.maxWidth}px)`,
        fileName: file.name,
      });
    }

    if (config.maxHeight && height > config.maxHeight) {
      errors.push({
        type: ValidationErrorType.INVALID_DIMENSIONS,
        message: `Image height (${height}px) exceeds maximum allowed height (${config.maxHeight}px)`,
        fileName: file.name,
      });
    }

    // Create metadata object
    const metadata: ImageMetadata = {
      fileName: file.name,
      fileSize: file.size,
      fileSizeFormatted: formatFileSize(file.size),
      width,
      height,
      mimeType: file.type,
      extension: getFileExtension(file.name),
      previewUrl,
      file,
    };

    return {
      valid: errors.length === 0,
      errors,
      metadata,
    };
  } catch (error) {
    errors.push({
      type: ValidationErrorType.FAILED_TO_LOAD,
      message: `Failed to load image: ${error instanceof Error ? error.message : "Unknown error"}`,
      fileName: file.name,
    });

    return { valid: false, errors };
  }
}

/**
 * Validate multiple image files
 */
export async function validateImageFiles(
  files: File[],
  config: ImageUploadConfig
): Promise<ValidationResult[]> {
  return Promise.all(files.map((file) => validateImageFile(file, config)));
}

/**
 * Check if drag event contains files
 */
export function hasDraggedFiles(event: DragEvent): boolean {
  if (!event.dataTransfer) return false;

  return (
    event.dataTransfer.types.includes("Files") ||
    event.dataTransfer.items.length > 0
  );
}

/**
 * Extract files from drag event
 */
export function getFilesFromDragEvent(event: DragEvent): File[] {
  const files: File[] = [];

  if (event.dataTransfer?.items) {
    // Use DataTransferItemList interface
    for (let i = 0; i < event.dataTransfer.items.length; i++) {
      const item = event.dataTransfer.items[i];
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) files.push(file);
      }
    }
  } else if (event.dataTransfer?.files) {
    // Use DataTransferList interface
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      files.push(event.dataTransfer.files[i]);
    }
  }

  return files;
}
