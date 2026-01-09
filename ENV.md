# Environment Variables Guide

This document explains how to configure and use environment variables in the Image Optimiser project.

## Overview

Environment variables are used to configure the application for different environments (development, production) without hardcoding sensitive values in the source code.

## File Structure

- **`.env.example`** - Template file with all available variables (committed to git)
- **`.env.local`** - Local development overrides (not committed, highest priority)
- **`.env.development`** - Development environment configuration
- **`.env.production`** - Production environment configuration
- **`.env`** - Base configuration (not used by default in Next.js)

## Setup Instructions

### For Local Development

1. Copy the example file:

   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your local values:

   ```bash
   nano .env.local
   ```

3. Restart the development server:
   ```bash
   npm run dev
   ```

### For Deployment

Configure environment variables in your deployment platform:

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Build & Deploy → Environment
- **AWS/Azure/GCP**: Use their respective secret management services

## Variable Types

### Public Variables (Client-side)

Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser:

```typescript
// Available in both server and client components
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

**Important:** Never put secrets in `NEXT_PUBLIC_` variables!

### Private Variables (Server-side only)

Variables without the prefix are only available on the server:

```typescript
// Only available in server components, API routes, and server actions
const apiSecret = process.env.API_SECRET;
```

## Available Variables

### App Configuration

| Variable               | Type   | Description      | Default               |
| ---------------------- | ------ | ---------------- | --------------------- |
| `NEXT_PUBLIC_APP_NAME` | Public | Application name | Image Optimiser       |
| `NEXT_PUBLIC_APP_URL`  | Public | Application URL  | http://localhost:3000 |

### API Configuration

| Variable                    | Type   | Description            | Default         |
| --------------------------- | ------ | ---------------------- | --------------- |
| `NEXT_PUBLIC_API_URL`       | Public | API base URL           | /api            |
| `NEXT_PUBLIC_MAX_FILE_SIZE` | Public | Max file size in bytes | 10485760 (10MB) |
| `NEXT_PUBLIC_MAX_FILES`     | Public | Max files per upload   | 10              |

### Server Configuration

| Variable         | Type    | Description                       | Required |
| ---------------- | ------- | --------------------------------- | -------- |
| `API_SECRET`     | Private | API authentication secret         | Yes      |
| `ENCRYPTION_KEY` | Private | Encryption key for sensitive data | Yes      |

### Image Processing

| Variable           | Type    | Description                 | Default |
| ------------------ | ------- | --------------------------- | ------- |
| `MAX_IMAGE_WIDTH`  | Private | Maximum image width         | 4096    |
| `MAX_IMAGE_HEIGHT` | Private | Maximum image height        | 4096    |
| `DEFAULT_QUALITY`  | Private | Default compression quality | 80      |

### Feature Flags

| Variable                              | Type   | Description                   | Default |
| ------------------------------------- | ------ | ----------------------------- | ------- |
| `NEXT_PUBLIC_ENABLE_ANALYTICS`        | Public | Enable analytics tracking     | false   |
| `NEXT_PUBLIC_ENABLE_BATCH_PROCESSING` | Public | Enable batch image processing | true    |

## Usage Examples

### Using Environment Variables Directly

```typescript
// In a server component or API route
const apiSecret = process.env.API_SECRET;

// In any component (client or server)
const appName = process.env.NEXT_PUBLIC_APP_NAME;
```

### Using the Utility Functions (Recommended)

```typescript
import { getEnv, getEnvAsNumber, getEnvAsBoolean } from "@/lib/utils/env";

// Get a string value with fallback
const apiUrl = getEnv("NEXT_PUBLIC_API_URL", "/api");

// Get a number value
const maxFileSize = getEnvAsNumber("NEXT_PUBLIC_MAX_FILE_SIZE", 10485760);

// Get a boolean value
const enableAnalytics = getEnvAsBoolean("NEXT_PUBLIC_ENABLE_ANALYTICS", false);
```

### Using Typed Configuration (Recommended)

```typescript
import { getPublicEnv, getServerConfig } from "@/lib/utils/env";

// Client-side configuration
const config = getPublicEnv();
console.log(config.appName, config.maxFileSize);

// Server-side configuration (API routes only)
const serverConfig = getServerConfig();
console.log(serverConfig.apiSecret);
```

## Type Safety

TypeScript definitions are provided in `types/env.d.ts` for autocomplete and type checking:

```typescript
// TypeScript knows about all environment variables
const apiUrl: string = process.env.NEXT_PUBLIC_API_URL; // ✓ Type-safe
```

## Best Practices

### 1. Never Commit Secrets

- Always use `.env.local` for local secrets
- Never commit `.env.local`, `.env.development`, or `.env.production`
- Use `.env.example` as a template

### 2. Use Appropriate Variable Types

```typescript
// ✓ Good - Public URL
NEXT_PUBLIC_API_URL=/api

// ✗ Bad - Secret exposed to browser
NEXT_PUBLIC_API_SECRET=secret123
```

### 3. Provide Defaults

```typescript
// ✓ Good - Has fallback
const timeout = getEnvAsNumber("API_TIMEOUT", 5000);

// ✗ Bad - Will throw if not set
const timeout = getEnvAsNumber("API_TIMEOUT");
```

### 4. Validate Required Variables

```typescript
// In your API route or server component
import { getRequiredEnv } from "@/lib/utils/env";

// Will throw error if not set
const apiSecret = getRequiredEnv("API_SECRET");
```

### 5. Document New Variables

When adding new environment variables:

1. Add to `.env.example`
2. Add type definition to `types/env.d.ts`
3. Document in this file (ENV.md)
4. Add to utility functions if needed

## Environment Loading Order

Next.js loads environment variables in this order (highest priority first):

1. `.env.local` (always, all environments)
2. `.env.development` or `.env.production` (depending on NODE_ENV)
3. `.env`

## Troubleshooting

### Variables Not Loading

1. **Restart the dev server** - Environment variables are loaded at build time

   ```bash
   npm run dev
   ```

2. **Check the variable name** - Must use exact case

   ```typescript
   // ✗ Wrong
   process.env.api_url;

   // ✓ Correct
   process.env.NEXT_PUBLIC_API_URL;
   ```

3. **Check the prefix** - Client-side requires `NEXT_PUBLIC_`

   ```typescript
   // ✗ Won't work in client components
   process.env.API_SECRET;

   // ✓ Works in client components
   process.env.NEXT_PUBLIC_API_URL;
   ```

### TypeScript Errors

If TypeScript doesn't recognize environment variables:

1. Check `types/env.d.ts` includes the variable
2. Restart the TypeScript server in VS Code:
   - `Cmd + Shift + P` → "TypeScript: Restart TS Server"

## Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets in `NEXT_PUBLIC_` variables
- [ ] Production secrets stored in deployment platform
- [ ] API secrets are long and random
- [ ] `.env.example` has no real secrets

## References

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
