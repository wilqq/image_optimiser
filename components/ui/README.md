# UI Components

Generic, reusable UI components that can be used throughout the application.

## Guidelines

- Keep components small and focused
- Make them highly reusable
- Avoid hardcoded business logic
- Use TypeScript for props typing
- Include proper accessibility attributes

## Example Structure

```typescript
// Button.tsx
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  // Component implementation
}
```
