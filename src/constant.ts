// Base URL for the application - uses the deployed URL in production or localhost in development
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
  (typeof window !== 'undefined' && window.location.origin) || 
  'https://signature-craft-seven.vercel.app';

// Logo URL for emails and branding
export const logoUrl = `${baseUrl}/logo.svg`;

// Helper function to create full URLs
export const createUrl = (path: string): string => {
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};