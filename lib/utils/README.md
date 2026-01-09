# Utilities

Pure utility functions and helpers.

## Categories

### File Utilities

- File size formatting
- File type validation
- File name sanitization

### Image Utilities

- Image dimension calculations
- Format conversions
- Compression utilities

### General Utilities

- Date/time formatting
- String manipulation
- Data validation
- Error handling helpers

## Example

```typescript
// fileUtils.ts
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

export function isValidImageType(type: string): boolean {
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  return validTypes.includes(type);
}
```
