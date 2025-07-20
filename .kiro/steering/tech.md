---
inclusion: always
---

# SignatureCraft MVP Technology Stack & Development Guidelines

## Core Stack (MVP Requirements)
- **Next.js**: 15 with App Router (strict requirement)
- **React**: 19.1.0 with TypeScript strict mode
- **Database**: NeonDB PostgreSQL (serverless)
- **Authentication**: Better Auth with Drizzle adapter
- **ORM**: Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS + ShadCN UI components
- **Hosting**: Vercel (frontend + serverless functions)
- **Package Manager**: pnpm (never use npm or yarn)

## Development Commands
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm start

# Run linting
pnpm lint
```

## MVP Architecture Decisions
- **Image Storage**: Base64 in database (no separate file storage service) ✅ IMPLEMENTED
- **Email Integration**: Copy-paste signatures (no email service needed) ✅ IMPLEMENTED
- **User Model**: Single user only (no team features) ✅ IMPLEMENTED
- **Payment**: Validation phase only (no payment processing) ✅ IMPLEMENTED
- **Analytics**: Basic only (focus on core functionality) ✅ IMPLEMENTED

## Current Implementation Status (✅ PHASE 1 & 2 COMPLETED)
- **Authentication System**: Better Auth 1.3.0 with email/password, session management, and route protection
- **User Dashboard**: Complete dashboard with signature management, edit/delete functionality, and "Create New Signature" CTA
- **Signature Builder**: Full responsive builder with mobile-optimized tabbed interface and comprehensive state management
- **Template System**: Three professional templates (Classic, Modern, Minimal) with visual previews and seamless switching
- **Logo Upload**: Drag-and-drop with Canvas API resizing, base64 storage, validation, and error handling
- **Brand Colors**: Primary and secondary color customization with picker interface integrated with all templates
- **Export System**: Copy-to-clipboard functionality for Gmail, Outlook, and HTML with success notifications and quick setup instructions
- **API Endpoints**: Complete signature management (GET, POST, DELETE) and user profile APIs with Better Auth integration
- **Settings Page**: User profile management and password change functionality with comprehensive validation
- **Real-time Preview**: Desktop/mobile preview modes with email client compatibility and integrated export functionality

## Authentication Setup (Better Auth) - ✅ IMPLEMENTED
```typescript
// Current Better Auth configuration in src/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // MVP: Skip verification
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});
```

## Database Schema (✅ IMPLEMENTED)
Current Drizzle schema in `src/lib/schema.ts`:

```typescript
// Users table (Better Auth compatible)
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// Sessions table (Better Auth)
export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

// Accounts table (Better Auth)
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Verifications table (Better Auth)
export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

// Signatures table  
export const signatures = pgTable("signatures", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  title: varchar("title", { length: 100 }),
  company: varchar("company", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  website: varchar("website", { length: 255 }),
  logoData: text("logo_data"), // Base64 encoded
  templateId: varchar("template_id", { length: 20 }).default("classic"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

## Form Handling Standards
- **Validation**: React Hook Form + Zod (required)
- **Image Processing**: Client-side Canvas API for logo resizing
- **File Limits**: 2MB max, PNG/JPG/SVG only
- **Real-time Preview**: Update signature as user types

## Email Signature Generation
- **HTML Output**: Table-based layouts with inline CSS
- **Compatibility**: Gmail, Outlook (desktop/web/mobile), Apple Mail
- **Templates**: Exactly 3 options (Classic, Modern, Minimal)
- **Export Formats**: 
  - Gmail: HTML copy-paste
  - Outlook: Rich text format copy-paste
  - Fallback: .htm file download

## Performance Targets (MVP)
- **Page Load**: <3 seconds
- **First Contentful Paint**: <1.5 seconds  
- **Signature Generation**: <500ms
- **Image Processing**: <2 seconds
- **Database Queries**: <100ms average

## Code Standards
- **TypeScript**: Strict mode, explicit types
- **Imports**: Use `@/` path alias
- **Components**: `.tsx` for React, `.ts` for utilities
- **Styling**: Tailwind + ShadCN UI only
- **Error Handling**: Graceful degradation, user-friendly messages

## Deployment Requirements
- **Environment**: Vercel with NeonDB
- **Domain**: Custom domain with SSL
- **Monitoring**: Vercel Analytics + error tracking
- **Environment Variables**: 
  ```env
  DATABASE_URL=postgresql://...
  BETTER_AUTH_SECRET=...
  BETTER_AUTH_URL=https://signaturecraft.co.za
  ```

## Testing Strategy
- **Email Clients**: Manual testing in Gmail, Outlook, Apple Mail
- **Browsers**: Chrome, Firefox, Safari, Edge
- **Devices**: Desktop, tablet, mobile responsive
- **Performance**: Lighthouse scores >90