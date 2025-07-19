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
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm start

# Run linting
pnpm lint

# Generate database schema
pnpm db:generate

# Push database schema
pnpm db:push

# Run database migrations
pnpm db:migrate

# Open Drizzle Studio
pnpm db:studio
```

## Current Implementation Status

### ✅ Completed Features
- **Project Setup**: Next.js 15 with TypeScript and App Router
- **Styling**: Tailwind CSS with ShadCN UI components configured
- **Database**: NeonDB PostgreSQL with Drizzle ORM setup
- **Authentication**: Better Auth with email/password authentication
- **Landing Page**: Professional landing page with hero section, features, pricing, and testimonials
- **Auth Pages**: Login, register, and password reset pages with form validation
- **Middleware**: Route protection for authenticated pages
- **Email Templates**: React Email setup for future email functionality

### 🚧 In Progress
- User dashboard implementation
- Signature builder interface
- Template system development

### 📋 Upcoming Features
- Real-time signature preview
- Logo upload functionality
- Export system with email client compatibility
- Installation guides

## Project Structure

```
signaturecraft-mvp/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── (auth)/          # Authentication pages (login, register, reset-password)
│   │   ├── api/auth/        # Better Auth API routes
│   │   ├── layout.tsx       # Root layout with theme provider
│   │   └── page.tsx         # Landing page
│   ├── components/          # React components
│   │   ├── ui/             # ShadCN UI components (button, card, input, etc.)
│   │   ├── auth/           # Authentication forms (LoginForm, RegisterForm, etc.)
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