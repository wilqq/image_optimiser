# Image Upload Component Documentation

## Overview

A fully-featured, client-side image upload component built with React, TypeScript, and Tailwind CSS. This component provides a modern, user-friendly interface for uploading images with drag-and-drop support, comprehensive validation, and real-time feedback.

## Features

### ✨ Core Features

1. **Drag and Drop Upload**
   - Intuitive drag-and-drop interface
   - Visual feedback when dragging files
   - Supports multiple file uploads

2. **File Picker Support**
   - Traditional file browser integration
   - Restricted file type acceptance at browser level
   - Multi-select capability

3. **Client-Side Validation**
   - File size validation
   - File type validation (JPEG, PNG, WebP only)
   - Image dimension validation
   - Real-time error feedback

4. **Image Metadata Display**
   - File name
   - File size (formatted)
   - Image dimensions (width × height)
   - MIME type and file extension
   - Live preview thumbnails

5. **User Experience**
   - Processing indicator during validation
   - Clear error messages
   - Individual image removal
   - Batch clear functionality
   - Responsive grid layout

## File Structure

```
/Users/mateusz/projekty/image_optimiser/
├── components/
│   └── features/
│       ├── ImageUpload.tsx         # Main upload component
│       ├── ImagePreview.tsx        # Image preview with metadata
│       ├── index.ts                # Component exports
│       └── README.md               # Component documentation
├── lib/
│   └── utils/
│       └── image-validation.ts     # Validation utilities
├── types/
│   ├── image.ts                    # Type definitions
│   └── index.ts                    # Type exports
└── app/
    └── page.tsx                    # Example implementation
```

## Components

### ImageUpload

The main upload component with drag-and-drop and file picker support.

**Props:**
```typescript
interface ImageUploadProps {
  maxFileSize?: number;        // Default: 10MB (10485760 bytes)
  maxWidth?: number;            // Optional max image width
  maxHeight?: number;           // Optional max image height
  maxFiles?: number;            // Default: 10
  onUpload?: (metadata: ImageMetadata[]) => void;
  onError?: (errors: ValidationError[]) => void;
}
```

**Usage Example:**
```tsx
import { ImageUpload } from "@/components/features";
import { ImageMetadata, ValidationError } from "@/types/image";

function MyPage() {
  const handleUpload = (metadata: ImageMetadata[]) => {
    console.log("Uploaded images:", metadata);
    // Send to API or process further
  };

  const handleError = (errors: ValidationError[]) => {
    console.error("Validation errors:", errors);
    // Handle errors (e.g., show toast notification)
  };

  return (
    <ImageUpload
      maxFileSize={10 * 1024 * 1024}  // 10MB
      maxFiles={10}
      maxWidth={4096}
      maxHeight={4096}
      onUpload={handleUpload}
      onError={handleError}
    />
  );
}
```

### ImagePreview

Displays uploaded images with metadata in a card format.

**Props:**
```typescript
interface ImagePreviewProps {
  metadata: ImageMetadata;
  onRemove?: () => void;
}
```

## Type Definitions

### ImageMetadata

Complete metadata extracted from uploaded files:

```typescript
interface ImageMetadata {
  fileName: string;              // Original file name
  fileSize: number;              // Size in bytes
  fileSizeFormatted: string;     // Human-readable size (e.g., "2.5 MB")
  width: number;                 // Image width in pixels
  height: number;                // Image height in pixels
  mimeType: string;              // MIME type
  extension: string;             // File extension
  previewUrl: string;            // Data URL for preview
  file: File;                    // Original File object
}
```

### ValidationError

Error information from validation:

```typescript
interface ValidationError {
  type: ValidationErrorType;
  message: string;
  fileName: string;
}

enum ValidationErrorType {
  FILE_TOO_LARGE = "FILE_TOO_LARGE",
  INVALID_FILE_TYPE = "INVALID_FILE_TYPE",
  INVALID_DIMENSIONS = "INVALID_DIMENSIONS",
  FAILED_TO_LOAD = "FAILED_TO_LOAD",
}
```

### Supported Image Types

```typescript
const SUPPORTED_IMAGE_TYPES = {
  JPEG: "image/jpeg",
  PNG: "image/png",
  WEBP: "image/webp",
} as const;
```

## Validation Utilities

Located in `lib/utils/image-validation.ts`:

### Core Functions

```typescript
// Validate a single image file
validateImageFile(
  file: File,
  config: ImageUploadConfig
): Promise<ValidationResult>

// Validate multiple image files
validateImageFiles(
  files: File[],
  config: ImageUploadConfig
): Promise<ValidationResult[]>

// Load image and extract dimensions
loadImageDimensions(file: File): Promise<{
  width: number;
  height: number;
  previewUrl: string;
}>

// Check if file type is supported
isSupportedImageType(type: string): boolean

// Format bytes to human-readable string
formatFileSize(bytes: number): string

// Extract files from drag event
getFilesFromDragEvent(event: DragEvent): File[]

// Check if drag event contains files
hasDraggedFiles(event: DragEvent): boolean
```

## Configuration

Default configuration uses environment variables defined in `lib/utils/env.ts`:

```typescript
const publicEnv = getPublicEnv();
// {
//   maxFileSize: 10485760,        // 10MB
//   maxFiles: 10,
//   // ... other config
// }
```

### Environment Variables

Create a `.env.local` file to customize:

```env
NEXT_PUBLIC_MAX_FILE_SIZE=10485760    # 10MB in bytes
NEXT_PUBLIC_MAX_FILES=10              # Maximum number of files
```

## Validation Rules

### File Type Validation

- **Allowed formats:** JPEG, PNG, WebP
- **Checked at:** Browser input and client-side validation
- **Error:** `INVALID_FILE_TYPE` if not in allowed list

