"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background/80 dark:bg-background/70 border-b border-border shadow-sm transition-colors">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.svg" 
            alt="SignatureCraft Logo" 
            width={150} 
            height={40} 
            priority
            className="dark:hidden"
          />
          <Image 
            src="/logo-dark.svg" 
            alt="SignatureCraft Logo" 
            width={150} 
            height={40} 
            priority
            className="hidden dark:block"
          />
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline">
            Pricing
          </Link>
          <Link href="#templates" className="text-sm font-medium hover:underline">
            Templates
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}