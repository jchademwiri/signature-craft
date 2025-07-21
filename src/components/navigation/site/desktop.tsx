import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

type Props = { session: { user: { name: string } } | null | undefined };

export function SiteDesktopNavigation({ session }: Props) {
  return (
    <nav className="hidden md:flex items-center gap-8 ml-8 flex-1 justify-end">
      <Link
        href="#features"
        className="text-sm font-medium hover:underline hover:text-primary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="View features section"
      >
        Features
      </Link>
      <Link
        href="#pricing"
        className="text-sm font-medium hover:underline hover:text-primary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="View pricing section"
      >
        Pricing
      </Link>
      <Link
        href="/templates"
        className="text-sm font-medium hover:underline hover:text-primary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="View templates section"
      >
        Templates
      </Link>
      <ThemeToggle />
      <div className="flex items-center gap-2 ml-4">
        <Button
          size="sm"
          className="h-10 transition-colors duration-200 text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          asChild
        >
          <Link href="/register" aria-label="Create a new account">
            Get Started
          </Link>
        </Button>
        {session ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            asChild
          >
            <Link href="/dashboard" aria-label="Go to your dashboard">
              Dashboard
            </Link>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="h-10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            asChild
          >
            <Link href="/login" aria-label="Sign in to your account">
              Sign In
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
