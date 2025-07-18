# Technology Stack & Development Guidelines

## Core Stack
- **Frontend**: Next.js 15.4.1 with React 19.1.0
- **Styling**: Tailwind CSS v4 with PostCSS
- **TypeScript**: Strict mode enabled with ES2017 target
- **Package Manager**: pnpm (specified in packageManager field)
- **Linting**: ESLint with Next.js config

## Build System
- **Development**: Uses Turbopack for faster builds
- **Build Tool**: Next.js with Turbopack optimization
- **Deployment**: Vercel (as indicated in README)

## Common Commands
```bash
# Development server with Turbopack and email preview server (concurrent)
pnpm dev

# Production build with Turbopack
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Email development server only
pnpm email
```

## Development Standards
- Use TypeScript with strict mode
- Follow Next.js App Router conventions
- Utilize path aliases (`@/*` maps to `./src/*`)
- Maintain ESLint compliance
- Use pnpm for package management (not npm/yarn)

## Email System
- **Email Templates**: React Email with TypeScript
- **Email Components**: Shared components in `/emails/components`
- **Email Structure**: Flexible approach - either using the standardized EmailLayout component or direct React Email components
- **Email Preview**: Development server on port 3001 for template testing (runs concurrently with Next.js in dev mode)
- **Email Delivery**: Planned integration with Resend

## Planned Integrations
- **Backend**: Supabase (PostgreSQL, Auth)
- **ORM**: Drizzle
- **Rich Text**: TipTap with Notion-style blocks
- **Payments**: Paystack for ZAR billing
- **File Storage**: Supabase Storage