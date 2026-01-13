"use client";

import { useRef, useState } from "react";
import {
  ImageMetadata,
  SUPPORTED_IMAGE_TYPES,
  ValidationError,
} from "@/types/image";
import {
  getFilesFromDragEvent,
  hasDraggedFiles,
  validateImageFiles,
} from "@/lib/utils/image-validation";
import { ImagePreview } from "./ImagePreview";

interface ImageUploadProps {
  /** Maximum file size in bytes (default: 10MB) */
  maxFileSize?: number;
  /** Maximum image width in pixels */
  maxWidth?: number;
  /** Maximum image height in pixels */
  maxHeight?: number;
  /** Maximum number of files that can be uploaded */
  maxFiles?: number;
  /** Callback when files are successfully uploaded */
  onUpload?: (metadata: ImageMetadata[]) => void;
  /** Callback when validation errors occur */
  onError?: (errors: ValidationError[]) => void;
}

/**
 * Image upload component with drag-and-drop and file picker support
 */
export function ImageUpload({
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  maxWidth,
  maxHeight,
  maxFiles = 10,
  onUpload,
  onError,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<ImageMetadata[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  // Accept only supported image types
  const acceptedTypes = Object.values(SUPPORTED_IMAGE_TYPES).join(",");

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) return;

    // Check if adding these files would exceed the max limit
    if (uploadedImages.length + files.length > maxFiles) {
      const error: ValidationError = {
        type: "INVALID_FILE_TYPE" as any,
        message: `Cannot upload more than ${maxFiles} files. Currently uploaded: ${uploadedImages.length}`,
        fileName: "",
      };
      setErrors([error]);
      onError?.([error]);
      return;
    }

    setIsProcessing(true);
    setErrors([]);

    try {
      // Validate all files
      const results = await validateImageFiles(files, {
        maxFileSize,
        maxWidth,
        maxHeight,
        allowedTypes: Object.values(SUPPORTED_IMAGE_TYPES),
      });

      // Separate valid and invalid results
      const validResults = results.filter((r) => r.valid && r.metadata);
      const invalidResults = results.filter((r) => !r.valid);

      // Collect all errors
      const allErrors = invalidResults.flatMap((r) => r.errors);

      if (allErrors.length > 0) {
        setErrors(allErrors);
        onError?.(allErrors);
      }

      // Add valid images to the list
      if (validResults.length > 0) {
        const validMetadata = validResults
          .map((r) => r.metadata)
          .filter((m): m is ImageMetadata => m !== undefined);

        setUploadedImages((prev) => [...prev, ...validMetadata]);
        onUpload?.(validMetadata);
      }
    } catch (error) {
      const err: ValidationError = {
        type: "FAILED_TO_LOAD" as any,
        message: `Unexpected error: ${error instanceof Error ? error.message : "Unknown error"}`,
        fileName: "",
      };
      setErrors([err]);
      onError?.([err]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounterRef.current++;

    if (hasDraggedFiles(e.nativeEvent) && dragCounterRef.current === 1) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounterRef.current--;

    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
    dragCounterRef.current = 0;

    const files = getFilesFromDragEvent(e.nativeEvent);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);

    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setErrors([]); // Clear errors when removing an image
  };

  const handleClearAll = () => {
    setUploadedImages([]);
    setErrors([]);
  };

  return (
    <div className="w-full space-y-4">
      {/* Upload Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-12 transition-all ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
            : "border-zinc-300 bg-zinc-50 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:border-zinc-600"
        } ${isProcessing ? "pointer-events-none opacity-50" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          multiple
          onChange={handleFileInput}
          className="hidden"
          disabled={isProcessing}
        />

        {/* Upload Icon */}
        <div className="mb-4">
          <svg
            className={`h-16 w-16 transition-colors ${
              isDragging
                ? "text-blue-500"
                : "text-zinc-400 dark:text-zinc-600"
            }`}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Upload Text */}
        <div className="space-y-2 text-center">
          <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
            {isDragging
              ? "Drop your images here"
              : "Drag and drop images here"}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">or</p>
          <button
            type="button"
            onClick={handleBrowseClick}
            disabled={isProcessing}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Browse Files
          </button>
        </div>

        {/* Info Text */}
        <div className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
          <p>Supported formats: JPEG, PNG, WebP</p>
          <p className="mt-1">
            Max file size:{" "}
            {(maxFileSize / (1024 * 1024)).toFixed(0)}
            MB
            {maxFiles && ` • Max files: ${maxFiles}`}
          </p>
          {(maxWidth || maxHeight) && (
            <p className="mt-1">
              Max dimensions:{" "}
              {maxWidth && maxHeight
                ? `${maxWidth} × ${maxHeight}px`
                : maxWidth
                  ? `${maxWidth}px width`
                  : `${maxHeight}px height`}
            </p>
          )}
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-blue-600"></div>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Processing images...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Validation Errors */}
      {errors.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/20">
          <div className="flex items-start gap-3">
            <svg
              className="h-5 w-5 flex-shrink-0 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Validation {errors.length === 1 ? "Error" : "Errors"}
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-red-700 dark:text-red-300">
                {errors.map((error, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>
                      {error.fileName && (
                        <strong className="font-medium">
                          {error.fileName}:
                        </strong>
                      )}{" "}
                      {error.message}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Images Grid */}
      {uploadedImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Uploaded Images ({uploadedImages.length})
            </h3>
            <button
              onClick={handleClearAll}
              className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              Clear All
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {uploadedImages.map((metadata, index) => (
              <ImagePreview
                key={`${metadata.fileName}-${index}`}
                metadata={metadata}
                onRemove={() => handleRemoveImage(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
