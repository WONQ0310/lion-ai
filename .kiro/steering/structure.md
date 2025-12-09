# Project Structure

## Directory Organization

```
/app                    # Next.js App Router pages and layouts
  layout.tsx           # Root layout with global styles
  page.tsx             # Home page
  globals.css          # Global CSS and Tailwind directives

/components            # React components
  /ui                  # Reusable UI primitives (shadcn/ui style)
    avatar.tsx
    badge.tsx
    button.tsx
    card.tsx
    separator.tsx
  Header.tsx           # Profile header component
  Profile.tsx          # Biography and expertise sections
  Links.tsx            # External links component
  *.test.tsx           # Component unit tests
  *.integration.test.tsx # Integration tests

/types                 # TypeScript type definitions
  profile.ts           # ProfileData, CompanyInfo, ExternalLink, etc.

/data                  # Static data files
  profileData.ts       # Profile content and configuration

/lib                   # Utility functions
  utils.ts             # cn() helper for className merging

/public               # Static assets
  /images             # Image files (profile photos, etc.)

/.kiro                # Kiro IDE configuration
  /steering           # AI assistant guidance documents
  /specs              # Feature specifications

/out                  # Build output (static export, gitignored)
/.next                # Next.js build cache (gitignored)
```

## Conventions

### File Naming
- React components: PascalCase (e.g., `Header.tsx`, `Profile.tsx`)
- Test files: `ComponentName.test.tsx` or `ComponentName.integration.test.tsx`
- Utilities and data: camelCase (e.g., `utils.ts`, `profileData.ts`)
- Types: camelCase (e.g., `profile.ts`)

### Import Paths
- Use `@/` alias for absolute imports from project root
- Example: `import { cn } from "@/lib/utils"`
- Example: `import { ProfileData } from "@/types/profile"`

### Component Structure
- Functional components with TypeScript interfaces for props
- Props interface named `ComponentNameProps`
- Export components as named exports: `export function ComponentName()`

### Styling
- Use Tailwind utility classes
- Use `cn()` helper from `@/lib/utils` for conditional classes
- Custom colors defined in `tailwind.config.ts`: primary, secondary, accent, text, background, surface
- Responsive breakpoints: mobile (0px), tablet (768px), desktop (1024px)

### Testing
- Tests colocated with components in `/components` directory
- Use Vitest with React Testing Library
- Test structure: `describe` blocks for grouping, `it` for individual tests
- Mock data defined within test files
- Tests written in Japanese when testing Japanese content

### Type Safety
- Strict TypeScript mode enabled
- All components have typed props
- Shared types in `/types` directory
- No implicit any types
