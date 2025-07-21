'use client';
import Image from 'next/image';
import Link from 'next/link';
import { DashboardDesktopNavigation } from './desktop';
import { DashboardMobileNavigation } from './mobile';

type Props = {
  session: { user: { name: string } };
  handleLogout: () => void;
};

export function DashboardNavigation({ session, handleLogout }: Props) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center" aria-label="Dashboard Home">
          <Image
            src="/logo.svg"
            alt="SignatureCraft Logo"
            width={36}
            height={36}
            priority
            className="h-9 w-auto block dark:hidden"
          />
          <Image
            src="/logo-dark.svg"
            alt="SignatureCraft Logo Dark"
            width={36}
            height={36}
            priority
            className="h-9 w-auto hidden dark:block"
          />
        </Link>
        <div className="hidden md:flex w-full">
          <DashboardDesktopNavigation session={session} handleLogout={handleLogout} />
        </div>
        <div className="flex md:hidden w-full justify-end">
          <DashboardMobileNavigation session={session} handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}

export default DashboardNavigation;
