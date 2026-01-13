# Project Structure

This document outlines the folder structure and organization of the Image Optimizer project.

## Overview

```
image_optimiser/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── features/         # Feature-specific components
│   └── layout/           # Layout components
├── lib/                   # Shared utilities and hooks
│   ├── utils/            # Utility functions
│   └── hooks/            # Custom React hooks
├── types/                 # TypeScript type definitions
├── public/                # Static assets
├── docs/                  # Documentation
└── [config files]         # Configuration files
```

## Directory Descriptions

### `/app` - Next.js App Router

The main application directory using Next.js 13+ App Router.

- **`/api`** - API route handlers (RESTful endpoints)
- **`layout.tsx`** - Root layout wrapping all pages
- **`page.tsx`** - Homepage component
- **Nested routes** - Create folders for additional pages

### `/components` - React Components

All React components organized by purpose:

- **`/ui`** - Generic, reusable UI components (Button, Input, Card, etc.)
- **`/features`** - Feature-specific components with business logic
- **`/layout`** - Layout components (Header, Footer, Sidebar, etc.)

### `/lib` - Shared Code

Utility functions and custom hooks:

- **`/utils`** - Pure utility functions (formatters, validators, helpers)
- **`/hooks`** - Custom React hooks (useFileUpload, useDebounce, etc.)

### `/types` - TypeScript Types

Global TypeScript type definitions and interfaces shared across the project.

### `/public` - Static Assets

Static files served directly (images, icons, fonts, etc.)

### `/docs` - Documentation

Project documentation, requirements, and specifications.

## Import Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
// Instead of: import Button from "../../../../components/ui/Button"
import Button from "@/components/ui/Button";

// Available aliases:
import Component from "@/components/*";
import { utility } from "@/lib/*";
import type { Type } from "@/types/*";
import Page from "@/app/*";
```

## Naming Conventions

### Files

- **Components**: PascalCase (e.g., `Button.tsx`, `ImageUploader.tsx`)
- **Utilities**: camelCase (e.g., `formatFileSize.ts`, `imageUtils.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useFileUpload.ts`)
- **Types**: camelCase (e.g., `image.ts`, `api.ts`)

### Code

- **Components**: PascalCase
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Interfaces/Types**: PascalCase

## Best Practices

1. **Keep components small** - Each component should have a single responsibility
2. **Colocate related files** - Keep tests, styles, and components together when appropriate
3. **Use barrel exports** - Export multiple items from `index.ts` files
4. **Type everything** - Leverage TypeScript for type safety
5. **Document complex logic** - Add JSDoc comments for complex functions
6. **Test utilities** - Write unit tests for utility functions
7. **Keep business logic out of UI components** - Use feature components or hooks

## Adding New Features

When adding a new feature, consider:

1. Create feature components in `/components/features`
2. Add utility functions in `/lib/utils`
3. Create custom hooks in `/lib/hooks` for reusable logic
4. Define types in `/types`
5. Add API routes in `/app/api` if needed
6. Create pages in `/app` following the App Router convention

## Example Component Structure

```typescript
// components/features/ImageUploader.tsx
import { useState } from "react";
import Button from "@/components/ui/Button";
import { useFileUpload } from "@/lib/hooks/useFileUpload";
import type { ImageFile } from "@/types";

export default function ImageUploader() {
  const { files, addFiles, removeFile } = useFileUpload();

  // Component logic

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

## Configuration Files

- **`next.config.ts`** - Next.js configuration
- **`tsconfig.json`** - TypeScript configuration
- **`eslint.config.mjs`** - ESLint configuration
- **`.prettierrc`** - Prettier configuration
- **`tailwind.config.ts`** - Tailwind CSS configuration (if using)
- **`package.json`** - NPM dependencies and scripts

## Environment Variables

Environment variables should be defined in:

- `.env.local` - Local development (not committed)
- `.env.development` - Development environment
- `.env.production` - Production environment

Access in code:

```typescript
// Client-side (prefix with NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Server-side
const secret = process.env.API_SECRET;
```
