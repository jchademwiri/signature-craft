"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="w-full border-b">
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
          <Link href="#" className="text-sm font-medium hover:underline">
            Features
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline">
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline">
            Templates
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}