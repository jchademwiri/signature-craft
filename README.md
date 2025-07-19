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
   DATABASE_URL=postgresql://...
   BETTER_AUTH_SECRET=your-secret-key
   BETTER_AUTH_URL=http://localhost:3000
   ```

4. Set up the database
   ```bash
   pnpm db:generate
   pnpm db:push
   ```
   
   The database schema includes Better Auth tables for authentication and a signatures table for user data.

5. Start the development server
   ```bash
   pnpm dev
   ```

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

## Project Structure

```
signaturecraft-mvp/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── (auth)/          # Authentication pages group
│   │   ├── dashboard/       # User dashboard
│   │   ├── builder/         # Signature builder
│   │   ├── export/          # Export and installation
│   │   └── api/             # API routes
│   ├── components/          # React components
│   │   ├── ui/             # ShadCN UI components
│   │   ├── auth/           # Authentication components
│   │   ├── signature/      # Signature builder components
│   │   └── export/         # Export components
│   └── lib/                # Utilities and configuration
├── emails/                 # Email templates (React Email)
└── docs/                   # Project documentation
```

## License

[MIT](LICENSE)