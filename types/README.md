# Types

Global TypeScript type definitions and interfaces.

## Guidelines

- Define shared types used across multiple modules
- Use `.d.ts` files for type declarations only
- Use `.ts` files for types with implementations

## Example Structure

```typescript
// types/image.ts
export interface ImageFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  width?: number;
  height?: number;
}

export interface OptimizationOptions {
  quality: number;
  format: "jpeg" | "png" | "webp";
  maxWidth?: number;
  maxHeight?: number;
}

export interface OptimizationResult {
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  downloadUrl: string;
}
```

## Common Type Files

- `image.ts` - Image-related types
- `api.ts` - API request/response types
- `common.ts` - Common shared types
- `env.d.ts` - Environment variable types
