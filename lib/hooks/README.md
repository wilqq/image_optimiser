# Custom Hooks

Reusable React hooks for shared logic across components.

## Guidelines

- Name hooks with `use` prefix
- Keep hooks focused on a single responsibility
- Document hook parameters and return values
- Include TypeScript types

## Example Hooks

### useFileUpload

Handle file upload logic, validation, and state

### useImageOptimization

Manage image optimization settings and processing

### useLocalStorage

Persist state to localStorage with hydration handling

## Example

```typescript
// useFileUpload.ts
import { useState, useCallback } from "react";

interface UseFileUploadReturn {
  files: File[];
  uploadProgress: number;
  error: string | null;
  addFiles: (newFiles: File[]) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
}

export function useFileUpload(): UseFileUploadReturn {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setUploadProgress(0);
    setError(null);
  }, []);

  return { files, uploadProgress, error, addFiles, removeFile, clearFiles };
}
```
