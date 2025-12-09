# Tech Stack

## Framework & Runtime

- **Next.js 15** (App Router) with static export mode
- **React 19** with TypeScript
- **Node.js** (ES2017 target)

## Styling

- **Tailwind CSS** for utility-first styling
- **Radix UI** components for accessible primitives
- **class-variance-authority** and **clsx** for conditional styling
- **tailwind-merge** via `cn()` utility in `lib/utils.ts`

## UI Component Library

- Radix UI primitives: Avatar, Separator, Slot
- **lucide-react** for icons
- Custom shadcn/ui-style components in `components/ui/`

## Testing

- **Vitest** as test runner
- **@testing-library/react** for component testing
- **jsdom** for DOM environment
- **@testing-library/jest-dom** for assertions

## Build & Development

- **TypeScript** with strict mode enabled
- Path alias `@/*` maps to project root
- Static export configured for GitHub Pages (no image optimization)

## Common Commands

```bash
# Development
npm run dev          # Start Next.js dev server

# Build & Deploy
npm run build        # Build static export to /out directory
npm start            # Start production server (not used for static export)

# Code Quality
npm run lint         # Run ESLint

# Testing
npm run test         # Run Vitest tests (single run, no watch mode)
```

## Configuration Files

- `next.config.js` - Static export and image settings
- `tailwind.config.ts` - Custom colors and breakpoints
- `tsconfig.json` - TypeScript with path aliases
- `vitest.config.ts` - Test environment and setup
- `components.json` - shadcn/ui configuration