### File Size Validation

- **Default limit:** 10MB (10,485,760 bytes)
- **Configurable:** Via `maxFileSize` prop
- **Error:** `FILE_TOO_LARGE` if exceeds limit

### Dimension Validation

- **Optional:** Set via `maxWidth` and `maxHeight` props
- **Checked after:** Image is loaded in browser
- **Error:** `INVALID_DIMENSIONS` if exceeds limits

### Load Validation

- **Automatic:** Verifies image can be loaded and read
- **Error:** `FAILED_TO_LOAD` if image is corrupted or unreadable

## Styling

The component uses Tailwind CSS with support for dark mode:

- Modern, clean design
- Responsive layout (mobile-first)
- Dark mode support with `dark:` variants
- Smooth transitions and hover effects
- Accessibility-friendly (ARIA labels, keyboard support)

### Customization

All styles use Tailwind utility classes and can be customized by:

1. Modifying the component's className props
2. Extending your Tailwind config
3. Using CSS variables for theme colors

## Error Handling

The component provides comprehensive error handling:

### Error Display

- Errors are displayed in a dedicated error section
- Each error shows the file name and specific issue
- Multiple errors are listed clearly
- Errors can be dismissed by removing images or uploading new ones

### Error Types

1. **File Too Large**: File exceeds maximum size limit
2. **Invalid File Type**: File is not JPEG, PNG, or WebP
3. **Invalid Dimensions**: Image dimensions exceed limits
4. **Failed to Load**: Image is corrupted or cannot be read

### Callback Integration

```typescript
const handleError = (errors: ValidationError[]) => {
  errors.forEach(error => {
    switch (error.type) {
      case ValidationErrorType.FILE_TOO_LARGE:
        // Show toast notification
        break;
      case ValidationErrorType.INVALID_FILE_TYPE:
        // Alert user about supported formats
        break;
      // ... handle other cases
    }
  });
};
```

## Browser Compatibility

### Required Features

- File API
- Drag and Drop API
- FileReader API
- Canvas/Image loading
- ES2017+

### Supported Browsers

- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+
- Opera: 76+

## Performance Considerations

1. **Client-Side Processing**: All validation happens in the browser
2. **Async Validation**: Uses promises to avoid blocking UI
3. **Memory Management**: Preview URLs created on-demand
4. **Batch Processing**: Multiple files validated in parallel

## Best Practices

### 1. Set Appropriate Limits

```typescript
<ImageUpload
  maxFileSize={5 * 1024 * 1024}    // 5MB for web optimization
  maxWidth={2048}                   // Reasonable for web
  maxHeight={2048}
  maxFiles={5}                      // Limit concurrent uploads
/>
```

### 2. Provide User Feedback

```typescript
const handleUpload = (metadata: ImageMetadata[]) => {
  // Show success notification
  toast.success(`${metadata.length} images uploaded successfully`);
  
  // Process images (e.g., upload to server)
  uploadToServer(metadata);
};

const handleError = (errors: ValidationError[]) => {
  // Show error notification
  toast.error(`${errors.length} validation errors occurred`);
};
```

### 3. Clean Up Resources

The component automatically manages preview URLs, but if you store them elsewhere:

```typescript
useEffect(() => {
  return () => {
    // Clean up preview URLs when component unmounts
    uploadedImages.forEach(img => {
      if (img.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(img.previewUrl);
      }
    });
  };
}, [uploadedImages]);
```

### 4. Server-Side Validation

Always validate files on the server as well:

```typescript
// Client-side validation is for UX only
// ALWAYS validate server-side for security
const handleUpload = async (metadata: ImageMetadata[]) => {
  const formData = new FormData();
  metadata.forEach(({ file }) => {
    formData.append('files', file);
  });
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    // Handle server-side validation errors
  }
};
```

## Testing

### Unit Testing Example

```typescript
import { validateImageFile } from '@/lib/utils/image-validation';
import { SUPPORTED_IMAGE_TYPES } from '@/types/image';

describe('validateImageFile', () => {
  it('should validate a valid JPEG file', async () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const result = await validateImageFile(file, {
      maxFileSize: 10 * 1024 * 1024,
      allowedTypes: Object.values(SUPPORTED_IMAGE_TYPES),
    });
    
    expect(result.valid).toBe(true);
  });
  
  it('should reject files that are too large', async () => {
    const file = new File(['x'.repeat(11 * 1024 * 1024)], 'large.jpg', {
      type: 'image/jpeg'
    });
    const result = await validateImageFile(file, {
      maxFileSize: 10 * 1024 * 1024,
      allowedTypes: Object.values(SUPPORTED_IMAGE_TYPES),
    });
    
    expect(result.valid).toBe(false);
    expect(result.errors[0].type).toBe('FILE_TOO_LARGE');
  });
});
```

## Troubleshooting

### Images not loading

- Check browser console for errors
- Verify file is a valid image format
- Ensure file isn't corrupted

### Drag and drop not working

- Check browser compatibility
- Verify no conflicting event listeners
- Ensure proper MIME types in file input accept attribute

### High memory usage

- Limit `maxFiles` to reasonable number
- Consider implementing pagination for large batches
- Clean up preview URLs after use

## Future Enhancements

Potential improvements:

1. Image cropping/editing before upload
2. Progress bars for individual files
3. Image optimization preview (before/after)
4. Thumbnail generation for very large images
5. Support for additional formats (AVIF, GIF, SVG)
6. Undo/redo functionality
7. Image metadata editing (EXIF data)
8. Bulk operations (rotate, resize)

## License

Part of the Image Optimiser project.

## Support

For issues or questions, please refer to the project repository.
