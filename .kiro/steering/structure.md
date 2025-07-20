---
inclusion: always
---

# SignatureCraft MVP Project Structure & Organization

## Current Directory Structure (✅ IMPLEMENTED)
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
│   │   ├── (auth)/          # ✅ Authentication pages group
│   │   │   ├── login/page.tsx        # ✅ Login page
│   │   │   ├── register/page.tsx     # ✅ Register page
│   │   │   ├── reset-password/page.tsx # ✅ Password reset
│   │   │   └── layout.tsx            # ✅ Auth layout
│   │   ├── api/auth/[...all]/route.ts  # ✅ Better Auth handler
│   │   ├── layout.tsx        # ✅ Root layout with theme provider
│   │   ├── page.tsx          # ✅ Landing page with hero/features
│   │   └── globals.css       # ✅ Global styles
│   ├── components/           # React components
│   │   ├── ui/              # ✅ ShadCN UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── container.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── label.tsx
│   │   │   ├── separator.tsx
│   │   │   └── tabs.tsx
│   │   ├── auth/            # ✅ Authentication components
│   │   │   ├── LoginForm.tsx         # ✅ Login form with validation
│   │   │   ├── RegisterForm.tsx      # ✅ Registration form
│   │   │   └── ResetPasswordForm.tsx # ✅ Password reset form
│   │   ├── ✅ hero-section.tsx       # Landing page hero
│   │   ├── ✅ features-section.tsx   # Features showcase
│   │   ├── ✅ pricing-section.tsx    # Pricing display
│   │   ├── ✅ testimonials-section.tsx # User testimonials
│   │   ├── ✅ faq-section.tsx        # FAQ accordion
│   │   ├── ✅ header.tsx             # Site header with navigation
│   │   ├── ✅ footer.tsx             # Site footer
│   │   ├── ✅ theme-provider.tsx     # Dark/light theme support
│   │   ├── ✅ theme-toggle.tsx       # Theme switcher
│   │   └── ✅ newsletter-signup.tsx  # Newsletter component
│   ├── lib/                 # ✅ Utilities and configuration
│   │   ├── auth.ts          # ✅ Better Auth server configuration
│   │   ├── auth-client.ts   # ✅ Better Auth client configuration
│   │   ├── db.ts            # ✅ NeonDB connection
│   │   └── schema.ts        # ✅ Drizzle schema with Better Auth tables
│   ├── ✅ constant.ts       # Application constants
│   └── ✅ middleware.ts     # Route protection middleware
├── emails/                  # ✅ React Email templates
│   ├── components/          # Email components
│   ├── password-reset.tsx   # Password reset email
│   ├── subscription-update.tsx # Subscription emails
│   ├── team-invitation.tsx  # Team invitation email
│   └── welcome.tsx          # Welcome email
├── migrations/              # ✅ Database migrations
│   ├── 0000_lethal_sasquatch.sql # Initial schema
│   └── meta/                # Migration metadata
├── public/                  # ✅ Static assets
│   ├── logo.svg            # Light theme logo
│   ├── logo-dark.svg       # Dark theme logo
│   └── icon.svg            # Favicon
├── ✅ package.json         # Dependencies and scripts
├── ✅ next.config.ts       # Next.js configuration
├── ✅ tailwind.config.ts   # Tailwind configuration
├── ✅ drizzle.config.ts    # Drizzle ORM configuration
├── ✅ tsconfig.json        # TypeScript configuration
├── ✅ components.json      # ShadCN UI configuration
└── ✅ .env                 # Environment variables

## ✅ COMPLETED IMPLEMENTATION
├── src/app/dashboard/page.tsx      # ✅ User dashboard
├── src/app/builder/page.tsx        # ✅ Signature builder
├── src/app/settings/page.tsx       # ✅ User settings page
├── src/app/api/signatures/route.ts # ✅ Signature API
├── src/app/api/user/profile/route.ts # ✅ User profile API
├── src/app/api/user/password/route.ts # ✅ Password change API
├── src/components/signature/       # ✅ Signature builder components
│   ├── SignatureBuilder.tsx       # ✅ Main builder interface
│   ├── SignaturePreview.tsx       # ✅ Real-time preview with export
│   ├── TemplateSelector.tsx       # ✅ Template selection
│   ├── FormFields.tsx             # ✅ Contact info form
│   ├── LogoUpload.tsx             # ✅ Logo upload with drag-and-drop
│   └── BrandColors.tsx            # ✅ Color customization

## 🚧 PENDING IMPLEMENTATION (PHASE 3)
├── src/app/export/page.tsx         # Dedicated export page with comprehensive guides
├── src/app/api/export/[id]/route.ts # Export API endpoints (HTML, Outlook, text, download)
├── src/app/api/signatures/[id]/route.ts # Update and delete signature endpoints
└── src/components/export/          # Export components
    ├── ExportPanel.tsx             # Enhanced export panel with advanced options
    └── InstallationGuide.tsx       # Step-by-step installation guides with screenshots
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