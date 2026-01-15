# Feature Components

This directory contains feature-specific components for the Image Optimiser application.

## ImageUpload

A comprehensive image upload component with drag-and-drop and file picker support.

### Features

- **Drag and Drop**: Drag images directly into the upload area
- **File Picker**: Traditional file browser support
- **Client-side Validation**: Real-time validation for:
  - File size limits
  - File type restrictions (JPEG, PNG, WebP)
  - Image dimensions
- **Batch Upload**: Support for multiple file uploads
- **Live Preview**: See uploaded images with metadata
- **Error Handling**: Clear error messages for validation failures

### Usage

```tsx
import { ImageUpload } from "@/components/features";

export default function MyPage() {
  const handleUpload = (metadata: ImageMetadata[]) => {
    console.log("Uploaded:", metadata);
    // Process uploaded images
  };

  const handleError = (errors: ValidationError[]) => {
    console.error("Errors:", errors);
    // Handle validation errors
  };

  return (
    <ImageUpload
      maxFileSize={10 * 1024 * 1024} // 10MB
      maxFiles={10}
      maxWidth={4096}
      maxHeight={4096}
      onUpload={handleUpload}
      onError={handleError}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxFileSize` | `number` | `10485760` (10MB) | Maximum file size in bytes |
| `maxWidth` | `number` | `undefined` | Maximum image width in pixels |
| `maxHeight` | `number` | `undefined` | Maximum image height in pixels |
| `maxFiles` | `number` | `10` | Maximum number of files allowed |
| `onUpload` | `(metadata: ImageMetadata[]) => void` | `undefined` | Callback when files are successfully validated |
| `onError` | `(errors: ValidationError[]) => void` | `undefined` | Callback when validation errors occur |

## ImagePreview

Component to display image previews with metadata.

### Features

- Image thumbnail preview
- Display file name, size, dimensions, and type
- Remove button with hover effect
- Responsive grid layout

### Usage

```tsx
import { ImagePreview } from "@/components/features";

export default function MyComponent({ metadata }: { metadata: ImageMetadata }) {
  const handleRemove = () => {
    console.log("Remove image");
  };

  return (
    <ImagePreview
      metadata={metadata}
      onRemove={handleRemove}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `metadata` | `ImageMetadata` | required | Image metadata object |
| `onRemove` | `() => void` | `undefined` | Callback when remove button is clicked |

## Types

See `types/image.ts` for full type definitions:

- `ImageMetadata`: Complete metadata for uploaded images
- `ValidationError`: Error information from validation
- `ValidationResult`: Result of validation process
- `ImageUploadConfig`: Configuration for upload validation
- `SupportedImageType`: Type-safe image MIME types

## Utilities

See `lib/utils/image-validation.ts` for validation utilities:

- `formatFileSize`: Format bytes to human-readable string
- `validateImageFile`: Validate a single image file
- `validateImageFiles`: Validate multiple image files
- `loadImageDimensions`: Load image and extract dimensions
- `isSupportedImageType`: Check if file type is supported
- `getFilesFromDragEvent`: Extract files from drag event
- `hasDraggedFiles`: Check if drag event contains files
