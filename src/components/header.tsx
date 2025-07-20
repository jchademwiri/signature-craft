"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background/80 dark:bg-background/70 border-b border-border shadow-sm transition-colors">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image 
            src="/logo.svg" 
            alt="SignatureCraft Logo" 
            width={120} 
            height={32} 
            priority
            className="dark:hidden sm:w-[150px] sm:h-[40px]"
          />
          <Image 
            src="/logo-dark.svg" 
            alt="SignatureCraft Logo" 
            width={120} 
            height={32} 
            priority
            className="hidden dark:block sm:w-[150px] sm:h-[40px]"
          />
        </Link>
        
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline hover:text-primary transition-colors duration-200">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline hover:text-primary transition-colors duration-200">
            Pricing
          </Link>
          <Link href="#templates" className="text-sm font-medium hover:underline hover:text-primary transition-colors duration-200">
            Templates
          </Link>
          <ThemeToggle />
          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="sm" className="h-10 transition-colors duration-200" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" className="h-10 transition-colors duration-200 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </nav>
        
        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-10 transition-colors duration-200 hidden xs:flex" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10 transition-colors duration-200" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mr-4">
              <DropdownMenuItem asChild className="xs:hidden">
                <Link href="/login" className="flex items-center gap-2 py-3">
                  Sign In
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register" className="flex items-center gap-2 py-3 font-medium">
                  Get Started
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="#features" className="flex items-center gap-2 py-3">
                  Features
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#pricing" className="flex items-center gap-2 py-3">
                  Pricing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#templates" className="flex items-center gap-2 py-3">
                  Templates
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <div className="w-full flex justify-center py-3">
                  <ThemeToggle />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}