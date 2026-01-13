# Components

This directory contains all React components organized by their purpose.

## Structure

### `/ui`

Reusable UI components (buttons, inputs, cards, modals, etc.)

- Should be generic and composable
- No business logic
- Examples: Button, Input, Card, Modal, Dropdown

### `/features`

Feature-specific components

- Contains business logic
- May use UI components
- Examples: ImageUploader, ImagePreview, OptimizationSettings

### `/layout`

Layout components used across multiple pages

- Header, Footer, Sidebar, Navigation
- Page wrappers and containers

## Naming Convention

- Use PascalCase for component files: `Button.tsx`
- One component per file
- Export as default or named export
