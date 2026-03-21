# AGENTS.md

This document provides guidelines for AI agents working in this codebase.

## Project Overview

This is a **Next.js 16** application (App Router, **Turbopack** in dev) with **TypeScript**, **React 19**, **Tailwind CSS v4**, **Convex** (backend), and **Clerk** (authentication).

UI primitives come from **shadcn/ui** using the **base-nova** style and **Base UI** (`@base-ui/react`)—**not Radix UI**. Toasts use **Sonner** (`~/components/ui/sonner`). Global styles live in **`src/styles/globals.css`** (`@import "tailwindcss"`, `tw-animate-css`, and `shadcn/tailwind.css` from the `shadcn` package).

## Build Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Development server with Turbopack
pnpm dev

# Convex dev server (separate terminal)
pnpm convex

# Next + Convex together
pnpm dev:all

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
- Prefer **function components** and match patterns in `src/components/ui` (many shadcn v4 + Base UI components use **`data-slot`** and do not use `forwardRef`)
- Use **`React.forwardRef`** only when a component must expose an imperative ref API; set **`displayName`** when you use `forwardRef`
- Use functional components with typed props
- Prefer composition over prop drilling

### File Structure

```
src/
├── actions/        # Server actions and related types
├── app/            # Next.js App Router pages
├── components/     # React components
│   └── ui/         # shadcn/ui (Base UI) components
├── hooks/          # Custom React hooks (add files as needed)
├── lib/            # Utilities (utils.ts)
└── styles/         # Global CSS (Tailwind v4 entry + theme)
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
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
```

### Tailwind CSS

- **Tailwind v4**: Theme tokens and `@theme inline` live in **`src/styles/globals.css`** (no `tailwind.config.ts`)
- **PostCSS**: `@tailwindcss/postcss` in `postcss.config.js`
- Use shadcn/ui component patterns from this repo (**Base UI** primitives)
- Use `cn()` utility for conditional classes
- Use `class-variance-authority` for component variants

### Base UI + shadcn patterns

- Install/update UI with **`pnpm dlx shadcn@latest add <component> -y`** (see [`components.json`](components.json) for style **`base-nova`** and aliases)
- **Menus / dropdowns**: prefer **`DropdownMenuTrigger`**’s **`render`** prop to attach to a **`Button`**—do not use Radix’s **`asChild`**
- **Forms**: `FormControl` merges a11y props onto its child via **`mergeProps`** from **`@base-ui/react/merge-props`**
- **Links styled as buttons**: use **`buttonVariants`** with a native **`<a>`** (see shadcn Base UI button docs)

### Error Handling

- Use `try/catch` for async operations
- Throw descriptive `Error` objects with messages
- Handle null/undefined with proper checks
- Use TypeScript narrowing for type guards

### Convex Backend

- Use `query` for read operations
- Use `mutation` for write operations
- Use `v` validator from `convex/values`

### ESLint Rules

Key rules enforced in **`eslint.config.mjs`** (TypeScript + TSX):

- **`react-compiler/react-compiler`**: error
- **`react-hooks`**: recommended rules from `eslint-plugin-react-hooks`
- **`@typescript-eslint/consistent-type-imports`**: warn (inline type imports)
- **`@typescript-eslint/no-unused-vars`**: warn (allow `_` prefixed)
- **`@typescript-eslint/no-misused-promises`**: error (with `attributes: false` for void-return checks)

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

### Toasts (Sonner)

```tsx
import { toast } from "sonner"
import { Toaster } from "~/components/ui/sonner"
// Render <Toaster /> once in the root layout (already wired)
```
