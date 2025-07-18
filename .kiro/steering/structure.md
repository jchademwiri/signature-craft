# Project Structure & Organization

## Directory Layout
```
signature-craft/
├── .kiro/                 # Kiro AI assistant configuration
├── docs/                  # Project documentation
│   └── proposal.md        # Product requirements and specifications
├── public/                # Static assets (SVGs, images)
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

## Component Organization
- Follow Next.js App Router file-based routing
- Use TypeScript for all components and utilities
- Maintain co-location of related files when appropriate
- Keep configuration files in project root

## Documentation
- Product specifications in `docs/` directory
- Technical documentation should reference the proposal.md for requirements
- Use README.md for setup and deployment instructions