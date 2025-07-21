import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';

type Props = { session: { user: { name: string } } | null | undefined };

export function SiteMobileNavigation({ session }: Props) {
  return (
    <div className="md:hidden flex items-center justify-between w-full">
      {/* Right side: Theme toggle and hamburger */}
      <div className="flex items-center gap-2 ml-auto">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 mr-2 mt-2 p-2" sideOffset={8}>
            <DropdownMenuItem asChild className="h-12">
              <Link href="/register" className="flex items-center gap-3 py-3 text-base font-medium">
                Get Started
              </Link>
            </DropdownMenuItem>
            {session ? (
              <DropdownMenuItem asChild className="sm:hidden h-12">
                <Link href="/dashboard" className="flex items-center gap-3 py-3 text-base">
                  Dashboard
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild className="sm:hidden h-12">
                <Link href="/login" className="flex items-center gap-3 py-3 text-base">
                  Sign In
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="h-12">
              <Link href="#features" className="flex items-center gap-3 py-3 text-base">
                Features
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="h-12">
              <Link href="#pricing" className="flex items-center gap-3 py-3 text-base">
                Pricing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="h-12">
              <Link href="/templates" className="flex items-center gap-3 py-3 text-base">
                Templates
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
