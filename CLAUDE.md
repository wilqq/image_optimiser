# Claude Code Instructions for image_optimiser

## Code Review Guidelines

Based on developer feedback and project preferences, follow these guidelines when reviewing code and writing new code.

---

## 🚫 Critical Rules - DO NOT

### 1. Documentation Files
**NEVER create separate documentation files for individual components.**

❌ **Don't do this:**
```
docs/
  ├── component-name.md
  ├── another-component.md
  └── utility-function.md
```

✅ **Instead:**
- Keep component documentation in JSDoc/TSDoc comments within the code (brief)
- Use README.md files only at the project root or major feature directories
- Rely on self-documenting code with clear naming

### 2. Code Comments
**DO NOT comment obvious or self-explanatory code.**

❌ **Don't do this:**
```typescript
/**
 * Format bytes to human-readable string
 */
export function formatFileSize(bytes: number): string { }

/**
 * Get file extension from filename
 */
export function getFileExtension(fileName: string): string { }

/**
 * Check if file type is supported
 */
export function isSupportedImageType(type: string): boolean { }
```

❌ **Don't do this:**
```typescript
interface ImageMetadata {
  /** Original file name */
  fileName: string;
  /** File size in bytes */
  fileSize: number;
  /** Image width in pixels */
  width: number;
}
```

✅ **Only comment when:**
1. The logic is complex or non-obvious
2. There's a specific business rule or edge case
3. Explaining WHY something is done a certain way (not WHAT it does)
4. Documenting workarounds or known limitations

✅ **Good example:**
```typescript
// Use lazy getters to prevent eager evaluation in production
// which would cause client-side import failures for server-only env vars
export const serverConfig = {
  get apiSecret() { return getServerConfig().apiSecret; },
  get encryptionKey() { return getServerConfig().encryptionKey; },
};
```

### 3. Documentation Length
**Keep documentation concise and practical.**

- No 400+ line documentation files for simple components
- Focus on essential usage examples and configuration
- Assume developers can read the code

---

## ✅ Code Review Priorities

### Focus on Real Issues

1. **Bugs and Logic Errors**
   - Client/server boundary issues (e.g., eager evaluation in production)
   - Runtime errors and edge cases
   - Type safety violations
   - Memory leaks or performance issues

2. **Security Vulnerabilities**
   - Injection vulnerabilities (XSS, SQL injection, etc.)
   - Authentication/authorization issues
   - Exposed secrets or sensitive data
   - Insecure dependencies

3. **Architecture Problems**
   - Incorrect separation of concerns
   - Tight coupling
   - Violation of project patterns
   - Breaking changes without migration path

4. **Performance Issues**
   - Inefficient algorithms
   - Unnecessary re-renders (React)
   - Large bundle sizes
   - N+1 queries or excessive API calls

---

## 📝 Code Style Preferences

### Naming and Self-Documentation
- Prefer clear, descriptive names over comments
- Use TypeScript types to document intent
- Function names should explain what they do

### TypeScript
- Use strict TypeScript
- Avoid `any` types
- Prefer interfaces for public APIs
- Use enums for fixed sets of values

### React/Next.js Specific
- Client-side vs server-side code separation
- Proper use of `NEXT_PUBLIC_` prefix for client-exposed env vars
- Lazy evaluation for server-only configurations

---

## 🎯 Review Output Format

When conducting code reviews:

1. **Start with overall assessment**
   - "No issues found" if clean
   - Brief summary if issues exist

2. **Report actual issues only**
   - Focus on bugs, security, architecture
   - Skip style nitpicks unless they cause real problems
   - Don't complain about missing comments on obvious code
   - Don't suggest adding documentation files

3. **Provide actionable fixes**
   - Show the problematic code
   - Explain WHY it's a problem
   - Provide a concrete solution with code example

4. **Use clear severity levels**
   - 🔴 **Critical**: Security vulnerabilities, production-breaking bugs
   - 🟡 **Important**: Logic errors, potential bugs, performance issues
   - 🔵 **Minor**: Small improvements, consistency issues

---

## Example Good Review

```markdown
## Code review

### 🔴 Bug in lib/config.ts

**Issue:** Client-side import failure in production mode

In production mode, `getServerConfig()` is called eagerly at module initialization
time (line 41). Since this module exports `publicConfig` that client components may
import, any client-side import will fail because `getServerConfig()` calls
`getRequiredEnv('API_SECRET')` and `getRequiredEnv('ENCRYPTION_KEY')`, which throw
errors when these server-only environment variables are not available in the browser.

**Location:** lib/config.ts#L21-L41

**Fix:** Use lazy getters in both development and production:

\`\`\`typescript
export const serverConfig = {
  get apiSecret() { return getServerConfig().apiSecret; },
  get encryptionKey() { return getServerConfig().encryptionKey; },
  get image() { return getServerConfig().image; },
  get storage() { return getServerConfig().storage; },
};
\`\`\`
```

---

## Example Bad Review

❌ **Don't do this:**

```markdown
## Code review

### Suggestion: Add JSDoc comments

Please add JSDoc comments to all functions in image-validation.ts
for better documentation.

### Suggestion: Create documentation

Consider creating a docs/image-validation.md file to document
the validation utilities.

### Minor: Add comments

The formatFileSize function should have a comment explaining
what it does.
```

---

## Summary

**In short:**
- 🎯 Focus on bugs, security, and architecture
- 🚫 Don't create documentation files for components
- 🚫 Don't comment obvious code
- ✅ Keep it simple and practical
- ✅ Trust developers to read self-documenting code

**Remember:** Less is more. Code should be clean and self-explanatory.
Comments and documentation are for complex/non-obvious scenarios only.
