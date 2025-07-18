# SignatureCraft

SignatureCraft is a web-based SaaS platform designed to help professionals, teams, and businesses easily create, customize, and deploy professional email signatures.

## Features

- Responsive signature builder with drag-and-drop interface
- Logo and avatar uploads with banner support
- Social media integration and custom branding
- Multi-user team management and templates
- Export to popular email clients (Gmail, Outlook, Apple Mail)
- Analytics and white-label options

## Tech Stack

- **Frontend**: Next.js 15.4.1 with React 19.1.0
- **Styling**: Tailwind CSS v4 with ShadCN UI components
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Email**: React Email with Resend
- **Payments**: Paystack (ZAR billing)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

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

3. Create a `.env.local` file based on `.env.example`
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server and email preview server concurrently
   ```bash
   pnpm dev
   ```

   This will start both the Next.js development server and the email preview server in parallel.

## Email Development

SignatureCraft uses React Email for creating and previewing email templates:

- Email templates are located in the `/emails` directory
- Shared email components are in the `/emails/components` directory
- Email templates can be built with or without the `EmailLayout` component
- When using direct React Email components, import them from `@react-email/components`
- The logo URL is defined in `src/constant.ts` and can be imported in email templates
- The email preview server starts automatically with `pnpm dev` on port 3001
- Alternatively, you can run just the email preview server with `pnpm email`
- Visit `http://localhost:3001` to preview email templates

### Email Branding

All email templates automatically include:
- SignatureCraft logo header for brand consistency
- Standardized footer with copyright and website link
- Responsive design optimized for email clients

## License

[MIT](LICENSE)