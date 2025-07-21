"use client";
import Image from 'next/image';
import { SiteDesktopNavigation } from './desktop';
import { SiteMobileNavigation } from './mobile';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

export function SiteNavigation() {
  const { data: session } = useSession();
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background/80 dark:bg-background/70 border-b border-border shadow-sm transition-colors">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity duration-200" aria-label="Go to SignatureCraft homepage">
          <Image
            src="/logo.svg"
            alt="SignatureCraft Logo"
            width={120}
            height={32}
            priority
            className="dark:hidden w-[120px] h-[32px] sm:w-[150px] sm:h-[40px]"
          />
          <Image
            src="/logo-dark.svg"
            alt="SignatureCraft Logo"
            width={120}
            height={32}
            priority
            className="hidden dark:block w-[120px] h-[32px] sm:w-[150px] sm:h-[40px]"
          />
        </Link>
        <div className="hidden md:flex w-full">
          <SiteDesktopNavigation session={session} />
        </div>
        <div className="flex md:hidden w-full">
          <SiteMobileNavigation session={session} />
        </div>
      </div>
    </header>

  );
}

export default SiteNavigation; 