"use client";

import { ImageUpload } from "@/components/features";
import { ImageMetadata, ValidationError } from "@/types/image";
import { getPublicEnv } from "@/lib/utils/env";

const publicEnv = getPublicEnv();

export default function Home() {
  const handleUpload = (metadata: ImageMetadata[]) => {
    console.log("Images uploaded successfully:", metadata);
    // Here you can add logic to send images to your API
  };

  const handleError = (errors: ValidationError[]) => {
    console.error("Validation errors:", errors);
    // Here you can add additional error handling
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Image Optimiser
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Upload your images to optimize them for web use. Supports JPEG, PNG,
            and WebP formats.
          </p>
        </div>

        {/* Upload Component */}
        <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900 sm:p-8">
          <ImageUpload
            maxFileSize={publicEnv.maxFileSize}
            maxFiles={publicEnv.maxFiles}
            maxWidth={4096}
            maxHeight={4096}
            onUpload={handleUpload}
            onError={handleError}
          />
        </div>

        {/* Info Section */}
        <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Features
          </h2>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                <strong>Drag and Drop:</strong> Simply drag your images into the
                upload area
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                <strong>File Browser:</strong> Or use the traditional file picker
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                <strong>Real-time Validation:</strong> Instant feedback on file
                size, type, and dimensions
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                <strong>Image Preview:</strong> See thumbnails with detailed
                metadata
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                <strong>Batch Upload:</strong> Upload up to {publicEnv.maxFiles}{" "}
                images at once
              </span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
