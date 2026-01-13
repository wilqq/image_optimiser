# Library (lib)

Shared utility functions, helpers, and custom hooks used across the application.

## Structure

### `/utils`

Pure utility functions and helpers

- No React dependencies
- Testable, pure functions
- Examples: formatters, validators, converters

### `/hooks`

Custom React hooks

- Reusable React logic
- Follow hooks naming convention (use\*)
- Examples: useImageOptimization, useFileUpload, useDebounce

## Guidelines

- Keep functions small and focused
- Write unit tests for utilities
- Use TypeScript for type safety
- Document complex functions with JSDoc comments
