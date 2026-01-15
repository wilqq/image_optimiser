"use client";

import { ImageMetadata } from "@/types/image";
import Image from "next/image";

interface ImagePreviewProps {
  metadata: ImageMetadata;
  onRemove?: () => void;
}

/**
 * Component to display image preview with metadata
 */
export function ImagePreview({ metadata, onRemove }: ImagePreviewProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {/* Image Preview */}
      <div className="relative mb-3 flex h-48 w-full items-center justify-center overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={metadata.previewUrl}
          alt={metadata.fileName}
          fill
          className="object-contain"
          unoptimized
        />
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
            aria-label="Remove image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Metadata */}
      <div className="space-y-2">
        {/* File Name */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {metadata.fileName}
            </p>
          </div>
        </div>

        {/* File Details */}
        <div className="grid grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex flex-col">
            <span className="font-medium text-zinc-500 dark:text-zinc-500">
              Size
            </span>
            <span className="font-mono">{metadata.fileSizeFormatted}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-zinc-500 dark:text-zinc-500">
              Dimensions
            </span>
            <span className="font-mono">
              {metadata.width} × {metadata.height}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-zinc-500 dark:text-zinc-500">
              Type
            </span>
            <span className="font-mono uppercase">
              {metadata.extension.replace(".", "")}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-zinc-500 dark:text-zinc-500">
              Format
            </span>
            <span className="truncate font-mono text-[10px]">
              {metadata.mimeType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
