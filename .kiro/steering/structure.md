# Project Structure & Organization

## Directory Layout
```
signature-craft/
├── .kiro/                 # Kiro AI assistant configuration
├── docs/                  # Project documentation
│   └── proposal.md        # Product requirements and specifications
├── emails/                # React Email templates and components
│   ├── components/        # Shared email components
│   │   └── EmailLayout.tsx # Standardized email layout with branding
│   ├── password-reset.tsx # Password reset email template
│   ├── subscription-update.tsx # Subscription update email template
│   ├── team-invitation.tsx # Team invitation email template
│   └── welcome.tsx        # Welcome email template
├── public/                # Static assets (SVGs, images, logos)
│   ├── logo.svg           # Light theme SignatureCraft logo
│   ├── logo-dark.svg      # Dark theme SignatureCraft logo
│   └── icon.svg           # SignatureCraft icon/favicon
├── src/                   # Source code
│   └── app/               # Next.js App Router pages and layouts
│       ├── layout.tsx     # Root layout component
│       ├── page.tsx       # Home page component
│       ├── globals.css    # Global styles
│       └── favicon.ico    # Site favicon
├── package.json           # Dependencies and scripts
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.mjs      # ESLint configuration
└── postcss.config.mjs     # PostCSS configuration
```

## Conventions
- **App Router**: Use `src/app/` directory for pages and layouts
- **Path Aliases**: Import from `@/` for src directory references
- **File Extensions**: Use `.tsx` for React components, `.ts` for utilities
- **Styling**: Global styles in `app/globals.css`, component styles via Tailwind
- **Static Assets**: Place in `public/` directory for direct access
- **Email Templates**: Use React Email components in `/emails` directory
- **Email Components**: Shared email components in `/emails/components`
- **Branding Assets**: Logo variants (light/dark) and icons in `/public`

## Component Organization
- Follow Next.js App Router file-based routing
- Use TypeScript for all components and utilities
- Maintain co-location of related files when appropriate
- Keep configuration files in project root
- Email templates use shared EmailLayout component for consistent branding
- All email components should be responsive and email-client compatible

## Documentation
- Product specifications in `docs/` directory
- Technical documentation should reference the proposal.md for requirements
- Use README.md for setup and deployment instructions