# AGENTS.md

This document provides guidelines for AI agents working in this codebase.

## Project Overview

This is a Next.js 15 application with TypeScript, Tailwind CSS, Convex (database), and Clerk (authentication).

## Build Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Development server with Turbopack
pnpm dev

# Production build
pnpm build

# Preview production build locally
pnpm preview

# Start production server
pnpm start
```

## Linting & Type Checking

```bash
# Run ESLint
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# TypeScript type checking
pnpm typecheck

# Run both lint and typecheck
pnpm check

# Format code with Prettier (auto-fixes)
pnpm format:write

# Check formatting without fixing
pnpm format:check
```

## Code Style Guidelines

### TypeScript

- **Strict mode enabled**: All TypeScript strict checks are enforced
- **NoUncheckedIndexedAccess**: Arrays and objects require proper bounds checking
- **Use inline type imports**: Prefer `import type { Foo }` or `import { type Foo }` over separate imports
- **Avoid `any`**: Use `unknown` for truly unknown types
- **Path aliases**: Use `~/` to reference `src/` directory (e.g., `~/components/ui/button`)
- **Unused variables**: Prefix with `_` if intentionally unused (e.g., `handler: async (ctx, { id }) =>`)

### React Components

- Use `"use client"` directive for client-side components
- Use `React.forwardRef` for components that need ref forwarding
- Set `displayName` for all forwardRef components
- Use functional components with typed props
- Prefer composition over prop drilling

### File Structure

```
src/
├── actions/        # Server actions
├── app/            # Next.js App Router pages
├── components/     # React components
│   └── ui/         # shadcn/ui components
├── hooks/          # Custom React hooks
├── lib/            # Utilities (utils.ts)
└── styles/         # Global CSS
convex/             # Convex backend
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Tasks.tsx`, `CardHeader.tsx`)
- **Files**: kebab-case for utilities, PascalCase for components
- **Functions/variables**: camelCase
- **Types/interfaces**: PascalCase (e.g., `interface ButtonProps`)
- **CSS classes**: kebab-case (Tailwind utilities)
- **Constants**: SCREAMING_SNAKE_CASE

### Imports

1. React imports first (`import * as React from "react"`)
2. External libraries
3. Internal components/utilities (use `~/` path alias)
4. Relative imports

Example:
```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
```

### Tailwind CSS

- Use shadcn/ui component patterns
- Use CSS variables for colors (defined in `tailwind.config.ts`)
- Use `cn()` utility for conditional classes
- Use `class-variance-authority` for component variants

### Error Handling

- Use `try/catch` for async operations
- Throw descriptive `Error` objects with messages
- Handle null/undefined with proper checks
- Use TypeScript narrowing for type guards

### Convex Backend

- Use `query` for read operations
- Use `mutation` for write operations
- Use `v` validator from `convex/values`
- Enforce delete/update with where clauses via ESLint rules

### ESLint Rules

Key rules enforced:
- `react-compiler/react-compiler`: error (use React compiler optimizations)
- `drizzle/enforce-delete-with-where`: error (no direct deletes)
- `drizzle/enforce-update-with-where`: error (no direct updates)
- `@typescript-eslint/consistent-type-imports`: warn (inline type imports)
- `@typescript-eslint/no-unused-vars`: warn (allow `_` prefixed)

### Environment Variables

- Server variables: defined in `server:` in `src/env.js`
- Client variables: prefix with `NEXT_PUBLIC_` in `client:`
- Use Zod for validation
- Skip validation with `SKIP_ENV_VALIDATION=true`

## Useful Patterns

### Client Component with Loading State
```tsx
const isLoading = data === undefined
if (isLoading) return <Skeleton />
```

### Type-Safe Form Handling
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
```

### Conditional Class Merging
```tsx
import { cn } from "~/lib/utils"
const classes = cn(baseClass, condition && conditionalClass)
```
