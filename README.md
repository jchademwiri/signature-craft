# SignatureCraft MVP

SignatureCraft is a lean, focused MVP for creating professional email signatures in under 5 minutes. The platform targets South African professionals and SMBs who need branded email signatures without complex design tools.

**Core Value Proposition**: "Professional email signatures in 3 clicks - no design skills required"

## MVP Features

- Simple signature builder with form-based interface
- 3 professional templates (Classic, Modern, Minimal)
- Logo upload with automatic optimization
- Contact info fields (name, title, company, email, phone, website)
- HTML export with copy-paste for Gmail and Outlook
- Installation guides with screenshots
- Responsive design (mobile/tablet/desktop)

## Tech Stack

- **Frontend**: Next.js 15 with React 19.1.0 and TypeScript
- **Styling**: Tailwind CSS with ShadCN UI components
- **Database**: NeonDB PostgreSQL (serverless)
- **Authentication**: Better Auth with Drizzle adapter
- **ORM**: Drizzle ORM for type-safe database operations
- **Hosting**: Vercel (frontend + serverless functions)
- **Package Manager**: pnpm (never use npm or yarn)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (package manager)
- NeonDB PostgreSQL database

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/jchademwiri/signature-craft.git
   cd signature-craft
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   
   Add your database URL and authentication secrets:
   ```env
   DATABASE_URL=postgresql://your-neon-db-url
   BETTER_AUTH_SECRET=your-secret-key-here
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   ```

4. Set up the database
   ```bash
   pnpm db:generate
   pnpm db:push
   ```
   
   The database schema includes Better Auth tables (users, sessions, accounts, verifications) and a signatures table for user signature data.

5. Start the development server
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:3000`.

## Development Commands

```bash
# Start development server (includes email dev server)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm start

# Run linting
pnpm lint

# Database commands
pnpm db:generate    # Generate database schema
pnpm db:push        # Push schema to database
pnpm db:migrate     # Run database migrations
pnpm db:studio      # Open Drizzle Studio
pnpm db:drop        # Drop all tables (development only)
pnpm db:reset       # Reset database (development only)
```

## Current Implementation Status

### ✅ Phase 1 & 2 Complete - Core Application (COMPLETED)
- **Project Foundation**: Next.js 15.4.1 with React 19.1.0, TypeScript, and App Router
- **UI Framework**: Tailwind CSS 4 with ShadCN UI components (15+ components implemented)
- **Database**: NeonDB PostgreSQL with Drizzle ORM 0.44.3 and complete Better Auth schema
- **Authentication**: Better Auth 1.3.0 with email/password, session management, and route protection
- **Landing Page**: Complete professional landing page with hero, features, pricing, testimonials, FAQ
- **Authentication Pages**: Login, register, password reset with React Hook Form + Zod validation
- **User Dashboard**: Complete dashboard with signature management, edit/delete functionality, and CTA
- **Signature Builder**: Full responsive 3-column builder with tabbed interface for mobile
- **Template System**: Three professional templates (Classic, Modern, Minimal) with visual previews
- **Logo Upload**: Drag-and-drop upload with Canvas API resizing, validation, and base64 storage
- **Real-time Preview**: Live signature preview with desktop/mobile tabs and email client compatibility
- **Brand Colors**: Primary and secondary color customization integrated with all templates
- **Export System**: Copy-to-clipboard functionality for Gmail, Outlook, and HTML with success notifications
- **Settings Page**: User profile management and password change with validation
- **API Endpoints**: Complete signature management (GET, POST, DELETE) and user profile APIs
- **Middleware**: Route protection for authenticated pages with Better Auth integration
- **Email Templates**: React Email setup with welcome, password reset, and notification templates

### 🚧 Phase 3 - Export & Integration (IN PROGRESS)
- UI/UX improvements including cursor pointers, hover states, and visual feedback ✅
- Accessibility enhancements with ARIA labels, focus states, and keyboard navigation ✅
- Mobile responsiveness optimization with improved touch targets and layouts ✅
- Enhanced export functionality with comprehensive installation guides
- .htm file download functionality for Outlook desktop compatibility
- Advanced email client compatibility testing across Gmail, Outlook, Apple Mail
- Performance optimization and accessibility improvements (WCAG 2.1 AA compliance)
- Remaining API endpoints (PUT /api/signatures/:id for updates)

### 📋 Phase 4 & 5 - Testing & Launch (PENDING)
- Comprehensive cross-browser testing (Chrome, Firefox, Safari, Edge)
- Production deployment with monitoring, analytics, and error tracking
- User onboarding flow and comprehensive help documentation
- Launch preparation and marketing materials

## Project Structure

```
signaturecraft-mvp/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── (auth)/          # Authentication pages (login, register, reset-password)
│   │   ├── api/             # API routes
│   │   │   ├── auth/        # Better Auth API routes
│   │   │   ├── signatures/  # Signature management API
│   │   │   └── user/        # User profile API
│   │   ├── builder/         # Signature builder page
│   │   ├── dashboard/       # User dashboard
│   │   ├── settings/        # User settings page
│   │   ├── layout.tsx       # Root layout with theme provider
│   │   └── page.tsx         # Landing page
│   ├── components/          # React components
│   │   ├── ui/             # ShadCN UI components (button, card, input, etc.)
│   │   ├── auth/           # Authentication forms (LoginForm, RegisterForm, etc.)
│   │   ├── signature/      # Signature builder components
│   │   │   ├── SignatureBuilder.tsx    # Main builder interface
│   │   │   ├── SignaturePreview.tsx    # Real-time preview
│   │   │   ├── TemplateSelector.tsx    # Template selection
│   │   │   ├── FormFields.tsx          # Contact info form
│   │   │   ├── LogoUpload.tsx          # Logo upload component
│   │   │   └── BrandColors.tsx         # Color customization
│   │   ├── hero-section.tsx # Landing page hero
│   │   ├── features-section.tsx # Features showcase
│   │   ├── pricing-section.tsx # Pricing display
│   │   └── theme-provider.tsx # Dark/light theme support
│   └── lib/                # Utilities and configuration
│       ├── auth.ts         # Better Auth server configuration
│       ├── auth-client.ts  # Better Auth client configuration
│       ├── db.ts           # Database connection
│       └── schema.ts       # Drizzle database schema
├── emails/                 # React Email templates
├── migrations/             # Database migrations
└── docs/                   # Project documentation
```

## License

[MIT](LICENSE)