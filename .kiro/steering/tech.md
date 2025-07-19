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
- **Image Storage**: Base64 in database (no separate file storage service)
- **Email Integration**: Copy-paste signatures (no email service needed)
- **User Model**: Single user only (no team features)
- **Payment**: Validation phase only (no payment processing)
- **Analytics**: Basic only (focus on core functionality)

## Authentication Setup (Better Auth)
```typescript
// Required Better Auth configuration
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { 
    enabled: true,
    requireEmailVerification: false // MVP: Skip verification
  },
  session: { expiresIn: 60 * 60 * 24 * 7 } // 7 days
})
```

## Database Schema (Required)
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    email_verified BOOLEAN DEFAULT FALSE
);

-- Signatures table  
CREATE TABLE signatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    company VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    website VARCHAR(255),
    logo_data TEXT, -- Base64 encoded
    template_id VARCHAR(20) DEFAULT 'classic',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
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