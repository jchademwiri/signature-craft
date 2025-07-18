# SignatureCraft

A web-based SaaS platform for creating, customizing, and deploying professional email signatures. Built with Next.js, React Email, and modern web technologies.

## Getting Started

### Development Server

Run the Next.js development server:

```bash
pnpm dev
```

### Email Development

For developing and previewing email signatures, use the React Email development server:

```bash
pnpm email
```

This runs `npx react-email dev --port 3001` under the hood.

- **Next.js App**: Open [http://localhost:3000](http://localhost:3000) to view the main application
- **Email Preview**: The email development server will run on [http://localhost:3001](http://localhost:3001) for previewing email signatures

## Available Scripts

- `pnpm dev` - Start the Next.js development server with Turbopack
- `pnpm build` - Build the application for production with Turbopack
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code quality checks
- `pnpm email` - Start the React Email development server for email signature previews

## Tech Stack

- **Frontend**: Next.js 15.4.1 with React 19.1.0
- **Email Templates**: React Email with @react-email/components
- **Styling**: Tailwind CSS v4
- **TypeScript**: Strict mode enabled
- **Package Manager**: pnpm

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
