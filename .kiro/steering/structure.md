---
inclusion: always
---

# SignatureCraft MVP Project Structure & Organization

## Required Directory Structure
```
signaturecraft-mvp/
├── .kiro/                    # Kiro AI configuration
│   ├── specs/signaturecraft-saas/  # Project specifications
│   └── steering/             # Development guidelines
├── docs/                     # Project documentation
│   ├── proposal.md           # MVP proposal and business case
│   ├── requirements.md       # Technical requirements
│   ├── project-charter.md    # Project authorization
│   └── checklist.md          # Development checklist
├── src/                      # Source code
│   ├── app/                  # Next.js App Router pages
│   │   ├── (auth)/          # Authentication pages group
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── reset-password/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── builder/page.tsx
│   │   ├── export/page.tsx
│   │   ├── api/auth/[...all]/route.ts  # Better Auth handler
│   │   ├── api/signatures/route.ts
│   │   ├── api/export/[id]/route.ts
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Landing page
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── ui/              # ShadCN UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── container.tsx
│   │   ├── auth/            # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ResetPasswordForm.tsx
│   │   ├── signature/       # Signature builder components
│   │   │   ├── SignatureBuilder.tsx
│   │   │   ├── SignaturePreview.tsx
│   │   │   ├── TemplateSelector.tsx
│   │   │   ├── FormFields.tsx
│   │   │   └── LogoUpload.tsx
│   │   ├── export/          # Export components
│   │   │   ├── ExportPanel.tsx
│   │   │   └── InstallationGuide.tsx
│   │   └── layout/          # Layout components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Container.tsx
│   ├── lib/                 # Utilities and configuration
│   │   ├── auth/            # Authentication configuration
│   │   │   └── auth.ts      # Better Auth server configuration
│   │   ├── db.ts            # Database connection
│   │   ├── schema.ts        # Drizzle schema
│   │   ├── auth-client.ts   # Client-side auth
│   │   └── utils.ts         # Utility functions
│   └── constants.ts         # Application constants
├── public/                  # Static assets
│   ├── logo.svg            # Light theme logo
│   ├── logo-dark.svg       # Dark theme logo
│   └── icon.svg            # Favicon
├── package.json            # Dependencies and scripts
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
├── drizzle.config.ts       # Drizzle ORM configuration
└── tsconfig.json           # TypeScript configuration
```

## File Naming Conventions
- **Pages**: Use `page.tsx` for App Router pages
- **Components**: PascalCase for component files (e.g., `SignatureBuilder.tsx`)
- **Utilities**: kebab-case for utility files (e.g., `auth-client.ts`)
- **API Routes**: Use `route.ts` for App Router API endpoints
- **Types**: Use `.types.ts` suffix for type definition files

## Import Path Rules
- **Absolute Imports**: Always use `@/` alias for src directory
- **Component Imports**: `import { Button } from "@/components/ui/button"`
- **Utility Imports**: `import { cn } from "@/lib/utils"`
- **Auth Imports**: `import { auth } from "@/lib/auth/auth"`
- **Constants**: `import { TEMPLATES } from "@/constants"`

## Component Organization Principles

### Authentication Components
```typescript
// Login form with Better Auth integration
import { authClient } from "@/lib/auth-client"

export function LoginForm() {
  const handleLogin = async (data) => {
    await authClient.signIn.email(data)
  }
}
```

### Signature Builder Components
```typescript
// Form-based builder (not drag-and-drop)
export function SignatureBuilder() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <FormFields />      {/* Left: Form inputs */}
      <SignaturePreview /> {/* Center: Live preview */}
      <TemplateSelector /> {/* Right: Template options */}
    </div>
  )
}
```

### Database Schema Location
```typescript
// src/lib/schema.ts - Drizzle schema with Better Auth integration
import { pgTable, uuid, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
  // ... other Better Auth fields
})

export const signatures = pgTable('signatures', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  // ... other signature fields
})
```

## API Route Structure
```typescript
// src/app/api/signatures/route.ts
import { auth } from "@/lib/auth/auth"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers
  })
  // Handle GET request
}

export async function POST(request: NextRequest) {
  // Handle POST request
}
```

## Asset Management
- **Logos**: Store in `/public/` for direct access
- **Icons**: Use Lucide React icons or store in `/public/`
- **Images**: Process client-side with Canvas API, store as base64
- **Fonts**: Use Next.js font optimization

## Configuration Files
- **Environment**: `.env.local` for local development
- **TypeScript**: Strict mode enabled in `tsconfig.json`
- **Tailwind**: Custom configuration in `tailwind.config.ts`
- **Drizzle**: Database configuration in `drizzle.config.ts`